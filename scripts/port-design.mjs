// Re-ports Norbu's newest design export (Zentra MY.dc.html) into this Next app:
//   - components/landingMarkup.js  (static body, {{ }} -> data-z-* hooks)
//   - app/globals.css              (design-CSS block swapped; @font-face + app
//                                   additions preserved)
// Run: node scripts/port-design.mjs <path-to-dc-html-getfile.json>
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = process.argv[2];
const root = new URL('..', import.meta.url);
const raw = JSON.parse(readFileSync(SRC, 'utf8')).content;

// --- pull the two pieces out of the .dc.html export ---
const styleInner = raw.match(/<style>([\s\S]*?)<\/style>/)[1];
let body = raw.match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1];
// drop the <helmet> block (fonts/style live in globals.css / layout head)
body = body.replace(/<helmet>[\s\S]*?<\/helmet>/, '').trim();

// --- resolve the {{ }} reactive bindings to the app's data-z-* hooks ---
const repl = [
  ['onClick="{{ toggleMenu }}"', 'data-z-toggle=""'],
  ['onClick="{{ closeMenu }}"', 'data-z-close=""'],
  ['class="z-mobilemenu {{ menuOpenClass }}"', 'class="z-mobilemenu" data-z-menu=""'],
  ['onClick="{{ onFaqClick }}"', 'data-z-faq-btn=""'],
  ['value="{{ leads }}" onChange="{{ onLeads }}"', 'value="40" data-z-input="leads"'],
  ['value="{{ commission }}" onChange="{{ onCommission }}"', 'value="8000" data-z-input="commission"'],
  ['value="{{ replyRate }}" onChange="{{ onReply }}"', 'value="30" data-z-input="replyRate"'],
  ['{{ leadsLabel }}', '<span data-z-out="leadsLabel">40</span>'],
  ['{{ commissionLabel }}', '<span data-z-out="commissionLabel">RM 8,000</span>'],
  ['{{ replyLabel }}', '<span data-z-out="replyLabel">30%</span>'],
  ['{{ lostMonthLabel }}', '<span data-z-out="lostMonthLabel">RM 11,200</span>'],
  ['{{ coldLeadsLabel }}', '<span data-z-out="coldLeadsLabel">28</span>'],
  ['{{ lostYearLabel }}', '<span data-z-out="lostYearLabel">RM 134,400</span>'],
];
for (const [from, to] of repl) body = body.split(from).join(to);

// logo -> the export image already self-hosted in /public/assets/design
body = body.split('assets/zentra-icon.png').join('/assets/design/06660a1d-9154-4c8e-b479-bf8f9428e4aa.png');

// --- pricing: hybrid "from RM…" anchors + Custom tier (3 cards) ---
// The export ships 2 hard-priced cards; Norbu wants soft anchors (exact price
// set on the audit) plus a bespoke Growth/Custom tier. Rebuilt here so a
// re-port keeps it. Feature-row + icon helpers keep it readable.
const chk = (stroke) =>
  `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="margin-top:2px; flex-shrink:0;"><path d="M20 6L9 17l-5-5"/></svg>`;
