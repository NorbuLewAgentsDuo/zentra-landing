'use client';

import { useEffect, useRef, useState } from 'react';

// Speed-to-lead decay: likelihood a lead converts vs. minutes since the enquiry.
// x = time buckets, y = relative conversion likelihood (100 -> ~4).
const POINTS = [
  { x: 0, v: 100, t: '0s' },
  { x: 1, v: 94, t: '1m' },
  { x: 2, v: 76, t: '5m' },
  { x: 3, v: 54, t: '10m' },
  { x: 4, v: 33, t: '30m' },
  { x: 5, v: 20, t: '1h' },
  { x: 6, v: 10, t: '5h' },
  { x: 7, v: 4, t: 'next morning' },
];

const W = 820;
const H = 380;
const PAD = { l: 56, r: 28, t: 36, b: 52 };
const innerW = W - PAD.l - PAD.r;
const innerH = H - PAD.t - PAD.b;

const px = (i) => PAD.l + (i / (POINTS.length - 1)) * innerW;
const py = (v) => PAD.t + (1 - v / 100) * innerH;

// Catmull-Rom -> cubic bezier for a smooth curve through the points.
function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export default function SpeedToLeadChart() {
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
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const coords = POINTS.map((p, i) => [px(i), py(p.v)]);
  const line = smoothPath(coords);
  const area = `${line} L ${px(POINTS.length - 1)} ${PAD.t + innerH} L ${px(0)} ${PAD.t + innerH} Z`;
  const first = coords[0];
  const last = coords[coords.length - 1];

  return (
    <section
      id="speed"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(64px,9vw,110px) clamp(18px,5vw,40px)',
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div
          className="z-mono"
          style={{ fontSize: 12, letterSpacing: '2px', color: '#8f8dc4', marginBottom: 14 }}
        >
          SPEED TO LEAD
        </div>
        <h2
          className="z-h1"
          style={{
            fontSize: 'clamp(30px,4.6vw,52px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            margin: '0 0 16px',
            maxWidth: 760,
          }}
        >
          The lead is worth most in the first 5 minutes. <span className="z-grad">Then it dies.</span>
        </h2>
        <p style={{ color: '#a9a7d0', fontSize: 'clamp(15px,1.7vw,18px)', lineHeight: 1.7, maxWidth: 620, margin: '0 0 36px' }}>
          A buyer who messages at 10:47pm is comparing 3 agents at once. Whoever answers first usually
          wins. Wait until morning and you&apos;re negotiating for a lead that&apos;s already booked a viewing
          with someone faster.
        </p>

        <div
          ref={ref}
          className="z-aud"
          style={{
            background: 'linear-gradient(160deg,#0a0852,#0c0960)',
            border: '1px solid rgba(193,191,227,0.16)',
            borderRadius: 24,
            padding: 'clamp(18px,3vw,30px)',
          }}
        >
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Conversion likelihood drops sharply in the minutes after an enquiry">
            <defs>
              <linearGradient id="z-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0021F3" stopOpacity="0.45" />
                <stop offset="1" stopColor="#0021F3" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="z-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6f86ff" />
                <stop offset="1" stopColor="#C1BFE3" />
              </linearGradient>
            </defs>

            {/* horizontal grid */}
            {[0, 25, 50, 75, 100].map((g) => (
              <g key={g}>
                <line
                  x1={PAD.l}
                  x2={W - PAD.r}
                  y1={py(g)}
                  y2={py(g)}
                  stroke="rgba(193,191,227,0.10)"
                  strokeWidth="1"
                />
                <text x={PAD.l - 12} y={py(g) + 4} textAnchor="end" fontSize="11" fill="#56557e" className="z-mono">
                  {g}%
                </text>
              </g>
            ))}

            {/* area + line (animated draw) */}
            <path d={area} fill="url(#z-area)" style={{ opacity: shown ? 1 : 0, transition: 'opacity 1.1s ease 0.5s' }} />
            <path
              d={line}
              fill="none"
              stroke="url(#z-line)"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 1300,
                strokeDashoffset: shown ? 0 : 1300,
                transition: 'stroke-dashoffset 1.8s cubic-bezier(.22,.68,0,1)',
              }}
            />

            {/* x labels */}
            {POINTS.map((p, i) => (
              <text
                key={p.t}
                x={px(i)}
                y={H - 18}
                textAnchor={i === 0 ? 'start' : i === POINTS.length - 1 ? 'end' : 'middle'}
                fontSize="11"
                fill="#6f6e98"
                className="z-mono"
              >
                {p.t}
              </text>
            ))}

            {/* win marker (Zentra, instant) */}
            <g style={{ opacity: shown ? 1 : 0, transition: 'opacity .5s ease 1.6s' }}>
              <circle cx={first[0]} cy={first[1]} r="7" fill="#22c55e" stroke="#050406" strokeWidth="3" />
              <rect x={first[0] + 8} y={first[1] - 30} width="172" height="24" rx="6" fill="rgba(34,197,94,0.14)" />
              <text x={first[0] + 18} y={first[1] - 13} fontSize="12.5" fill="#7ef0a6" className="z-mono">
                Zentra replies · 60 sec
              </text>
            </g>

            {/* loss marker (manual, next morning) */}
            <g style={{ opacity: shown ? 1 : 0, transition: 'opacity .5s ease 1.9s' }}>
              <circle cx={last[0]} cy={last[1]} r="7" fill="#ff4d67" stroke="#050406" strokeWidth="3" />
              <rect x={last[0] - 168} y={last[1] - 30} width="160" height="24" rx="6" fill="rgba(255,77,103,0.14)" />
              <text x={last[0] - 16} y={last[1] - 13} fontSize="12.5" fill="#ff8ea0" textAnchor="end" className="z-mono">
                You reply · 8am
              </text>
            </g>
          </svg>

          <p style={{ color: '#a9a7d0', fontSize: 14, lineHeight: 1.6, margin: '18px 4px 0' }}>
            Zentra answers in <strong style={{ color: '#fff' }}>60 seconds, every time</strong> — so you stay at the
            top of the curve while everyone else slides down it.
          </p>
        </div>
      </div>
    </section>
  );
}
