'use client';

import { useEffect } from 'react';

const MOBILE_BREAKPOINT = 880; // matches the .z-nav media query in globals.css

/**
 * Client island that wires up the static design markup (see landingMarkup.js).
 * Ported from the design export's DCLogic, plus functional hardening:
 *   - scroll reveal (.reveal -> .is-visible)            [respects reduced-motion]
 *   - count-up stats (.z-count[data-count-to])          [respects reduced-motion]
 *   - mobile menu ([data-z-toggle]/[data-z-close] -> [data-z-menu].open)
 *       + close on Escape / outside-click / resize, and body-scroll lock
 *   - exclusive-open FAQ ([data-z-faq-btn] -> [data-faq].open)
 *   - lead-loss calculator (3 [data-z-input] sliders -> [data-z-out] labels)
 *   - scroll-spy: highlight the nav link for the section in view
 */
export default function DesignInteractions() {
  useEffect(() => {
    const cleanups = [];
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- scroll reveal ---
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
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
    }

    // --- count-up stats ---
    const counters = Array.from(document.querySelectorAll('.z-count'));
    const setFinal = (el) =>
      (el.textContent =
        (el.dataset.countTo || '') + (el.dataset.countSuffix || ''));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(setFinal);
    } else if (counters.length) {
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

    // --- mobile menu (with hardening) ---
    const menu = document.querySelector('[data-z-menu]');
    const isOpen = () => menu && menu.classList.contains('open');
    const setMenu = (open) => {
      if (!menu) return;
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    const onToggle = (e) => {
      e.stopPropagation();
      setMenu(!isOpen());
    };
    const onClose = () => setMenu(false);
    document.querySelectorAll('[data-z-toggle]').forEach((b) => {
      b.addEventListener('click', onToggle);
      cleanups.push(() => b.removeEventListener('click', onToggle));
    });
    document.querySelectorAll('[data-z-close]').forEach((b) => {
      b.addEventListener('click', onClose);
      cleanups.push(() => b.removeEventListener('click', onClose));
    });
    const onKeydown = (e) => {
      if (e.key === 'Escape' && isOpen()) setMenu(false);
    };
    const onDocClick = (e) => {
      if (isOpen() && menu && !menu.contains(e.target) && !e.target.closest('[data-z-toggle]'))
        setMenu(false);
    };
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT && isOpen()) setMenu(false);
    };
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onDocClick);
    window.addEventListener('resize', onResize);
    cleanups.push(() => document.removeEventListener('keydown', onKeydown));
    cleanups.push(() => document.removeEventListener('click', onDocClick));
    cleanups.push(() => window.removeEventListener('resize', onResize));
    cleanups.push(() => {
      document.body.style.overflow = '';
    });

    // --- FAQ accordion (exclusive open) ---
    const onFaq = (e) => {
      const item = e.currentTarget.closest('[data-faq]');
      if (!item) return;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('[data-faq].open').forEach((el) => el.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
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

    // --- scroll-spy: highlight active section in the nav ---
    const navLinks = Array.from(document.querySelectorAll('.z-nav-links a[href^="#"]'));
    if ('IntersectionObserver' in window && navLinks.length) {
      const byId = new Map(
        navLinks.map((a) => [a.getAttribute('href').slice(1), a]).filter(([id]) => id)
      );
      const sections = [...byId.keys()]
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      const setActive = (id) => {
        navLinks.forEach((a) =>
          a.classList.toggle('z-nav-active', a.getAttribute('href') === '#' + id)
        );
      };
      const spy = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((en) => en.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActive(visible.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      sections.forEach((s) => spy.observe(s));
      cleanups.push(() => spy.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
