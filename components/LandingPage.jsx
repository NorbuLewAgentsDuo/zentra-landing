'use client';

import { useRef, useState } from 'react';
import { faqs, testimonials } from '@/lib/siteContent';
import PilotBanner from './PilotBanner';
import JourneyInfographic from './JourneyInfographic';

const EMPTY_FORM = {
  name: '',
  businessName: '',
  website: '',
  email: '',
  enquirySituation: '',
  contactConsent: false,
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function BrandWordmark() {
  return (
    <img className="brand-wordmark" src="/assets/zentra-wordmark.png" alt="Zentra" />
  );
}

export default function LandingPage({ pilotDeadline, pilotDeadlineLabel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const submittingRef = useRef(false);

  const update = (field) => (event) => {
    const value = field === 'contactConsent' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  async function submitApplication(event) {
    event.preventDefault();
    if (submittingRef.current) return;
    if (!event.currentTarget.reportValidity()) return;
    if (!form.contactConsent) {
      setStatus('error');
      setMessage('Please confirm that Zentra may contact you about this application.');
      return;
    }

    submittingRef.current = true;
    setStatus('submitting');
    setMessage('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'We could not send your application.');

      setStatus('success');
      setMessage(
        'Received. We’ll review your enquiry process and contact you if the pilot looks like a useful fit.'
      );
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus('error');
      setMessage(
        error.name === 'AbortError'
          ? 'The request took too long. Please try again.'
          : error.message || 'Something went wrong. Please try again.'
      );
    } finally {
      window.clearTimeout(timeout);
      submittingRef.current = false;
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <PilotBanner deadline={pilotDeadline} label={pilotDeadlineLabel} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Zentra MY home">
          <BrandWordmark />
        </a>
        <nav aria-label="Main navigation">
          <a href="#system">The system</a>
          <a href="#proof">Client experiences</a>
          <a href="#pilot">The pilot</a>
        </nav>
        <a className="header-cta" href="#apply">
          Discuss a free pilot
        </a>
      </header>

      <main id="top">
        <div id="main-content" tabIndex={-1} />
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span>For businesses turning enquiries into appointments</span> Klang Valley</p>
            <h1>
              You paid for the enquiry.{' '}
              <em>Give it a clear path to a consultation.</em>
            </h1>
            <p className="hero-description">
              When follow-up depends on memory, enquiries can stall. Zentra qualifies enquiries,
              follows up and coordinates consultations—so your team can focus on the conversations that need them.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#apply">
                Discuss a free pilot <ArrowIcon />
              </a>
              <a className="button button-secondary" href="https://audit.zentramy.com/" target="_blank" rel="noreferrer">
                Check your website
              </a>
            </div>
            <p className="hero-note">Free pilot. Scope agreed together. Paid continuation discussed separately.</p>
            <a className="text-link hero-tour" href="#system">Explore the enquiry journey <span aria-hidden="true">↓</span></a>
          </div>

          <div className="hero-system-art" aria-label="Fictional illustration of an enquiry moving through Zentra">
            <div className="brand-object" aria-hidden="true">
              <div className="brand-object-edge" />
              <div className="brand-object-face">
                <img src="/assets/zentralogo.png" alt="" />
              </div>
            </div>
            <div className="flow-card flow-card-enquiry">
              <span>Prospect · fictional</span>
              <strong>“Can we discuss your service?”</strong>
              <small>Website enquiry · received</small>
            </div>
            <div className="flow-rail" aria-hidden="true"><i /><i /><i /></div>
            <div className="flow-card flow-card-system">
              <span>Zentra system</span>
              <strong>Follow-up + consultation options</strong>
              <small>Runs the approved next action</small>
            </div>
            <div className="flow-card flow-card-human">
              <span>Your team</span>
              <strong>Answers a specialist question</strong>
              <small>Confirms the attendance outcome</small>
            </div>
            <ol className="hero-stage-path" aria-label="Five stages in the fictional workflow">
              {['Capture', 'Qualify', 'Follow up', 'Book', 'Attend'].map((stage, index) => (
                <li key={stage}><span>{index + 1}</span>{stage}</li>
              ))}
            </ol>
            <p className="art-caption">Fictional workflow</p>
          </div>
        </section>

        <section className="belief-band" aria-label="Zentra belief">
          <div className="section-wrap belief-grid">
            <p className="eyebrow">Why Zentra exists</p>
            <blockquote>A business shouldn&rsquo;t depend on someone remembering to do the work.</blockquote>
            <p>
              We build the repeatable middle of the sales process into how the business actually
              runs. Your people stay responsible for the moments that need expertise and trust.
            </p>
          </div>
        </section>

        <section className="system-section section-wrap" id="system">
          <div className="section-heading">
            <p className="eyebrow">Your enquiry journey, connected</p>
            <h2>Every enquiry. A clear next step.</h2>
            <p>
              See how an enquiry moves from first contact to an attended appointment. Explore each stage for an illustrative example, the work Zentra handles and where your team takes over.
            </p>
          </div>

          <JourneyInfographic />

        </section>

        <section className="proof-section" id="proof">
          <div className="section-wrap">
            <div className="section-heading proof-heading">
              <p className="eyebrow">Client experiences</p>
              <h2>What working with Zentra feels like.</h2>
              <p>
                Client experiences from previous Zentra engagements. These are not presented as
                results or revenue claims for this pilot.
              </p>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.handle}>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    src={testimonial.video}
                    poster={testimonial.poster}
                    aria-label={`${testimonial.name}'s experience working with Zentra`}
                  />
                  <div className="testimonial-meta">
                    <div><strong>{testimonial.name}</strong><span>Previous Zentra client</span></div>
                    <a href={testimonial.instagram} target="_blank" rel="noreferrer">{testimonial.handle}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pilot-section section-wrap" id="pilot">
          <div className="section-heading pilot-heading">
            <p className="eyebrow">The free pilot</p>
            <h2>What we put to work in your free pilot.</h2>
            <p>
              We configure the same five-part system around an agreed enquiry source: capture,
              qualification, follow-up, booking and attendance reporting. Together, we review
              what works before discussing paid continuation.
            </p>
          </div>
          <div className="pilot-grid">
            <article><span>01 / QUALIFY</span><h3>Know who is ready to talk</h3><p>Capture enquiries and collect the project details your team needs, using questions you approve.</p></article>
            <article><span>02 / FOLLOW UP</span><h3>Keep the conversation moving</h3><p>Run agreed follow-ups, respect stop requests and route questions that need a person to your team.</p></article>
            <article><span>03 / BOOK</span><h3>Make the next step clear</h3><p>Coordinate consultations around your availability and send agreed reminders before the meeting.</p></article>
            <article><span>04 / REVIEW</span><h3>See what actually happened</h3><p>Review enquiries, bookings, recorded attendance and the moments that needed your team’s help.</p></article>
          </div>
          <div className="pilot-fit"><p><strong>A useful fit:</strong> Your business already receives enquiries from ads, your website or inbound messages, can share how they are handled, and has a team member to approve messages and handle escalations.</p><a className="button button-primary" href="#apply">Discuss a free pilot <ArrowIcon /></a></div>
        </section>

        <section className="faq-section section-wrap" id="faq">
          <div className="section-heading faq-heading">
            <p className="eyebrow">Before you apply</p>
            <h2>The practical questions.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="apply-section" id="apply">
          <div className="section-wrap apply-grid">
            <div className="apply-copy">
              <p className="eyebrow">Discuss a free pilot</p>
              <h2>Let’s find where your enquiries get stuck.</h2>
              <p>
                Tell us how your business handles enquiries today. We review every application manually
                and contact you if there is a useful pilot to discuss.
              </p>
              <div className="apply-promise">
                <span>What happens next</span>
                <ol className="next-steps">
                  <li><strong>Tell us about your business</strong><span>Share how enquiries are handled today.</span></li>
                  <li><strong>We review the fit</strong><span>A person reviews your process and where we could help.</span></li>
                  <li><strong>Discuss a pilot together</strong><span>If there’s a fit, we agree scope and responsibilities before setup.</span></li>
                </ol>
              </div>
            </div>

            <form className="application-form" onSubmit={submitApplication} noValidate aria-busy={status === 'submitting'}>
              <div className="form-heading"><p className="eyebrow">Start a conversation</p><h3>About your business</h3><p>No preparation needed. Just tell us what happens today.</p></div>
              <div className="form-row">
                <label>Full name<input type="text" name="name" value={form.name} onChange={update('name')} autoComplete="name" required maxLength={120} /></label>
                <label>Business name<input type="text" name="businessName" value={form.businessName} onChange={update('businessName')} autoComplete="organization" required maxLength={200} /></label>
              </div>
              <label>Work email<input type="email" name="email" value={form.email} onChange={update('email')} autoComplete="email" required maxLength={254} /></label>
              <label>Website <span>Optional — a full Instagram URL also works</span><input type="url" name="website" value={form.website} onChange={update('website')} placeholder="https://yourbusiness.com" maxLength={500} /></label>
              <label>What currently happens after a new enquiry arrives?
                <textarea name="enquirySituation" value={form.enquirySituation} onChange={update('enquirySituation')} required maxLength={2000} rows={5} placeholder="Tell us who responds, how follow-up works and where enquiries tend to stall." />
              </label>
              <label className="consent-row">
                <input type="checkbox" name="contactConsent" checked={form.contactConsent} onChange={update('contactConsent')} required />
                <span>I give Zentra permission to contact me about this application.</span>
              </label>
              <button className="button button-primary submit-button" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending application…' : 'Discuss my free pilot'}
                {status !== 'submitting' ? <ArrowIcon /> : null}
              </button>
              {message ? <p className={`form-message ${status}`} role="status" aria-live="polite">{message}</p> : null}
              <p className="form-fineprint">Your details are sent through Zentra&rsquo;s configured lead systems so we can review and respond. Submitting does not confirm acceptance or book an appointment.</p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="section-wrap footer-grid">
          <a className="brand" href="#top" aria-label="Zentra MY home"><BrandWordmark /></a>
          <p>AI systems for business, built around work that needs to get done.</p>
          <span>© {new Date().getFullYear()} Zentra MY</span>
        </div>
      </footer>
    </div>
  );
}
