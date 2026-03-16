import { motion } from "framer-motion";

const logos = [
  "HousecallMD",
  "Teladoc Health",
  "One Medical",
  "Oak Street Health",
  "CVS Health",
];

const marqueeItems = [...logos, ...logos];

export default function TrustedBySection() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.p
          className="text-sm font-semibold text-muted-foreground text-center mb-8 uppercase tracking-[0.22em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by leading healthcare organizations
        </motion.p>
      </div>

      <div className="relative w-full overflow-hidden py-2 md:py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/70 to-transparent" />

        <motion.div
          className="flex w-max items-center gap-12 whitespace-nowrap px-2 md:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {marqueeItems.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="cursor-default select-none text-3xl font-semibold tracking-tight text-muted-foreground/35 transition-colors duration-300 hover:text-muted-foreground/55 md:text-6xl"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
