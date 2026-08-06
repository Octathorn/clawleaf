import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getShowcaseClip, useCaseVideoByTitle } from "@/config/showcaseVideos";
import { ShowcaseVideo } from "@/components/ShowcaseVideo";
import { SectionHeading, fadeUp } from "@/components/site/primitives";
import { SpotlightCard } from "@/components/site/SpotlightCard";

const useCases = [
  { title: "Agentic Operations & Orchestration", desc: "Coordinate billing, prior auth, and scheduling with AI agents that hand off work across systems and teams." },
  { title: "Patient Intake Automation", desc: "Digitize and process patient intake forms automatically, reducing wait times by 80%." },
  { title: "Insurance Claim Processing", desc: "Automate claim submission, verification, and follow-up with AI-powered document analysis." },
  { title: "Lab Result Extraction", desc: "Extract and structure lab results from various formats into standardized data." },
  { title: "Medical Record Summarization", desc: "Generate concise summaries from lengthy medical records for quick clinical review." },
  { title: "Voice Appointment Booking", desc: "AI voice agents handle patient calls, book appointments, and send confirmations." },
  { title: "AI Reception Handling", desc: "24/7 AI-powered reception that manages calls, queries, and patient routing." },
  { title: "Medical Form Automation", desc: "Auto-fill, validate, and process medical forms across departments." },
  { title: "Clinical Documentation", desc: "Assist clinicians with automated note-taking and documentation workflows." },
];

export default function UseCasesSection() {
  return (
    <section className="relative section-padding" id="use-cases">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Use Cases"
          title="Real-world applications, deployed"
          subtitle="Agentic AI and specialized agents for intake, revenue cycle, voice, and documentation — all in one platform."
        />

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {useCases.map((uc) => {
            const clip = useCaseVideoByTitle[uc.title];
            return (
              <motion.div key={uc.title} variants={fadeUp}>
                <SpotlightCard className="flex h-full flex-col p-6">
                  {clip ? (
                    <div className="mb-5 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[hsl(var(--surface-2))]">
                      <ShowcaseVideo
                        {...getShowcaseClip(clip)}
                        playWhenVisible
                        preload="metadata"
                        wrapperClassName="h-full w-full"
                        videoClassName="h-full w-full object-cover"
                        aria-label={`${uc.title} workflow preview`}
                      />
                    </div>
                  ) : null}
                  <h3 className="font-display text-base font-semibold text-foreground">{uc.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{uc.desc}</p>
                  <Link
                    to="/use-cases"
                    className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                  >
                    Learn more
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
