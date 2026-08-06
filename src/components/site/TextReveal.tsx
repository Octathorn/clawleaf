import { motion, type Variants } from "framer-motion";

const EASE = [0.2, 0.8, 0.2, 1] as const;

type TextRevealProps = {
  text: string;
  className?: string;
  /** delay before the first word (s) */
  delay?: number;
  stagger?: number;
};

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
};

/**
 * Splits `text` into words and reveals each with a masked upward rise on scroll —
 * the signature heading motion of the reference site.
 */
export function TextReveal({ text, className = "", delay = 0, stagger = 0.045 }: TextRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      style={{ display: "inline" }}
      variants={container(delay, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.08em" }}
        >
          <motion.span variants={word} style={{ display: "inline-block", willChange: "transform" }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
