/**
 * Scroll reveals for `[data-reveal]` sections: the prompt command types itself, then the
 * heading and `[data-reveal-item]` blocks fade up. Only `opacity`/`transform` are animated, so
 * hidden content stays in the tab order; focusing into a section reveals it immediately.
 */
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const START = 'top 85%';

export function initReveal(root: ParentNode): () => void {
	const sections = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
	const typed = new Map<HTMLElement, string>();
	const listeners: Array<() => void> = [];

	const ctx = gsap.context(() => {
		for (const section of sections) {
			// Already on screen (e.g. deep link or reload mid-page): leave it alone.
			if (section.getBoundingClientRect().top < window.innerHeight * 0.85) continue;

			const cmd = section.querySelector<HTMLElement>('[data-prompt-cmd]');
			const items = section.querySelectorAll<HTMLElement>('[data-reveal-item]');
			const blocks = [
				...section.querySelectorAll<HTMLElement>(
					':scope > :not(.prompt):not(:has([data-reveal-item]))',
				),
			];
			const targets = [...blocks, ...items];
			const scramble = section.querySelectorAll<HTMLElement>('[data-scramble]');

			gsap.set(targets, { opacity: 0, y: 14 });
			const tl = gsap.timeline({ paused: true });

			if (cmd) {
				const full = cmd.textContent ?? '';
				typed.set(cmd, full);
				cmd.textContent = '';
				const progress = { n: 0 };
				tl.to(progress, {
					n: full.length,
					duration: Math.min(0.6, full.length * 0.035),
					ease: 'none',
					onUpdate: () => {
						cmd.textContent = full.slice(0, Math.round(progress.n));
					},
				});
			}

			tl.to(
				targets,
				{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06, clearProps: 'all' },
				'-=0.1',
			);

			if (scramble.length) {
				tl.to(
					scramble,
					{
						duration: 0.8,
						scrambleText: { text: '{original}', chars: 'lowerCase', speed: 0.6 },
					},
					'<',
				);
			}

			const play = () => tl.play();
			ScrollTrigger.create({ trigger: section, start: START, once: true, onEnter: play });
			section.addEventListener('focusin', play, { once: true });
			listeners.push(() => section.removeEventListener('focusin', play));
		}
	});

	return () => {
		listeners.forEach((off) => off());
		ctx.revert();
		typed.forEach((text, el) => {
			el.textContent = text;
		});
	};
}
