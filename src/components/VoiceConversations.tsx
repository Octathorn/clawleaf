import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, PhoneIncoming, PhoneOutgoing } from "lucide-react";
import { CONVERSATIONS } from "@/config/voiceConversations";

/**
 * Interactive "hear it in action" section for /voice-agents.
 * Plays pre-generated per-line clips in sequence with a live, synced transcript.
 * Auto-plays when scrolled into view; if the browser blocks autoplay-with-sound
 * (no prior user gesture), it falls back to a tap-to-play orb.
 */
export default function VoiceConversations() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const activeBubbleRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef<{ convo: number; line: number }>({ convo: 0, line: -1 });
  const startedRef = useRef(false);

  const [active, setActive] = useState(0);
  const [lineIdx, setLineIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [muted, setMuted] = useState(false);

  const convo = CONVERSATIONS[active];

  const play = useCallback(
    (c: number, line: number) => {
      const a = audioRef.current;
      const conversation = CONVERSATIONS[c];
      const ln = conversation?.lines[line];
      if (!a || !ln) return;
      posRef.current = { convo: c, line };
      setActive(c);
      setLineIdx(line);
      a.src = ln.file;
      a.muted = muted;
      a.play()
        .then(() => {
          setPlaying(true);
          setNeedsTap(false);
        })
        .catch(() => {
          setPlaying(false);
          setNeedsTap(true);
        });
    },
    [muted],
  );

  // Chain clips: next line → next conversation → stop after the last.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnded = () => {
      const { convo: c, line } = posRef.current;
      const conversation = CONVERSATIONS[c];
      if (line + 1 < conversation.lines.length) play(c, line + 1);
      else if (c + 1 < CONVERSATIONS.length) play(c + 1, 0);
      else setPlaying(false);
    };
    a.addEventListener("ended", onEnded);
    return () => a.removeEventListener("ended", onEnded);
  }, [play]);

  // Keep the element's muted flag in sync.
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  // Auto-start on scroll into view; pause when it leaves.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!startedRef.current) {
              startedRef.current = true;
              play(0, 0);
            }
          } else {
            const a = audioRef.current;
            if (a && !a.paused) {
              a.pause();
              setPlaying(false);
            }
          }
        });
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [play]);

  // Stop audio on unmount.
  useEffect(() => {
    return () => {
      const a = audioRef.current;
      if (a) a.pause();
    };
  }, []);

  // Keep the current line visible inside the transcript box (no page jump).
  useEffect(() => {
    const c = transcriptRef.current;
    const b = activeBubbleRef.current;
    if (c && b) c.scrollTop = Math.max(0, b.offsetTop - 48);
  }, [lineIdx, active]);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    if (lineIdx < 0 || a.ended) {
      play(active, 0);
      return;
    }
    a.play()
      .then(() => {
        setPlaying(true);
        setNeedsTap(false);
      })
      .catch(() => setNeedsTap(true));
  }, [playing, lineIdx, active, play]);

  const currentName = lineIdx >= 0 ? convo.lines[lineIdx]?.name : "";
  const statusText = needsTap
    ? "Tap to play the call"
    : playing
      ? `${currentName} speaking…`
      : lineIdx >= 0
        ? "Paused"
        : "Tap to play the call";

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Hear it in action
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Listen to a Clawleaf agent <span className="text-gradient">on a call</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-[55ch] mx-auto">
            Press play, or pick a use case below. These sample calls show how each agent listens,
            understands and responds — the way a great front desk would.
          </p>
        </motion.div>

        <motion.div
          ref={sectionRef}
          className="relative rounded-3xl hero-gradient shadow-glow overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 15%, hsl(199 89% 48% / 0.35), transparent 45%)",
            }}
          />

          <div className="relative p-5 sm:p-8 md:p-10">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                  <convo.icon size={18} className="text-white" />
                </span>
                <span className="truncate text-white font-semibold">{convo.label}</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                  {convo.direction === "Inbound" ? (
                    <PhoneIncoming size={12} />
                  ) : (
                    <PhoneOutgoing size={12} />
                  )}
                  {convo.direction}
                </span>
              </div>
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* Orb + transcript */}
            <div className="grid items-center gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={toggle}
                  aria-label={playing ? "Pause" : "Play"}
                  className="relative grid h-36 w-36 place-items-center rounded-full outline-none transition-transform active:scale-95 sm:h-44 sm:w-44"
                >
                  <span
                    className={`absolute inset-0 rounded-full blur-2xl ${playing ? "animate-pulse-glow opacity-80" : "opacity-50"}`}
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, #34d399, #2563eb 70%)",
                    }}
                  />
                  <span
                    className="absolute inset-3 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 28%, #4ade80, #2563eb 78%)",
                    }}
                  />
                  {playing && (
                    <span className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
                  )}
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-black/25 text-white backdrop-blur-sm">
                    {playing ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
                  </span>
                </button>
                <p className="text-sm font-medium text-white/80 min-h-[20px]">{statusText}</p>
              </div>

              <div
                ref={transcriptRef}
                className="relative flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-1 sm:max-h-[340px]"
              >
                {convo.lines.map((ln, i) => {
                  const revealed = i <= lineIdx;
                  const current = i === lineIdx;
                  const agent = ln.speaker === "agent";
                  return (
                    <motion.div
                      key={`${convo.id}-${i}`}
                      ref={current ? activeBubbleRef : undefined}
                      initial={false}
                      animate={{ opacity: revealed ? 1 : 0.35 }}
                      transition={{ duration: 0.3 }}
                      className={`flex max-w-[85%] flex-col ${agent ? "items-start self-start" : "ml-auto items-end self-end"}`}
                    >
                      <span
                        className={`mb-1 px-1 text-[10px] font-bold uppercase tracking-wider ${agent ? "text-accent" : "text-white/45"}`}
                      >
                        {ln.name}
                      </span>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-shadow ${
                          agent
                            ? "rounded-bl-sm bg-white/10 text-white border border-white/10"
                            : "rounded-br-sm bg-primary text-primary-foreground"
                        } ${current ? "ring-2 ring-accent/70 shadow-glow" : ""}`}
                      >
                        {ln.text}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Use-case tabs */}
            <div className="mt-8 grid grid-cols-2 gap-2.5 md:grid-cols-4">
              {CONVERSATIONS.map((c, idx) => {
                const on = idx === active;
                return (
                  <button
                    key={c.id}
                    onClick={() => play(idx, 0)}
                    className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left transition-all ${
                      on
                        ? "border-accent/60 bg-white/15 text-white shadow-glow"
                        : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${on ? "bg-accent/25" : "bg-white/10"}`}
                    >
                      <c.icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold leading-tight">
                        {c.label}
                      </span>
                      <span className="block truncate text-[11px] text-white/50">{c.tagline}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <audio ref={audioRef} preload="none" className="hidden" />
        </motion.div>
      </div>
    </section>
  );
}
