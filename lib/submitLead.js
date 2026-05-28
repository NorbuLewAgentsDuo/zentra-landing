const FALLBACK =
  'https://norbulew.app.n8n.cloud/webhook/5949290a-96cd-4b57-bf1d-a3c2ae39fde7';

export const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || FALLBACK;

export async function submitLead(payload) {
  const res = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      timestamp: new Date().toISOString(),
      source: 'zentra-landing-page',
    }),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
}

export function isValidPhone(v) {
  if (!/^[\d\s\-+()]+$/.test(v)) return false;
  return v.replace(/\D/g, '').length >= 8;
}
