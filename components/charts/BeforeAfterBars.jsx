'use client';

import { useReveal, ChartSection } from '@/components/charts/useReveal';

// Each row: a "before" (you alone) bar and an "after" (with Zentra) bar.
// pct = how full the bar paints (0-100). Lower-is-better rows still read
// clearly because the colour + label carry the meaning.
const ROWS = [
  { label: 'Average reply time', before: '8 hours', beforePct: 100, after: '60 seconds', afterPct: 4 },
  { label: 'Enquiries answered in time', before: '~40%', beforePct: 40, after: '100%', afterPct: 100 },
  { label: 'Follow-ups that actually happen', before: '1 in 3', beforePct: 33, after: 'Every time', afterPct: 100 },
  { label: 'After-hours leads caught', before: 'Hardly any', beforePct: 12, after: 'All of them', afterPct: 100 },
];

function Bar({ pct, tone, shown, delay }) {
  const color =
    tone === 'before'
      ? 'linear-gradient(90deg,#7a1f33,#ff4d67)'
      : 'linear-gradient(90deg,#0021F3,#6f86ff)';
  return (
    <div style={{ height: 12, borderRadius: 8, background: 'rgba(193,191,227,0.10)', overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          width: shown ? `${pct}%` : '0%',
          background: color,
          borderRadius: 8,
          transition: `width 1s cubic-bezier(.22,.68,0,1) ${delay}s`,
        }}
      />
    </div>
  );
}

function Row({ row, shown, i }) {
  return (
    <div style={{ display: 'grid', gap: 12, padding: '20px 0', borderTop: i ? '1px solid rgba(193,191,227,0.10)' : 'none' }}>
      <div style={{ fontWeight: 600, fontSize: 'clamp(15px,1.8vw,17px)' }}>{row.label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr auto', alignItems: 'center', gap: 14 }}>
        <span className="z-mono" style={{ fontSize: 12, color: '#ff8ea0' }}>You alone</span>
        <Bar pct={row.beforePct} tone="before" shown={shown} delay={i * 0.08} />
        <span className="z-mono" style={{ fontSize: 13, color: '#ff8ea0', minWidth: 92, textAlign: 'right' }}>{row.before}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr auto', alignItems: 'center', gap: 14 }}>
        <span className="z-mono" style={{ fontSize: 12, color: '#9fb0ff' }}>With Zentra</span>
        <Bar pct={row.afterPct} tone="after" shown={shown} delay={i * 0.08 + 0.12} />
        <span className="z-mono" style={{ fontSize: 13, color: '#fff', minWidth: 92, textAlign: 'right' }}>{row.after}</span>
      </div>
    </div>
  );
}

export default function BeforeAfterBars() {
  const [ref, shown] = useReveal(0.25);
  return (
    <ChartSection
      id="shift"
      eyebrow="THE SHIFT"
      title={<>What changes the day Zentra goes live.</>}
      intro="Same leads, same ad spend — handled. Here's the before and after on the numbers that decide whether an enquiry becomes a viewing."
      innerRef={ref}
    >
      <div
        className="z-aud"
        style={{
          background: 'linear-gradient(160deg,#0a0852,#0c0960)',
          border: '1px solid rgba(193,191,227,0.16)',
          borderRadius: 24,
          padding: 'clamp(18px,3vw,34px)',
        }}
      >
        {ROWS.map((row, i) => (
          <Row key={row.label} row={row} shown={shown} i={i} />
        ))}
      </div>
    </ChartSection>
  );
}
