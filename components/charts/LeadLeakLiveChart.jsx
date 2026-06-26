'use client';

import { useEffect, useState } from 'react';
import { useReveal, ChartSection } from '@/components/charts/useReveal';

const fmt = (n) => Math.round(n).toLocaleString('en-MY');

// Reads the existing calculator sliders ([data-z-input]) and visualises the
// split live as they move — mirrors the calculator's own math exactly.
export default function LeadLeakLiveChart() {
  const [ref, shown] = useReveal(0.3);
  const [s, setS] = useState({ leads: 40, commission: 8000, replyRate: 30 });

  useEffect(() => {
    const inputs = Array.from(document.querySelectorAll('[data-z-input]'));
    if (!inputs.length) return;
    const read = () => {
      const next = {};
      inputs.forEach((el) => (next[el.dataset.zInput] = +el.value));
      setS((prev) => ({ ...prev, ...next }));
    };
    read();
    inputs.forEach((el) => el.addEventListener('input', read));
    return () => inputs.forEach((el) => el.removeEventListener('input', read));
  }, []);

  const replied = s.leads * (s.replyRate / 100);
  const cold = s.leads - replied;
  const coldPct = s.leads ? (cold / s.leads) * 100 : 0;
  const repliedPct = 100 - coldPct;
  const lostMonth = Math.round(cold * 0.05 * s.commission);
  const lostYear = lostMonth * 12;

  return (
    <ChartSection
      id="leak"
      eyebrow="YOUR LEAK, LIVE"
      title={<>Drag the sliders. <span className="z-grad">Watch the leak.</span></>}
      intro="This is the same math as the calculator above — but you can see it. The red is every lead you paid for that never gets a real reply."
      innerRef={ref}
      maxWidth={920}
    >
      <div
        className="z-aud"
        style={{
          background: 'linear-gradient(160deg,#0a0852,#0c0960)',
          border: '1px solid rgba(193,191,227,0.16)',
          borderRadius: 24,
          padding: 'clamp(20px,3.5vw,38px)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <span className="z-mono" style={{ fontSize: 13, color: '#9fb0ff' }}>
            Replied in time · {fmt(replied)}
          </span>
          <span className="z-mono" style={{ fontSize: 13, color: '#ff8ea0' }}>
            Going cold · {fmt(cold)} of {fmt(s.leads)}
          </span>
        </div>

        {/* live split bar */}
        <div style={{ display: 'flex', height: 30, borderRadius: 10, overflow: 'hidden', background: 'rgba(193,191,227,0.10)' }}>
          <div
            style={{
              width: `${shown ? repliedPct : 0}%`,
              background: 'linear-gradient(90deg,#0021F3,#6f86ff)',
              transition: 'width .45s cubic-bezier(.22,.68,0,1)',
            }}
          />
          <div
            style={{
              width: `${shown ? coldPct : 0}%`,
              background: 'linear-gradient(90deg,#ff4d67,#7a1f33)',
              transition: 'width .45s cubic-bezier(.22,.68,0,1)',
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(16px,3vw,32px)',
            marginTop: 30,
            alignItems: 'end',
          }}
          className="z-2col"
        >
          <div>
            <div className="z-mono" style={{ fontSize: 12, letterSpacing: '1.5px', color: '#8f8dc4' }}>
              LEAKING EVERY MONTH
            </div>
            <div
              className="z-mono"
              style={{ fontSize: 'clamp(38px,7vw,60px)', fontWeight: 500, letterSpacing: '-2px', color: '#ff4d67', lineHeight: 1.05 }}
              aria-live="polite"
            >
              RM {fmt(lostMonth)}
            </div>
            <div className="z-mono" style={{ fontSize: 14, color: '#ff8ea0', marginTop: 6 }}>
              RM {fmt(lostYear)} a year, gone
            </div>
          </div>
          <p style={{ color: '#cfcdea', fontSize: 'clamp(14px,1.7vw,16px)', lineHeight: 1.6 }}>
            With Zentra, <strong style={{ color: '#fff' }}>every lead gets a 60-second reply</strong> — the red bar
            goes to zero and that money stays in your pocket.
          </p>
        </div>
      </div>
    </ChartSection>
  );
}
