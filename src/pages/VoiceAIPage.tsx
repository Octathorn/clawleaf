import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceDemo from "@/components/VoiceDemo";
import {
  Mic,
  CalendarCheck,
  Clock,
  Languages,
  ShieldCheck,
  PhoneForwarded,
  FileText,
  Stethoscope,
} from "lucide-react";

const capabilities = [
  {
    icon: Mic,
    title: "Human-like conversations",
    desc: "Natural, low-latency speech that listens, interrupts gracefully, and responds like a real receptionist.",
  },
  {
    icon: CalendarCheck,
    title: "Booking & confirmations",
    desc: "Books, reschedules, cancels and confirms appointments, and follows up so fewer visits are missed.",
  },
  {
    icon: Clock,
    title: "24/7 availability",
    desc: "Answers every inbound call and places outbound reminders around the clock — no hold music, no voicemail.",
  },
  {
    icon: Languages,
    title: "Multilingual",
    desc: "Greets and converses with patients in their preferred language across your service regions.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "Can run fully on-premise with local speech models, so conversation audio never has to leave your infrastructure.",
  },
  {
    icon: PhoneForwarded,
    title: "Warm human handoff",
    desc: "Escalates and transfers to your staff with full context when a call needs a person.",
  },
  {
    icon: FileText,
    title: "Transcripts & analytics",
    desc: "Every call is transcribed and logged, so you can review outcomes and coach the agent over time.",
  },
  {
    icon: Stethoscope,
    title: "Fits your workflow",
    desc: "Purpose-built for clinics and front-desk operations, with agents scoped to exactly what each line should do.",
  },
];

export default function VoiceAIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Voice AI Agents for Healthcare · Clawleaf</title>
        <meta
          name="description"
          content="Hear Clawleaf's voice AI agent live — it calls your phone or talks in your browser. Human-like healthcare receptionists that book appointments, answer questions, and run 24/7."
        />
        <link rel="canonical" href="https://clawleaf.com/voice-ai" />
      </Helmet>

      <Navbar />

      {/* Hero + live demo */}
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                <span className="text-xs font-medium text-accent">Live interactive demo</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[0.98] mb-6">
                Voice AI agents that sound <span className="text-gradient">human</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[52ch] mb-8 leading-relaxed">
                Clawleaf voice agents answer, book, confirm and follow up — on the phone and in the
                browser. Try it yourself: have the agent call you now, or talk to it right here.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Runs on your own infrastructure
                </span>
                <span className="inline-flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Local speech models
                </span>
                <span className="inline-flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> 24/7 inbound & outbound
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <VoiceDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-secondary/50">
        <div className="container-narrow">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
              What it can do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              A receptionist that never sleeps
            </h2>
            <p className="text-muted-foreground text-lg max-w-[55ch] mx-auto">
              Every capability your front desk needs, delivered by an agent scoped to your clinic's
              exact workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                className="group relative bg-card rounded-3xl p-8 shadow-card border border-border hover:shadow-glow animate-settle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 animate-settle">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding">
        <div className="container-narrow">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              Bring a voice agent to your front desk
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-[50ch] mx-auto">
              See how Clawleaf voice AI fits your clinic — book a walkthrough with our team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:opacity-90 animate-settle"
              >
                Talk to sales
              </a>
              <a
                href="/product"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-border text-foreground hover:bg-secondary animate-settle"
              >
                Explore the platform
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
