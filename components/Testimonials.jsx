const TESTIS = [
  {
    initials: 'RS',
    name: 'Rizal Shah',
    role: 'Home services owner, Selangor',
    quote: 'We were losing leads because nobody replied after working hours. Zentra now answers, qualifies, and sends the right jobs to my team before morning.',
  },
  {
    initials: 'AL',
    name: 'Amanda Lee',
    role: 'Training business, Kuala Lumpur',
    quote: 'Our admin work used to sit across WhatsApp, forms, sheets, and email. Zentra connected the flow so every inquiry gets followed up properly.',
  },
  {
    initials: 'FK',
    name: 'Farid Kamal',
    role: 'Property services, Johor Bahru',
    quote: 'The biggest win was not just faster replies. It was knowing what needed attention each day without digging through messages myself.',
  },
];

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <span className="eyebrow">Results</span>
      <h2 className="section-h2">Built around real businesses, not generic AI demos.</h2>
      <div className="testi-grid">
        {TESTIS.map((t) => (
          <div className="testi-card" key={t.name}>
            <div className="testi-stars">
              {[0, 1, 2, 3, 4].map((i) => <div className="testi-star" key={i} />)}
            </div>
            <div className="testi-quote">{t.quote}</div>
            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
