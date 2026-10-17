import type { Lang } from '../i18n/ui';

export const profile = {
	name: 'Daniel León',
	fullName: 'Daniel Alejandro León Ortiz',
	handle: 'dalo',
	host: 'portfolio',
	email: 'dalodev@proton.me',
	github: 'https://github.com/dalo-dev',
	linkedin: 'https://linkedin.com/in/dalodev',
} as const;

export const cv: Record<Lang, string> = {
	en: '/cv/CV_EN.pdf',
	es: '/cv/CV_ES.pdf',
};

/** Section anchors, shared by the nav and the home page. */
export const sections = [
	'about',
	'now',
	'experience',
	'projects',
	'skills',
	'education',
	'contact',
] as const;

export type SectionId = (typeof sections)[number];
