import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading, fadeUp } from "@/components/site/primitives";

const testimonials = [
  {
    quote:
      "Clawleaf reduced our patient intake processing time by 85%. The OCR accuracy on handwritten forms is remarkable.",
    name: "Dr. Sarah Mitchell",
    position: "Chief Medical Officer",
    org: "HouseCall MD",
  },
  {
    quote:
      "The Voice AI reception handling has transformed our front desk operations. We now handle 3x more patient calls without additional staff.",
    name: "James Rodriguez",
    position: "Director of Operations",
    org: "Platinum Medical Evaluations",
  },
  {
    quote:
      "Enterprise-grade security was non-negotiable for us. Clawleaf's HIPAA-ready architecture gave our compliance team full confidence.",
    name: "Dr. Linda Chen",
    position: "VP of Clinical Technology",
    org: "Vital Heal",
  },
];

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function TestimonialsSection() {
  return (
    <section className="relative section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by healthcare leaders"
          subtitle="Teams across hospitals, clinics, and care networks rely on Clawleaf to run safely at scale."
        />

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-[hsl(var(--card))] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:shadow-glow"
            >
              <Quote className="h-8 w-8 text-primary/25" />
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/85">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.06] pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-sm font-semibold text-white">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.position} · <span className="text-primary">{t.org}</span>
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
