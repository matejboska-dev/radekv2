import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

type ParallaxOpts = {
  /** O kolik px se prvek posune napříč celým průchodem obrazem. Kladné = pomaleji dolů. */
  y?: number;
  /** Volitelné měřítko na konci (např. 1.12 pro pomalý zoom). */
  scale?: number;
  /** Přizpůsobení start/end pro ScrollTrigger. */
  start?: string;
  end?: string;
};

/**
 * GSAP ScrollTrigger parallax. Vrátí ref, který připneš na vrstvu.
 * `scrub` napojí pohyb 1:1 na scroll (a přes Lenis je plynulý).
 */
export const useParallax = <T extends HTMLElement = HTMLDivElement>({
  y = 80,
  scale,
  start = 'top bottom',
  end = 'bottom top',
}: ParallaxOpts = {}) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0, ...(scale ? { scale: 1 } : {}) },
        {
          yPercent: (y / el.offsetHeight) * 100 || 0,
          ...(scale ? { scale } : {}),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, scale, start, end]);

  return ref;
};

/**
 * Pinovaný / scrub „reveal" pro jeden prvek řízený scrollem
 * (na rozdíl od Framer whileInView, které jede vlastní časování).
 * Použité tam, kde chceme, aby animace kopírovala rychlost scrollu.
 */
export const useScrubReveal = <T extends HTMLElement = HTMLDivElement>(
  vars: gsap.TweenVars = { y: 60, opacity: 0 },
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...vars,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};
