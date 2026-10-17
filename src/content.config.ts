import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** `YYYY-MM` */
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected a YYYY-MM date');

/** Localized entries live in `<collection>/<lang>/<slug>.<ext>`, so ids look like `en/slug`. */
const experience = defineCollection({
	loader: glob({ pattern: '*/*.yaml', base: './src/content/experience' }),
	schema: z.object({
		company: z.string(),
		role: z.string(),
		start: yearMonth,
		end: yearMonth.nullable(),
		url: z.url().optional(),
		highlights: z.array(z.string()).min(1),
		stack: z.array(z.string()),
	}),
});

const education = defineCollection({
	loader: glob({ pattern: '*/*.yaml', base: './src/content/education' }),
	schema: z.object({
		institution: z.string(),
		degree: z.string(),
		start: yearMonth,
		end: yearMonth,
		url: z.url().optional(),
		gpa: z.string().optional(),
		honors: z.array(z.string()).default([]),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '*/*.yaml', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		stack: z.array(z.string()),
		repo: z.url().optional(),
		live: z.url().optional(),
		/** Lower comes first. */
		order: z.number().int(),
	}),
});

/** "Now" page-in-a-section: one entry per language at `now/<lang>/now.yaml`. */
const now = defineCollection({
	loader: glob({ pattern: '*/now.yaml', base: './src/content/now' }),
	schema: z.object({
		updated: yearMonth,
		items: z
			.array(
				z.object({
					label: z.string().max(12),
					text: z.string(),
					highlight: z.boolean().default(false),
				}),
			)
			.min(1),
	}),
});

/** Language-neutral; group labels are translated in `src/i18n/ui.ts`. */
const skills = defineCollection({
	loader: file('src/content/skills.yaml'),
	schema: z.object({
		id: z.enum(['structure-and-styling', 'frameworks-and-languages', 'development-and-workflow']),
		order: z.number().int(),
		items: z.array(z.string()).min(1),
	}),
});

export const collections = { experience, education, projects, now, skills };