const cross =
  `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8d8bc4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top:2px; flex-shrink:0;"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
const feat = (icon, text, color) =>
  `<div style="display:flex; gap:11px; align-items:flex-start;">${icon}<span style="font-size:14px; color:${color}; line-height:1.5;">${text}</span></div>`;
const featOff = (text) =>
  `<div style="display:flex; gap:11px; align-items:flex-start; opacity:0.45;">${cross}<span style="font-size:14px; color:#8d8bc4; line-height:1.5;">${text}</span></div>`;
const ghostBtn = (label) =>
  `<a href="#book" style="margin-top:auto; display:flex; align-items:center; justify-content:center; gap:9px; padding:16px; background:rgba(255,255,255,0.05); color:#fff; font-size:15px; font-weight:600; border:1px solid rgba(193,191,227,0.25); text-decoration:none;">${label}</a>`;

const pricingSection = `<!-- ===================== PRICING ===================== -->
<section id="pricing" style="position:relative; z-index:1; padding:clamp(80px,11vw,140px) clamp(18px,5vw,44px); border-top:1px solid rgba(193,191,227,0.12);">
  <div style="max-width:1160px; margin:0 auto;">
    <div class="reveal" style="display:flex; align-items:center; gap:10px; margin-bottom:26px;">
      <span style="width:8px; height:8px; background:#0021F3;"></span>
      <span class="z-mono" style="font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#C1BFE3;">Pricing</span>
    </div>
    <div class="reveal" style="display:flex; justify-content:space-between; align-items:end; flex-wrap:wrap; gap:20px; margin-bottom:16px;">
      <h2 class="z-disp" style="margin:0; font-weight:800; text-transform:uppercase; line-height:0.98; letter-spacing:-0.02em; font-size:clamp(30px,5vw,66px);">Pick your <span class="z-hl">package</span></h2>
      <div style="display:inline-flex; align-items:center; gap:9px; padding:8px 15px; background:rgba(255,77,103,0.1); border:1px solid rgba(255,77,103,0.32);">
        <span style="width:7px;height:7px;border-radius:50%;background:#ff4d67;animation:zblink 1.6s infinite;"></span>
        <span class="z-mono" style="font-size:12px; color:#ff8ea0;">Only 3 new clients a month</span>
      </div>
    </div>
    <p class="reveal" style="font-size:15.5px; color:#C1BFE3; margin:0 0 clamp(36px,4vw,48px); max-width:600px; line-height:1.6;">Every package is done-for-you and fully managed. Your exact price is confirmed on your free audit — in the context of exactly how much you're leaking. No surprises.</p>

    <div class="reveal" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:18px; align-items:stretch;">

      <!-- Starter -->
      <div class="z-card" style="background:linear-gradient(160deg,#0a0919,#0d0b1c); border:1px solid rgba(193,191,227,0.18); padding:clamp(26px,3vw,38px); display:flex; flex-direction:column;">
        <div class="z-mono" style="font-size:13px; font-weight:500; color:#C1BFE3; letter-spacing:0.04em;">STARTER — LEAD RESPONDER</div>
        <div style="display:flex; align-items:flex-end; gap:7px; margin:18px 0 2px;">
          <span style="font-size:13px; color:#8d8bc4; padding-bottom:9px;">from</span>
          <span class="z-disp" style="font-size:clamp(30px,4vw,40px); font-weight:800; letter-spacing:-0.02em;">RM 1,200</span>
          <span style="font-size:14px; color:#8d8bc4; padding-bottom:7px;">/month</span>
        </div>
        <div class="z-mono" style="font-size:12px; color:#8d8bc4; margin-bottom:26px;">exact price set on your audit</div>
        <div style="display:flex; flex-direction:column; gap:13px; margin-bottom:30px;">
          ${feat(chk('#9fb0ff'), '60-second inbound replies across your channels', '#C1BFE3')}
          ${feat(chk('#9fb0ff'), 'Hot / Warm / Cold lead classification', '#C1BFE3')}
          ${feat(chk('#9fb0ff'), 'Hot-lead alerts to your phone', '#C1BFE3')}
          ${featOff('No outreach or content automation')}
        </div>
        ${ghostBtn('Book a free lead audit')}
      </div>

      <!-- Front Desk (featured) -->
      <div style="background:linear-gradient(160deg,#0c1060,#0021F3); border:1px solid rgba(0,33,243,0.6); padding:clamp(26px,3vw,38px); box-shadow:0 30px 70px -30px rgba(0,33,243,0.8); position:relative; overflow:hidden; display:flex; flex-direction:column;">
        <div style="position:absolute; top:18px; right:18px; padding:5px 12px; background:rgba(255,255,255,0.16); font-size:11px; font-weight:600; color:#fff;">Most popular</div>
        <div class="z-mono" style="font-size:13px; font-weight:500; color:rgba(255,255,255,0.8); letter-spacing:0.04em;">ZENTRA FRONT DESK</div>
        <div style="display:flex; align-items:flex-end; gap:7px; margin:18px 0 2px;">
          <span style="font-size:13px; color:rgba(255,255,255,0.7); padding-bottom:9px;">from</span>
          <span class="z-disp" style="font-size:clamp(32px,4.4vw,44px); font-weight:800; letter-spacing:-0.02em; color:#fff;">RM 1,500</span>
          <span style="font-size:14px; color:rgba(255,255,255,0.7); padding-bottom:7px;">/month</span>
        </div>
        <div class="z-mono" style="font-size:12px; color:rgba(255,255,255,0.65); margin-bottom:26px;">exact price set on your audit · 3-month minimum</div>
        <div style="display:flex; flex-direction:column; gap:13px; margin-bottom:30px;">
          ${feat(chk('#fff'), 'The full lead system — capture, 60-sec replies, qualifying &amp; nurture', '#fff')}
          ${feat(chk('#fff'), 'Content automation on FB / IG / WhatsApp', '#fff')}
          ${feat(chk('#fff'), 'Your live pipeline dashboard', '#fff')}
          ${feat(chk('#fff'), 'First <span style="font-weight:700;">50 old leads reactivated free</span>', '#fff')}
          ${feat(chk('#fff'), '60-second reply guarantee — or the month is free', '#fff')}
        </div>
        <a href="#book" style="margin-top:auto; display:flex; align-items:center; justify-content:center; gap:9px; padding:16px; background:#fff; color:#0021F3; font-size:15px; font-weight:700; text-decoration:none;">Book a free lead audit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
        </a>
      </div>

      <!-- Growth / Custom -->
      <div class="z-card" style="background:linear-gradient(160deg,#0a0919,#0d0b1c); border:1px solid rgba(193,191,227,0.18); padding:clamp(26px,3vw,38px); display:flex; flex-direction:column;">
        <div class="z-mono" style="font-size:13px; font-weight:500; color:#C1BFE3; letter-spacing:0.04em;">GROWTH — CUSTOM</div>
        <div style="display:flex; align-items:flex-end; gap:7px; margin:18px 0 2px;">
          <span class="z-disp" style="font-size:clamp(30px,4vw,40px); font-weight:800; letter-spacing:-0.02em;">Tailored</span>
        </div>
        <div class="z-mono" style="font-size:12px; color:#8d8bc4; margin-bottom:26px;">priced to your scope on a call</div>
        <div style="display:flex; flex-direction:column; gap:13px; margin-bottom:30px;">
          ${feat(chk('#9fb0ff'), 'Everything in Front Desk', '#C1BFE3')}
          ${feat(chk('#9fb0ff'), 'Paid-ads management (Meta / Google)', '#C1BFE3')}
          ${feat(chk('#9fb0ff'), 'Multi-agent lead routing for teams', '#C1BFE3')}
          ${feat(chk('#9fb0ff'), 'Bespoke automations &amp; CRM integration', '#C1BFE3')}
          ${feat(chk('#9fb0ff'), 'Priority support', '#C1BFE3')}
        </div>
        ${ghostBtn('Book a call')}
      </div>

    </div>
  </div>
