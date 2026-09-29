import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Phone, MessageSquare, AudioLines, Send, PhoneOff, ChevronDown, Check, Loader2 } from "lucide-react";
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
  const [pickerOpen, setPickerOpen] = useState(false);

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
    setAgent(a);
    setPickerOpen(false);
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
      if (post.status === 429) throw new Error("You're going a bit fast — give it a moment and try again.");
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

  const greeting = `Hi! I'm the Clawleaf ${agent.label.toLowerCase()} agent. Talk to me by voice or chat — how can I help?`;

  return (
    <div className="bg-card border border-border rounded-3xl shadow-card overflow-hidden">
      {/* Header: use-case picker + Voice/Chat toggle */}
      <div className="flex items-center justify-between gap-3 p-3 border-b border-border">
        {/* Compact agent picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setPickerOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-2 text-sm font-medium text-foreground hover:border-primary/40 animate-settle"
          >
            <agent.icon className="w-4 h-4 text-primary shrink-0" />
            <span className="max-w-[9.5rem] truncate">{agent.label}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${pickerOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {pickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute z-20 mt-2 w-64 rounded-2xl border border-border bg-card p-1.5 shadow-card"
              >
                {VOICE_AGENTS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => switchAgent(a)}
                    className={`flex w-full items-start gap-2.5 rounded-xl px-3 py-2 text-left animate-settle ${
                      a.id === agent.id ? "bg-primary/10" : "hover:bg-secondary"
                    }`}
                  >
                    <a.icon className={`mt-0.5 h-4 w-4 shrink-0 ${a.id === agent.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                        {a.label} {a.id === agent.id && <Check className="h-3.5 w-3.5 text-primary" />}
                      </span>
                      <span className="block text-xs text-muted-foreground leading-snug">{a.desc}</span>
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Voice / Chat segmented toggle */}
        <div className="flex rounded-full border border-border bg-background/40 p-1">
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
                <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-primary shadow-glow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative z-10 inline-flex items-center gap-1.5">
                {m === "voice" ? <AudioLines size={15} /> : <MessageSquare size={15} />}
                {m === "voice" ? "Voice" : "Chat"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="relative" style={{ height: 420 }}>
        <AnimatePresence mode="wait">
          {mode === "voice" ? (
            <motion.div key="voice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              {webCall && embedToken ? (
                <div className="flex h-full flex-col">
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
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-red-500/30 px-6 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 animate-settle"
                    >
                      <PhoneOff size={16} /> End call
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-between p-6">
                  {/* Orb + greeting */}
                  <div className="flex flex-1 flex-col items-center justify-center gap-6">
                    <motion.div
                      className="relative"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div
                        className="rounded-full"
                        style={{
                          width: 148,
                          height: 148,
                          background:
                            "radial-gradient(circle at 32% 30%, #86efac 0%, #38bdf8 42%, #2563eb 78%, #1e3a8a 100%)",
                          boxShadow: "0 0 60px rgba(56,189,248,0.35), inset 0 0 40px rgba(255,255,255,0.15)",
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: "radial-gradient(circle at 70% 75%, rgba(134,239,172,0.5), transparent 55%)" }}
                        animate={{ opacity: [0.5, 0.85, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                    <p className="max-w-[26ch] text-center text-sm text-muted-foreground leading-relaxed">{greeting}</p>
                  </div>

                  {/* Big circular actions */}
                  <div className="flex items-start justify-center gap-10">
                    <button
                      type="button"
                      onClick={() => setWebCall(true)}
                      disabled={!embedToken || !VOICE_API_URL}
                      className="group flex flex-col items-center gap-2 disabled:opacity-50"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-105 group-active:scale-95">
                        <Mic size={24} />
                      </span>
                      <span className="text-xs font-semibold text-foreground">Talk in browser</span>
                    </button>

                    <div className="flex flex-col items-center gap-2">
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground">
                        <Phone size={24} />
                        <span className="absolute -right-1 -top-1 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          SOON
                        </span>
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">Phone call</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col">
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
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary text-foreground rounded-bl-md"
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
  );
}
