/**
 * Showcase clips (Cloudinary). `computerVisionMedicalImaging` still uses prior host until a Cloudinary imaging clip is available.
 */
export const showcaseVideos = {
  automatedAppointmentBooking:
    "https://res.cloudinary.com/dcfozdufs/video/upload/v1777464963/Automated_Appointment_Booking_y2yvxt.mp4",
  voiceAiReceptionHandling:
    "https://res.cloudinary.com/dcfozdufs/video/upload/v1777464955/Voice_AI_Reception_Handling_itl0ee.mp4",
  aiDocumentSummarization:
    "https://res.cloudinary.com/dcfozdufs/video/upload/v1777464960/Ai_Document_Summarization_u5rhop.mp4",
  aiDocumentSummarizationAlt:
    "https://res.cloudinary.com/dcfozdufs/video/upload/v1777464913/Ai_Document_Summarization_dseed3.mp4",
  computerVisionMedicalImaging:
    "https://amf7e7esqocdzskc.public.blob.vercel-storage.com/Computer%20Vision%20for%20Medical%20Imaging.mp4",
  largeDocumentAnalysis:
    "https://res.cloudinary.com/dcfozdufs/video/upload/v1777464962/Large_Document_Analysis_sgqp6f.mp4",
  medicalOcrDocumentsProcessing:
    "https://res.cloudinary.com/dcfozdufs/video/upload/v1777464965/Medical_OCR_Documents_Processing_Ad_1_vneogg.mp4",
  secureMedicalDataProcessing:
    "https://res.cloudinary.com/dcfozdufs/video/upload/v1777464963/Secure_Medical_Data_Processing_yevetc.mp4",
  smartMedicalFormProcessing:
    "https://res.cloudinary.com/dcfozdufs/video/upload/v1777464949/Smart_Medical_Form_Processing_at2quw.mp4",
} as const;

/** Skip the first ~3–4s on every showcase clip (branding intros); tile `startAtSeconds` values are extra offset on top of this. */
export const SHOWCASE_VIDEO_DEFAULT_START_SECONDS = 3.5;

/** Resolved clip for `<ShowcaseVideo />` (optional stagger when the same file is reused under different titles). */
export type ShowcaseClip = string | { src: string; startAtSeconds?: number };

export function getShowcaseClip(entry: ShowcaseClip | undefined): { src: string; startAtSeconds?: number } {
  if (entry == null) return { src: "" };
  const base = SHOWCASE_VIDEO_DEFAULT_START_SECONDS;
  if (typeof entry === "string") return { src: entry, startAtSeconds: base };
  const rel = entry.startAtSeconds ?? 0;
  return { src: entry.src, startAtSeconds: base + rel };
}

/** Home hero: broad pipeline demo; poster image matches prior static art. */
export const heroShowcaseVideoSrc = showcaseVideos.medicalOcrDocumentsProcessing;

/** Proof band: matches 24/7 scheduling / patient-facing automation narrative. */
export const videoProofShowcaseSrc = showcaseVideos.automatedAppointmentBooking;

/** Maps use case titles (home grid + use cases page) → clip. Stagger `startAtSeconds` when reusing the same URL. */
export const useCaseVideoByTitle: Record<string, ShowcaseClip> = {
  "Patient Intake Automation": { src: showcaseVideos.smartMedicalFormProcessing, startAtSeconds: 0 },
  "Insurance Claim Processing": { src: showcaseVideos.largeDocumentAnalysis, startAtSeconds: 0 },
  "Lab Result Extraction": { src: showcaseVideos.medicalOcrDocumentsProcessing, startAtSeconds: 2.5 },
  "Medical Record Summarization": { src: showcaseVideos.aiDocumentSummarization, startAtSeconds: 0 },
  "Voice Appointment Booking": { src: showcaseVideos.voiceAiReceptionHandling, startAtSeconds: 0 },
  "AI Reception Handling": { src: showcaseVideos.voiceAiReceptionHandling, startAtSeconds: 3 },
  "Medical Form Automation": { src: showcaseVideos.smartMedicalFormProcessing, startAtSeconds: 3 },
  "Clinical Documentation": { src: showcaseVideos.aiDocumentSummarizationAlt, startAtSeconds: 3 },
  "Agentic Operations & Orchestration": { src: showcaseVideos.largeDocumentAnalysis, startAtSeconds: 2.5 },
};

/** Maps `ProductPage` feature headings → clip. */
export const productFeatureVideoByTitle: Record<string, ShowcaseClip> = {
  "Healthcare AI Agents": { src: showcaseVideos.largeDocumentAnalysis, startAtSeconds: 0 },
  "Medical OCR Engine": { src: showcaseVideos.medicalOcrDocumentsProcessing, startAtSeconds: 0 },
  "Document AI": { src: showcaseVideos.aiDocumentSummarization, startAtSeconds: 0 },
  "Computer Vision": { src: showcaseVideos.computerVisionMedicalImaging, startAtSeconds: 0 },
  "Voice AI": { src: showcaseVideos.voiceAiReceptionHandling, startAtSeconds: 0 },
  "Workflow Automation": { src: showcaseVideos.largeDocumentAnalysis, startAtSeconds: 3.5 },
  "Security Layer": { src: showcaseVideos.secureMedicalDataProcessing, startAtSeconds: 2.5 },
};
