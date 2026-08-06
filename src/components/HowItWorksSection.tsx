import { motion } from "framer-motion";
import { Upload, Cpu, Search, Zap, BarChart3 } from "lucide-react";
import { SectionHeading, EASE } from "@/components/site/primitives";

const steps = [
  { icon: Upload, title: "Upload or Connect", desc: "Connect your medical data sources — EMR, documents, imaging systems." },
  { icon: Cpu, title: "AI & Agents Process Data", desc: "Models and specialized agents process documents, images, and voice data in parallel." },
  { icon: Search, title: "Extract & Understand", desc: "Structured medical information is extracted with clinical-grade accuracy." },
  { icon: Zap, title: "Agentic Automation", desc: "AI agents complete multi-step workflows — billing, scheduling, records, and follow-ups." },
  { icon: BarChart3, title: "Deliver Insights", desc: "Receive structured data, analytics, and actionable clinical insights." },
];

export default function HowItWorksSection() {
  return (
    <section className="relative section-padding bg-surface/40" id="how-it-works">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-wide">
        <SectionHeading
          eyebrow="How It Works"
          title="From data to action in minutes"
          subtitle="A streamlined agentic pipeline that turns raw medical data into structured, governed actions your teams can trust."
        />

        <div className="relative mt-20">
          {/* connecting rail */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/[0.08] lg:left-0 lg:right-0 lg:top-9 lg:h-px lg:w-full" />
          <motion.div
            className="absolute left-8 top-0 w-px origin-top bg-gradient-to-b from-primary via-accent to-transparent lg:left-0 lg:top-9 lg:h-px lg:w-full lg:origin-left lg:bg-gradient-to-r"
            initial={{ scaleY: 0, scaleX: 0 }}
            whileInView={{ scaleY: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
            style={{ bottom: 0 }}
          />

          <div className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative flex items-start gap-5 pl-0 lg:block lg:pl-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
              >
                <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[hsl(var(--card))] shadow-card">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5" />
                  <step.icon className="relative h-7 w-7 text-primary" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-mono text-[0.7rem] font-semibold text-white shadow-glow">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-1 lg:mt-6 lg:pt-0">
                  <h3 className="font-display text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground lg:pr-3">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
