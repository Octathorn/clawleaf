import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground max-w-[70ch] mx-auto">
              Please read these Terms of Service carefully before using our website.
            </p>
          </motion.div>

          <div className="prose max-w-none">
            <h2>Acceptance of Terms</h2>
            <p>By using our service, you agree to these terms.</p>

            <h2>User Responsibilities</h2>
            <p>Users must comply with applicable laws and may not misuse the service.</p>

            <h2>Limitation of Liability</h2>
            <p>Our liability is limited as described in these terms.</p>

            <h2>Contact</h2>
            <p>Questions about these terms can be sent to hello@clawleaf.com.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
