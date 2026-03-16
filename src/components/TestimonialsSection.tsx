import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Clawleaf reduced our patient intake processing time by 85%. The OCR accuracy on handwritten forms is remarkable.",
    name: "Dr. Sarah Mitchell",
    position: "Chief Medical Officer",
    org: "Metro Health Systems",
  },
  {
    quote: "The Voice AI reception handling has transformed our front desk operations. We now handle 3x more patient calls without additional staff.",
    name: "James Rodriguez",
    position: "Director of Operations",
    org: "Pacific Care Clinics",
  },
  {
    quote: "Enterprise-grade security was non-negotiable for us. Clawleaf's HIPAA-ready architecture gave our compliance team full confidence.",
    name: "Dr. Linda Chen",
    position: "VP of Clinical Technology",
    org: "NovaMed Diagnostics",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">What Healthcare Leaders Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-card rounded-2xl p-8 shadow-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.position}</div>
                <div className="text-xs text-primary font-medium">{t.org}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
