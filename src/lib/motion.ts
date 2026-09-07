import type { Variants } from 'framer-motion';

/**
 * Sdílený jazyk pohybu pro celý web.
 * Vše ostatní (entrance + scroll) staví na těchto pár primitivech,
 * aby web působil jako jeden konzistentní systém.
 */

// Klidné, „drahé" easing – rychlý rozjezd, měkké dojetí.
export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
export const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Jednotné nastavení viewportu pro whileInView – spustí se jednou,
// kousek předtím, než prvek úplně vjede do obrazu.
export const viewport = { once: true, margin: '-80px' } as const;

const DIST = 28;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DIST },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -DIST },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const fromLeft: Variants = {
  hidden: { opacity: 0, x: -DIST },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fromRight: Variants = {
  hidden: { opacity: 0, x: DIST },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: DIST, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE },
  },
};

export const variantMap = {
  fadeUp,
  fadeDown,
  fade,
  fromLeft,
  fromRight,
  scaleIn,
  blurUp,
} as const;

export type VariantName = keyof typeof variantMap;

/** Rodič pro postupné (stagger) odkrývání dětí. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});
