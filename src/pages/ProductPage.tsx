import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, Brain, Eye, Mic, Zap, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { productFeatureVideoByTitle } from "@/config/showcaseVideos";
import { ShowcaseVideo } from "@/components/ShowcaseVideo";

const features = [
  { icon: FileText, title: "Medical OCR Engine", desc: "Extract structured data from any medical document — handwritten notes, lab results, prescriptions, and insurance forms. Supports 50+ document types with 99.4% accuracy.", specs: ["50+ document types", "99.4% accuracy", "< 2s processing"] },
  { icon: Brain, title: "Document AI", desc: "Summarize, classify, and extract key insights from lengthy medical records, clinical notes, and research documents.", specs: ["Multi-language support", "Context-aware extraction", "Batch processing"] },
  { icon: Eye, title: "Computer Vision", desc: "Analyze medical images including X-rays, pathology slides, and diagnostic scans with enterprise-grade computer vision models.", specs: ["DICOM compatible", "Real-time analysis", "Custom model training"] },
  { icon: Mic, title: "Voice AI", desc: "Natural language voice agents that handle patient calls, schedule appointments, and answer common medical queries 24/7.", specs: ["Natural language", "Multi-accent support", "HIPAA-compliant calls"] },
  { icon: Zap, title: "Workflow Automation", desc: "Connect AI capabilities to existing hospital systems — automate billing, scheduling, records management, and administrative tasks.", specs: ["EMR integration", "Custom workflows", "API access"] },
  { icon: Shield, title: "Security Layer", desc: "Enterprise security with end-to-end encryption, role-based access, audit logging, and full HIPAA compliance.", specs: ["AES-256 encryption", "SOC 2 Type II", "HIPAA compliant"] },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container-narrow">
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Platform Overview</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">The Complete AI Platform for Healthcare</h1>
            <p className="text-xl text-muted-foreground max-w-[60ch] mx-auto">From document processing to voice AI, Clawleaf provides every tool healthcare organizations need to automate their operations.</p>
          </motion.div>

          <div className="space-y-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-3">{f.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">{f.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {f.specs.map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </div>
                <div className={`overflow-hidden rounded-3xl border border-border bg-secondary/50 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  {productFeatureVideoByTitle[f.title] ? (
                    <div className="aspect-video w-full min-h-[240px]">
                      <ShowcaseVideo
                        src={productFeatureVideoByTitle[f.title]}
                        playWhenVisible
                        preload="metadata"
                        wrapperClassName="h-full w-full min-h-[240px]"
                        videoClassName="h-full w-full min-h-[240px] object-cover"
                        aria-label={`${f.title} platform preview`}
                      />
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center">
                      <f.icon className="h-20 w-20 text-primary/20" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/request-tool" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:opacity-90">
              Request Custom Automation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
