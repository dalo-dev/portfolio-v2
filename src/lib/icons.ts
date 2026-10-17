/**
 * Build-time access to Simple Icons (brand logos). Only the SVG path and colour end up in the
 * HTML; nothing ships to the client.
 */
import * as simpleIcons from 'simple-icons';

export interface Icon {
	title: string;
	path: string;
	/** Brand colour, lightened where needed to stay visible (≥3:1) on the dark surface. */
	color: string;
}

type SimpleIcon = { slug: string; title: string; path: string; hex: string };

const bySlug = new Map(
	(Object.values(simpleIcons) as unknown[])
		.filter((icon): icon is SimpleIcon => typeof icon === 'object' && !!icon && 'slug' in icon)
		.map((icon) => [icon.slug, icon]),
);

const SURFACE = [0x16, 0x1a, 0x20]; // --gray-900, the card background
const MIN_CONTRAST = 3; // WCAG non-text contrast

const channel = (c: number) => {
	const s = c / 255;
	return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]: number[]) =>
	0.2126 * channel(r!) + 0.7152 * channel(g!) + 0.0722 * channel(b!);
const contrast = (a: number[], b: number[]) => {
	const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (hi! + 0.05) / (lo! + 0.05);
};

const HEADING = '#e6e8eb'; // --gray-100

/** Mix the brand colour towards white until it's visible on the surface. */
function visibleOnSurface(hex: string): string {
	const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
	// Black/grey brands (Vercel, Bun, shadcn/ui…) have no hue to keep: light them up instead.
	if (Math.max(...rgb) - Math.min(...rgb) < 24) return HEADING;
	let mixed = rgb;
	for (let t = 0; contrast(mixed, SURFACE) < MIN_CONTRAST && t <= 1; t += 0.05) {
		mixed = rgb.map((c) => Math.round(c + (255 - c) * t));
	}
	return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

export function getIcon(slug: string): Icon {
	const icon = bySlug.get(slug);
	if (!icon) throw new Error(`[icons] unknown Simple Icons slug "${slug}"`);
	return { title: icon.title, path: icon.path, color: visibleOnSurface(icon.hex) };
}
