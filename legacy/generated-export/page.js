import markup from '@/components/landingMarkup';
import DesignInteractions from '@/components/DesignInteractions';
import SiteChrome from '@/components/SiteChrome';
import StructuredData from '@/components/StructuredData';
import { whatsappBase, bookingUrl } from '@/lib/config';

// The page body is the exact static markup from Norbu's design export
// (Zentra MY.html). Conversion destinations + a few a11y attributes are
// injected here (build-time string swap) so the generated markup stays
// pristine. Interactivity is attached client-side by DesignInteractions;
// SiteChrome adds the scroll-progress bar + sticky mobile CTA on top.
function enhance(html) {
  // wa.me chat links -> real number (keeps each link's ?text= prefill)
  let out = html.split('https://wa.me/60123456789').join(whatsappBase);
  // "Book a free lead audit" CTAs -> external scheduler (new tab) when set;
  // otherwise leave them as in-page anchors to the #book section.
  if (bookingUrl) {
    out = out
      .split('href="#book"')
      .join(`href="${bookingUrl}" target="_blank" rel="noopener"`);
  }
  // calculator accessibility: label the sliders and announce the headline result
  out = out
    .replace('data-z-input="leads"', 'data-z-input="leads" aria-label="New enquiries per month"')
    .replace(
      'data-z-input="commission"',
      'data-z-input="commission" aria-label="Average commission per closed deal (RM)"'
    )
    .replace(
      'data-z-input="replyRate"',
      'data-z-input="replyRate" aria-label="Percent of leads you reply to within minutes"'
    )
    .replace('data-z-out="lostMonthLabel"', 'data-z-out="lostMonthLabel" aria-live="polite"');
  return out;
}

export default function Page() {
  const html = enhance(markup);
  return (
    <>
      <StructuredData />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <DesignInteractions />
      <SiteChrome />
    </>
  );
}
