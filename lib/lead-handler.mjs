const LIMITS = { name: 120, businessName: 200, website: 500, email: 254, enquirySituation: 2000 };

export function validateLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const lead = {};
  for (const [field, limit] of Object.entries(LIMITS)) {
    if (body[field] !== undefined && typeof body[field] !== 'string') return null;
    lead[field] = (body[field] || '').trim();
    if (lead[field].length > limit || (field !== 'website' && !lead[field])) return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || body.contactConsent !== true) return null;
  if (lead.website) {
    try {
      const url = new URL(lead.website.includes('://') ? lead.website : `https://${lead.website}`);
      if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password) return null;
      lead.website = url.href;
    } catch { return null; }
  }
  return { ...lead, contactConsent: true, formLocation: 'free-pilot-application', source: 'zentra-landing-page', timestamp: new Date().toISOString() };
}

export function createLeadHandler({ webhookUrl, dashboardUrl, dashboardKey, fetchImpl = fetch, timeoutMs = 8000 }) {
  async function forward(url, payload, headers = {}) {
    const controller = new AbortController();
    let timer;
    try {
      const response = await Promise.race([
        fetchImpl(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(payload), signal: controller.signal }),
        new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error('timeout')); }, timeoutMs); }),
      ]);
      if (!response.ok) throw new Error('upstream failure');
    } finally { clearTimeout(timer); }
  }
  return async function POST(request) {
    let body;
    try { body = await request.json(); } catch { return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 }); }
    const payload = validateLead(body);
    if (!payload) return Response.json({ ok: false, error: 'Please check your details and permission to respond.' }, { status: 400 });
    if (!webhookUrl) return Response.json({ ok: false, error: 'Applications are temporarily unavailable. Please try again later.' }, { status: 503 });
    // Deliver to the required system first. A rejected application must not create
    // an unacknowledged dashboard record that duplicates when the visitor retries.
    try { await forward(webhookUrl, payload); }
    catch { return Response.json({ ok: false, error: 'We could not confirm receipt. Please try again later.' }, { status: 502 }); }
    if (dashboardUrl) {
      try {
        await forward(dashboardUrl, {
          name: payload.name, company: payload.businessName, email: payload.email,
          platform: 'Other', source: 'Zentra Landing', quality: 'Warm',
          notes: `Website: ${payload.website || 'Not supplied'}\nEnquiry situation: ${payload.enquirySituation}\nPermission to respond: yes\nSubmitted: ${payload.timestamp}`,
        }, dashboardKey ? { 'x-leads-key': dashboardKey } : {});
      } catch { console.error('[lead] Optional dashboard delivery failed; primary receipt confirmed.'); }
    }
    return Response.json({ ok: true });
  };
}
