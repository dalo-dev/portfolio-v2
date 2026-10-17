declare global {
	interface Window {
		/** Defined by MotionHead.astro; recomputes the motion classes on <html>. */
		__applyMotion?: () => boolean;
	}
}

const STORAGE_KEY = 'motion';

export const motionEnabled = () => document.documentElement.classList.contains('motion-on');

export const reducedMotion = () => document.documentElement.classList.contains('motion-reduced');

export const isBooting = () => document.documentElement.classList.contains('booting');

export function isPaused(): boolean {
	try {
		return localStorage.getItem(STORAGE_KEY) === 'off';
	} catch {
		return false;
	}
}

export function setPaused(paused: boolean) {
	try {
		if (paused) localStorage.setItem(STORAGE_KEY, 'off');
		else localStorage.removeItem(STORAGE_KEY);
	} catch {
		// Storage unavailable: the choice still applies to this page view.
		document.documentElement.classList.toggle('motion-on', !paused);
		document.documentElement.classList.toggle('motion-off', paused);
	}
	window.__applyMotion?.();
	document.dispatchEvent(new Event('motion:change'));
}
