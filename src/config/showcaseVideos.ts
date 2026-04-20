/**
 * CDN showcase clips (Vercel Blob). Keys align with on-page feature titles where possible.
 */
export const showcaseVideos = {
  automatedAppointmentBooking:
    "https://amf7e7esqocdzskc.public.blob.vercel-storage.com/Automated%20Appointment%20Booking.mp4",
  aiDocumentSummarization:
    "https://amf7e7esqocdzskc.public.blob.vercel-storage.com/Ai%20Document%20Summarization.mp4",
  computerVisionMedicalImaging:
    "https://amf7e7esqocdzskc.public.blob.vercel-storage.com/Computer%20Vision%20for%20Medical%20Imaging.mp4",
  largeDocumentAnalysis:
    "https://amf7e7esqocdzskc.public.blob.vercel-storage.com/Large%20Document%20Analysis.mp4",
  medicalOcrDocumentsProcessing:
    "https://amf7e7esqocdzskc.public.blob.vercel-storage.com/Medical%20OCR%20%26%20Documents%20Processing%20Ad_1.mp4",
  secureMedicalDataProcessing:
    "https://amf7e7esqocdzskc.public.blob.vercel-storage.com/Secure%20Medical%20Data%20Processing.mp4",
  smartMedicalFormProcessing:
    "https://amf7e7esqocdzskc.public.blob.vercel-storage.com/Smart%20Medical%20Form%20Processing.mp4",
} as const;

/** Home hero: broad pipeline demo; poster image matches prior static art. */
export const heroShowcaseVideoSrc = showcaseVideos.medicalOcrDocumentsProcessing;

/** Proof band: matches 24/7 scheduling / patient-facing automation narrative. */
export const videoProofShowcaseSrc = showcaseVideos.automatedAppointmentBooking;

/** Maps use case titles (home grid + use cases page) → clip URL. */
export const useCaseVideoByTitle: Record<string, string> = {
  "Patient Intake Automation": showcaseVideos.smartMedicalFormProcessing,
  "Insurance Claim Processing": showcaseVideos.largeDocumentAnalysis,
  "Lab Result Extraction": showcaseVideos.medicalOcrDocumentsProcessing,
  "Medical Record Summarization": showcaseVideos.aiDocumentSummarization,
  "Voice Appointment Booking": showcaseVideos.automatedAppointmentBooking,
  "AI Reception Handling": showcaseVideos.automatedAppointmentBooking,
  "Medical Form Automation": showcaseVideos.smartMedicalFormProcessing,
  "Clinical Documentation": showcaseVideos.aiDocumentSummarization,
};

/** Maps `ProductPage` feature headings → clip URL. */
export const productFeatureVideoByTitle: Record<string, string> = {
  "Medical OCR Engine": showcaseVideos.medicalOcrDocumentsProcessing,
  "Document AI": showcaseVideos.aiDocumentSummarization,
  "Computer Vision": showcaseVideos.computerVisionMedicalImaging,
  "Voice AI": showcaseVideos.automatedAppointmentBooking,
  "Workflow Automation": showcaseVideos.largeDocumentAnalysis,
  "Security Layer": showcaseVideos.secureMedicalDataProcessing,
};
