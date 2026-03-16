import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Contact</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-[50ch] mx-auto">Schedule a demo, request a custom AI tool, or talk to our healthcare automation experts.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="space-y-6 mb-10">
                {[
                  { icon: Mail, label: "Email", value: "hello@clawleaf.com" },
                  { icon: Phone, label: "Phone", value: "+1 (888) 555-0123" },
                  { icon: MapPin, label: "Office", value: "San Francisco, CA" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              {submitted ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">First Name</label>
                      <input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="John" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                      <input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="john@hospital.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Organization</label>
                    <input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="Metro Health Systems" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message</label>
                    <textarea rows={4} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm resize-none" placeholder="Tell us about your automation needs..." />
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:opacity-90 animate-settle shadow-glow">
                    Send Message
                  </button>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
