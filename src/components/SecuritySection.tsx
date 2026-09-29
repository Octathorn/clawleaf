import { motion } from "framer-motion";
import { Shield, Lock, Key, Users, Server, BadgeCheck } from "lucide-react";
import { SectionHeading, fadeUp } from "@/components/site/primitives";

const items = [
  { icon: Lock, title: "End-to-End Encryption", desc: "AES-256 encryption for data at rest and TLS 1.3 for data in transit.", featured: true },
  { icon: Server, title: "Secure Infrastructure", desc: "SOC 2 Type II compliant cloud infrastructure with 99.99% uptime SLA." },
  { icon: Shield, title: "Healthcare Data Protection", desc: "Purpose-built data handling pipelines designed for sensitive medical data." },
  { icon: Users, title: "Role-Based Access", desc: "Granular permissions and audit logging for enterprise compliance." },
  { icon: Key, title: "HIPAA-Ready Architecture", desc: "Architecture designed to meet HIPAA security and privacy requirements." },
];

const badges = ["HIPAA", "SOC 2", "GDPR", "ISO 27001"];

export default function SecuritySection() {
  return (
    <section className="relative overflow-hidden section-padding" id="security">
      {/* vault backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-30 mask-fade-edges" />
        <div className="aurora left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 bg-primary/15" />
      </div>

      <div className="container-wide">
        <SectionHeading
          eyebrow="Security & Compliance"
          title="Enterprise-grade security, by default"
          subtitle="Your medical data is protected by multiple layers of encryption, access control, and compliance frameworks."
        />

        <motion.div
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className={`border-gradient group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[hsl(var(--card))] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow ${
                item.featured ? "lg:col-span-1 md:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-500 group-hover:scale-110">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}

          {/* compliance card */}
          <motion.div
            variants={fadeUp}
            className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-primary/10 via-[hsl(var(--card))] to-accent/10 p-7"
          >
            <BadgeCheck className="h-6 w-6 text-primary" />
            <p className="mt-4 text-sm font-medium text-foreground">Independently audited & certified</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-foreground/80"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
