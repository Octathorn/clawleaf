import { motion } from "framer-motion";
import {
  ClipboardList, Mic, Bot, ShieldCheck, Database, BellRing, Activity, Layers, Wifi, BatteryFull, SignalHigh,
} from "lucide-react";
import { Reveal, EASE } from "@/components/site/primitives";
import { TextReveal } from "@/components/site/TextReveal";

type Status = "active" | "processing" | "idle";

type Node = {
  id: string;
  label: string;
  sub: string;
  icon: typeof Bot;
  x: number; // % of board
  y: number;
  status: Status;
  big?: boolean;
};

const nodes: Node[] = [
  { id: "intake", label: "Patient Intake", sub: "active", icon: ClipboardList, x: 11, y: 24, status: "active" },
  { id: "voice", label: "Voice Booking", sub: "active", icon: Mic, x: 11, y: 72, status: "active" },
  { id: "agent", label: "Clawleaf Agent", sub: "reasoning", icon: Bot, x: 44, y: 48, status: "active", big: true },
  { id: "verify", label: "Insurance Verify", sub: "processing", icon: ShieldCheck, x: 77, y: 20, status: "processing" },
  { id: "emr", label: "EMR Sync", sub: "idle", icon: Database, x: 77, y: 48, status: "idle" },
  { id: "notify", label: "Notify Care Team", sub: "idle", icon: BellRing, x: 77, y: 76, status: "idle" },
];

