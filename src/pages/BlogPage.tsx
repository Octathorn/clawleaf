import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  { title: "How AI is Transforming Medical Document Processing", date: "Mar 12, 2026", tag: "AI & Healthcare", slug: "ai-medical-docs" },
  { title: "The Future of Voice AI in Clinical Settings", date: "Mar 5, 2026", tag: "Voice AI", slug: "voice-ai-clinical" },
  { title: "HIPAA Compliance in the Age of AI Automation", date: "Feb 28, 2026", tag: "Security", slug: "hipaa-ai" },
  { title: "Computer Vision for Medical Imaging: A Deep Dive", date: "Feb 20, 2026", tag: "Computer Vision", slug: "cv-medical-imaging" },
  { title: "Reducing Administrative Burden with Intelligent OCR", date: "Feb 14, 2026", tag: "OCR", slug: "intelligent-ocr" },
  { title: "Building Custom AI Pipelines for Healthcare", date: "Feb 7, 2026", tag: "Engineering", slug: "custom-ai-pipelines" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Blog</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Insights & Research</h1>
            <p className="text-lg text-muted-foreground max-w-[50ch] mx-auto">The latest in healthcare AI automation, research, and product updates.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="h-40 bg-secondary/50" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.tag}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-3 group-hover:text-primary animate-settle">{post.title}</h3>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
