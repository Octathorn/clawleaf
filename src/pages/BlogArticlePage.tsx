import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BlogArticlePage() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 section-padding">
        <div className="container-narrow max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">AI & Healthcare</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mt-4 mb-4">
              {slug?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
            </h1>
            <p className="text-muted-foreground mb-8">Published Mar 2026 · 5 min read</p>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                This article explores how modern AI technologies are being applied in healthcare settings to improve patient outcomes, reduce administrative burden, and enhance clinical decision-making. As the healthcare industry continues to adopt digital solutions, AI automation platforms like Clawleaf are becoming essential tools for forward-thinking organizations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The convergence of computer vision, natural language processing, and voice AI has created unprecedented opportunities for healthcare automation. From extracting data from handwritten prescriptions to handling patient calls with natural language voice agents, the possibilities are expanding rapidly.
              </p>
            </div>
          </motion.article>
        </div>
      </section>
      <Footer />
    </div>
  );
}
