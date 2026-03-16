import { motion } from "framer-motion";
import { Upload, Cpu, Search, Zap, BarChart3 } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload or Connect", desc: "Connect your medical data sources — EMR, documents, imaging systems." },
  { icon: Cpu, title: "AI Processes Data", desc: "Our AI engine processes documents, images, and voice data simultaneously." },
  { icon: Search, title: "Extract & Understand", desc: "Structured medical information is extracted with clinical-grade accuracy." },
  { icon: Zap, title: "Automate Tasks", desc: "Administrative workflows are automated — billing, scheduling, records." },
  { icon: BarChart3, title: "Deliver Insights", desc: "Receive structured data, analytics, and actionable clinical insights." },
];

export default function HowItWorksSection() {
  return (
    <section className="section-padding bg-secondary/50" id="how-it-works">
      <div className="container-narrow">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            From Data to Action in Minutes
          </h2>
          <p className="text-muted-foreground text-lg max-w-[55ch] mx-auto">
            A streamlined AI pipeline that transforms raw medical data into structured, actionable outcomes.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-card shadow-card border border-border flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary mb-1">Step {i + 1}</div>
                <h3 className="text-sm font-semibold mb-1 text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
