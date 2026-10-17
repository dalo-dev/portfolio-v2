import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test('home renders every section in English', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Daniel León/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Daniel León');
	for (const id of ['about', 'now', 'experience', 'projects', 'skills', 'education', 'contact']) {
		await expect(page.locator(`section#${id}`)).toBeVisible();
	}
});

test('Spanish home is localized', async ({ page }) => {
	await page.goto('/es/');
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	await expect(page.getByRole('heading', { level: 2, name: 'Experiencia' })).toBeVisible();
});

test('language switcher keeps the current page', async ({ page }) => {
	await page.goto('/');
	await page
		.getByRole('navigation', { name: 'Language' })
		.getByRole('link', { name: 'Español' })
		.click();
	await expect(page).toHaveURL(/\/es\/$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});

test('project cards link out to the project', async ({ page }) => {
	await page.goto('/');
	const card = page.locator('#projects article', { hasText: 'Birthdays Hub' });
	await expect(card.getByRole('link', { name: /birthdayshub\.com/ })).toHaveAttribute(
		'href',
		'https://birthdayshub.com/',
	);
});

test('CV downloads exist in both languages', async ({ request }) => {
	for (const path of ['/cv/CV_EN.pdf', '/cv/CV_ES.pdf']) {
		const res = await request.get(path);
		expect(res.ok()).toBe(true);
		expect(res.headers()['content-type']).toContain('pdf');
	}
});

test('every in-page anchor resolves to an element', async ({ page }) => {
	for (const route of ['/', '/es/']) {
		await page.goto(route);
		const missing = await page.evaluate(() =>
			[...document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]')]
				.filter((a) => a.pathname === location.pathname)
				.map((a) => a.hash.slice(1))
				.filter((id) => id && !document.getElementById(id)),
		);
		expect(missing).toEqual([]);
	}
});

test('unknown routes show the 404 page', async ({ page }) => {
	const res = await page.goto('/definitely-not-a-page');
	expect(res?.status()).toBe(404);
	await expect(page.getByRole('heading', { level: 1 })).toContainText('404');
});
