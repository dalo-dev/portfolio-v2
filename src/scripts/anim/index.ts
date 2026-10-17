/**
 * Animation entry point. Bundled once; (re)initializes on every page load, including
 * client-router navigations, and cleans up before each swap.
 */
import { initAscii } from './ascii';
import { isBooting, isPaused, motionEnabled, reducedMotion, setPaused } from './state';

let cleanups: Array<() => void> = [];
let generation = 0;

function stop() {
	generation++;
	cleanups.forEach((cleanup) => cleanup());
	cleanups = [];
}

function wireToggle() {
	const button = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
	if (!button) return;
	// Nothing to pause when the OS already asks for reduced motion.
	button.hidden = reducedMotion();
	button.setAttribute('aria-pressed', String(isPaused()));
	button.onclick = () => setPaused(!isPaused());
}

async function start() {
	stop();
	wireToggle();
	if (!motionEnabled()) return;

	const current = generation;
	const runAscii = () => {
		if (current === generation) cleanups.push(initAscii(document));
	};
	if (isBooting()) {
		const onDone = () => runAscii();
		document.addEventListener('boot:done', onDone, { once: true });
		cleanups.push(() => document.removeEventListener('boot:done', onDone));
	} else {
		runAscii();
	}

	if (!document.querySelector('[data-reveal]')) return;
	const { initReveal } = await import('./reveal');
	const cleanup = initReveal(document);
	// A navigation may have happened while GSAP was loading.
	if (current === generation) cleanups.push(cleanup);
	else cleanup();
}

document.addEventListener('astro:page-load', start);
document.addEventListener('astro:before-swap', stop);
document.addEventListener('motion:change', start);
