import { motion } from "framer-motion";
import { FileText, Mic, Brain, Eye, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  { icon: FileText, label: "OCR" },
  { icon: Mic, label: "Voice AI" },
  { icon: Brain, label: "Document AI" },
  { icon: Eye, label: "Computer Vision" },
  { icon: Zap, label: "Automation" },
];

export default function CustomAISection() {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Custom AI Tools</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Build Custom AI for Your Workflow
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-[50ch]">
              Request purpose-built AI tools tailored to your organization's specific medical workflows. Our modular architecture lets you plug in exactly what you need.
            </p>
            <Link
              to="/request-tool"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 animate-settle shadow-glow"
            >
              Request Custom Automation
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Central core */}
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-glow mx-auto">
                <span className="text-sm font-bold text-primary text-center leading-tight">Clawleaf<br/>Core</span>
              </div>

              {/* Module orbits */}
              <div className="absolute inset-0 flex items-center justify-center">
                {modules.map((mod, i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  const radius = 130;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={mod.label}
                      className="absolute w-16 h-16 rounded-2xl bg-card shadow-card border border-border flex flex-col items-center justify-center gap-1"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                    >
                      <mod.icon className="w-5 h-5 text-primary" />
                      <span className="text-[10px] font-medium text-muted-foreground">{mod.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
