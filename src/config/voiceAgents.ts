import { Headphones, CalendarCheck, HeartPulse, Pill } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Selectable demo use cases. Each `id` maps — via env — to a Dograh workflow
 * (its own prompt/behavior):
 *   - browser tab: VITE_DOGRAH_EMBED_TOKENS  = JSON { "<id>": "<embed token>" }
 *   - phone tab:   DOGRAH_WORKFLOW_UUIDS      = JSON { "<id>": "<workflow uuid>" } (server-side)
 * Both fall back to the single VITE_DOGRAH_EMBED_TOKEN / DOGRAH_WORKFLOW_UUID.
 */
export type VoiceAgent = {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
};

export const VOICE_AGENTS: VoiceAgent[] = [
  {
    id: "receptionist",
    label: "Receptionist",
    desc: "Answers, routes calls & takes messages",
    icon: Headphones,
  },
  {
    id: "appointment",
    label: "Appointment Booking",
    desc: "Books, reschedules & confirms visits",
    icon: CalendarCheck,
  },
  {
    id: "coordinator",
    label: "Patient Coordinator",
    desc: "Intake, guidance & follow-ups",
    icon: HeartPulse,
  },
  {
    id: "refills",
    label: "Prescription Refills",
    desc: "Handles refill & pharmacy requests",
    icon: Pill,
  },
];

let _tokenMap: Record<string, string> = {};
try {
  _tokenMap = JSON.parse((import.meta.env.VITE_DOGRAH_EMBED_TOKENS as string) || "{}");
} catch {
  _tokenMap = {};
}
const _fallbackToken = (import.meta.env.VITE_DOGRAH_EMBED_TOKEN as string) || "";

/** Voice embed token for a given use case (browser mic demo), with single-token fallback. */
export function getEmbedToken(agentId: string): string {
  return _tokenMap[agentId] || _fallbackToken || "";
}

let _chatMap: Record<string, string> = {};
try {
  _chatMap = JSON.parse((import.meta.env.VITE_DOGRAH_CHAT_TOKENS as string) || "{}");
} catch {
  _chatMap = {};
}
const _fallbackChat = (import.meta.env.VITE_DOGRAH_CHAT_TOKEN as string) || "";

/** Text-chat embed token for a given use case, with single-token fallback. */
export function getChatToken(agentId: string): string {
  return _chatMap[agentId] || _fallbackChat || "";
}
