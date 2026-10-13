import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MessageSquare, AudioLines, Send, PhoneOff, Loader2 } from "lucide-react";
import { VOICE_AGENTS, getEmbedToken, getChatToken, type VoiceAgent } from "@/config/voiceAgents";

const VOICE_API_URL = (import.meta.env.VITE_VOICE_API_URL as string | undefined)?.replace(/\/$/, "") || "";

type Mode = "voice" | "chat";
type ChatMsg = { role: "user" | "assistant"; text: string };

// Turn messages come back as either a plain string or an object { text, created_at }.
const asText = (m: any): string => (typeof m === "string" ? m : (m?.text ?? "")).toString();
// /init wraps the transcript in `chat_session`; /messages and GET return it flat.
const sess = (d: any) => d?.chat_session ?? d ?? {};

export default function VoiceDemo() {
  const [agent, setAgent] = useState<VoiceAgent>(VOICE_AGENTS[0]);
  const [mode, setMode] = useState<Mode>("voice");

  // Voice
  const [webCall, setWebCall] = useState(false);
  const embedToken = getEmbedToken(agent.id);

  // Chat
  const chatToken = getChatToken(agent.id);
  const [session, setSession] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [chatErr, setChatErr] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const switchAgent = (a: VoiceAgent) => {
    if (a.id === agent.id) return;
    setAgent(a);
    setWebCall(false);
    setSession(null);
    setMessages([]);
    setChatErr("");
  };

  const turnsToMessages = (turns: any[]): ChatMsg[] => {
    const out: ChatMsg[] = [];
    for (const t of turns || []) {
      const u = asText(t.user_message);
      const a = asText(t.assistant_message);
      if (u) out.push({ role: "user", text: u });
      if (a) out.push({ role: "assistant", text: a });
    }
    return out;
  };

  const initChat = useCallback(async () => {
    if (!chatToken || !VOICE_API_URL || session) return;
    setChatErr("");
    try {
      const r = await fetch(`${VOICE_API_URL}/api/v1/public/embed/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: chatToken }),
      });
      if (!r.ok) throw new Error();
      const d = await r.json();
      setSession(d.session_token);
      setRevision(sess(d).revision ?? 0);
      setMessages(turnsToMessages(sess(d).turns));
    } catch {
      setChatErr("Couldn't start the chat. Please try again.");
    }
  }, [chatToken, session]);

  // Init chat when the chat tab is first opened for an agent.
  useEffect(() => {
    if (mode === "chat" && !session) initChat();
  }, [mode, session, initChat]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, chatBusy]);

  const sendChat = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || !session || chatBusy) return;
    setInput("");
    setChatErr("");
    setMessages((m) => [...m, { role: "user", text }]);
    setChatBusy(true);
    try {
      const post = await fetch(`${VOICE_API_URL}/api/v1/public/embed/chat/${session}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, expected_revision: revision }),
      });
      if (post.status === 429) throw new Error("You're going a bit fast, give it a moment and try again.");
      if (!post.ok) throw new Error("The assistant couldn't respond. Please try again.");
      let d = await post.json();
      setMessages(turnsToMessages(sess(d).turns));
      setRevision(sess(d).revision ?? revision);

      // The POST already returns the completed reply; only poll as a rare fallback.
      const pending = () => {
        const t = (sess(d).turns || []).slice(-1)[0];
        return !(t && asText(t.assistant_message));
      };
      let tries = 0;
      while (pending() && tries < 6) {
        await new Promise((res) => setTimeout(res, 1500));
        const g = await fetch(`${VOICE_API_URL}/api/v1/public/embed/chat/${session}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!g.ok) break;
        d = await g.json();
        setMessages(turnsToMessages(sess(d).turns));
        setRevision(sess(d).revision ?? revision);
        tries++;
      }
    } catch (err) {
      setChatErr(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setChatBusy(false);
    }
  };

  const voiceReady = !!embedToken && !!VOICE_API_URL;
  const greeting = `Hi! I'm Clawleaf's ${agent.label.toLowerCase()} agent. Talk to me by voice or chat, how can I help?`;

  return (
    <div className="relative">
      {/* Ambient glow behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 55% at 70% 20%, hsl(217 91% 60% / 0.22), transparent 70%), radial-gradient(50% 50% at 30% 90%, hsl(196 92% 56% / 0.16), transparent 70%)",
        }}
      />

      <div className="card-surface overflow-hidden rounded-3xl">
        {/* ── Header: Voice/Chat toggle ── */}
        <div className="flex items-center justify-end gap-3 px-4 pt-4 sm:px-5">
          <div className="flex rounded-full border border-border bg-background/50 p-1">
            {(["voice", "chat"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium animate-settle ${
                  mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-glow"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {m === "voice" ? <AudioLines size={15} /> : <MessageSquare size={15} />}
                  {m === "voice" ? "Voice" : "Chat"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Pick an agent (always-visible, obviously selectable) ── */}
        <div className="px-4 pt-3.5 sm:px-5">
          <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Choose who you want to talk to
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {VOICE_AGENTS.map((a) => {
              const on = a.id === agent.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => switchAgent(a)}
                  aria-pressed={on}
                  title={a.label}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-colors ${
                    on
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : "border-border bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                  }`}
                >
                  <a.icon className={`h-3.5 w-3.5 shrink-0 ${on ? "text-primary" : ""}`} />
                  <span className="truncate text-[12.5px] font-medium">{a.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Talk / type ── */}
        <div className="relative mt-3.5" style={{ height: 300 }}>
          <AnimatePresence mode="wait">
            {mode === "voice" ? (
              <motion.div
                key="voice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {webCall && embedToken ? (
                  <div className="flex h-full flex-col border-t border-border">
                    <div className="flex-1 overflow-hidden">
                      <iframe
                        key={agent.id}
                        title={`Clawleaf ${agent.label} voice agent`}
                        src={`/voice-embed.html?token=${encodeURIComponent(embedToken)}&api=${encodeURIComponent(VOICE_API_URL)}`}
                        allow="microphone; autoplay"
                        className="h-full w-full"
                        style={{ border: 0, background: "transparent" }}
                      />
                    </div>
                    <div className="p-3">
                      <button
                        type="button"
                        onClick={() => setWebCall(false)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/30 px-6 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 animate-settle"
                      >
                        <PhoneOff size={16} /> End call
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-between gap-4 border-t border-border px-5 pb-5 pt-5">
                    {/* Orb + greeting */}
                    <div className="flex flex-1 flex-col items-center justify-center gap-4">
                      <motion.div
                        className="relative"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div
                          className="rounded-full"
                          style={{
                            width: 90,
                            height: 90,
                            background:
                              "radial-gradient(circle at 32% 30%, #86efac 0%, #38bdf8 42%, #2563eb 78%, #1e3a8a 100%)",
                            boxShadow: "0 0 46px rgba(56,189,248,0.32), inset 0 0 30px rgba(255,255,255,0.15)",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "radial-gradient(circle at 70% 75%, rgba(134,239,172,0.5), transparent 55%)",
                          }}
                          animate={{ opacity: [0.5, 0.85, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.div>
                      <p className="max-w-[30ch] text-center text-[13px] leading-relaxed text-muted-foreground">
                        {greeting}
                      </p>
                    </div>

                    {/* Primary action */}
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={() => setWebCall(true)}
                        disabled={!voiceReady}
                        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Mic size={16} />
                        Start talking in your browser
                      </button>
                      <p className="mt-2 text-center text-[11px] text-muted-foreground">
                        {voiceReady
                          ? "Allow your microphone when asked, then just start speaking."
                          : "Voice demo is being configured, try the Chat tab for now."}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col border-t border-border"
              >
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.length === 0 && !chatErr && (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                      Say hi to start chatting with the {agent.label.toLowerCase()} agent.
                    </div>
                  )}
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                          m.role === "user"
                            ? "rounded-br-md bg-primary text-primary-foreground"
                            : "rounded-bl-md bg-secondary text-foreground"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {chatBusy && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-md bg-secondary px-4 py-3 text-muted-foreground">
                        <span className="inline-flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0.2s]" />
                        </span>
                      </div>
                    </div>
                  )}
                  {chatErr && <p className="text-center text-xs text-destructive">{chatErr}</p>}
                </div>
                <form onSubmit={sendChat} className="flex items-center gap-2 border-t border-border p-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={chatToken ? "Type a message…" : "Chat is being configured…"}
                    disabled={!chatToken || !session}
                    className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring animate-settle disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || !session || chatBusy}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow disabled:opacity-50 animate-settle"
                  >
                    {chatBusy ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
