const FEATURES = [
  {
    name: 'Meta Ads Management',
    desc: 'Campaigns targeting people in your area actively researching your treatments. We handle creative, targeting, and optimisation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C1BFE3" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: '60-Second AI Response',
    desc: 'Every DM and WhatsApp answered in under a minute, even at 2am on a public holiday.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C1BFE3" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    name: 'Smart Qualification',
    desc: 'Screens for budget, treatment interest, and timeline before booking. Only serious patients reach your calendar.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C1BFE3" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    name: 'Direct Calendar Booking',
    desc: 'Patients pick a slot and get confirmed instantly. No back-and-forth, no missed messages, no admin.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C1BFE3" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
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
          <span className="eyebrow">Features</span>
          <h2 className="section-h2">Built for aesthetic clinics.<br />Live within 5 days.</h2>
          <p className="body-text">
            No technical setup required. Our team configures scripts, ads, and calendar integration, then gets you live within 3 to 5 working days.
          </p>
          <a href="#cta" className="btn btn-outline features-cta">See Zentra live →</a>
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
