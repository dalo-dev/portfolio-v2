// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import localized404 from './integrations/localized-404.mjs';
import securityHeaders from './integrations/security-headers.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://dalo.dev',
	output: 'static',
	// Matches the default `directory` build format (every page is `<path>/index.html`).
	trailingSlash: 'always',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', es: 'es' },
			},
		}),
		localized404(['es']),
		securityHeaders(),
	],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: ['100 800'],
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
	vite: {
		optimizeDeps: {
			// GSAP is only reached through a dynamic import, so Vite would discover it mid-session,
			// re-optimize and 504 the open page's requests. Pre-bundle it up front instead.
			include: ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrambleTextPlugin'],
		},
	},
});
