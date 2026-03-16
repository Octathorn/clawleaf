import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Transform Healthcare Operations with AI
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-[50ch] mx-auto">
            Join leading healthcare organizations automating their workflows with Clawleaf's enterprise AI platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:opacity-90 animate-settle"
            >
              Schedule a Demo
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-border text-foreground hover:bg-secondary animate-settle"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
