'use client';

import { useEffect, useState } from 'react';
import { useReveal } from '@/components/charts/useReveal';

const KPIS = [
  { to: 60, suffix: 's', label: 'to first reply, day or night' },
  { to: 24, suffix: '/7', label: 'always answering enquiries' },
  { to: 100, suffix: '%', label: 'of leads followed up' },
  { to: 3, suffix: '×', label: 'faster than the next agent' },
];

function useCountUp(to, run, dur = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, dur]);
  return n;
}

function Kpi({ to, suffix, label, run }) {
  const n = useCountUp(to, run);
  return (
    <div style={{ flex: '1 1 180px', minWidth: 150 }}>
      <div
        className="z-mono z-grad"
        style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-2px' }}
      >
        {n}
        {suffix}
      </div>
      <div style={{ color: '#a9a7d0', fontSize: 14, lineHeight: 1.5, marginTop: 10 }}>{label}</div>
    </div>
  );
}

export default function KpiBand() {
  const [ref, shown] = useReveal(0.4);
  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '8px clamp(18px,5vw,40px) clamp(40px,6vw,72px)' }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(24px,4vw,48px)',
          padding: 'clamp(26px,4vw,40px)',
          background: 'linear-gradient(160deg,rgba(10,8,82,0.6),rgba(12,9,96,0.35))',
          border: '1px solid rgba(193,191,227,0.14)',
          borderRadius: 22,
        }}
      >
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} run={shown} />
        ))}
      </div>
    </section>
  );
}
