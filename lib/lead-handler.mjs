import { AD_SPEND_OPTIONS, BUSINESS_TYPES, UTM_KEYS, normalisePhone } from './auditOptions.mjs';

const REQUIRED = { name: 120, businessName: 200 };
const OPTIONAL = { enquiryChannel: 300, email: 254, referrer: 500, landingPath: 500, ...Object.fromEntries(UTM_KEYS.map((k) => [k, 200])) };

// Returns the normalized lead, 'bot' for a filled honeypot, or null when invalid.
export function validateLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  for (const key of ['company_website', 'businessType', 'adSpend', 'whatsapp', ...Object.keys(REQUIRED), ...Object.keys(OPTIONAL)]) {
    if (body[key] !== undefined && typeof body[key] !== 'string') return null;
  }
  if ((body.company_website || '').trim()) return 'bot';

  const lead = {};
  for (const [field, limit] of Object.entries({ ...REQUIRED, ...OPTIONAL })) {
    lead[field] = (body[field] || '').trim();
    if (lead[field].length > limit || (field in REQUIRED && !lead[field])) return null;
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return null;
  if (!BUSINESS_TYPES.includes(body.businessType) || !AD_SPEND_OPTIONS.includes(body.adSpend)) return null;
  const whatsapp = normalisePhone(body.whatsapp);
  if (!whatsapp || body.contactConsent !== true) return null;

  const { businessType, adSpend } = body;
  // One readable line for the n8n flow and the dashboard, which were built around a free-text "situation" field.
  const enquirySituation = `${businessType} · ad spend ${adSpend} · enquire at ${lead.enquiryChannel || 'not given'}`;
  return {
    ...lead, businessType, adSpend, whatsapp, enquirySituation, contactConsent: true,
    formLocation: 'free-enquiry-audit', source: 'zentra-landing-page', timestamp: new Date().toISOString(),
  };
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
    // Pretend a bot's submission worked so it moves on.
    if (payload === 'bot') return Response.json({ ok: true });
    if (!payload) return Response.json({ ok: false, error: 'Please check your details and permission to contact you.' }, { status: 400 });
    if (!webhookUrl) return Response.json({ ok: false, error: 'Audit requests are temporarily unavailable. Please try again later.' }, { status: 503 });
    // Deliver to the required system first. A rejected request must not create
    // an unacknowledged dashboard record that duplicates when the visitor retries.
    try { await forward(webhookUrl, payload); }
    catch { return Response.json({ ok: false, error: 'We could not confirm receipt. Please try again in a minute.' }, { status: 502 }); }
    if (dashboardUrl) {
      try {
        await forward(dashboardUrl, {
          name: payload.name, company: payload.businessName, email: payload.email, phone: payload.whatsapp,
          platform: 'Other', source: 'Zentra Landing', quality: 'Warm',
          notes: [
            `Free Enquiry Audit request`,
            `WhatsApp: ${payload.whatsapp}`,
            `Business type: ${payload.businessType}`,
            `Monthly ad spend: ${payload.adSpend}`,
            `Where to enquire: ${payload.enquiryChannel || 'Not supplied'}`,
            `Came from: ${payload.utm_source || payload.referrer || 'direct'}${payload.utm_campaign ? ` / ${payload.utm_campaign}` : ''}`,
            `Permission to contact: yes`,
            `Submitted: ${payload.timestamp}`,
          ].join('\n'),
        }, dashboardKey ? { 'x-leads-key': dashboardKey } : {});
      } catch { console.error('[lead] Optional dashboard delivery failed; primary receipt confirmed.'); }
    }
    return Response.json({ ok: true });
  };
}
