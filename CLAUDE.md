# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zentra MY is a Next.js (App Router) landing page for Zentra — an AI lead conversion system targeting Malaysian B2C service businesses. Deployed on Vercel. Lead submissions are posted to an n8n webhook.

## Tech Stack

- Next.js 15 (App Router, JS)
- React 19
- `next/font` for Bricolage Grotesque + Figtree
- Plain CSS in [app/globals.css](app/globals.css) — no Tailwind, no CSS-in-JS
- Vercel for hosting

## Development Commands

```bash
npm run dev      # next dev on :3000
npm run build    # production build
npm run start    # serve production build locally
npm run lint     # next lint
```

## Architecture

Hand-authored React. One page, one form.

- [app/page.js](app/page.js) — JSON-LD (business + FAQ) and `<LandingPage />`.
- [components/LandingPage.jsx](components/LandingPage.jsx) — every section, in Hormozi order: hook, mystery-shop scoreboard, why, how (`JourneyInfographic`), Zentra Relay, offer stack + guarantee, fit, testimonials, founder note, FAQ, audit form. Copy is inline; FAQs and testimonials live in [lib/siteContent.js](lib/siteContent.js).
- [components/AuditForm.jsx](components/AuditForm.jsx) — the free Enquiry Audit form (WhatsApp, business type, ad spend, honeypot, UTM + referrer capture). Posts to `/api/lead`.
- [lib/lead-handler.mjs](lib/lead-handler.mjs) — validates and forwards to `N8N_WEBHOOK_URL` (required) then `DASHBOARD_LEADS_URL` (optional). No webhook configured = 503, so local previews never reach live n8n. Choices and phone normalisation are shared via [lib/auditOptions.mjs](lib/auditOptions.mjs). Tests: `node --test tests/`.
- [components/Mascot.jsx](components/Mascot.jsx) + `app/mascot.css` — Mochi and Orb, ported from Zentra Relay.
- `components/DesignInteractions.jsx`, `landingMarkup.js`, `SiteChrome.jsx`, `Infographics.jsx`, `lib/submitLead.js` and `legacy/` are unused leftovers from earlier designs.

## Brand

Direction A "Scoreboard" (vault Decision Log 2026-10-29); tokens in [DESIGN.md](DESIGN.md) and `app/globals.css`. The older navy/electric-blue/Sora guidelines are superseded.

## Deployment

Vercel auto-detects Next.js. Push to the connected git branch, done. No `vercel.json` required.
