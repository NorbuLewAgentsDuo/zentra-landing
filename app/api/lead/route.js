import { N8N_WEBHOOK_URL } from '@/lib/submitLead';

// Server-side lead fan-out. The browser posts the raw form payload here
// (see lib/submitLead.js); we forward it to n8n (unchanged behavior) and
// best-effort mirror a normalized copy into the Zentra OS dashboard CRM.
// Neither leg blocks the other — a dashboard outage must never break the
// user-facing "thanks, we got it" flow, and vice versa.

const DASHBOARD_LEADS_URL = process.env.DASHBOARD_LEADS_URL;
const DASHBOARD_LEADS_KEY = process.env.DASHBOARD_LEADS_KEY;
const SERVER_N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || N8N_WEBHOOK_URL;

// Fields we lift into the dashboard's dedicated columns; everything else
// on the payload gets flattened into `notes` so nothing is silently dropped.
const KNOWN_FIELDS = new Set([
  'name',
  'email',
  'phone',
  'company',
  'businessName',
  'formLocation',
  'timestamp',
  'source',
]);

function buildDashboardPayload(payload) {
  const name = (payload.name || '').toString().trim();
  const businessName = (payload.businessName || payload.company || '').toString().trim();
  const email = (payload.email || '').toString().trim();
  const phone = (payload.phone || '').toString().trim();

  const noteLines = Object.entries(payload)
    .filter(([key, value]) => !KNOWN_FIELDS.has(key) && value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}: ${value}`);
  if (payload.formLocation) noteLines.push(`formLocation: ${payload.formLocation}`);

  return {
    name: name || businessName || 'Zentra Landing Lead',
    company: businessName || name,
    email,
    phone,
    platform: 'Other',
    source: 'Zentra Landing',
    quality: 'Warm',
    notes: noteLines.join('\n'),
  };
}

async function forwardToN8n(payload) {
  const res = await fetch(SERVER_N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('n8n HTTP ' + res.status);
}

async function forwardToDashboard(payload) {
  const headers = { 'Content-Type': 'application/json' };
  if (DASHBOARD_LEADS_KEY) headers['x-leads-key'] = DASHBOARD_LEADS_KEY;
  const res = await fetch(DASHBOARD_LEADS_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(buildDashboardPayload(payload)),
  });
  if (!res.ok) throw new Error('dashboard HTTP ' + res.status);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = (body?.name || '').toString().trim();
  const phone = (body?.phone || '').toString().trim();
  if (!name && !phone) {
    return Response.json({ ok: false, error: 'name or phone is required' }, { status: 400 });
  }

  const payload = {
    ...body,
    timestamp: body.timestamp || new Date().toISOString(),
    source: body.source || 'zentra-landing-page',
  };

  const [n8nResult, dashboardResult] = await Promise.allSettled([
    forwardToN8n(payload),
    DASHBOARD_LEADS_URL ? forwardToDashboard(payload) : Promise.resolve('skipped'),
  ]);

  if (n8nResult.status === 'rejected') {
    console.error('[api/lead] n8n forward failed:', n8nResult.reason);
  }
  if (dashboardResult.status === 'rejected') {
    console.error('[api/lead] dashboard forward failed:', dashboardResult.reason);
  }

  if (n8nResult.status === 'rejected') {
    // Preserve the existing user-facing contract: the n8n leg failing is a
    // real failure the form should surface, even though the dashboard leg
    // is always best-effort.
    return Response.json({ ok: false, error: 'Failed to submit lead' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
