import markup from '@/components/landingMarkup';
import DesignInteractions from '@/components/DesignInteractions';
import { whatsappBase, bookingUrl } from '@/lib/config';

// The page body is the exact static markup from Norbu's design export
// (Zentra MY.html). Conversion destinations are injected from lib/config here
// (build-time string swap) so the generated markup stays pristine and the
// WhatsApp number / booking URL live in one place. All interactivity (menu,
// calculator, FAQ, scroll reveal, count-up, scroll-spy) is attached
// client-side by DesignInteractions.
function wireLinks(html) {
  // wa.me chat links -> real number (keeps each link's ?text= prefill)
  let out = html.split('https://wa.me/60123456789').join(whatsappBase);
  // "Book a free lead audit" CTAs -> external scheduler (new tab) when set;
  // otherwise leave them as in-page anchors to the #book section.
  if (bookingUrl) {
    out = out
      .split('href="#book"')
      .join(`href="${bookingUrl}" target="_blank" rel="noopener"`);
  }
  return out;
}

export default function Page() {
  const html = wireLinks(markup);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <DesignInteractions />
    </>
  );
}
