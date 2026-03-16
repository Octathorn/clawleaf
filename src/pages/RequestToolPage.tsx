import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, Mic, Brain, Eye, Zap } from "lucide-react";
import { useState } from "react";

const modules = [
  { icon: FileText, label: "OCR" },
  { icon: Mic, label: "Voice AI" },
  { icon: Brain, label: "Document AI" },
  { icon: Eye, label: "Computer Vision" },
  { icon: Zap, label: "Automation" },
];

export default function RequestToolPage() {
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Custom AI Tools</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Request Custom Automation</h1>
            <p className="text-xl text-muted-foreground max-w-[55ch] mx-auto">Share your workflow requirements and upload reference files so we can design a custom healthcare automation solution.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-xl font-bold mb-6">Available Modules</h3>
              <div className="space-y-4">
                {modules.map((m) => (
                  <div key={m.label} className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card border border-border">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <m.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              {submitted ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
                  <p className="text-muted-foreground">Our team will review your requirements and reach out within 48 hours.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Organization Name</label>
                    <input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="Your organization" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Automation Request Title</label>
                    <input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="Ex: Claims Intake and Validation" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" placeholder="you@organization.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Current Workflow Details</label>
                    <textarea rows={4} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm resize-none" placeholder="Describe the current process, tools, and team steps..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Automation Goals</label>
                    <textarea rows={4} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm resize-none" placeholder="What should be automated and what outcomes do you expect?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Reference Files (Images / Videos)</label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-primary"
                      onChange={(e) => setUploadedFiles(Array.from(e.target.files ?? []))}
                    />
                    <p className="text-xs text-muted-foreground mt-2">Upload screenshots, sample documents, and walkthrough videos to help us scope your request.</p>
                    {uploadedFiles.length > 0 && (
                      <p className="text-xs text-primary mt-2">{uploadedFiles.length} file(s) selected: {uploadedFiles.map((file) => file.name).join(", ")}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Preferred AI Modules</label>
                    <div className="flex flex-wrap gap-2">
                      {modules.map((m) => (
                        <label key={m.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs cursor-pointer hover:bg-secondary animate-settle">
                          <input type="checkbox" className="rounded" />
                          {m.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:opacity-90 animate-settle shadow-glow">
                    Submit Automation Request
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
