'use client';

import { useEffect, useRef, useState } from 'react';

// Returns [ref, shown]: shown flips true once the element scrolls into view
// (or immediately, if reduced-motion is requested or IO is unavailable).
export function useReveal(threshold = 0.3) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
}

// Shared section shell so every infographic matches the page rhythm.
export function ChartSection({ id, eyebrow, title, intro, children, innerRef, maxWidth = 1080 }) {
  return (
    <section id={id} style={{ position: 'relative', zIndex: 1, padding: 'clamp(56px,8vw,104px) clamp(18px,5vw,40px)' }}>
      <div ref={innerRef} style={{ maxWidth, margin: '0 auto' }}>
        {eyebrow && (
          <div className="z-mono" style={{ fontSize: 12, letterSpacing: '2px', color: '#8f8dc4', marginBottom: 14 }}>
            {eyebrow}
          </div>
        )}
        {title && (
          <h2
            style={{
              fontSize: 'clamp(28px,4.4vw,48px)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-1.4px',
              margin: '0 0 16px',
              maxWidth: 760,
            }}
          >
            {title}
          </h2>
        )}
        {intro && (
          <p style={{ color: '#a9a7d0', fontSize: 'clamp(15px,1.7vw,18px)', lineHeight: 1.7, maxWidth: 620, margin: '0 0 36px' }}>
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
