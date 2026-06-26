const FEATURES = [
  {
    name: 'AI Lead Response',
    desc: 'Answer new inquiries fast, capture details, qualify intent, and route the next action before the lead goes cold.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C1BFE3" strokeWidth="1.8">
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    ),
  },
  {
    name: 'Workflow Automation',
    desc: 'Turn repeated tasks into reliable flows across WhatsApp, forms, spreadsheets, CRM, calendars, and team notifications.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C1BFE3" strokeWidth="1.8">
        <path d="M4 7h6v6H4zM14 4h6v6h-6zM14 14h6v6h-6z" />
        <path d="M10 10h2a2 2 0 0 0 2-2M10 10h2a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    name: 'Adaptive Business Logic',
    desc: 'Systems follow your rules, then improve as your offers, team capacity, and customer patterns change.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C1BFE3" strokeWidth="1.8">
        <path d="M4 17l6-6 4 4 6-8" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
  {
    name: 'Owner Command Board',
    desc: 'See what happened, what needs attention, and where the business is leaking time or revenue.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C1BFE3" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9h4M7 13h8M7 17h3M16 9h1" />
      </svg>
    ),
  },
];

export default function Features() {
  const rows = [];
  for (let i = 0; i < FEATURES.length; i += 2) rows.push(FEATURES.slice(i, i + 2));

  return (
    <section className="section features-section" id="features">
      <div className="features-layout">
        <div className="features-left">
          <span className="eyebrow">Systems</span>
          <h2 className="section-h2">Built for any business that runs on follow-up.</h2>
          <p className="body-text">
            Zentra handles the technical work: strategy, setup, integrations, AI logic, testing, and improvement. You get a system your business can actually use.
          </p>
          <a href="#cta" className="btn btn-outline features-cta">See Zentra live</a>
        </div>
        <div>
          <div className="features-list">
            {rows.map((row, ri) => (
              <div className="feature-row" key={ri}>
                {row.map((f) => (
                  <div className="feature-cell" key={f.name}>
                    <div className="feature-icon-wrap">{f.icon}</div>
                    <div className="feature-name">{f.name}</div>
                    <div className="feature-desc">{f.desc}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
