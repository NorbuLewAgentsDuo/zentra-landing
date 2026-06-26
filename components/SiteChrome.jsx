'use client';

import { useEffect, useState } from 'react';
import { whatsappBookHref, bookingUrl } from '@/lib/config';

/**
 * Site-wide chrome rendered on top of the static design (no markup edits):
 *   - top scroll-progress bar (on-brand gradient)
 *   - sticky mobile CTA bar (<=880px) — booking + WhatsApp, auto-hides once
 *     the final #book section is in view so it never doubles up on the CTA.
 */
export default function SiteChrome() {
  const [progress, setProgress] = useState(0);
  const [hideCta, setHideCta] = useState(false);

  useEffect(() => {
    const doc = document.documentElement;
    const onScroll = () => {
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let io;
    const book = document.getElementById('book');
    if (book && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => setHideCta(e.isIntersecting), {
        rootMargin: '0px 0px -35% 0px',
      });
      io.observe(book);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (io) io.disconnect();
    };
  }, []);

  const bookHref = bookingUrl || '#book';
  const external = Boolean(bookingUrl);

  return (
    <>
      <div className="z-progress" style={{ width: progress + '%' }} aria-hidden="true" />
      <div className={`z-mobile-cta${hideCta ? ' is-hidden' : ''}`}>
        <a
          className="z-mcta-book"
          href={bookHref}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener' : undefined}
        >
          Book free audit
        </a>
        <a className="z-mcta-wa" href={whatsappBookHref} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-1.3-.6-2.1-1.1-3-2.6-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.5c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.4 1.4.6 2 .7 2.6.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.1-.4-.2z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </>
  );
}