</section>

`;
if (!/<!-- =+ PRICING =+ -->/.test(body) || !/<!-- =+ CALCULATOR =+ -->/.test(body))
  throw new Error('pricing/calculator section markers not found');
body = body.replace(/<!-- =+ PRICING =+ -->[\s\S]*?(?=<!-- =+ CALCULATOR =+ -->)/, pricingSection);

// guard: nothing template-y or React-y should survive
for (const bad of ['{{', 'onClick=', 'onChange=', '<x-dc', '<helmet']) {
  if (body.includes(bad)) throw new Error('Leftover token in markup: ' + bad);
}

// --- write landingMarkup.js ---
const markupFile =
  '// Auto-generated from Norbu\'s design export (Zentra MY.dc.html) via\n' +
  '// scripts/port-design.mjs. Static markup; interactivity lives in\n' +
  '// DesignInteractions.jsx. Template bindings ({{ }}) are resolved to\n' +
  '// data-z-* hooks. Do not hand-edit; re-run the port script.\n' +
  'const markup = ' + JSON.stringify('\n\n' + body + '\n') + ';\n\n' +
  'export default markup;\n';
writeFileSync(new URL('components/landingMarkup.js', root), markupFile);

// --- splice the design-CSS block into globals.css (idempotent) ---
// The design <style> sits between the self-hosted @font-face block and the
// app's functional additions. Sentinels make re-runs replace-in-place instead
// of duplicating. Archivo/Sora/DM Mono load via the <link> in app/layout.js.
const cssPath = new URL('app/globals.css', root);
let css = readFileSync(cssPath, 'utf8');
const START = '/*__ZENTRA_DESIGN_CSS_START__*/';
const END = '/*__ZENTRA_DESIGN_CSS_END__*/';
const designBlock =
  START + '\n' +
  '  /* Design CSS — verbatim from Zentra MY.dc.html <style>. Do not hand-edit; re-run scripts/port-design.mjs. */\n' +
  styleInner.replace(/^\n+/, '').replace(/\n+$/, '') + '\n' +
  END;
if (css.includes(START) && css.includes(END)) {
  const a = css.indexOf(START);
  const b = css.indexOf(END) + END.length;
  css = css.slice(0, a) + designBlock + css.slice(b);
} else {
  // first insertion: original file starts its design CSS at this line
  const FONT_END = '\n  html { scroll-behavior: smooth; }';
  const APP_ADD = '  /* --- functional additions';
  const fe = css.indexOf(FONT_END);
  const aa = css.indexOf(APP_ADD);
  if (fe < 0 || aa < 0) throw new Error('globals.css boundary markers not found');
  css = css.slice(0, fe) + '\n\n' + designBlock + '\n\n\n' + css.slice(aa);
}
writeFileSync(cssPath, css);

console.log('landingMarkup.js: ' + markupFile.length + ' bytes');
console.log('globals.css:      ' + css.length + ' bytes');
console.log('OK');
