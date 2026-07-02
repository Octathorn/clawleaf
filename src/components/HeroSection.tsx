import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroVisual from "@/assets/hero-visual.png";
import { heroShowcaseVideoSrc } from "@/config/showcaseVideos";
import { ShowcaseVideo } from "@/components/ShowcaseVideo";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90svh] hero-gradient flex items-center overflow-hidden pb-16 md:pb-20">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container-narrow relative z-10 grid lg:grid-cols-12 gap-12 items-center pt-24">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-xs font-medium text-accent">The Future of Healthcare, Autonomous</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-6" style={{ color: "hsl(0 0% 100%)" }}>
            AI agents & automation for{" "}
            <span className="text-gradient">modern healthcare</span>
          </h1>

          <p className="text-lg md:text-xl max-w-[55ch] mb-10 leading-relaxed" style={{ color: "hsl(210 40% 75%)" }}>
            Deploy autonomous healthcare agents and agentic workflows alongside OCR, computer vision, voice AI, and intelligent document processing.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/request-tool"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base shadow-glow hover:opacity-90 animate-settle"
            >
              Request Custom Automation
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/product"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base border animate-settle hover:bg-secondary/10"
              style={{ color: "hsl(210 40% 85%)", borderColor: "hsl(210 40% 85% / 0.2)" }}
            >
              Explore Platform
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8" style={{ borderTop: "1px solid hsl(210 40% 85% / 0.1)" }}>
            {[
              { value: "10,000+", label: "Records/hr" },
              { value: "99.4%", label: "OCR Precision" },
              { value: "HIPAA", label: "Ready Architecture" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold" style={{ color: "hsl(0 0% 100%)" }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "hsl(210 40% 60%)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5 hidden lg:block"
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* Media frame: no continuous float (avoids jitter); soft edge blend into hero */}
          <div className="relative mx-auto max-w-lg">
            <div className="relative overflow-hidden rounded-3xl bg-[hsl(222_47%_9%/0.95)] shadow-[0_24px_70px_-18px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.09] md:rounded-[1.6rem]">
              <ShowcaseVideo
                src={heroShowcaseVideoSrc}
                poster={heroVisual}
                preload="auto"
                playWhenVisible={false}
                wrapperClassName="relative aspect-[4/3] w-full"
                videoClassName="absolute inset-0 h-full w-full object-contain object-center"
                aria-label="Healthcare AI agents and document automation preview"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.06]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-80"
                style={{
                  background: "linear-gradient(180deg, hsl(0 0% 100% / 0.06) 0%, transparent 42%)",
                }}
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
