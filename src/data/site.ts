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

/** Spoken languages, shown as `locale -a` output in About. Labels live in src/i18n/ui.ts. */
export const spokenLanguages = [
	{ locale: 'es_CO.UTF-8', name: 'lang.spanish', level: 'lang.native' },
	{
		locale: 'en_US.UTF-8',
		name: 'lang.english',
		level: 'lang.professional',
		certificate: { name: 'TOEFL iBT', score: '94/120', year: 2022 },
	},
] as const;

/** Section anchors, shared by the nav and the home page. */
export const sections = [
	'about',
	'now',
	'experience',
	'projects',
	'skills',
	'lab',
	'education',
	'contact',
] as const;

export type SectionId = (typeof sections)[number];
