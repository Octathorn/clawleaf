import { motion } from "framer-motion";
import {
  FileText, Brain, Eye, CalendarCheck, Mic, ClipboardList, BookOpen, Shield, Bot, ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/site/primitives";

const features = [
  { icon: Bot, title: "Healthcare AI Agents", desc: "Agentic AI that plans, reasons, and executes multi-step clinical and administrative tasks with human oversight hooks.", to: "/product", g: ["hsl(224 84% 32%)", "hsl(199 90% 34%)"] },
  { icon: FileText, title: "Medical OCR & Documents", desc: "Extract structured data from handwritten prescriptions, lab reports, and medical forms with 99.4% accuracy.", to: "/product", g: ["hsl(214 92% 32%)", "hsl(224 84% 24%)"] },
  { icon: Brain, title: "AI Document Summarization", desc: "Automatically summarize lengthy clinical notes, discharge summaries, and patient records.", to: "/product", g: ["hsl(199 90% 32%)", "hsl(214 92% 26%)"] },
  { icon: Eye, title: "Computer Vision for Imaging", desc: "Analyze X-rays, scans, and medical images with enterprise-grade computer vision models.", to: "/product", g: ["hsl(210 90% 32%)", "hsl(196 92% 30%)"] },
  { icon: CalendarCheck, title: "Automated Appointment Booking", desc: "AI-powered scheduling that integrates with your existing hospital management systems.", to: "/use-cases", g: ["hsl(224 84% 30%)", "hsl(200 90% 30%)"] },
  { icon: Mic, title: "Voice AI Reception", desc: "Handle patient calls with natural voice AI that books appointments and answers queries.", to: "/use-cases", g: ["hsl(196 92% 32%)", "hsl(214 92% 24%)"] },
  { icon: ClipboardList, title: "Smart Form Processing", desc: "Automatically process insurance forms, intake documents, and claim submissions.", to: "/use-cases", g: ["hsl(214 92% 30%)", "hsl(224 84% 22%)"] },
  { icon: BookOpen, title: "Large Document Analysis", desc: "Process multi-page medical documents, research papers, and policy documents at scale.", to: "/product", g: ["hsl(210 90% 30%)", "hsl(199 90% 30%)"] },
  { icon: Shield, title: "Secure Data Processing", desc: "End-to-end encrypted processing with HIPAA-ready architecture and role-based access control.", to: "/security", g: ["hsl(224 84% 26%)", "hsl(200 90% 28%)"] },
];

export default function FeaturesSection() {
  return (
    <section className="relative section-padding" id="features">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40 mask-fade-b" />
      <div className="container-wide">
        <SectionHeading
          eyebrow="Platform Capabilities"
          title="One platform. Every healthcare workflow."
          subtitle="Purpose-built AI and autonomous agents for healthcare — hover any capability to explore it."
        />

        <motion.div
          className="mt-16 overflow-hidden rounded-3xl border border-white/[0.08]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Link
                key={f.title}
                to={f.to}
                className="group relative flex min-h-[15.5rem] flex-col overflow-hidden border-b border-r border-white/[0.06] p-8 transition-colors duration-500 [&:nth-child(2n)]:sm:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                {/* hover reveal background */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(150deg, ${f.g[0]}, ${f.g[1]})` }}
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-0 transition-opacity duration-500 group-hover:opacity-[0.14]" aria-hidden />
                <f.icon
                  className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-32 text-white/0 transition-colors duration-500 group-hover:text-white/10"
                  strokeWidth={1.25}
                  aria-hidden
                />

                {/* content */}
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-primary transition-colors duration-500 group-hover:text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-primary transition-all duration-500 group-hover:border-white/25 group-hover:bg-white/10 group-hover:text-white">
                      <f.icon className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="mt-auto font-display text-xl font-semibold text-foreground transition-colors duration-500 group-hover:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/85">
                    {f.desc}
                  </p>

                  <span className="mt-4 inline-flex translate-y-1 items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-white/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white group-hover:opacity-100">
                    View capability <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
