# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- [app/layout.js](app/layout.js) — root layout, loads Sora + DM Mono via `next/font`, sets metadata
- [app/page.js](app/page.js) — homepage composition (imports every section component)
- [app/globals.css](app/globals.css) — all global styles, brand tokens, keyframes, responsive rules
- [components/](components/) — one section per file (Nav, Hero, Stats, Problem, AudioDemo, HowItWorks, Features, Testimonials, FAQ, CTA, Footer) plus `RevealAnimations` (scroll-trigger controller)
- [lib/submitLead.js](lib/submitLead.js) — shared n8n webhook submitter + phone validator
- [public/assets/](public/assets/) — logo, demo recording
- [legacy/](legacy/) — pre-migration static HTML (kept for reference, not shipped)

### Server vs. client components

Server components by default. The ones marked `'use client'`:

- `Nav` — scroll state + scroll progress bar
- `Hero` — form submission + mouse-follow glow
- `Stats` — IntersectionObserver counter animation
- `AudioDemo` — `<audio>` playback + waveform animation
- `FAQ` — exclusive-open toggle state
- `CTA` — form submission
- `RevealAnimations` — global IntersectionObserver reveal controller

### n8n Integration

`lib/submitLead.js` posts to `NEXT_PUBLIC_N8N_WEBHOOK_URL` (fallback hard-coded to the original webhook). Both forms send `{ ...fields, timestamp, source: 'zentra-landing-page', formLocation }`.

To override the webhook in Vercel: set `NEXT_PUBLIC_N8N_WEBHOOK_URL` in the project env vars.

## Brand (per [zentra_brand_guidelines.pdf](zentra_brand_guidelines.pdf))

- **Colors** — Deep Navy `#040043`, Electric Blue `#0021F3`, Lavender Pearl `#C1BFE3`, Pure White, Soft Lavender `#F5F4FF`
- **Approved text pairings** — White-on-Navy, White-on-Blue, Pearl-on-Navy, Navy-on-White (never Blue-on-Navy for text)
- **Typography** — Sora 700 Display, Sora 600 H2/H3, Sora 400 body (1.7 leading), DM Mono 500 for stats/data
- **Brand gradient** — `#0021F3 → #C1BFE3` — reserved for logo icon fill, hero `<em>`, waveform, scroll progress, avatars
- **Voice** — direct, confident, specific numbers not superlatives, Ringgit not dollars

## Deployment

Vercel auto-detects Next.js. Push to the connected git branch, done. No `vercel.json` required.
