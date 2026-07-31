// Regenerates components/landingMarkup.js from design/source.html.
//
// Why this exists: the markup used to be ported straight from Norbu's design
// export via port-design.mjs, but that export is no longer in the repo, so
// "re-run the port script" was not actually runnable. design/source.html is now
// the editable source of truth for the page body; this script is the only thing
// that writes landingMarkup.js.
//
// Run: node scripts/build-markup.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const src = new URL('design/source.html', root);
const out = new URL('components/landingMarkup.js', root);

const html = readFileSync(src, 'utf8');

const header = `// Generated from design/source.html by scripts/build-markup.mjs.
// Static markup; interactivity lives in DesignInteractions.jsx.
// Do not hand-edit — edit design/source.html and re-run the build script.
`;

writeFileSync(out, `${header}const markup = ${JSON.stringify(html)};\n\nexport default markup;\n`, 'utf8');
console.log(`landingMarkup.js regenerated from design/source.html (${html.length} chars)`);
