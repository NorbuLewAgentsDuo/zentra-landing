'use client';

import { useEffect } from 'react';

/**
 * Client island that wires up the static design markup (see landingMarkup.js).
 * Ported 1:1 from the original design export's DCLogic component:
 *   - scroll reveal (.reveal -> .is-visible)
 *   - count-up stats (.z-count[data-count-to])
 *   - mobile menu toggle/close ([data-z-toggle] / [data-z-close] -> [data-z-menu].open)
 *   - exclusive-open FAQ ([data-z-faq-btn] -> [data-faq].open)
 *   - lead-loss calculator (3 sliders -> [data-z-out] labels)
 */
export default function DesignInteractions() {
  useEffect(() => {
    const cleanups = [];

    // --- scroll reveal ---
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((e) => e.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('is-visible');
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
      );
      revealEls.forEach((e) => io.observe(e));
      cleanups.push(() => io.disconnect());

      // --- count-up stats ---
      const counters = Array.from(document.querySelectorAll('.z-count'));
      const animate = (el) => {
        const to = parseFloat(el.dataset.countTo);
        const suffix = el.dataset.countSuffix || '';
        const dur = 1200;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(to * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      if (counters.length) {
        const cio = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                animate(en.target);
                cio.unobserve(en.target);
              }
            });
          },
          { threshold: 0.4 }
        );
        counters.forEach((el) => {
          el.textContent = '0' + (el.dataset.countSuffix || '');
          cio.observe(el);
        });
        cleanups.push(() => cio.disconnect());
      }
    }

    // --- mobile menu ---
    const menu = document.querySelector('[data-z-menu]');
    const setMenu = (open) => menu && menu.classList.toggle('open', open);
    const onToggle = () => menu && menu.classList.toggle('open');
    const onClose = () => setMenu(false);
    document.querySelectorAll('[data-z-toggle]').forEach((b) => {
      b.addEventListener('click', onToggle);
      cleanups.push(() => b.removeEventListener('click', onToggle));
    });
    document.querySelectorAll('[data-z-close]').forEach((b) => {
      b.addEventListener('click', onClose);
      cleanups.push(() => b.removeEventListener('click', onClose));
    });

    // --- FAQ accordion (exclusive open) ---
    const onFaq = (e) => {
      const item = e.currentTarget.closest('[data-faq]');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('[data-faq].open').forEach((el) => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    };
    document.querySelectorAll('[data-z-faq-btn]').forEach((b) => {
      b.addEventListener('click', onFaq);
      cleanups.push(() => b.removeEventListener('click', onFaq));
    });

    // --- lead-loss calculator ---
    const state = { leads: 40, commission: 8000, replyRate: 30 };
    const fmt = (n) => Math.round(n).toLocaleString('en-MY');
    const out = (key) => document.querySelector(`[data-z-out="${key}"]`);
    const render = () => {
      const { leads, commission, replyRate } = state;
      const coldLeads = leads * (1 - replyRate / 100);
      const lostMonth = Math.round(coldLeads * 0.05 * commission);
      const lostYear = lostMonth * 12;
      const labels = {
        leadsLabel: String(leads),
        commissionLabel: 'RM ' + fmt(commission),
        replyLabel: replyRate + '%',
        coldLeadsLabel: fmt(coldLeads),
        lostMonthLabel: 'RM ' + fmt(lostMonth),
        lostYearLabel: 'RM ' + fmt(lostYear),
      };
      for (const [k, v] of Object.entries(labels)) {
        const el = out(k);
        if (el) el.textContent = v;
      }
    };
    document.querySelectorAll('[data-z-input]').forEach((input) => {
      const onInput = (e) => {
        state[e.target.dataset.zInput] = +e.target.value;
        render();
      };
      input.addEventListener('input', onInput);
      cleanups.push(() => input.removeEventListener('input', onInput));
    });
    render();

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
