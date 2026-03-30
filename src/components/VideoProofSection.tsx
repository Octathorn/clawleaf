import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

const videoUrl = "https://d2j2uxe7jasn0r.cloudfront.net/watermarks/video/BgrICs-NZj4hksnn3/videoblocks-male-pediatrician-checking-bone-x-ray-on-tablet-in-clinic-healthcare-practitioner-physician-specialist-in-medicine-providing-health-care-service-radiographic-treatment-examination-in-cabinet-hospital_rzwhgnfsv__ccb9aae47e500c9255cd7df0632f8d89__P360.mp4";

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
    <section className="section-padding bg-secondary/50">
      <div className="container-narrow space-y-6">
        <motion.div
          className="rounded-3xl border border-border bg-card p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm md:text-[1.35rem] md:leading-none md:tracking-tight">
            <span className="font-semibold tracking-wide text-foreground/85 md:text-sm">FROM</span>
            <span className="font-semibold text-primary">Manual Operations</span>
            <span className="text-foreground/70 md:text-2xl">→</span>
            <span className="font-semibold tracking-wide text-foreground/85 md:text-sm">TO</span>
            <span className="font-semibold text-primary">AI-Accelerated Teams</span>
            <span className="font-medium text-muted-foreground">AI-Enabled Ops</span>
            <span className="font-medium text-muted-foreground">Fully AI-Native</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {outcomes.map((item, index) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-border bg-secondary px-6 py-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index }}
              >
                <p className="text-2xl font-semibold tracking-tight text-foreground">{item.title}</p>
                <p className="mt-1 text-5xl font-bold tracking-tighter text-foreground">{item.value}</p>
                <p className="mt-5 text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border shadow-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative min-h-[320px] md:min-h-[460px]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Customer case study video"
            />

            <div className="absolute inset-y-0 right-0 flex w-full flex-col justify-between bg-gradient-to-l from-black/80 via-black/65 to-transparent p-6 text-white md:w-[43%] md:p-10">
              <div className="text-4xl font-semibold tracking-tight">Clawleaf</div>

              <div className="space-y-7">
                <p className="text-2xl leading-[1.35] text-white/95 md:text-[2.05rem]">
                  "We are now available to our customers 24/7, with a reduced response-time and communicate in any
                  language they speak"
                </p>

                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-semibold text-black shadow-card transition hover:bg-white/90"
                >
                  Watch full video
                  <PlayCircle size={18} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}