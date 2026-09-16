# Zentra MY landing page

Next.js landing page for Zentra's enquiry-to-appointment pilot for businesses in Klang Valley.

## Local development

```bash
npm install
npm run dev
```

Microsoft Clarity is disabled locally. It loads in production only when `NEXT_PUBLIC_CLARITY_ID` is explicitly configured.

## Environment

- `N8N_WEBHOOK_URL` — required in production. Server-side webhook destination for pilot applications.
- `DASHBOARD_LEADS_URL` — optional server-side destination for a best-effort dashboard copy.
- `DASHBOARD_LEADS_KEY` — optional `x-leads-key` value used with the dashboard destination.
- `NEXT_PUBLIC_SITE_URL` — canonical production URL. Defaults to the current Vercel placeholder.
- `NEXT_PUBLIC_CLARITY_ID` — optional production-only Microsoft Clarity project ID.

The browser posts applications to `/api/lead`. The server validates and stamps each payload before forwarding it. Do not expose webhook destinations through `NEXT_PUBLIC_*` variables.

## Content and assets

- The active page is implemented with maintainable React in `components/LandingPage.jsx`.
- Shared workflow, testimonial and FAQ content lives in `lib/siteContent.js`. FAQ structured data uses the same source.
- Testimonial videos are stored in `public/testimonials` so deployments do not depend on another repository.
- The superseded generated-export page is archived in `legacy/generated-export/page.js` and is not shipped.

## Validation

```bash
npm run build
node --test tests/lead-handler.test.mjs
```

Deployment is handled separately after the production webhook and contact destinations are verified.

## Rebuild verification — 2026-09-15

Production build and six isolated backend tests passed. Browser checks covered desktop (1440px), mobile (390px), keyboard stage navigation, FAQ, mocked form failure/success, and both videos advancing during muted playback. No live form submission was made. Compatible dependency updates plus a PostCSS override yielded zero reported npm audit vulnerabilities at verification time.

Preview remains local; production environment values and downstream workflow acceptance are not verified. Configure the required server webhook and canonical URL before release. Screenshots were captured in the parent workspace's `outputs/zentra-landing-rebuild/` directory.

## Visual refinement — 2026-09-16

Official Zentra logo rendered as a dimensional CSS object; fictional enquiry cards and a five-stage rail replace the hero testimonial portrait. Real testimonials remain in the proof section. Finite entrance and stage animations include reduced-motion support. Stage-specific responsibility content and persistent walkthrough controls preserve keyboard focus.

Production build and diff whitespace checks passed. In-app browser review verified the corrected 3D logo layering, full-width mobile hero with no horizontal overflow, next-stage control, arrow-key navigation, retained focus and expanded pilot FAQ. Both video elements expose native controls with autoplay disabled and no reported media errors. Backend/form integration logic was unchanged; the existing six isolated backend tests passed earlier in this session. Final local preview is on port 3100. No release or push was performed.

## Pilot announcement and countdown

The default banner says “Open for pilot enquiries.” A countdown appears only when both server variables are supplied for a confirmed real event:

- `PILOT_APPLICATION_DEADLINE`: fixed ISO 8601 date/time with `Z` or explicit timezone offset; use `+08:00` for Malaysia time.
- `PILOT_DEADLINE_LABEL`: the truthful event that ends at that deadline.

No deadline is currently configured. Do not invent one or use a per-visitor rolling deadline. Dates display in Malaysia time. After expiry, the banner states that the deadline passed and invites enquiries about future availability; it does not reset, promise availability or accept anyone into the expired intake. Rebuild after changing these server values because the page is statically rendered.
