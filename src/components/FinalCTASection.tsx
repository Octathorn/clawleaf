import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Reveal } from "@/components/site/primitives";

export default function FinalCTASection() {
  return (
    <section className="relative section-padding">
      <div className="container-wide">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[hsl(var(--surface-2))] px-6 py-16 text-center sm:px-12 sm:py-20 md:py-24">
          {/* backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid opacity-40 mask-fade-edges" />
            <div className="aurora left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 bg-primary/25" />
            <div className="aurora bottom-[-20%] left-1/4 h-64 w-96 bg-accent/20" />
          </div>

          <span className="eyebrow eyebrow-dot justify-center">Get Started</span>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Transform operations with <span className="text-gradient">healthcare AI agents</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Join organizations using Clawleaf's agentic AI platform to automate complex clinical and
            administrative work — safely, and at scale.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <Link to="/contact" className="btn-primary text-base">
              <Calendar size={17} />
              Schedule a Demo
            </Link>
            <Link to="/contact" className="btn-secondary text-base">
              Contact Sales
              <ArrowRight size={16} />
            </Link>
          </div>

          <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70">
            HIPAA-ready · SOC 2 · Deployed in weeks, not quarters
          </p>
        </Reveal>
      </div>
    </section>
  );
}
