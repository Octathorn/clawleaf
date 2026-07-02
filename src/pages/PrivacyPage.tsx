import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground max-w-[70ch] mx-auto">
              This Privacy Policy explains how we collect, use, and protect your information when you use our service.
            </p>
          </motion.div>

          <div className="prose max-w-none">
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us and usage data automatically.</p>

            <h2>How We Use Information</h2>
            <p>We use your information to provide, maintain, and improve our services, and to communicate with you.</p>

            <h2>Data Sharing</h2>
            <p>We do not sell personal data. We may share data with service providers as described in this policy.</p>

            <h2>Contact</h2>
            <p>If you have questions, contact us at hello@clawleaf.com.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
