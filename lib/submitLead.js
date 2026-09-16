// Posts to our own /api/lead route instead of the n8n webhook directly.
// The server route forwards to n8n (preserving today's behavior) and
// best-effort mirrors the lead into the Zentra OS dashboard CRM. Timestamp
// + source enrichment now happens server-side (see app/api/lead/route.js)
// so it isn't duplicated here.
export async function submitLead(payload) {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
}

export function isValidPhone(v) {
  if (!/^[\d\s\-+()]+$/.test(v)) return false;
  return v.replace(/\D/g, '').length >= 8;
}
