'use client';

import { useEffect, useRef } from 'react';

export default function Nav() {
  const navRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      if (navRef.current) navRef.current.classList.toggle('scrolled', window.scrollY > 40);
      if (progressRef.current) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        progressRef.current.style.width = max > 0 ? (window.scrollY / max) * 100 + '%' : '0%';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" />
      <nav ref={navRef} className="nav">
        <a href="#" className="nav-brand">
          <img src="/assets/zentralogo.png" alt="Zentra" />
          <span className="nav-brand-name">Zentra</span>
        </a>
        <ul className="nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <a href="#cta" className="btn btn-blue">Get Free Demo</a>
      </nav>
    </>
  );
}
