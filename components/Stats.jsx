'use client';

import { useEffect, useRef } from 'react';

const STATS = [
  { to: 24, suffix: '/7', desc: 'AI systems keep responding, routing, and following up after hours' },
  { to: 5, suffix: ' days', desc: 'typical timeline to launch your first working business system' },
  { to: 60, prefix: '<', suffix: ' sec', desc: 'target response time for new leads and customer inquiries' },
  { to: 0, suffix: ' tech hires', desc: 'needed to start using AI across daily business workflows' },
];

export default function Stats() {
  const barRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || ran.current) return;
        ran.current = true;
        bar.querySelectorAll('.count').forEach((el) => {
          const target = parseInt(el.dataset.to, 10);
          const duration = 1400;
          const start = performance.now();
          function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased);
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(bar);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={barRef} className="stats">
      {STATS.map((s, i) => (
        <div className="stat" key={i}>
          <div className="stat-n">
            {s.prefix ? <span className="accent">{s.prefix}</span> : null}
            <span className="count" data-to={s.to}>0</span>
            {s.suffix ? <span className="accent">{s.suffix}</span> : null}
          </div>
          <div className="stat-desc">{s.desc}</div>
        </div>
      ))}
    </div>
  );
}
