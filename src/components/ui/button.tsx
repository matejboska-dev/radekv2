import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-0.5",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-secondary underline-offset-4 hover:underline hover:text-secondary/80",
        hero: "bg-secondary text-secondary-foreground text-base md:text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-secondary/80 active:translate-y-0",
        heroOutline: "border-2 border-foreground/80 bg-transparent text-foreground hover:bg-foreground/10 hover:border-foreground text-base md:text-lg font-semibold backdrop-blur-sm",
        cta: "bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-secondary/80 font-bold",
        ctaGradient: "bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 font-bold hover:bg-secondary/80",
        floating: "bg-secondary text-secondary-foreground shadow-2xl hover:shadow-3xl rounded-full font-bold",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        floating: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
