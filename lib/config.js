// Central conversion destinations for the landing page.
// Override per-environment in Vercel via env vars; the fallbacks below keep
// the site working without any env config (same pattern as submitLead.js).

// Malaysian WhatsApp number in international format, digits only (no + or spaces).
// 601123100873 = local 011-2310 0873.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '601123100873';

// Scheduling page for the free lead audit (Cal.com).
// Empty string => "Book" CTAs fall back to scrolling the in-page #book section.
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cal.com/norbulew/free-20min-audit';

export const whatsappBase = `https://wa.me/${WHATSAPP_NUMBER}`;
export const bookingUrl = BOOKING_URL;
export { WHATSAPP_NUMBER };
