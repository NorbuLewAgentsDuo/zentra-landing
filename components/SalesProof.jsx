const TRUST = ['Meta Ads', 'WhatsApp', 'Instagram DMs', 'Google Calendar', 'BM + English'];

const JOURNEY = [
  {
    time: '00:00',
    label: 'Lead arrives',
    text: 'Hi, how much for pico laser? Any slot this week?',
    tone: 'Patient DM',
  },
  {
    time: '00:42',
    label: 'Zentra qualifies',
    text: 'Sure. Is this for pigmentation, acne marks, or brightening? I can check a suitable slot for you.',
    tone: 'AI reply',
  },
  {
    time: '01:18',
    label: 'Calendar booked',
    text: 'Consultation confirmed for Thursday, 6:30 PM. Your team gets the booking details instantly.',
    tone: 'Booked patient',
  },
];

const COMPARE = [
  {
    title: 'Without Zentra',
    rows: ['DM waits 2-3 hours', 'Staff asks repeated questions', 'Lead compares 4 clinics', 'No-show risk stays high'],
  },
  {
    title: 'With Zentra',
    rows: ['Reply in under 60 seconds', 'Budget and treatment qualified', 'Slot booked while interest is hot', 'Clinic sees confirmed appointment'],
    featured: true,
  },
];

const METRICS = [
  { label: 'New inquiries', value: '147' },
  { label: 'Booked consults', value: '31' },
  { label: 'Avg. response', value: '38s' },
  { label: 'Projected value', value: 'RM24k' },
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
          <h2 className="section-h2">From first DM to booked patient, without waiting on your front desk.</h2>
          <p className="body-text">
            The website needs to sell the result, not just the software. So this section shows the exact journey a clinic owner cares about: inquiry in, qualification done, appointment booked.
          </p>
          <div className="pricing-anchor">
            <span>Best fit</span>
            <strong>Clinics spending RM2,000+ monthly on Meta Ads</strong>
            <p>Built for teams that already get inquiries and want more of them converted into appointments.</p>
          </div>
        </div>

        <div className="journey-panel" aria-label="Lead journey simulator">
          <div className="journey-topbar">
            <span className="journey-live" />
            <span>Lead Journey Simulator</span>
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
            <span>New patient booked</span>
            <strong>Aesthetic consult - Thu 6:30 PM</strong>
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
              <span>Clinic dashboard</span>
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
            <span style={{ '--bar': '72%' }} />
            <span style={{ '--bar': '48%' }} />
            <span style={{ '--bar': '86%' }} />
            <span style={{ '--bar': '64%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
