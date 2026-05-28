const TESTIS = [
  {
    initials: 'SA',
    name: 'Dr. Sarah Azmi',
    role: 'Luminelle Aesthetic Clinic, Kuala Lumpur',
    quote: "We used to reply to DMs whenever we had a spare moment — sometimes 3 hours later. Zentra changed that overnight. We&apos;re now booking 8–10 new consultations a week from Instagram alone.",
  },
  {
    initials: 'AR',
    name: 'Dr. Amirah Rahman',
    role: 'Glow Medispa, Petaling Jaya',
    quote: 'Our Meta Ads were running but barely converting. Zentra added the AI follow-up and our cost-per-consultation dropped 35% in the first month. First patient was booked on day 3.',
  },
  {
    initials: 'PN',
    name: 'Priya Nair',
    role: 'Beauté Clinic, Penang',
    quote: 'Patients DM at 10pm asking about treatments. Zentra replies instantly and gets them in the calendar before I wake up. I had 4 new bookings waiting on Monday morning.',
  },
];

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <span className="eyebrow">Results</span>
      <h2 className="section-h2">Real clinics. Real bookings.</h2>
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
