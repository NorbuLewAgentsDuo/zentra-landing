'use client';

import { useEffect } from 'react';

/**
 * Global reveal-on-scroll controller. Adds `.reveal` to a curated set of
 * elements (skipping the hero — which has its own entrance animations),
 * then toggles `.in` via IntersectionObserver.
 */
export default function RevealAnimations() {
  useEffect(() => {
    const hero = document.getElementById('hero');
    const revealSelectors = [
      '.section-h2',
      '.eyebrow',
      '.body-text',
      '.pain-item',
      '.step',
      '.feature-cell',
      '.testi-card',
      '.faq-item',
      '.stat',
      '.decay-wrap',
      '.cta-h2',
      '.cta-sub',
      '.cta-form',
      '.cta-note',
      '.phone-frame',
      '.demo-callbox',
      '.demo-captions',
      '.trust-strip',
      '.journey-panel',
      '.pricing-anchor',
      '.compare-card',
      '.dashboard-mock',
    ];
    revealSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (hero && hero.contains(el)) return;
        el.classList.add('reveal');
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    document
      .querySelectorAll('.reveal, .decay-wrap, .testi-card')
      .forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
