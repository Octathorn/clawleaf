import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const useCases = [
  { title: "Patient Intake Automation", desc: "Digitize and process patient intake forms automatically. Our AI reads handwritten and printed forms, extracts patient data, and populates your EMR system — reducing wait times by 80%.", impact: "80% faster processing" },
  { title: "Insurance Claim Processing", desc: "Automate the entire claim lifecycle — from document intake to submission. AI validates claim data, flags discrepancies, and routes claims for faster reimbursement.", impact: "60% fewer claim errors" },
  { title: "Lab Result Extraction", desc: "Extract structured data from lab results in any format. Our OCR engine handles printed reports, handwritten notes, and even faxed documents with clinical-grade accuracy.", impact: "99.4% extraction accuracy" },
  { title: "Medical Record Summarization", desc: "Generate concise, clinician-ready summaries from lengthy medical records. AI identifies key diagnoses, medications, procedures, and follow-up items.", impact: "5x faster chart review" },
  { title: "Voice Appointment Booking", desc: "AI voice agents handle inbound patient calls, check availability, book appointments, and send confirmations — all without human intervention.", impact: "3x more calls handled" },
  { title: "Clinical Documentation", desc: "Assist clinicians with automated note-taking, transcription, and structured documentation that meets compliance requirements.", impact: "2 hours saved per clinician/day" },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow">
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Use Cases</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Real-World Healthcare Automation</h1>
            <p className="text-xl text-muted-foreground max-w-[60ch] mx-auto">See how healthcare organizations use Clawleaf to automate critical workflows and improve patient outcomes.</p>
          </motion.div>

          <div className="space-y-8">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                className="bg-card rounded-2xl p-8 shadow-card border border-border grid lg:grid-cols-3 gap-6 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold mb-2">{uc.title}</h3>
                  <p className="text-muted-foreground">{uc.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{uc.impact}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
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
