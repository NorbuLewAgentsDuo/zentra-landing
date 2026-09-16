import { createLeadHandler } from '@/lib/lead-handler.mjs';

// Explicit server configuration only: local previews never contact a live
// workflow via a hard-coded fallback.
export const POST = createLeadHandler({
  webhookUrl: process.env.N8N_WEBHOOK_URL,
  dashboardUrl: process.env.DASHBOARD_LEADS_URL,
  dashboardKey: process.env.DASHBOARD_LEADS_KEY,
});
