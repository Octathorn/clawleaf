import { motion } from "framer-motion";
import { FileText, Mic, Brain, Eye, Zap, Bot, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, EASE } from "@/components/site/primitives";

const modules = [
  { icon: Bot, label: "AI Agents" },
  { icon: FileText, label: "OCR" },
  { icon: Mic, label: "Voice AI" },
  { icon: Brain, label: "Document AI" },
  { icon: Eye, label: "Vision" },
  { icon: Zap, label: "Automation" },
];

const bullets = [
  "Composable stack — combine agents, OCR, voice, and vision as one system",
  "Purpose-built for your clinical and administrative operations",
  "Human-in-the-loop controls with full audit trails",
];

export default function CustomAISection() {
  return (
    <section className="relative section-padding bg-surface/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-wide">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow eyebrow-dot">Agentic AI & Custom Tools</span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Custom agents & AI, tuned to your <span className="text-gradient">workflows</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Request agentic workflows and purpose-built healthcare agents tailored to your
              operations. Our modular stack lets you assemble exactly what you need.
            </p>

            <ul className="mt-8 space-y-3.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[0.95rem] text-foreground/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check size={13} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <Link to="/request-tool" className="btn-primary mt-9 text-base">
              Request Custom Automation
              <ArrowRight size={18} />
            </Link>
          </Reveal>

          {/* Orbit visual */}
          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
              {/* glow */}
              <div className="absolute h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
              {/* rings */}
              <div className="absolute h-[68%] w-[68%] rounded-full border border-dashed border-white/10 animate-spin-slow" />
              <div className="absolute h-[92%] w-[92%] rounded-full border border-white/[0.06]" />
              <div
                className="absolute h-[92%] w-[92%] rounded-full border border-transparent animate-spin-slow [animation-duration:40s]"
                style={{ borderTopColor: "hsl(var(--accent) / 0.35)", borderRightColor: "hsl(var(--primary) / 0.25)" }}
              />

              {/* core */}
              <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-3xl border border-white/15 bg-[hsl(var(--card))] text-center shadow-glow">
                <Bot className="mb-1.5 h-7 w-7 text-primary" />
                <span className="font-display text-sm font-semibold leading-tight text-foreground">
                  Clawleaf
                  <br />
                  Agent Core
                </span>
              </div>

              {/* orbiting modules */}
              {modules.map((mod, i) => {
                const angle = ((360 / modules.length) * i - 90) * (Math.PI / 180);
                const radius = 44; // % of container
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={mod.label}
                    className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-[hsl(var(--card))]/95 shadow-card backdrop-blur"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 120, damping: 16 }}
                  >
                    <mod.icon className="h-5 w-5 text-primary" />
                    <span className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                      {mod.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
