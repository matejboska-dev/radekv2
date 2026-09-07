import { forwardRef } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { variantMap, stagger, viewport, type VariantName } from '@/lib/motion';

type RevealProps = HTMLMotionProps<'div'> & {
  /** Který pohyb použít. Výchozí: fadeUp. */
  variant?: VariantName;
  /** Zpoždění startu v sekundách. */
  delay?: number;
  /** HTML tag, který se vyrenderuje. */
  as?: 'div' | 'section' | 'article' | 'ul' | 'li' | 'span' | 'header' | 'figure' | 'a' | 'p' | 'h2';
  /** Když true, prvek slouží jen jako stagger rodič pro <Reveal> děti. */
  group?: boolean;
  /** Rozestup mezi dětmi (pro group). */
  staggerChildren?: number;
};

/**
 * Univerzální „odkrývací" wrapper postavený na Framer Motion whileInView.
 * Respektuje `prefers-reduced-motion` – pak jen prostě zobrazí obsah.
 *
 * Použití:
 *   <Reveal>...</Reveal>
 *   <Reveal variant="fromLeft" delay={0.1}>...</Reveal>
 *   <Reveal group staggerChildren={0.1}>
 *     <Reveal>a</Reveal><Reveal>b</Reveal>
 *   </Reveal>
 */
export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  (
    {
      variant = 'fadeUp',
      delay = 0,
      as = 'div',
      group = false,
      staggerChildren = 0.09,
      transition,
      children,
      ...rest
    },
    ref,
  ) => {
    const reduce = useReducedMotion();
    const MotionTag = motion[as] as typeof motion.div;

    if (reduce) {
      return (
        <MotionTag ref={ref} {...rest}>
          {children}
        </MotionTag>
      );
    }

    const variants = group ? stagger(staggerChildren, delay) : variantMap[variant];

    return (
      <MotionTag
        ref={ref}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={delay && !group ? { delay } : transition}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  },
);

Reveal.displayName = 'Reveal';

/** Dítě uvnitř <Reveal group>. Dědí stagger časování od rodiče. */
export const RevealItem = forwardRef<HTMLDivElement, RevealProps>(
  ({ variant = 'fadeUp', as = 'div', children, ...rest }, ref) => {
    const reduce = useReducedMotion();
    const MotionTag = motion[as] as typeof motion.div;

    if (reduce) {
      return (
        <MotionTag ref={ref} {...rest}>
          {children}
        </MotionTag>
      );
    }

    return (
      <MotionTag ref={ref} variants={variantMap[variant]} {...rest}>
        {children}
      </MotionTag>
    );
  },
);

RevealItem.displayName = 'RevealItem';
