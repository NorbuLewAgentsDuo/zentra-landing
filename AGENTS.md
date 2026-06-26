# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Zentra MY is a Next.js (App Router) landing page for Zentra — an AI lead conversion system targeting Malaysian B2C service businesses. Deployed on Vercel. Lead submissions are posted to an n8n webhook.

## Tech Stack

- Next.js 15 (App Router, JS)
- React 19
- `next/font` for Sora + DM Mono (no external Google Fonts link)
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

### Directory Layout

The current homepage is a faithful port of Norbu's design export (`Zentra MY.html`). The static markup is rendered verbatim; only the interactivity is React.

- [app/layout.js](app/layout.js) — root layout + metadata. Fonts (Sora + DM Mono) are self-hosted via `@font-face` in globals.css — **no `next/font`**.
- [app/page.js](app/page.js) — renders the design markup via `dangerouslySetInnerHTML` and mounts `DesignInteractions`.
- [app/globals.css](app/globals.css) — the design's CSS verbatim (self-hosted `@font-face`, brand tokens, keyframes, responsive rules). Generated from the export; edit the design or re-run the unpack, don't hand-tune.
- [components/landingMarkup.js](components/landingMarkup.js) — **generated** static HTML string (the whole page body). Template bindings (`{{ }}`) were resolved to `data-z-*` hooks. Don't hand-edit; regenerate from the design export.
- [components/DesignInteractions.jsx](components/DesignInteractions.jsx) — the single `'use client'` island. Ports the export's `DCLogic` 1:1: scroll reveal (`.reveal`), count-up stats (`.z-count`), mobile menu (`[data-z-toggle]/[data-z-close]` → `[data-z-menu].open`), exclusive-open FAQ (`[data-z-faq-btn]` → `[data-faq].open`), and the lead-loss calculator (3 `[data-z-input]` sliders → `[data-z-out]` labels).
- [public/assets/design/](public/assets/design/) — the export's self-hosted fonts (6× woff2) + image, referenced by globals.css and the markup.
- [lib/submitLead.js](lib/submitLead.js) — n8n webhook submitter. **Currently unused** — the new design has no lead form (CTAs are anchors to `#book` / WhatsApp). Kept for when a form is reintroduced.
- [legacy/](legacy/) — superseded versions, not shipped. `legacy/react-app/` holds the previous React-component site (Nav/Hero/Stats/… + globals.css); `legacy/index.html` etc. are the pre-migration static HTML.

### Updating the design

The page is a port of a design-tool export, not hand-authored React. To change content/layout, edit the design and re-export, then re-unpack: decode the bundle's manifest+template, resolve the `{{ }}` bindings to `data-z-*` hooks, and regenerate `components/landingMarkup.js` + `app/globals.css` + `public/assets/design/`. If you add interactivity, wire it in `DesignInteractions.jsx` by `data-*` selector (don't put logic in the markup).

### n8n Integration

`lib/submitLead.js` posts to `NEXT_PUBLIC_N8N_WEBHOOK_URL` (fallback hard-coded to the original webhook), sending `{ ...fields, timestamp, source: 'zentra-landing-page', formLocation }`. Override in Vercel via the `NEXT_PUBLIC_N8N_WEBHOOK_URL` env var. Not wired into the current design — reconnect it when a lead form is added back.

## Brand (per [zentra_brand_guidelines.pdf](zentra_brand_guidelines.pdf))

- **Colors** — Deep Navy `#040043`, Electric Blue `#0021F3`, Lavender Pearl `#C1BFE3`, Pure White, Soft Lavender `#F5F4FF`
- **Approved text pairings** — White-on-Navy, White-on-Blue, Pearl-on-Navy, Navy-on-White (never Blue-on-Navy for text)
- **Typography** — Sora 700 Display, Sora 600 H2/H3, Sora 400 body (1.7 leading), DM Mono 500 for stats/data
- **Brand gradient** — `#0021F3 → #C1BFE3` — reserved for logo icon fill, hero `<em>`, waveform, scroll progress, avatars
- **Voice** — direct, confident, specific numbers not superlatives, Ringgit not dollars

## Deployment

Vercel auto-detects Next.js. Push to the connected git branch, done. No `vercel.json` required.
