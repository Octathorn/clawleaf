import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, Phone, ArrowRight } from "lucide-react";

/**
 * Homepage interactive Voice-AI teaser, placed right after the hero.
 * The whole panel is a link into the dedicated /voice-ai experience where the
 * live phone + browser demo lives.
 */
export default function VoiceAISection() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
              Live Voice AI
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Talk to a <span className="text-gradient">voice agent</span> right now
            </h2>
            <p className="text-muted-foreground text-lg max-w-[52ch] mb-8 leading-relaxed">
              Hear a Clawleaf receptionist handle a real conversation — book an
              appointment, answer questions, confirm a visit. Get a call on your
              phone, or talk straight from your browser.
            </p>
            <Link
              to="/voice-ai"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:opacity-90 animate-settle"
            >
              Try the live demo <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Interactive-looking widget card → routes to /voice-ai */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/voice-ai" className="block group" aria-label="Open the live voice AI demo">
              <div className="relative rounded-3xl p-8 hero-gradient shadow-glow overflow-hidden animate-settle group-hover:scale-[1.01]">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, hsl(199 89% 48% / 0.4), transparent 45%)",
                  }}
                />
                <div className="relative flex flex-col items-center text-center gap-6 py-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-accent/40 blur-2xl animate-pulse-glow" />
                    <div className="relative w-24 h-24 rounded-full bg-white/10 border border-accent/40 flex items-center justify-center">
                      <Mic className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Clawleaf Voice Agent</p>
                    <p className="text-sm" style={{ color: "hsl(210 40% 78%)" }}>
                      Tap to start a live conversation
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <Phone size={15} /> Get a call
                    </span>
                    <span className="opacity-40">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Mic size={15} /> Talk in browser
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
