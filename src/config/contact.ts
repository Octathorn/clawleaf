export interface Office {
  /** Short country/region name used for labels. */
  country: string;
  /** Full postal address shown to visitors. */
  address: string;
  /** Human-formatted phone number for display. */
  phone: string;
  /** Digits with country code for the tel: link (e.g. "+31641166735"). */
  phoneHref: string;
}

export const OFFICE_ADDRESS =
  "Office 608, Alpha Techno Square NASTP, Old Airport Building Chaklala Cantt. Rawalpindi, Punjab Pakistan";

/** Single company-wide contact email, shown separately from the offices. */
export const CONTACT_EMAIL = "hello@clawleaf.com";

/** Company offices, in display order. */
export const OFFICES: Office[] = [
  {
    country: "Netherlands",
    address: "HTC 9 Beta, 5656AE Eindhoven, The Netherlands",
    phone: "+31 6 41166735",
    phoneHref: "+31641166735",
  },
  {
    country: "Pakistan",
    address: OFFICE_ADDRESS,
    phone: "+92 337 9611571",
    phoneHref: "+923379611571",
  },
];

/** Digits only with country code (e.g. 15551234567). Override with VITE_WHATSAPP_NUMBER in `.env`. */
export function getWhatsAppNumber(): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
  const digits = raw?.replace(/\D/g, "") ?? "";
  if (digits.length >= 10) return digits;
  return "923379611572";
}

export function getWhatsAppChatUrl(): string {
  const text = encodeURIComponent("Hi — I have a question about Clawleaf.");
  return `https://wa.me/${getWhatsAppNumber()}?text=${text}`;
}
