const PAINS = [
  {
    n: '01',
    title: 'Your business runs on people remembering what to do',
    desc: 'Leads, follow-ups, quotes, bookings, reminders, and reports depend on whoever is free at the moment. Work moves, but the system is fragile.',
  },
  {
    n: '02',
    title: 'Customers expect fast answers everywhere',
    desc: 'They message on WhatsApp, Instagram, forms, and chat. If your team is busy, the opportunity slows down before anyone notices.',
  },
  {
    n: '03',
    title: 'AI feels useful, but too complicated to install',
    desc: 'Most owners do not want another tool to configure. They want a business system that works, improves, and tells the team what to do next.',
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
          <h2 className="section-h2">Most businesses do not need more software. They need a smarter operating system.</h2>
          <p className="body-text problem-body">
            Every growing business has hidden manual work. Zentra finds the repeated decisions, messages, and handoffs, then turns them into AI systems that keep improving.
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
          <div className="decay-heading">Response speed vs. customer momentum</div>
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
            <div className="decay-source-label">System focus</div>
            <div className="decay-source-text">Capture demand while interest is active, then route the next action automatically.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
