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

// Production URL (canonical, OG, sitemap, JSON-LD). Override via NEXT_PUBLIC_SITE_URL.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zentra-landing.vercel.app';

export const whatsappBase = `https://wa.me/${WHATSAPP_NUMBER}`;
// Pre-filled "book a lead audit" chat link, reused by the sticky mobile CTA.
export const whatsappBookHref = `${whatsappBase}?text=Hi%20Zentra%2C%20I'd%20like%20to%20book%20a%20free%20lead%20audit`;
export const bookingUrl = BOOKING_URL;
export const siteUrl = SITE_URL;
export { WHATSAPP_NUMBER };
