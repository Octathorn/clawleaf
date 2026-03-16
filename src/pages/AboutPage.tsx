import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Users, Shield, Lightbulb } from "lucide-react";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "We build AI that makes healthcare more accessible and efficient for everyone." },
  { icon: Users, title: "Customer-First", desc: "Every feature is designed in collaboration with healthcare professionals." },
  { icon: Shield, title: "Security-Obsessed", desc: "Patient data protection is not a feature — it's our foundation." },
  { icon: Lightbulb, title: "Innovation-Led", desc: "We push the boundaries of what AI can do in clinical environments." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow">
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">About Clawleaf</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Building the Future of Healthcare AI</h1>
            <p className="text-xl text-muted-foreground max-w-[60ch] mx-auto">
              We're a team of AI researchers, healthcare professionals, and engineers on a mission to automate healthcare administration so clinicians can focus on what matters — patient care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
