/** Lighthouse CI: mobile emulation (Lighthouse default) against the static build. */
module.exports = {
	ci: {
		collect: {
			staticDistDir: './dist',
			url: ['http://localhost/', 'http://localhost/es/'],
			numberOfRuns: 3,
			settings: {
				// A real (non-headless-shell) Chrome; CI runners provide one via CHROME_PATH.
				chromeFlags: '--headless=new --no-sandbox',
			},
		},
		assert: {
			assertions: {
				'categories:performance': ['error', { minScore: 0.95 }],
				'categories:accessibility': ['error', { minScore: 1 }],
				'categories:best-practices': ['error', { minScore: 0.95 }],
				'categories:seo': ['error', { minScore: 1 }],
			},
		},
		upload: { target: 'filesystem', outputDir: './.lighthouseci/reports' },
	},
};
