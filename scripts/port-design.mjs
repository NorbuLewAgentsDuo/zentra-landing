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

// --- splice the design-CSS block into globals.css ---
const cssPath = new URL('app/globals.css', root);
const css = readFileSync(cssPath, 'utf8');
const FONT_END = '\n  html { scroll-behavior: smooth; }';
const APP_ADD = '  /* --- functional additions';
const fontBlock = css.slice(0, css.indexOf(FONT_END));
const appBlock = css.slice(css.indexOf(APP_ADD));
const designCss =
  '\n\n' +
  '  /* ============================================================\n' +
  '     Design CSS — verbatim from Zentra MY.dc.html <style>.\n' +
  '     (Archivo/Sora/DM Mono are loaded via the <link> in app/layout.js.)\n' +
  '     ============================================================ */\n' +
  styleInner.replace(/^\n+/, '').replace(/\n+$/, '') +
  '\n\n\n';
writeFileSync(cssPath, fontBlock + designCss + appBlock);

console.log('landingMarkup.js: ' + markupFile.length + ' bytes');
console.log('globals.css:      ' + (fontBlock + designCss + appBlock).length + ' bytes');
console.log('OK');
