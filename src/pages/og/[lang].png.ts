/**
 * Social share card (1200×630), rendered at build time: Satori lays out the card and
 * converts text to vector paths, sharp rasterizes the SVG to PNG.
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { asciiLogo } from '../../data/ascii-logo';
import { profile } from '../../data/site';
import { languages, type Lang } from '../../i18n/ui';
import { useTranslations } from '../../i18n/utils';

const WIDTH = 1200;
const HEIGHT = 630;

const color = {
	bg: '#0f1115',
	sunken: '#0b0d10',
	border: '#262b33',
	dot: '#343a44',
	text: '#c3c8cf',
	heading: '#e6e8eb',
	muted: '#9aa3ae',
	accent: '#6fb3b8',
};

const require = createRequire(import.meta.url);
const fontFile = (weight: 400 | 700) =>
	readFile(
		require.resolve(`@fontsource/jetbrains-mono/files/jetbrains-mono-latin-${weight}-normal.woff`),
	);
const fonts = Promise.all([fontFile(400), fontFile(700)]).then(([regular, bold]) => [
	{ name: 'JetBrains Mono', data: regular, weight: 400 as const, style: 'normal' as const },
	{ name: 'JetBrains Mono', data: bold, weight: 700 as const, style: 'normal' as const },
]);

type Node = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
	type,
	props: { style: { display: 'flex', ...style }, children },
});

function card(lang: Lang): Node {
	const t = useTranslations(lang);
	const dots = [0, 1, 2].map(() =>
		h('div', { width: 14, height: 14, borderRadius: 7, background: color.dot }),
	);

	const intro = h('div', { flexDirection: 'column', gap: 18, flex: 1 }, [
		h('div', { fontSize: 26, color: color.muted }, [
			h('span', { color: color.accent }, `${profile.handle}@${profile.host}`),
			h('span', {}, ':~$ '),
			h('span', { color: color.heading }, 'whoami'),
		]),
		h(
			'div',
			{ fontSize: 76, fontWeight: 700, color: color.heading, letterSpacing: -2, lineHeight: 1.1 },
			profile.name,
		),
		h('div', { fontSize: 30, color: color.accent }, t('hero.role')),
		h('div', { fontSize: 24, color: color.text, lineHeight: 1.5, maxWidth: 620 }, [
			h('span', { color: color.muted }, '> '),
			h('span', {}, t('hero.tagline')),
		]),
	]);

	const art = h(
		'div',
		{ flexDirection: 'column', fontSize: 15, lineHeight: 1.12, color: color.accent },
		asciiLogo.split('\n').map((line) => h('div', { whiteSpace: 'pre' }, line || ' ')),
	);

	return h(
		'div',
		{
			width: WIDTH,
			height: HEIGHT,
			flexDirection: 'column',
			background: color.bg,
			fontFamily: 'JetBrains Mono',
			padding: 40,
		},
		[
			h(
				'div',
				{
					// Satori doesn't subtract the outer padding, so size the frame explicitly.
					width: WIDTH - 80,
					height: HEIGHT - 80,
					flexDirection: 'column',
					border: `2px solid ${color.border}`,
					borderRadius: 14,
					background: color.sunken,
					overflow: 'hidden',
				},
				[
					h(
						'div',
						{
							alignItems: 'center',
							gap: 10,
							padding: '16px 24px',
							borderBottom: `2px solid ${color.border}`,
							background: '#161a20',
						},
						[...dots, h('div', { marginLeft: 12, fontSize: 20, color: color.muted }, 'dalo.dev')],
					),
					h('div', { flex: 1, alignItems: 'center', gap: 48, padding: '0 56px' }, [intro, art]),
				],
			),
		],
	);
}

export const getStaticPaths = (() =>
	(Object.keys(languages) as Lang[]).map((lang) => ({
		params: { lang },
		props: { lang },
	}))) satisfies GetStaticPaths;

export const GET: APIRoute<InferGetStaticPropsType<typeof getStaticPaths>> = async ({ props }) => {
	const svg = await satori(card(props.lang) as never, {
		width: WIDTH,
		height: HEIGHT,
		fonts: await fonts,
	});
	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