const edges: [string, string][] = [
  ["intake", "agent"],
  ["voice", "agent"],
  ["agent", "verify"],
  ["agent", "emr"],
  ["agent", "notify"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

/** Per-status visual treatment — active/processing nodes glow; idle nodes stay dark. */
function nodeStyle(status: Status): {
  wrap: string;
  glow: string;
  iconWrap: string;
  label: string;
  dot: string;
  sub: string;
} {
  if (status === "active")
    return {
      wrap: "border-transparent text-white",
      glow: "linear-gradient(135deg, hsl(224 84% 55%), hsl(199 90% 48%))",
      iconWrap: "bg-white/20 text-white",
      label: "text-white",
      dot: "bg-white shadow-[0_0_8px_hsl(0_0%_100%/0.8)]",
      sub: "text-white/75",
    };
  if (status === "processing")
    return {
      wrap: "border-transparent text-white",
      glow: "linear-gradient(135deg, hsl(38 92% 52%), hsl(22 90% 50%))",
      iconWrap: "bg-white/20 text-white",
      label: "text-white",
      dot: "bg-white shadow-[0_0_8px_hsl(0_0%_100%/0.8)]",
      sub: "text-white/80",
    };
  return {
    wrap: "border-white/[0.07] bg-[hsl(var(--surface-2))]/95 text-foreground",
    glow: "",
    iconWrap: "bg-white/[0.04] text-muted-foreground",
    label: "text-foreground/80",
    dot: "bg-white/25",
    sub: "text-muted-foreground",
  };
}

function NodeCard({ node, className = "" }: { node: Node; className?: string }) {
  const s = nodeStyle(node.status);
  const glowing = node.status !== "idle";
  return (
    <div
      className={`relative flex items-center gap-2.5 rounded-xl border px-3 py-2.5 backdrop-blur transition-all duration-500 ${s.wrap} ${
        node.big ? "gap-3 px-4 py-3.5" : ""
      } ${className}`}
      style={glowing ? { background: s.glow } : undefined}
    >
      {/* outer glow */}
      {glowing && (
        <span
          className="absolute inset-0 -z-10 rounded-xl blur-lg"
          style={{ background: s.glow, opacity: node.big ? 0.7 : 0.5 }}
          aria-hidden
        />
      )}
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg ${s.iconWrap} ${node.big ? "h-10 w-10" : "h-8 w-8"}`}
      >
        <node.icon className={node.big ? "h-5 w-5" : "h-4 w-4"} />
      </span>
      <div className="min-w-0">
        <div className={`truncate font-medium ${s.label} ${node.big ? "text-sm" : "text-[0.72rem]"}`}>
          {node.label}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${glowing ? "animate-pulse-glow" : ""}`} />
          <span className={`font-mono text-[0.55rem] uppercase tracking-wider ${s.sub}`}>{node.sub}</span>
        </div>
      </div>
    </div>
  );
}

const specs = [
  { k: "Throughput", v: "10k docs/hr", icon: Layers },
  { k: "Accuracy", v: "99.4% OCR", icon: Activity },
  { k: "Latency", v: "0.4s / call", icon: Activity },
  { k: "Compliance", v: "HIPAA-ready", icon: ShieldCheck },
];

function Phone() {
  return (
    <div className="relative w-[220px] shrink-0 rounded-[2.2rem] border border-white/[0.12] bg-[hsl(222_47%_3%)] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:w-[240px]">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.6rem] bg-gradient-to-b from-primary/25 to-accent/15 opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.8rem] bg-[hsl(222_44%_6%)]">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        {/* status bar */}
        <div className="flex items-center justify-between px-5 pt-3 text-[0.6rem] font-semibold text-foreground/80">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <SignalHigh size={11} />
            <Wifi size={11} />
            <BatteryFull size={13} />
          </div>
        </div>

        {/* agent header */}
        <div className="mt-3 flex items-center gap-2.5 border-b border-white/[0.06] px-4 pb-3">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
              <Bot size={17} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[hsl(222_44%_6%)] bg-emerald-400" />
          </div>
          <div>
            <div className="text-[0.78rem] font-semibold text-foreground">Clawleaf AI</div>
            <div className="font-mono text-[0.55rem] uppercase tracking-wider text-muted-foreground">Agent v3.1</div>
          </div>
        </div>

        {/* chat */}
        <div className="space-y-3 px-4 py-4">
          <motion.div
            className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-primary to-accent px-3 py-2 text-[0.68rem] leading-snug text-white"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            "Book a follow-up for patient #4821 and notify the care team."
          </motion.div>

          <motion.div
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 w-fit"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Activity size={10} className="text-primary" />
            <span className="font-mono text-[0.55rem] uppercase tracking-wider text-muted-foreground">Running nodes…</span>
          </motion.div>

          <motion.div
            className="max-w-[88%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-[0.68rem] leading-snug text-foreground/90"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Done ✓ Follow-up booked for Aug 14, insurance verified, and the care team was notified via Slack.
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function LiveWorkflowSection() {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora left-[8%] top-[20%] h-[26rem] w-[26rem] bg-primary/15" />
        <div className="aurora right-[6%] bottom-[10%] h-[24rem] w-[24rem] bg-accent/12" />
      </div>

      <div className="container-wide">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            className="eyebrow eyebrow-dot justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Engineered Live
          </motion.span>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            <TextReveal text="Watch agents run" className="text-foreground" />
            <br />
            <TextReveal text="your workflows" className="text-gradient" delay={0.15} />
          </h2>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          >
            One instruction sets an entire agentic pipeline in motion — intake, reasoning,
            verification, and hand-off across your systems, on desktop and mobile.
          </motion.p>
        </div>

        {/* Showcase */}
        <Reveal delay={0.1} className="relative mt-16">
          <div className="relative lg:pr-[16.5rem]">
            {/* Laptop / app frame */}
            <div className="border-gradient relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[hsl(var(--surface))] shadow-card">
              {/* top bar */}
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <span className="flex items-center gap-1.5 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                    System online
                  </span>
                </div>
                <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground sm:block">
                  flow: patient_intake_sync
                </span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Layers size={14} />
                  <Activity size={14} className="text-primary" />
                </div>
              </div>

              {/* board */}
              <div className="relative bg-grid">
                {/* desktop graph */}
                <div className="relative hidden aspect-[16/9] w-full md:block">
                  {/* connectors */}
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
                    <defs>
                      <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="hsl(196 92% 56%)" stopOpacity="0.7" />
                      </linearGradient>
                    </defs>
                    {edges.map(([a, b]) => {
                      const na = byId[a];
                      const nb = byId[b];
                      const active = na.status !== "idle" && nb.status !== "idle";
                      return (
                        <line
                          key={`${a}-${b}`}
                          x1={`${na.x}%`}
                          y1={`${na.y}%`}
                          x2={`${nb.x}%`}
                          y2={`${nb.y}%`}
                          stroke={active ? "url(#edge)" : "hsl(210 40% 96% / 0.12)"}
                          strokeWidth={1.5}
                          strokeDasharray="6 8"
                          className={active ? "animate-dash" : ""}
                        />
                      );
                    })}
                  </svg>
                  {nodes.map((n) => (
                    <motion.div
                      key={n.id}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${n.x}%`, top: `${n.y}%` }}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + nodes.indexOf(n) * 0.09, type: "spring", stiffness: 140, damping: 18 }}
                    >
                      <NodeCard node={n} className={n.big ? "min-w-[9.5rem]" : "min-w-[8rem]"} />
                    </motion.div>
                  ))}
                </div>

                {/* mobile stacked flow */}
                <div className="relative md:hidden">
                  <div className="absolute left-[1.85rem] top-6 bottom-6 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
                  <div className="space-y-3 p-5">
                    {nodes.map((n) => (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: nodes.indexOf(n) * 0.06 }}
                      >
                        <NodeCard node={n} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="mt-8 flex justify-center lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
                className="lg:animate-float-slow"
              >
                <Phone />
              </motion.div>
            </div>
          </div>

          {/* Spec strip */}
          <motion.div
            className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {specs.map((sp) => (
              <motion.div
                key={sp.k}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-[hsl(var(--card))] px-4 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-accent/10 text-primary">
                  <sp.icon size={16} />
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">{sp.k}</div>
                  <div className="truncate font-display text-sm font-semibold text-foreground">{sp.v}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
