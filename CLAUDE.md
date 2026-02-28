# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zentra MY is a static landing page for an AI voice receptionist service targeting Malaysian solar companies. It captures leads via a two-step modal form that triggers an n8n webhook to initiate AI-powered demo calls.

## Development Commands

```bash
# Run locally (Python)
python -m http.server 8000

# Run locally (Node.js)
npx serve

# Open directly in VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

No build step required - this is a static HTML/CSS/JS project using Tailwind CSS via CDN.

## Architecture

### File Structure
- `index.html` - Single-page landing with all sections (hero, features, FAQ, modal)
- `src/main.js` - All JavaScript: modal logic, form validation, n8n webhook submission, FAQ accordion, audio player
- `src/styles.css` - Custom CSS extending Tailwind (animations, modal styles, mobile optimizations)
- `assets/` - Static assets (audio files for demo)

### Key Integration
The lead capture form POSTs to an n8n webhook endpoint (configured in `src/main.js:7`):
```javascript
const N8N_WEBHOOK_URL = 'https://norbulew.app.n8n.cloud/webhook/...'
```

Payload: `{ name, phone, timestamp, source: 'zentra-landing-page' }`

### UI Patterns
- Modal uses `data-open-modal` attribute on trigger elements
- Two-step form with animated transitions (`.step-visible`/`.step-hidden`)
- FAQ accordion with exclusive open behavior
- Phone-style audio player with waveform animation

### Styling
- Tailwind CSS via CDN with custom config in `<script>` tag
- CSS custom properties in `:root` for brand colors
- Mobile-first with iOS Safari safe-area support
- Green (#22c55e) as primary accent color
