import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * Počítadlo, které se rozjede, jakmile vjede do obrazu.
 * Řízené GSAP + ScrollTrigger (konzistentní s ostatními scroll animacemi).
 * Výchozí hodnota = cíl, aby uživatel nikdy neviděl trvalou „0".
 */
export const useAnimatedCounter = (target: number, duration = 1.4) => {
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      setCount(target);
      return;
    }

    const obj = { value: 0 };
    setCount(0);

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => setCount(Math.round(obj.value)),
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [target, duration]);

  return { count, ref };
};
