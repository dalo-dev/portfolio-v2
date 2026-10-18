// @ts-check
/**
 * Copies each localized 404 page (`dist/<lang>/404/index.html`) to `dist/<lang>/404.html`.
 *
 * Astro only emits a top-level `404.html`. Static hosts like Cloudflare Pages serve the nearest
 * `404.html` up the directory tree, so this gives `/es/<missing>` the Spanish page.
 */
import { copyFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param {string[]} locales Non-default locales with their own 404 page.
 * @returns {import('astro').AstroIntegration}
 */
export default function localized404(locales) {
	return {
		name: 'localized-404',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const out = fileURLToPath(dir);
				for (const lang of locales) {
					const src = join(out, lang, '404', 'index.html');
					// Fail loudly if the page moves: a silent miss would serve the wrong language.
					await stat(src);
					await copyFile(src, join(out, lang, '404.html'));
					logger.info(`copied ${lang}/404.html`);
				}
			},
		},
	};
}
