# Zentra landing — working instructions

Updated 2026-09-15 after the user-approved rebuild. This supersedes the former design-export-only workflow.

## Active architecture

Next.js 15 App Router, React 19, JavaScript and plain CSS. The active server page supplies schema and renders `components/LandingPage.jsx`. Shared workflow, testimonial and FAQ data live in `lib/siteContent.js`. Styles and self-hosted Sora/DM Mono fonts are in `app/globals.css`. The generated-export page is archived in `legacy/generated-export/`; the remaining old components are inactive and must not be reintroduced as proof.

## Product and content

The user broadened the page on 2026-09-16 to businesses with inbound enquiries that lead to appointments or consultations; retain Klang Valley as the service area. Sell the enquiry-to-consultation service, using a clearly fictional workflow demo and a free pilot whose scope is agreed individually. Human exceptions and client participation remain visible. No guaranteed sales, fixed pilot limits, arbitrary prices, scarcity, fake live metrics or unverified testimonials. Akira and ezekutee videos are previous client experiences, not proof of this pilot’s outcomes. Countdown banners require an explicit genuine deadline and label; no rolling or invented scarcity.

## Forms and environment

`/api/lead` delegates to `lib/lead-handler.mjs`. Explicit server `N8N_WEBHOOK_URL` is required; optional `DASHBOARD_LEADS_URL` and `DASHBOARD_LEADS_KEY` mirror confirmed submissions. No hardcoded live destinations. Validate consent and required fields; stamp source/time server-side. Required delivery failure is an error, not a success. Test with mocked integrations, never real lead workflows. See README for configuration. Clarity requires an explicit production ID; leave it unset locally.

## Checks and release

Run `npm run build`, `node --test tests/lead-handler.test.mjs`, and mobile/desktop browser checks. Verify native video playback, keyboard tabs, form errors/success and no horizontal overflow. Keep navy/blue/pearl contrast readable and support reduced motion. Release/push to an auto-deploy branch requires user authorization; local preview alone does not authorise release.
