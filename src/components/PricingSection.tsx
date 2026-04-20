import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  desc: string;
  features: string[];
  featured: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$499",
    priceSuffix: "/month",
    desc: "Basic document automation and OCR",
    features: ["Medical OCR Processing", "Document Summarization", "5,000 pages/month", "Email Support", "Standard SLA"],
    featured: false,
  },
  {
    name: "Professional",
    price: "Contact Us",
    desc: "Advanced AI automation and voice systems",
    features: ["Everything in Starter", "Voice AI Reception", "Computer Vision", "25,000 pages/month", "Priority Support", "Custom Integrations"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Custom AI tools and integrations for large organizations",
    features: ["Everything in Professional", "Custom AI Tools", "Unlimited Processing", "Dedicated Support", "On-Premise Option", "SLA Guarantee"],
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="section-padding" id="pricing">
      <div className="container-narrow">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Plans for Every Organization</h2>
          <p className="text-muted-foreground text-lg max-w-[50ch] mx-auto">
            Scalable pricing that grows with your healthcare automation needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`rounded-3xl p-8 border ${plan.featured ? "bg-primary shadow-glow border-primary/30 scale-105" : "bg-card shadow-card border-border"} animate-settle`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className={`text-lg font-bold mb-1 ${plan.featured ? "text-primary-foreground" : "text-foreground"}`}>{plan.name}</h3>
              <p className={`text-sm mb-4 ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.desc}</p>
              <div
                className={`mb-6 flex flex-wrap items-baseline gap-x-1.5 ${plan.featured ? "text-primary-foreground" : "text-foreground"}`}
              >
                <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                {plan.priceSuffix ? (
                  <span
                    className={`text-base font-semibold ${plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {plan.priceSuffix}
                  </span>
                ) : null}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${plan.featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                    <Check size={14} className={plan.featured ? "text-primary-foreground" : "text-primary"} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`block text-center py-3 rounded-full font-medium text-sm animate-settle ${plan.featured
                  ? "bg-card text-foreground hover:bg-card/90"
                  : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
