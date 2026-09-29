import { motion } from "framer-motion";

const logos = [
  "HouseCall MD",
  "Platinum Medical Evaluations",
  "Vital Heal",
  "Supportive Care Specialists",
  "OPPMED",
  "EverHeal",
];

const marqueeItems = [...logos, ...logos];

const stats = [
  { value: "40+", label: "Care teams onboarded" },
  { value: "2.4M+", label: "Documents processed" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "24/7", label: "Autonomous operations" },
];

export default function TrustedBySection() {
  return (
    <section className="relative border-y border-white/[0.06] bg-surface/50 py-16 md:py-20">
      <div className="container-wide">
        <motion.p
          className="text-center font-mono text-[0.72rem] font-medium uppercase tracking-[0.3em] text-foreground/50"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by leading healthcare organizations
        </motion.p>
      </div>

      <div className="relative mt-10 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-background to-transparent" />

        <div
          className="flex w-max items-center gap-12 whitespace-nowrap animate-marquee md:gap-16"
          style={{ ["--marquee-duration" as string]: "40s" }}
        >
          {marqueeItems.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none text-2xl font-semibold tracking-tight text-foreground/45 transition-colors duration-300 hover:text-foreground md:text-[2.1rem]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Prominent stat strip */}
      <div className="container-wide mt-14">
        <motion.div
          className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] overflow-hidden rounded-3xl border border-white/[0.07] bg-[hsl(var(--card))]/60 md:grid-cols-4 md:divide-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="group flex flex-col items-center justify-center gap-1.5 px-4 py-8 text-center transition-colors hover:bg-white/[0.02]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="font-display text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
                {s.value}
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
