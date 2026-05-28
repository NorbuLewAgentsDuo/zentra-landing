const STEPS = [
  {
    n: '01 — Attract',
    title: 'Ads go live for your clinic',
    desc: 'Zentra runs targeted Meta Ads reaching people in your area actively searching for aesthetic treatments — botox, fillers, lasers, and more. Every click becomes an inquiry.',
  },
  {
    n: '02 — Respond',
    title: 'AI replies in under 60 seconds',
    desc: 'Every Instagram DM and WhatsApp message gets an instant, natural reply. Zentra qualifies budget, treatment interest, and availability — before your staff even sees the message.',
  },
  {
    n: '03 — Book',
    title: 'Appointment lands in your calendar',
    desc: 'Qualified patients pick a slot and get confirmed automatically. You get a notification. Your team just shows up and treats — no chasing, no admin.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section section-light" id="how">
      <div className="how-header">
        <div>
          <span className="eyebrow">How It Works</span>
          <h2 className="section-h2">Three steps.<br />Zero manual work.</h2>
        </div>
        <p className="body-text">
          Zentra runs your ads, handles every inquiry, and fills your calendar — without your team lifting a finger.
        </p>
      </div>
      <div className="steps">
        {STEPS.map((s) => (
          <div className="step" key={s.n}>
            <div className="step-n">{s.n}</div>
            <div className="step-title">{s.title}</div>
            <div className="step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
