import { profile } from '../data/site';
import type { Lang } from '../i18n/ui';

interface Options {
	lang: Lang;
	/** Absolute site root, e.g. https://dalo.dev/ */
	site: URL;
	/** Localized page URL. */
	url: URL;
	jobTitle: string;
	description: string;
	/** Absolute URL of the profile photo. */
	image: URL;
}

/** schema.org Person + WebSite graph for search engines (rendered as JSON-LD). */
export function personGraph({ lang, site, url, jobTitle, description, image }: Options) {
	const personId = new URL('/#person', site).href;
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': personId,
				name: profile.fullName,
				alternateName: [profile.name, profile.handle],
				jobTitle,
				description,
				url: site.href,
				image: image.href,
				email: `mailto:${profile.email}`,
				sameAs: [profile.github, profile.linkedin],
				knowsLanguage: ['es', 'en'],
				alumniOf: [
					{ '@type': 'CollegeOrUniversity', name: 'Universidad Industrial de Santander' },
					{ '@type': 'CollegeOrUniversity', name: 'University of Oklahoma' },
				],
			},
			{
				'@type': 'WebSite',
				name: 'dalo.dev',
				url: url.href,
				inLanguage: lang,
				author: { '@id': personId },
			},
		],
	};
}

/** JSON for a <script type="application/ld+json">, safe against `</script>` injection. */
export function toJsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
