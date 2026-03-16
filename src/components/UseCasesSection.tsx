import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const useCases = [
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
    <section className="section-padding" id="use-cases">
      <div className="container-narrow">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Real-World Applications
          </h2>
          <p className="text-muted-foreground text-lg max-w-[55ch] mx-auto">
            See how healthcare organizations use Clawleaf to automate critical workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className="group bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-glow animate-settle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <h3 className="text-sm font-semibold mb-2 text-foreground">{uc.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{uc.desc}</p>
              <Link to="/use-cases" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                Learn more <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
