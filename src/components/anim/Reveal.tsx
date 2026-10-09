import { forwardRef } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { variantMap, stagger, type VariantName } from '@/lib/motion';

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

// Čistý viewport bez horizontálního ořezu (-80px zleva i zprava na 360px mobilu zabíjelo detekci).
const motionViewport = {
  once: true,
  margin: '0px 0px -20px 0px',
  amount: 0.05,
} as const;

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
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const reduce = useReducedMotion();
    const MotionTag = motion[as] as typeof motion.div;

    const variants = group ? stagger(staggerChildren, delay) : variantMap[variant];

    return (
      <MotionTag
        ref={ref}
        variants={variants}
        initial={reduce ? 'show' : 'hidden'}
        whileInView="show"
        viewport={motionViewport}
        transition={delay && !group ? { delay } : transition}
        className={className}
        style={style}
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
  ({ variant = 'fadeUp', as = 'div', children, className, style, ...rest }, ref) => {
    const MotionTag = motion[as] as typeof motion.div;

    return (
      <MotionTag
        ref={ref}
        variants={variantMap[variant]}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  },
);

RevealItem.displayName = 'RevealItem';
