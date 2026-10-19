// @ts-check
/**
 * Writes `dist/_headers` (read by Cloudflare Pages and Netlify) after each build.
 *
 * Astro's built-in CSP can't be used together with <ClientRouter />, so the policy is built
 * here instead: every inline <script> in the output is hashed into `script-src`, which keeps
 * scripts strict without 'unsafe-inline'. Styles need 'unsafe-inline' (scoped <style> tags,
 * style attributes and the view-transition styles injected at runtime).
 */
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** @param {string} dir */
async function htmlFiles(dir) {
	const entries = await readdir(dir, { recursive: true, withFileTypes: true });
	return entries
		.filter((e) => e.isFile() && e.name.endsWith('.html'))
		.map((e) => join(e.parentPath, e.name));
}

/** Inline, executable scripts only: no `src`, and not data blocks like JSON-LD. */
const INLINE_SCRIPT =
	/<script(?![^>]*\bsrc=)(?![^>]*type="application\/(?:ld\+)?json")[^>]*>([\s\S]*?)<\/script>/g;

/**
 * Cloudflare Web Analytics: the beacon script is injected at the edge (not in our HTML) and
 * reports to its own origin.
 */
const CF_ANALYTICS_SCRIPT = 'https://static.cloudflareinsights.com';
const CF_ANALYTICS_REPORT = 'https://cloudflareinsights.com';

/** @param {string[]} scriptHashes */
export function buildCsp(scriptHashes) {
	return [
		"default-src 'self'",
		`script-src 'self' ${CF_ANALYTICS_SCRIPT} ${scriptHashes.map((h) => `'${h}'`).join(' ')}`.trim(),
		"style-src 'self' 'unsafe-inline'",
		"img-src 'self' data:",
		"font-src 'self'",
		`connect-src 'self' ${CF_ANALYTICS_REPORT}`,
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		"frame-ancestors 'none'",
		'upgrade-insecure-requests',
	].join('; ');
}

/** @returns {import('astro').AstroIntegration} */
export default function securityHeaders() {
	return {
		name: 'security-headers',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const out = fileURLToPath(dir);
				const hashes = new Set();
				for (const file of await htmlFiles(out)) {
					const html = await readFile(file, 'utf8');
					for (const [, body] of html.matchAll(INLINE_SCRIPT)) {
						if (body.trim())
							hashes.add(`sha256-${createHash('sha256').update(body).digest('base64')}`);
					}
				}

				const headers = `/*
  Content-Security-Policy: ${buildCsp([...hashes].sort())}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
`;
				await writeFile(join(out, '_headers'), headers);
				logger.info(
					`wrote _headers (${hashes.size} inline script hash${hashes.size === 1 ? '' : 'es'})`,
				);
			},
		},
	};
}
