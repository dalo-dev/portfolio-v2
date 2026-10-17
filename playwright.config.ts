import { defineConfig, devices } from '@playwright/test';

// Not 4321: never reuse a running `astro dev` server by accident (dev ≠ production build).
const PORT = 4322;

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		baseURL: `http://localhost:${PORT}`,
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } },
	],
	webServer: {
		// --ignore-lock keeps preview in the foreground even when Astro detects
		// an AI agent (it would otherwise auto-background and Playwright would bail).
		command: `pnpm build && pnpm astro preview --ignore-lock --port ${PORT}`,
		url: `http://localhost:${PORT}`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
