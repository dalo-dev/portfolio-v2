import { getCollection, type CollectionEntry } from 'astro:content';
import { languages, type Lang } from '../i18n/ui';

type LocalizedCollection = 'experience' | 'education' | 'projects' | 'now' | 'lab';

/** `en/birthdays-hub` → `birthdays-hub` */
export function slugOf(entry: { id: string }): string {
	return entry.id.slice(entry.id.indexOf('/') + 1);
}

const checked = new Set<LocalizedCollection>();

/** Fails the build when a locale is missing an entry another locale has. */
async function assertParity(collection: LocalizedCollection) {
	if (checked.has(collection)) return;
	const entries = await getCollection(collection);
	const byLang = new Map<string, Set<string>>();
	for (const entry of entries) {
		const lang = entry.id.split('/')[0]!;
		if (!byLang.has(lang)) byLang.set(lang, new Set());
		byLang.get(lang)!.add(slugOf(entry));
	}
	const all = new Set(entries.map(slugOf));
	const problems: string[] = [];
	for (const lang of Object.keys(languages)) {
		const have = byLang.get(lang) ?? new Set();
		const missing = [...all].filter((slug) => !have.has(slug));
		if (missing.length) problems.push(`${lang}: ${missing.join(', ')}`);
	}
	if (problems.length) {
		throw new Error(`[content] "${collection}" is missing translations → ${problems.join(' | ')}`);
	}
	checked.add(collection);
}

async function getLocalized<C extends LocalizedCollection>(collection: C, lang: Lang) {
	await assertParity(collection);
	return (await getCollection(collection, (entry) =>
		entry.id.startsWith(`${lang}/`),
	)) as CollectionEntry<C>[];
}

/** Current role first, then by most recent start date. */
export async function getExperience(lang: Lang) {
	const entries = await getLocalized('experience', lang);
	return entries.sort((a, b) => {
		if ((a.data.end === null) !== (b.data.end === null)) return a.data.end === null ? -1 : 1;
		return b.data.start.localeCompare(a.data.start);
	});
}

export async function getEducation(lang: Lang) {
	const entries = await getLocalized('education', lang);
	return entries.sort((a, b) => b.data.end.localeCompare(a.data.end));
}

export async function getProjects(lang: Lang) {
	const entries = await getLocalized('projects', lang);
	return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getNow(lang: Lang) {
	const [entry] = await getLocalized('now', lang);
	if (!entry) throw new Error(`[content] missing src/content/now/${lang}/now.yaml`);
	return entry.data;
}

export async function getLab(lang: Lang) {
	const [entry] = await getLocalized('lab', lang);
	if (!entry) throw new Error(`[content] missing src/content/lab/${lang}/lab.yaml`);
	return entry.data;
}

export async function getSkills() {
	const entries = await getCollection('skills');
	return entries.sort((a, b) => a.data.order - b.data.order);
}
