import { Headphones, CalendarCheck, HeartPulse, Pill } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Pre-recorded showcase conversations for the /voice-agents page.
 * Audio was generated once (ElevenLabs) and lives in /public/voice-samples/<id>/NN.mp3,
 * so the site plays static files — no API calls, no ongoing cost.
 * Each line = one clip, which gives perfect transcript sync.
 */
export type ConvoSpeaker = "agent" | "caller";

export type ConvoLine = {
  speaker: ConvoSpeaker;
  name: string;
  text: string;
  file: string;
};

export type Conversation = {
  id: string;
  label: string;
  tagline: string;
  direction: "Inbound" | "Outbound";
  icon: LucideIcon;
  lines: ConvoLine[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "receptionist",
    label: "Front Desk",
    tagline: "Answers, routes & takes messages",
    direction: "Inbound",
    icon: Headphones,
    lines: [
      { speaker: "agent", name: "Ava", text: "Thanks for calling Riverside Family Clinic — this is Ava. How can I help you today?", file: "/voice-samples/receptionist/01.mp3" },
      { speaker: "caller", name: "James", text: "Hi, I think I left my jacket in the waiting room after my appointment yesterday.", file: "/voice-samples/receptionist/02.mp3" },
      { speaker: "agent", name: "Ava", text: "Oh no! Let me check for you. Was it around 3 in the afternoon, with Dr. Lee?", file: "/voice-samples/receptionist/03.mp3" },
      { speaker: "caller", name: "James", text: "Yeah, that's right. It's a navy blue raincoat.", file: "/voice-samples/receptionist/04.mp3" },
      { speaker: "agent", name: "Ava", text: "Found it noted — I'll have the front desk set it aside under your name. Come by anytime we're open.", file: "/voice-samples/receptionist/05.mp3" },
      { speaker: "caller", name: "James", text: "That's such a relief. Thank you!", file: "/voice-samples/receptionist/06.mp3" },
    ],
  },
  {
    id: "appointment",
    label: "Appointment Booking",
    tagline: "Books, reschedules & confirms",
    direction: "Inbound",
    icon: CalendarCheck,
    lines: [
      { speaker: "agent", name: "Ava", text: "Riverside Family Clinic, this is Ava. Would you like to book, reschedule, or confirm a visit?", file: "/voice-samples/appointment/01.mp3" },
      { speaker: "caller", name: "Sophie", text: "I need to move my Thursday appointment — something came up at work.", file: "/voice-samples/appointment/02.mp3" },
      { speaker: "agent", name: "Ava", text: "No problem at all. I have Monday at 10, or Tuesday at 2:30. Which works better for you?", file: "/voice-samples/appointment/03.mp3" },
      { speaker: "caller", name: "Sophie", text: "Tuesday at 2:30 would be perfect.", file: "/voice-samples/appointment/04.mp3" },
      { speaker: "agent", name: "Ava", text: "You're all set for Tuesday at 2:30 with Dr. Lee. I'll text you a reminder the day before.", file: "/voice-samples/appointment/05.mp3" },
      { speaker: "caller", name: "Sophie", text: "Amazing — thank you so much!", file: "/voice-samples/appointment/06.mp3" },
    ],
  },
  {
    id: "coordinator",
    label: "Patient Coordinator",
    tagline: "Intake, reminders & follow-ups",
    direction: "Outbound",
    icon: HeartPulse,
    lines: [
      { speaker: "agent", name: "Ava", text: "Hi, this is Ava calling from Riverside Family Clinic about your visit next week. Do you have a quick minute?", file: "/voice-samples/coordinator/01.mp3" },
      { speaker: "caller", name: "Robert", text: "Sure, go ahead.", file: "/voice-samples/coordinator/02.mp3" },
      { speaker: "agent", name: "Ava", text: "Wonderful. I just need to confirm a couple things — are you still taking any medications daily?", file: "/voice-samples/coordinator/03.mp3" },
      { speaker: "caller", name: "Robert", text: "Just my blood pressure tablet, ten milligrams.", file: "/voice-samples/coordinator/04.mp3" },
      { speaker: "agent", name: "Ava", text: "Perfect, I've noted that. Please remember to fast for eight hours before your blood test. Okay?", file: "/voice-samples/coordinator/05.mp3" },
      { speaker: "caller", name: "Robert", text: "Got it. I'll see you next week.", file: "/voice-samples/coordinator/06.mp3" },
    ],
  },
  {
    id: "refills",
    label: "Prescription Refills",
    tagline: "Refills & pharmacy requests",
    direction: "Inbound",
    icon: Pill,
    lines: [
      { speaker: "agent", name: "Ava", text: "Riverside Family Clinic, this is Ava. I can help with a prescription refill — what do you need?", file: "/voice-samples/refills/01.mp3" },
      { speaker: "caller", name: "Emma", text: "I'm nearly out of my inhaler and I need a refill before the weekend.", file: "/voice-samples/refills/02.mp3" },
      { speaker: "agent", name: "Ava", text: "I can take care of that. I'll send it to your pharmacy on Fifth Street — is that still the right one?", file: "/voice-samples/refills/03.mp3" },
      { speaker: "caller", name: "Emma", text: "Yes, that's the one.", file: "/voice-samples/refills/04.mp3" },
      { speaker: "agent", name: "Ava", text: "Great — it'll be ready for pickup this afternoon. Is there anything else I can help with?", file: "/voice-samples/refills/05.mp3" },
      { speaker: "caller", name: "Emma", text: "No, that's everything. Thank you!", file: "/voice-samples/refills/06.mp3" },
    ],
  },
];
