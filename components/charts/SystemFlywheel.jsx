'use client';

import { useReveal, ChartSection } from '@/components/charts/useReveal';

const CX = 280;
const CY = 280;
const R = 196;

const NODES = [
  { n: '1', label: 'Capture' },
  { n: '2', label: 'Reply · 60s' },
  { n: '3', label: 'Qualify' },
  { n: '4', label: 'Nurture' },
  { n: '5', label: 'Alert you' },
  { n: '6', label: 'You close' },
];

// position + text anchor per slot around the ring (start at top, clockwise)
function place(i) {
  const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
  const x = CX + R * Math.cos(a);
  const y = CY + R * Math.sin(a);
  const anchor = Math.abs(x - CX) < 30 ? 'middle' : x > CX ? 'start' : 'end';
  const lx = x + (anchor === 'start' ? 26 : anchor === 'end' ? -26 : 0);
  const ly = y + (Math.abs(x - CX) < 30 ? (y < CY ? -28 : 36) : 5);
  return { x, y, lx, ly, anchor };
}

export default function SystemFlywheel() {
  const [ref, shown] = useReveal(0.3);
  return (
    <ChartSection
      id="loop"
      eyebrow="THE LOOP"
      title={<>One system that runs the whole cycle — on its own.</>}
      intro="Every enquiry runs the full loop without you. You only step in at the end, to close. Then it starts again — 24 hours a day."
      innerRef={ref}
      maxWidth={920}
    >
      <div
        style={{
          background: 'linear-gradient(160deg,#0a0852,#0c0960)',
          border: '1px solid rgba(193,191,227,0.16)',
          borderRadius: 24,
          padding: 'clamp(12px,3vw,28px)',
        }}
      >
        <svg viewBox="0 0 560 560" width="100%" style={{ maxHeight: 520, display: 'block', margin: '0 auto' }} role="img" aria-label="The Zentra lead loop: capture, reply in 60 seconds, qualify, nurture, alert you, you close — repeating">
          <defs>
            <linearGradient id="z-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0021F3" />
              <stop offset="1" stopColor="#C1BFE3" />
            </linearGradient>
          </defs>

          {/* base ring */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(193,191,227,0.12)" strokeWidth="2" />
          {/* animated rotating arc */}
          <circle
            className="z-flywheel-ring"
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="url(#z-ring)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="150 1080"
            style={{ transformBox: 'fill-box', transformOrigin: 'center', opacity: shown ? 1 : 0, transition: 'opacity .8s ease' }}
          />

          {/* center */}
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff">
            Runs while
          </text>
          <text x={CX} y={CY + 22} textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff">
            you sleep
          </text>
          <text x={CX} y={CY + 50} textAnchor="middle" fontSize="12.5" fill="#8f8dc4" className="z-mono">
            24 / 7 · automatic
          </text>

          {/* nodes */}
          {NODES.map((node, i) => {
            const p = place(i);
            return (
              <g
                key={node.n}
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? 'scale(1)' : 'scale(0.6)',
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  transition: `opacity .5s ease ${0.15 * i}s, transform .5s cubic-bezier(.22,.68,0,1) ${0.15 * i}s`,
                }}
              >
                <circle cx={p.x} cy={p.y} r="26" fill="#0c0960" stroke="url(#z-ring)" strokeWidth="2.5" />
                <text x={p.x} y={p.y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" className="z-mono">
                  {node.n}
                </text>
                <text x={p.lx} y={p.ly} textAnchor={p.anchor} fontSize="14.5" fontWeight="600" fill="#cfcdea">
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </ChartSection>
  );
}
