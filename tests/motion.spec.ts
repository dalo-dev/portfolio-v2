import { test, expect } from '@playwright/test';

const opacity = (selector: string) =>
	`getComputedStyle(document.querySelector('${selector}')).opacity`;

test('boot intro plays once per session and can be skipped with a key', async ({ page }) => {
	await page.goto('/');
	const html = page.locator('html');
	await expect(html).toHaveClass(/booting/);
	await expect(page.locator('.boot')).toBeVisible();

	await page.keyboard.press('Escape');
	await expect(html).not.toHaveClass(/booting/);
	await expect(page.locator('.boot')).toBeHidden();

	await page.goto('/es/');
	await expect(html).not.toHaveClass(/booting/);
});

test('no boot intro when deep-linking to a section', async ({ page }) => {
	await page.goto('/#projects');
	await expect(page.locator('html')).not.toHaveClass(/booting/);
});

test('sections reveal on scroll and the prompt types out', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Escape');
	const cmd = page.locator('#contact [data-prompt-cmd]');
	await expect.poll(() => page.evaluate(opacity('#contact h2'))).toBe('0');

	await page.locator('#contact').scrollIntoViewIfNeeded();
	await expect.poll(() => page.evaluate(opacity('#contact h2'))).toBe('1');
	await expect(cmd).toHaveText('./contact.sh');
});

test('keyboard focus reveals hidden content', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Escape');
	await page.locator('#contact a[href^="mailto:"]').focus();
	await expect.poll(() => page.evaluate(opacity('#contact h2'))).toBe('1');
});

test('ASCII logo decodes into the real art', async ({ page }) => {
	await page.goto('/#about');
	const logo = page.locator('[data-ascii-animate]');
	await expect(logo).toHaveClass(/is-ready/);
	const art = await page.evaluate(() => {
		const el = document.querySelector('[data-ascii-animate]')!;
		return new Promise<string>((resolve) => setTimeout(() => resolve(el.textContent ?? ''), 1800));
	});
	expect(art.split('\n')).toHaveLength(19);
});

test('pause toggle turns motion off and persists across navigation', async ({ page }) => {
	await page.goto('/#about');
	const toggle = page.locator('[data-motion-toggle]');
	await expect(toggle).toBeVisible();
	await toggle.click();
	await expect(toggle).toHaveAttribute('aria-pressed', 'true');
	await expect(page.locator('html')).toHaveClass(/motion-off/);
	await expect.poll(() => page.evaluate(opacity('#contact h2'))).toBe('1');

	await page
		.getByRole('navigation', { name: 'Language' })
		.getByRole('link', { name: 'Español' })
		.click();
	await expect(page).toHaveURL(/\/es\/$/);
	await expect(page.locator('html')).toHaveClass(/motion-off/);
	await expect(page.locator('[data-motion-toggle]')).toHaveAttribute('aria-pressed', 'true');
});

test.describe('reduced motion', () => {
	test.use({ reducedMotion: 'reduce' });

	test('no boot, no hidden content, no pause toggle', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).toHaveClass(/motion-off/);
		await expect(page.locator('html')).not.toHaveClass(/booting/);
		await expect(page.locator('[data-motion-toggle]')).toBeHidden();
		expect(await page.evaluate(opacity('#contact h2'))).toBe('1');
	});
});

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('all content is visible', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('.boot')).toBeHidden();
		await expect(page.locator('[data-ascii-animate]')).toBeVisible();
		await expect(page.locator('#contact h2')).toBeVisible();
	});
});
