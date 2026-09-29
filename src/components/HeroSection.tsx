import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ShieldCheck, Sparkles, Activity, Check, ScanLine } from "lucide-react";
import heroVisual from "@/assets/hero-visual.png";
import { heroShowcaseVideoSrc } from "@/config/showcaseVideos";
import { ShowcaseVideo } from "@/components/ShowcaseVideo";
import { EASE } from "@/components/site/primitives";
import { Magnetic } from "@/components/site/Magnetic";

const stats = [
  { value: "10,000+", label: "Records / hour" },
  { value: "99.4%", label: "OCR precision" },
  { value: "HIPAA", label: "Ready architecture" },
];

/* Fields the "AI" appears to extract from the prescription, revealed on a loop. */
const extracted = [
  { k: "Patient", v: "J. Doe · 47" },
  { k: "Medication", v: "Amoxicillin 500mg" },
  { k: "Dosage", v: "1 cap · 3× daily" },
];

export default function HeroSection() {
  return (
    <section className="noise relative overflow-hidden pb-20 pt-36 sm:pt-40 lg:pb-28 lg:pt-44">
      {/* Background system */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-edges opacity-70" />
        <div className="aurora left-[-10%] top-[-6%] h-[34rem] w-[34rem] animate-aurora-drift bg-primary/25" />
        <div className="aurora right-[-8%] top-[8%] h-[30rem] w-[30rem] animate-aurora-drift bg-accent/20 [animation-delay:-6s]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-wide grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="chip mb-7">
            <span className="flex h-1.5 w-1.5 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
            </span>
            The future of healthcare, autonomous
          </div>

          <h1 className="text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[4.1rem]">
            AI agents & automation for{" "}
            <span className="text-gradient">modern healthcare</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Deploy autonomous healthcare agents and agentic workflows alongside OCR, computer
            vision, voice AI, and intelligent document processing — governed, auditable, and built
            to scale.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Magnetic>
              <Link to="/request-tool" className="btn-primary text-base">
                Request Custom Automation
                <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link to="/product" className="btn-secondary text-base">
                <Play size={16} className="fill-current" />
                Explore Platform
              </Link>
            </Magnetic>
          </div>

          {/* Trust indicators */}
          <div className="mt-11 flex items-center gap-8 border-t border-white/[0.07] pt-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: EASE }}
              >
                <div className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product frame — live OCR extraction demo */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <div className="relative mx-auto max-w-xl">
            {/* animated conic glow ring */}
            <div className="absolute -inset-[1.5px] -z-10 overflow-hidden rounded-[1.9rem]">
              <div
                className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 animate-conic-spin opacity-60"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, hsl(217 91% 60% / 0.9) 60deg, transparent 140deg, transparent 220deg, hsl(196 92% 56% / 0.8) 300deg, transparent 360deg)",
                }}
              />
            </div>
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/25 via-transparent to-accent/25 blur-2xl" />

            {/* floating status chips */}
            <motion.div
              className="absolute -left-4 top-10 z-30 hidden items-center gap-2 rounded-2xl border border-white/10 bg-[hsl(var(--card))]/90 px-3.5 py-2.5 shadow-card backdrop-blur sm:flex"
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Activity size={16} />
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">Agent live</div>
                <div className="font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground">
                  processing intake
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-3 bottom-14 z-30 hidden items-center gap-2 rounded-2xl border border-white/10 bg-[hsl(var(--card))]/90 px-3.5 py-2.5 shadow-card backdrop-blur sm:flex"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <ShieldCheck size={16} />
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">HIPAA-ready</div>
                <div className="font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground">
                  encrypted E2E
                </div>
              </div>
            </motion.div>

            <div className="relative overflow-hidden rounded-[1.75rem] bg-[hsl(var(--surface-2))] shadow-card">
              {/* window chrome */}
              <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="ml-3 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                    <Sparkles size={11} className="text-accent" />
                    clawleaf · agent console
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-md border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-accent">
                  <ScanLine size={11} />
                  OCR
                </span>
              </div>

              {/* media + scan overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[hsl(var(--surface-2))]">
                <ShowcaseVideo
                  src={heroShowcaseVideoSrc}
                  poster={heroVisual}
                  preload="auto"
                  playWhenVisible={false}
                  wrapperClassName="absolute inset-0"
                  videoClassName="absolute inset-0 h-full w-full object-cover object-center"
                  aria-label="Healthcare AI agents and document automation preview"
                />

                {/* scanning line */}
                <div className="pointer-events-none absolute inset-0 z-10">
                  <div
                    className="absolute inset-x-0 h-14 animate-scan"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, hsl(196 92% 56% / 0.28), transparent)",
                      boxShadow: "0 0 24px 4px hsl(196 92% 56% / 0.35)",
                    }}
                  />
                </div>

                {/* extracted-field chips */}
                <div className="absolute inset-x-3 bottom-3 z-20 flex flex-col gap-1.5">
                  {extracted.map((f, i) => (
                    <motion.div
                      key={f.k}
                      className="flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-black/55 px-2.5 py-1.5 backdrop-blur-md"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: [0, 1, 1, 0], x: [-12, 0, 0, -12] }}
                      transition={{
                        duration: 3.4,
                        times: [0, 0.15, 0.85, 1],
                        repeat: Infinity,
                        delay: 0.6 + i * 0.55,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/20 text-accent">
                        <Check size={10} />
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/50">
                        {f.k}
                      </span>
                      <span className="text-[0.68rem] font-medium text-white">{f.v}</span>
                    </motion.div>
                  ))}
                </div>

                {/* corner brackets to imply a capture frame */}
                <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-accent/50" />
                <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-accent/50" />
              </div>

              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.05]"
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
