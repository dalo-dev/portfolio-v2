import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, languages, ui, type Lang, type UIKey } from './ui';

export function isLang(value: string | undefined): value is Lang {
	return !!value && value in languages;
}

export function useTranslations(lang: Lang) {
	return function t(key: UIKey): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Localized URL for a path such as `''` (home) or `some/page`. */
export function localizePath(lang: Lang, path = ''): string {
	return getRelativeLocaleUrl(lang, path);
}

/** Strip the locale prefix so the same page can be addressed in another language. */
export function stripLangPrefix(pathname: string): string {
	const [, segment, ...rest] = pathname.split('/');
	return isLang(segment) && segment !== defaultLang ? rest.join('/') : pathname.slice(1);
}
