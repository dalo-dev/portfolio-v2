import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test.describe('mobile menu', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test('collapses the nav behind an accessible toggle', async ({ page }) => {
		await page.goto('/');
		const toggle = page.getByRole('button', { name: 'menu' });
		const nav = page.getByRole('navigation', { name: 'Primary' });

		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
		await expect(nav).toBeHidden();

		await toggle.click();
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');
		await expect(nav).toBeVisible();

		// Following a link closes the menu and scrolls to the section.
		await nav.getByRole('link', { name: 'lab' }).click();
		await expect(page).toHaveURL(/#lab$/);
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
		await expect(nav).toBeHidden();
	});

	test('Escape closes the menu and returns focus to the toggle', async ({ page }) => {
		await page.goto('/es/');
		const toggle = page.getByRole('button', { name: 'menú' });
		await toggle.click();
		await page.getByRole('navigation', { name: 'Principal' }).getByRole('link').first().focus();
		await page.keyboard.press('Escape');
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
		await expect(toggle).toBeFocused();
	});

	test.describe('without JavaScript', () => {
		test.use({ javaScriptEnabled: false });

		test('the nav is simply shown', async ({ page }) => {
			await page.goto('/');
			await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
			await expect(page.locator('[data-menu-toggle]')).toBeHidden();
		});
	});
});

test('desktop shows the full nav and no menu button', async ({ page, isMobile }) => {
	test.skip(isMobile, 'desktop only');
	await page.setViewportSize({ width: 1280, height: 800 });
	await page.goto('/');
	await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
	await expect(page.locator('[data-menu-toggle]')).toBeHidden();
});

test('status bar shows the impact facts', async ({ page }) => {
	await page.goto('/');
	const status = page.getByRole('definition').filter({ hasText: '20,000+' });
	await expect(status).toHaveText('20,000+ students / semester');
	await expect(page.locator('.status')).toContainText('Cum Laude');
});
