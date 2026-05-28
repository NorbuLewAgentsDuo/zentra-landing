const STEPS = [
  {
    n: '01 Map',
    title: 'We map the work your business repeats',
    desc: 'Leads, customer questions, follow-ups, bookings, quotes, reporting, handoffs, and reminders. We identify the workflows where AI can create immediate leverage.',
  },
  {
    n: '02 Build',
    title: 'Zentra builds the intelligent system',
    desc: 'We connect your channels, write the logic, configure the AI, and test the flow around your real business rules. You do not manage prompts or integrations.',
  },
  {
    n: '03 Run',
    title: 'The system operates and improves',
    desc: 'Zentra responds, routes, books, follows up, and reports. As your business changes, the system adapts with it.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section section-light" id="how">
      <div className="how-header">
        <div>
          <span className="eyebrow">How It Works</span>
          <h2 className="section-h2">Map the work.<br />Build the system. Let it run.</h2>
        </div>
        <p className="body-text">
          Zentra turns repeated business work into intelligent systems your team can rely on every day.
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
