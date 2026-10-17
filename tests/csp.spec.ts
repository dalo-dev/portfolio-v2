import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';

/**
 * `astro preview` doesn't serve `dist/_headers`, so apply the generated CSP to every document
 * response here and make sure nothing on the page gets blocked by it.
 */
const csp = readFileSync('dist/_headers', 'utf8')
	.match(/Content-Security-Policy: (.+)/)![1]!
	// Would upgrade the http://localhost test server to https.
	.replace(/;\s*upgrade-insecure-requests/, '');

async function enforceCsp(page: Page) {
	const violations: string[] = [];
	await page.exposeFunction('__reportCsp', (msg: string) => violations.push(msg));
	await page.addInitScript(() => {
		document.addEventListener('securitypolicyviolation', (e) =>
			(window as unknown as { __reportCsp: (m: string) => void }).__reportCsp(
				`${e.violatedDirective} ${e.blockedURI}`,
			),
		);
	});
	await page.route('**/*', async (route) => {
		if (route.request().resourceType() !== 'document') return route.continue();
		const response = await route.fetch();
		await route.fulfill({
			response,
			headers: { ...response.headers(), 'content-security-policy': csp },
		});
	});
	return violations;
}

test('the generated CSP blocks nothing the site needs', async ({ page }) => {
	const violations = await enforceCsp(page);

	// First visit: inline motion script runs (boot plays), bundles load, GSAP loads lazily.
	await page.goto('/');
	await expect(page.locator('html')).toHaveClass(/booting/);
	await page.keyboard.press('Escape');
	await expect(page.locator('[data-ascii-animate]')).toHaveClass(/is-ready/);
	await page.locator('#contact').scrollIntoViewIfNeeded();
	await expect(page.locator('#contact [data-prompt-cmd]')).toHaveText('./contact.sh');

	// Client-router navigation (fetch + swap) under the same policy.
	await page
		.getByRole('navigation', { name: 'Language' })
		.getByRole('link', { name: 'Español' })
		.click();
	await expect(page).toHaveURL(/\/es\/$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');

	expect(violations).toEqual([]);
});

test('structured data is valid JSON describing the person', async ({ page }) => {
	await page.goto('/');
	const json = await page.locator('script[type="application/ld+json"]').textContent();
	const data = JSON.parse(json!);
	const person = data['@graph'].find((node: { '@type': string }) => node['@type'] === 'Person');
	expect(person.name).toBe('Daniel Alejandro León Ortiz');
	expect(person.sameAs).toContain('https://github.com/dalo-dev');
});

test('social cards exist for both languages', async ({ request, page }) => {
	for (const lang of ['en', 'es']) {
		const res = await request.get(`/og/${lang}.png`);
		expect(res.ok()).toBe(true);
		expect(res.headers()['content-type']).toContain('image/png');
	}
	await page.goto('/es/');
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		'content',
		'https://dalo.dev/og/es.png',
	);
});
