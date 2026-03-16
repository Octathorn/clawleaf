import { motion } from "framer-motion";
import { Shield, Lock, Key, Users, Server } from "lucide-react";

const items = [
  { icon: Lock, title: "End-to-End Encryption", desc: "AES-256 encryption for data at rest and TLS 1.3 for data in transit." },
  { icon: Server, title: "Secure Infrastructure", desc: "SOC 2 Type II compliant cloud infrastructure with 99.99% uptime SLA." },
  { icon: Shield, title: "Healthcare Data Protection", desc: "Purpose-built data handling pipelines designed for sensitive medical data." },
  { icon: Users, title: "Role-Based Access", desc: "Granular permissions and audit logging for enterprise compliance." },
  { icon: Key, title: "HIPAA-Ready Architecture", desc: "Architecture designed to meet HIPAA security and privacy requirements." },
];

export default function SecuritySection() {
  return (
    <section className="section-padding hero-gradient relative overflow-hidden" id="security">
      <div className="container-narrow relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">Security & Compliance</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4" style={{ color: "hsl(0 0% 100%)" }}>
            Enterprise-Grade Security
          </h2>
          <p className="text-lg max-w-[55ch] mx-auto" style={{ color: "hsl(210 40% 70%)" }}>
            Your medical data is protected by multiple layers of security, encryption, and compliance frameworks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-2xl p-6 border animate-settle"
              style={{
                background: "hsl(222 47% 11% / 0.5)",
                backdropFilter: "blur(16px)",
                borderColor: "hsl(210 40% 85% / 0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <item.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-base font-semibold mb-2" style={{ color: "hsl(0 0% 100%)" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(210 40% 65%)" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {["HIPAA", "SOC 2", "GDPR", "ISO 27001"].map((badge) => (
            <div key={badge} className="px-5 py-2 rounded-full border text-sm font-medium" style={{ borderColor: "hsl(210 40% 85% / 0.15)", color: "hsl(210 40% 80%)" }}>
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
