/**
 * ASCII logo: decodes from noise into the final art, then glitches a few rows every few
 * seconds. Plain DOM + timers (no GSAP) so it starts before the animation bundle loads.
 * The <pre> exposes its name via aria-label, so rewriting its text is invisible to AT.
 */
const RAMP = '.:-=+*#%@';
const FRAME_MS = 1000 / 30;
const DECODE_MS = 1400;

const randomChar = () => RAMP[Math.floor(Math.random() * RAMP.length)]!;
const isInk = (ch: string) => ch !== ' ' && ch !== '\n';

export function initAscii(root: ParentNode): () => void {
	const el = root.querySelector<HTMLElement>('[data-ascii-animate]');
	if (!el) return () => {};

	const art = el.textContent ?? '';
	const chars = [...art];
	const rows = art.split('\n').length;
	let row = 0;
	// Reveal top-to-bottom with noise, like a terminal finishing its output.
	const revealAt = chars.map((ch) => {
		if (ch === '\n') row++;
		return isInk(ch) ? ((row / rows) * 0.55 + Math.random() * 0.45) * DECODE_MS : 0;
	});

	let frame = 0;
	let timer = 0;
	let visible = true;
	let stopped = false;

	const render = (text: string) => {
		el.textContent = text;
	};

	const decode = (start: number) => {
		const step = (now: number) => {
			if (stopped) return;
			const t = now - start;
			render(chars.map((ch, i) => (isInk(ch) && t < revealAt[i]! ? randomChar() : ch)).join(''));
			if (t < DECODE_MS) {
				frame = window.setTimeout(() => requestAnimationFrame(step), FRAME_MS);
			} else {
				render(art);
				scheduleGlitch();
			}
		};
		requestAnimationFrame(step);
	};

	const glitch = () => {
		if (stopped || !visible || document.hidden) return scheduleGlitch();
		const lines = art.split('\n');
		const from = Math.floor(Math.random() * lines.length);
		const band = 1 + Math.floor(Math.random() * 2);
		const shift = Math.random() < 0.5 ? -1 : 1;
		const glitched = lines.map((line, i) => {
			if (i < from || i >= from + band) return line;
			const shifted = shift > 0 ? ` ${line}` : line.slice(1);
			return [...shifted]
				.map((ch) => (isInk(ch) && Math.random() < 0.35 ? randomChar() : ch))
				.join('');
		});
		render(glitched.join('\n'));
		timer = window.setTimeout(() => {
			render(art);
			scheduleGlitch();
		}, 140);
	};

	const scheduleGlitch = () => {
		if (stopped) return;
		timer = window.setTimeout(glitch, 2500 + Math.random() * 3000);
	};

	const observer = new IntersectionObserver(([entry]) => {
		visible = !!entry?.isIntersecting;
	});
	observer.observe(el);

	el.classList.add('is-ready');
	decode(performance.now());

	return () => {
		stopped = true;
		clearTimeout(frame);
		clearTimeout(timer);
		observer.disconnect();
		render(art);
	};
}
