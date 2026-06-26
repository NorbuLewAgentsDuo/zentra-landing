const TRUST = ['WhatsApp', 'Instagram DMs', 'Website Forms', 'CRM', 'Calendar', 'BM + English'];

const JOURNEY = [
  {
    time: '00:00',
    label: 'Request arrives',
    text: 'Hi, can you send pricing and availability for this week?',
    tone: 'Customer inquiry',
  },
  {
    time: '00:38',
    label: 'Zentra responds',
    text: 'Sure. I can help. Is this for a new booking, a repeat order, or a service request?',
    tone: 'AI system',
  },
  {
    time: '01:24',
    label: 'Work routed',
    text: 'Qualified request sent to the right team with customer details, next step, and follow-up time.',
    tone: 'Owner view',
  },
];

const COMPARE = [
  {
    title: 'Without Zentra',
    rows: ['Messages wait for staff', 'Follow-ups depend on memory', 'Data sits across many tools', 'Owner becomes the system'],
  },
  {
    title: 'With Zentra',
    rows: ['AI replies and qualifies fast', 'Next steps happen automatically', 'Systems improve from real activity', 'Owner sees what needs attention'],
    featured: true,
  },
];

const METRICS = [
  { label: 'New inquiries', value: '186' },
  { label: 'Auto-routed tasks', value: '74' },
  { label: 'Avg. response', value: '41s' },
  { label: 'Hours returned', value: '32' },
];

export default function SalesProof() {
  return (
    <section className="section sales-proof" id="proof">
      <div className="trust-strip" aria-label="Zentra integration points">
        {TRUST.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="sales-proof-layout">
        <div className="sales-copy">
          <span className="eyebrow">See The System</span>
          <h2 className="section-h2">From customer message to next action, without chasing your team.</h2>
          <p className="body-text">
            Zentra connects the moving parts of your business: inquiries, follow-ups, booking, handoffs, reporting, and daily decisions. The system learns the workflow, then keeps it moving.
          </p>
          <div className="pricing-anchor">
            <span>Best fit</span>
            <strong>Businesses with repeat inquiries, admin work, or follow-up gaps</strong>
            <p>Built for owners who want AI inside the business, not another dashboard to babysit.</p>
          </div>
        </div>

        <div className="journey-panel" aria-label="Business workflow simulator">
          <div className="journey-topbar">
            <span className="journey-live" />
            <span>Workflow Simulator</span>
            <strong>Under 2 min</strong>
          </div>
          <div className="journey-thread">
            {JOURNEY.map((step, index) => (
              <div className={`journey-message message-${index + 1}`} key={step.label}>
                <div className="journey-meta">
                  <span>{step.time}</span>
                  <span>{step.label}</span>
                </div>
                <p>{step.text}</p>
                <div className="journey-tone">{step.tone}</div>
              </div>
            ))}
          </div>
          <div className="booking-alert">
            <span>Next action created</span>
            <strong>Qualified lead routed to sales, follow-up set for 4:00 PM</strong>
          </div>
        </div>
      </div>

      <div className="sales-lower-grid">
        <div className="compare-grid">
          {COMPARE.map((col) => (
            <div className={`compare-card${col.featured ? ' compare-card-featured' : ''}`} key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.rows.map((row) => (
                  <li key={row}>{row}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="dashboard-mock">
          <div className="dashboard-head">
            <div>
              <span>Business command board</span>
              <strong>This month</strong>
            </div>
            <div className="dashboard-status">Live</div>
          </div>
          <div className="dashboard-metrics">
            {METRICS.map((metric) => (
              <div className="dashboard-metric" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
          <div className="dashboard-bars" aria-hidden="true">
            <span style={{ '--bar': '74%' }} />
            <span style={{ '--bar': '56%' }} />
            <span style={{ '--bar': '88%' }} />
            <span style={{ '--bar': '62%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
