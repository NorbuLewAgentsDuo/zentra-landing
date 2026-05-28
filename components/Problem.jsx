const PAINS = [
  {
    n: '01',
    title: "Staff can't reply to DMs while treating patients",
    desc: "Your front desk manages walk-ins, payments, and calls. Instagram and WhatsApp inquiries sit for hours — by which time the patient has already found someone else.",
  },
  {
    n: '02',
    title: 'A lead that waits 10 minutes books the next clinic',
    desc: 'Aesthetic patients message multiple clinics at once. First to respond wins. Every minute of delay is a booking lost to whoever replied faster.',
  },
  {
    n: '03',
    title: "You're losing RM500+ per missed DM, invisibly",
    desc: "Most clinic owners track conversions — not missed opportunities. The RM500 filler or RM800 laser that booked elsewhere never shows up in your analytics.",
  },
];

const DECAY = [
  { time: '< 1 min', pct: 100, style: { background: 'linear-gradient(90deg,#0021F3,#C1BFE3)' }, valColor: '#fff' },
  { time: '5 min',   pct: 80,  style: { background: 'rgba(0, 33, 243, 0.75)' }, valColor: 'rgba(255,255,255,0.7)' },
  { time: '30 min',  pct: 42,  style: { background: 'rgba(0, 33, 243, 0.5)'  }, valColor: 'rgba(255,255,255,0.45)' },
  { time: '1 hour',  pct: 22,  style: { background: 'rgba(0, 33, 243, 0.5)'  }, valColor: 'rgba(255,255,255,0.3)' },
  { time: '1 day',   pct: 7,   style: { background: 'rgba(193, 191, 227, 0.15)' }, valColor: 'rgba(255,255,255,0.2)' },
];

export default function Problem() {
  return (
    <section className="section" id="problem">
      <div className="problem-layout">
        <div className="problem-left">
          <span className="eyebrow">The Problem</span>
          <h2 className="section-h2">Most clinic owners don&apos;t know how many patients they&apos;re losing.</h2>
          <p className="body-text problem-body">
            Your staff are treating patients. Meanwhile, DMs stack up in your Instagram inbox. By the time someone replies, those leads have already booked the clinic down the road.
          </p>
          <ul className="pain-list">
            {PAINS.map((p) => (
              <li className="pain-item" key={p.n}>
                <span className="pain-num">{p.n}</span>
                <div className="pain-body">
                  <div className="pain-title">{p.title}</div>
                  <div className="pain-desc">{p.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="decay-wrap">
          <div className="decay-heading">DM response rate vs. booking likelihood</div>
          {DECAY.map((d) => (
            <div className="decay-row" key={d.time}>
              <div className="decay-time">{d.time}</div>
              <div className="decay-track">
                <div className="decay-fill" style={{ '--target': d.pct + '%', ...d.style }} />
              </div>
              <div className="decay-val" style={{ color: d.valColor }}>{d.pct}%</div>
            </div>
          ))}
          <div className="zentra-marker">
            <div className="zentra-marker-label">Zentra responds</div>
            <div className="zentra-marker-val">&lt; 60 seconds</div>
          </div>
          <div className="decay-bar-accent" />
          <div className="decay-source">
            <div className="decay-source-label">Source</div>
            <div className="decay-source-text">MIT / LeadResponseManagement.org — Speed-to-lead study</div>
          </div>
        </div>
      </div>
    </section>
  );
}
