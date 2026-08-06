import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { TextReveal } from "./TextReveal";

/* Shared easing + reveal variants for a consistent motion language across the site. */
export const EASE = [0.2, 0.8, 0.2, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/** Single element that fades + rises into view once. */
export function Reveal({ children, className, delay = 0, y = 22, as = "div" }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Container that staggers its direct <motion> children (use with `fadeUp` item variants). */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className = "" }: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"} ${className}`}>
      <motion.span
        className={`eyebrow eyebrow-dot ${align === "center" ? "justify-center" : ""}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {eyebrow}
      </motion.span>
      <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {typeof title === "string" ? <TextReveal text={title} /> : title}
      </h2>
      {subtitle ? (
        <motion.p
          className={`mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground ${align === "center" ? "mx-auto" : ""}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
