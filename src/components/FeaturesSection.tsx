import { motion } from "framer-motion";
import {
  FileText, Brain, Eye, CalendarCheck, Mic, ClipboardList, BookOpen, Shield
} from "lucide-react";

const features = [
  { icon: FileText, title: "Medical OCR & Document Processing", desc: "Extract structured data from handwritten prescriptions, lab reports, and medical forms with 99.4% accuracy." },
  { icon: Brain, title: "AI Document Summarization", desc: "Automatically summarize lengthy clinical notes, discharge summaries, and patient records." },
  { icon: Eye, title: "Computer Vision for Medical Imaging", desc: "Analyze X-rays, scans, and medical images with enterprise-grade computer vision models." },
  { icon: CalendarCheck, title: "Automated Appointment Booking", desc: "AI-powered scheduling that integrates with existing hospital management systems." },
  { icon: Mic, title: "Voice AI Reception Handling", desc: "Handle patient calls with natural voice AI that books appointments and answers queries." },
  { icon: ClipboardList, title: "Smart Medical Form Processing", desc: "Automatically process insurance forms, intake documents, and claim submissions." },
  { icon: BookOpen, title: "Large Document Analysis", desc: "Process multi-page medical documents, research papers, and policy documents at scale." },
  { icon: Shield, title: "Secure Medical Data Processing", desc: "End-to-end encrypted processing with HIPAA-ready architecture and role-based access control." },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding" id="features">
      <div className="container-narrow">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Platform Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Core Platform Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-[55ch] mx-auto">
            Purpose-built AI tools designed for healthcare workflows, from document processing to intelligent automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="group relative bg-card rounded-3xl p-8 shadow-card border border-border hover:shadow-glow animate-settle cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 animate-settle">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
