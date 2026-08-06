import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading, fadeUp } from "@/components/site/primitives";

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
    features: ["Everything in Starter", "Healthcare AI agents", "Voice AI Reception", "Computer Vision", "25,000 pages/month", "Priority Support", "Custom Integrations"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Custom AI tools and integrations for large organizations",
    features: ["Everything in Professional", "Custom agentic workflows", "Custom AI Tools", "Unlimited Processing", "Dedicated Support", "On-Premise Option", "SLA Guarantee"],
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative section-padding" id="pricing">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that scale with your organization"
          subtitle="Transparent pricing that grows with your healthcare automation needs."
        />

        <motion.div
          className="mx-auto mt-16 grid max-w-5xl items-stretch gap-6 md:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`relative flex flex-col rounded-3xl p-8 transition-all duration-500 ${
                plan.featured
                  ? "border-gradient border border-white/10 bg-[hsl(var(--surface-2))] shadow-glow md:-my-2 md:scale-[1.03]"
                  : "border border-white/[0.07] bg-[hsl(var(--card))] hover:-translate-y-1 hover:border-white/15"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-3.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-white shadow-glow">
                  <Sparkles size={11} />
                  Most Popular
                </div>
              )}

              <h3 className="font-display text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>

              <div className="mt-6 flex flex-wrap items-baseline gap-x-1.5">
                <span className="font-display text-4xl font-semibold tracking-tight text-foreground">
                  {plan.price}
                </span>
                {plan.priceSuffix ? (
                  <span className="text-sm font-medium text-muted-foreground">{plan.priceSuffix}</span>
                ) : null}
              </div>

              <div className="my-7 h-px bg-white/[0.07]" />

              <ul className="flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.featured ? "bg-gradient-to-br from-primary to-accent text-white" : "bg-primary/15 text-primary"
                      }`}
                    >
                      <Check size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-8 w-full justify-center ${plan.featured ? "btn-primary" : "btn-secondary"}`}
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
