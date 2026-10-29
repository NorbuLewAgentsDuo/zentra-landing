// Choices on the Enquiry Audit form. Shared by the form and the server-side validator so they can't drift.
export const BUSINESS_TYPES = ['Clinic', 'Dental', 'Chiro & physio', 'Aesthetics', 'Tuition', 'Home services', 'Other'];
export const AD_SPEND_OPTIONS = ['Not running ads', 'Under RM1k', 'RM1k–3k', 'RM3k–10k', 'RM10k+'];
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

// Malaysian numbers in any common shape ("012-345 6789", "+60 12 345 6789", "12 3456789") → "60123456789".
export function normalisePhone(raw) {
  let digits = String(raw || '').replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `6${digits}`;
  else if (!digits.startsWith('60')) digits = `60${digits}`;
  return /^60\d{8,10}$/.test(digits) ? digits : null;
}
