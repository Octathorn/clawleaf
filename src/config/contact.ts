export const OFFICE_ADDRESS =
  "Office 608, Alpha Techno Square NASTP, Old Airport Building Chaklala Cantt. Rawalpindi, Punjab Pakistan";

/** Digits only with country code (e.g. 15551234567). Override with VITE_WHATSAPP_NUMBER in `.env`. */
export function getWhatsAppNumber(): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
  const digits = raw?.replace(/\D/g, "") ?? "";
  if (digits.length >= 10) return digits;
  return "18885550123";
}

export function getWhatsAppChatUrl(): string {
  const text = encodeURIComponent("Hi — I have a question about Clawleaf.");
  return `https://wa.me/${getWhatsAppNumber()}?text=${text}`;
}
