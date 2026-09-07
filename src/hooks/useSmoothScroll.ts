import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * Globální plynulé scrollování (Lenis) napojené na GSAP ScrollTrigger.
 * Mountuje se jednou v <App>. Vrací instanci Lenis přes window pro
 * programové skrolování (kotvy, „zpět nahoru").
 *
 * Při `prefers-reduced-motion` se plynulé scrollování vypne úplně.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Sdílená instance pro kotvy a tlačítko „nahoru".
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Po načtení fontů / obrázků přepočítat pozice triggerů.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      gsap.ticker.remove(onRaf);
      window.removeEventListener('load', refresh);
      window.clearTimeout(t);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
};

/** Plynulé skrolování na cíl (element nebo číslo), s ohledem na fixní header. */
export const smoothScrollTo = (target: HTMLElement | number, offset = -90) => {
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};
