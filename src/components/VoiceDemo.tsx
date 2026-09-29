import { useState } from "react";
import { Phone, Mic, Loader2, CheckCircle2, AlertCircle, PhoneOff } from "lucide-react";
import { VOICE_AGENTS, getEmbedToken, type VoiceAgent } from "@/config/voiceAgents";

/**
 * Live voice-agent demo. The visitor picks a use case (Receptionist,
 * Appointment Booking, …) then either:
 *  - "Get a call": posts to /api/voice-ai-call (which asks the local Dograh
 *    agent for that use case to ring their phone). Works from anywhere.
 *  - "Talk in browser": loads that use case's self-hosted widget in an iframe.
 *
 * Config (Vite env, baked at build time):
 *  - VITE_VOICE_API_URL         e.g. https://voice-api.ot-technologies.com
 *  - VITE_DOGRAH_EMBED_TOKENS   JSON { "<agentId>": "<token>" } (browser tab)
 *  - VITE_DOGRAH_EMBED_TOKEN    single fallback token
 */

const VOICE_API_URL = (import.meta.env.VITE_VOICE_API_URL as string | undefined)?.replace(/\/$/, "") || "";

const COUNTRIES = [
  { code: "+1", label: "US / Canada", flag: "🇺🇸" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+92", label: "Pakistan", flag: "🇵🇰" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
];

type Tab = "call" | "browser";
type CallStatus = "idle" | "submitting" | "success" | "error";

export default function VoiceDemo() {
  const [agent, setAgent] = useState<VoiceAgent>(VOICE_AGENTS[0]);
  const [tab, setTab] = useState<Tab>("call");

  // Phone tab
  const [name, setName] = useState("");
  const [dialCode, setDialCode] = useState("+1");
  const [number, setNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<CallStatus>("idle");
  const [message, setMessage] = useState("");

  // Browser tab
  const [browserActive, setBrowserActive] = useState(false);

  const embedToken = getEmbedToken(agent.id);

  const chooseAgent = (a: VoiceAgent) => {
    setAgent(a);
    setBrowserActive(false); // reset any live browser session when switching use case
    setStatus("idle");
    setMessage("");
  };

  const submitCall = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = number.replace(/[^\d]/g, "");
    if (!digits) {
      setStatus("error");
      setMessage("Please enter a valid phone number.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage("Please accept the consent to receive a call.");
      return;
    }
    const phone_number = `${dialCode}${digits}`;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/voice-ai-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone_number, agent: agent.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
      setStatus("success");
      setMessage(`Our ${agent.label} agent is calling you now at ${phone_number}. Your phone should ring shortly.`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-card rounded-3xl shadow-card border border-border overflow-hidden">
      {/* Use-case selector */}
      <div className="p-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Choose an agent to demo
        </p>
        <div className="grid grid-cols-2 gap-2">
          {VOICE_AGENTS.map((a) => {
            const active = a.id === agent.id;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => chooseAgent(a)}
                aria-pressed={active}
                className={`text-left rounded-2xl border p-3 animate-settle ${
                  active
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  <a.icon className={`w-4 h-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-semibold text-foreground">{a.label}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{a.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-2 gap-2 border-b border-border bg-secondary/40">
        <button
          type="button"
          onClick={() => setTab("call")}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold animate-settle ${
            tab === "call" ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Phone size={16} /> Get a call
        </button>
        <button
          type="button"
          onClick={() => setTab("browser")}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold animate-settle ${
            tab === "browser" ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Mic size={16} /> Talk in browser
        </button>
      </div>

      <div className="p-8">
        {tab === "call" ? (
          <form onSubmit={submitCall} className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Get a call from the {agent.label} agent
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter your number and the Clawleaf {agent.label.toLowerCase()} agent will call you directly.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Name <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring animate-settle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Phone number</label>
              <div className="flex gap-2">
                <select
                  value={dialCode}
                  onChange={(e) => setDialCode(e.target.value)}
                  className="rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring animate-settle"
                  aria-label="Country dial code"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.label} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  inputMode="tel"
                  placeholder="555 123 4567"
                  className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring animate-settle"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input accent-primary"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                I consent to receive a one-time demo call and to the processing of my number for this
                call, as described in the Privacy Policy.
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:opacity-90 animate-settle disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Calling…
                </>
              ) : (
                <>
                  <Phone size={18} /> Get a call
                </>
              )}
            </button>

            {message && (
              <div
                className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
                  status === "success" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}
          </form>
        ) : (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Talk to the {agent.label} agent in your browser
              </h3>
              <p className="text-sm text-muted-foreground">
                Click start and allow microphone access to have a live voice conversation — no phone
                number needed.
              </p>
            </div>

            {!browserActive ? (
              <button
                type="button"
                onClick={() => setBrowserActive(true)}
                disabled={!embedToken || !VOICE_API_URL}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:opacity-90 animate-settle disabled:opacity-60"
              >
                <Mic size={18} /> Start conversation
              </button>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-border bg-secondary/30">
                  <iframe
                    key={agent.id}
                    title={`Clawleaf ${agent.label} agent`}
                    src={`/voice-embed.html?token=${encodeURIComponent(embedToken)}&api=${encodeURIComponent(VOICE_API_URL)}`}
                    allow="microphone; autoplay"
                    className="w-full"
                    style={{ height: 420, border: "0" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setBrowserActive(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold border border-border text-foreground hover:bg-secondary animate-settle"
                >
                  <PhoneOff size={18} /> End
                </button>
              </div>
            )}
            {(!embedToken || !VOICE_API_URL) && (
              <p className="text-xs text-muted-foreground">
                The browser demo for {agent.label} is being configured. Try “Get a call” meanwhile.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
