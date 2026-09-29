import { motion } from "framer-motion";
import { PlayCircle, ArrowRight } from "lucide-react";
import heroVisual from "@/assets/hero-visual.png";
import { videoProofShowcaseSrc } from "@/config/showcaseVideos";
import { ShowcaseVideo } from "@/components/ShowcaseVideo";
import { Reveal, fadeUp } from "@/components/site/primitives";

const videoUrl = videoProofShowcaseSrc;

const outcomes = [
  {
    title: "Operating Margin",
    value: "+13.1%",
    description:
      "Same revenue requires fewer resources to deliver. This margin improvement funds further transformation investment.",
  },
  {
    title: "Operational Capacity",
    value: "+17.2%",
    description:
      "Your existing team absorbs 40% more volume. Growth opportunities no longer require 6-month hiring cycles to execute.",
  },
];

export default function VideoProofSection() {
  return (
    <section className="relative section-padding bg-surface/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-wide">
        <Reveal className="mb-12 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">From</span>
          <span className="font-display text-xl font-semibold text-foreground/60 line-through decoration-white/20">
            Manual Operations
          </span>
          <ArrowRight size={18} className="text-primary" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">To</span>
          <span className="text-gradient font-display text-xl font-semibold">AI-Accelerated Teams</span>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* metrics */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {outcomes.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex flex-col rounded-3xl border border-white/[0.07] bg-[hsl(var(--card))] p-7 shadow-card"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.title}
                </p>
                <p className="mt-3 font-display text-5xl font-semibold tracking-tight text-gradient">
                  {item.value}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* video */}
          <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-white/[0.07] shadow-card">
            <div className="relative min-h-[340px] lg:h-full lg:min-h-[420px]">
              <ShowcaseVideo
                src={videoUrl}
                poster={heroVisual}
                preload="auto"
                playWhenVisible={false}
                wrapperClassName="absolute inset-0"
                videoClassName="absolute inset-0 h-full w-full object-cover"
                aria-label="Automated appointment booking and patient scheduling preview"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/45 to-transparent p-7 md:p-9">
                <p className="max-w-md text-xl font-medium leading-snug text-white md:text-2xl">
                  "We're now available to our patients 24/7 — with faster response times, in any
                  language they speak."
                </p>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  <PlayCircle size={17} />
                  Watch full video
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
