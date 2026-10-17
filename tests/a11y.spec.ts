import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Static end state: no boot overlay or pending reveals while axe inspects the page.
test.use({ reducedMotion: 'reduce' });

const routes = [
	'/',
	'/es/',
	'/projects/birthdays-hub/',
	'/es/projects/birthdays-hub/',
	'/projects/portfolio-v1/',
	'/es/projects/portfolio-v1/',
	'/404',
];

for (const route of routes) {
	test(`${route} has no detectable a11y violations`, async ({ page }) => {
		await page.goto(route);
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
			.analyze();
		expect(results.violations).toEqual([]);
	});
}
