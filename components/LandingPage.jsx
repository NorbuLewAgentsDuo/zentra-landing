'use client';

import { useEffect, useState } from 'react';
import { faqs, testimonials } from '@/lib/siteContent';
import AuditForm from './AuditForm';
import JourneyInfographic from './JourneyInfographic';
import { Mascot } from './Mascot';
import PilotBanner from './PilotBanner';

// Mystery shop, Oct 2026: 18 Klang Valley businesses that run Meta ads, each messaged once as a customer.
const ANSWER_DOTS = [...Array(5).fill('good'), ...Array(6).fill('slow'), ...Array(7).fill('bad')];
const CHASE_DOTS = [...Array(5).fill('good'), ...Array(13).fill('bad')];

const STORIES = [
  { tone: 'bad', tag: 'Lost lead', who: 'An aesthetics clinic', text: 'replied to a Friday enquiry on Monday afternoon. By then most people have booked somewhere else.' },
  { tone: 'bad', tag: 'Lost lead', who: 'A skin clinic', text: 'followed up 4 times but never gave a price, then sent a “closing your file” message.' },
  { tone: 'good', tag: 'Best reply', who: 'A chiropractor', text: 'replied in 1 minute, sent prices in about 11 and followed up twice with new slots. That’s the standard Relay holds you to.' },
];

const RELAY_FEATURES = [
  { title: 'Replies in seconds, 24/7', text: 'Your 11pm enquiry gets an answer at 11pm, on WhatsApp, in your tone. English or BM.' },
  { title: 'Gives the price and a next step', text: '7 of 18 businesses had no price after 90 minutes. Relay answers with the price and two open slots.' },
  { title: 'Chases the ones who go quiet', text: 'The step 13 of 18 skipped. Relay follows up until they book or say stop.' },
  { title: 'Books into your calendar', text: 'Confirms the slot, sends the reminder and tells you who’s coming.' },
  { title: 'Shows which ads bring bookings', text: 'Cost per booking for every Meta ad, with a keep, cut or scale call after 3 days.' },
  { title: 'Sends bookings back to Meta', text: 'So your ads learn to find more people who actually book, not just people who click.' },
];

const OFFER_STACK = [
  'Done-for-you setup on your WhatsApp. No new software to learn.',
  'Relay replying, chasing and booking 24/7',
  'Your replies written in your tone, in English or BM',
  'A report of every enquiry, booking and show-up, by ad',
  'The 3-day ad check on every Meta ad you run',
];

const FIT = {
  yes: [
    'You run Meta ads, or start this month',
    'Enquiries land on WhatsApp, Facebook or Instagram',
    'You could take more bookings than you get today',
  ],
  no: [
    'You get no enquiries yet. Fix traffic first.',
    'You want a chatbot to set up yourself',
    'You want it to close the sale. Your team still does that.',
  ],
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="check">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Brand() {
  return (
    <span className="brand-lockup">
      <img src="/assets/zentralogo.png" alt="" width="32" height="32" />
      Zentra
    </span>
  );
}

function Dots({ dots, label }) {
  return (
    <div className="dots" role="img" aria-label={label}>
      {dots.map((tone, i) => <span key={i} className={`dot dot-${tone}`} />)}
    </div>
  );
}

/** Hero visual: a fictional WhatsApp thread showing a Relay reply, with Mochi and Orb beside it. */
function ChatDemo() {
  return (
    <figure className="chat-demo">
      <Mascot kind="orb" state="thinking" size={84} className="chat-orb" />
      <Mascot kind="mochi" state="hello" size={104} className="chat-mochi" />
      <div className="chat-phone">
        <div className="chat-head">
          <span className="chat-avatar">YC</span>
          <span><strong>Your clinic</strong><small>replies in seconds</small></span>
        </div>
        <div className="chat-body">
          <p className="msg msg-in">Hi, saw your ad. How much for the first consultation?<time>11:42 PM</time></p>
          <p className="msg msg-out">Hi! First consultation is RM80 and takes about 30 min. Tomorrow I have 10am or 3pm open. Which suits you?<time>11:42 PM</time></p>
          <p className="msg msg-in">3pm ok<time>11:44 PM</time></p>
          <p className="msg msg-out">Booked for 3pm tomorrow. See you then!<time>11:44 PM</time></p>
          <span className="chat-booked"><Check /> Booked · Tue 3:00 PM</span>
        </div>
      </div>
      <figcaption>How Relay replies · example conversation</figcaption>
    </figure>
  );
}

// Mobile-only bottom bar, hidden while the hero or the form is on screen.
function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const targets = ['top', 'apply'].map((id) => document.getElementById(id)).filter(Boolean);
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target);
      setShow(visible.size === 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`sticky-cta${show ? ' is-shown' : ''}`} aria-hidden={!show}>
      <a className="button button-primary" href="#apply" tabIndex={show ? 0 : -1}>Get my free audit <ArrowIcon /></a>
    </div>
  );
}

export default function LandingPage({ pilotDeadline, pilotDeadlineLabel }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <PilotBanner deadline={pilotDeadline} label={pilotDeadlineLabel} />
      <header className="site-header">
        <div className="section-wrap header-inner">
          <a className="brand" href="#top" aria-label="Zentra MY home"><Brand /></a>
          <nav aria-label="Main navigation">
            <a href="#scoreboard">The scoreboard</a>
            <a href="#relay">Zentra Relay</a>
            <a href="#offer">The offer</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="header-cta" href="#apply">Free audit</a>
        </div>
      </header>

      <main>
        <div id="main-content" tabIndex={-1} />

        {/* Hero */}
        <section className="hero" id="top">
          <div className="section-wrap hero-grid">
            <div className="hero-copy">
              <p className="pill">For Klang Valley businesses running Meta ads</p>
              <h1>Stop paying for enquiries <em>nobody follows up.</em></h1>
              <p className="lede">
                I messaged 18 Klang Valley businesses as a customer from their own ads. 13 never followed up
                when I went quiet. Zentra Relay replies in seconds, chases the ones who go quiet and books them
                into your calendar.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#apply">Get my free Enquiry Audit <ArrowIcon /></a>
                <a className="button button-secondary" href="https://audit.zentramy.com/" target="_blank" rel="noreferrer">Free website check</a>
              </div>
              <ul className="hero-proof">
                <li><Check /> Free</li>
                <li><Check /> Report within 48 hours</li>
                <li><Check /> No call needed</li>
              </ul>
            </div>
            <ChatDemo />
          </div>
        </section>

        {/* Proof: the mystery shop */}
        <section className="section section-card" id="scoreboard">
          <div className="section-wrap">
            <div className="section-heading">
              <p className="eyebrow">The mystery shop · Oct 2026</p>
              <h2>We enquired at 18 businesses like a real customer. Here’s the scoreboard.</h2>
            </div>
            <div className="score-grid">
              <article className="score-card">
                <h3>Time to a real answer: a price or a slot</h3>
                <Dots dots={ANSWER_DOTS} label="5 under 5 minutes, 6 in 10 to 50 minutes, 7 with no price after 90 minutes" />
                <ul className="legend">
                  <li><span className="dot dot-good" /><b>5</b> under 5 minutes</li>
                  <li><span className="dot dot-slow" /><b>6</b> 10 to 50 minutes</li>
                  <li><span className="dot dot-bad" /><b>7</b> no price after 90 minutes</li>
                </ul>
              </article>
              <article className="score-card">
                <h3>Followed up when the customer went quiet</h3>
                <Dots dots={CHASE_DOTS} label="5 followed up, 13 never did" />
                <ul className="legend">
                  <li><span className="dot dot-good" /><b>5</b> followed up</li>
                  <li><span className="dot dot-bad" /><b>13</b> never chased</li>
                </ul>
              </article>
            </div>
            <ol className="story-grid">
              {STORIES.map((story) => (
                <li key={story.who} className={`story story-${story.tone}`}>
                  <span className="story-tag">{story.tag}</span>
                  <p><strong>{story.who}</strong> {story.text}</p>
                </li>
              ))}
            </ol>
            <p className="footnote">No names published. Each business got one enquiry, the same way a real ad enquiry comes in.</p>
          </div>
        </section>

        {/* Why */}
        <section className="belief-band" aria-label="Why Zentra exists">
          <div className="section-wrap belief-grid">
            <p className="eyebrow">Why Zentra exists</p>
            <blockquote>A business shouldn’t depend on someone remembering to do the work.</blockquote>
            <p>
              We build the repeatable middle of the sales process into how your business already runs.
              Your people stay on the moments that need expertise and trust.
            </p>
          </div>
        </section>

        {/* How */}
        <section className="section" id="system">
          <div className="section-wrap">
            <div className="section-heading">
              <p className="eyebrow">How it works</p>
              <h2>Every enquiry gets the same five steps. Every time.</h2>
              <p>Tap a stage to see an example, what Relay handles and where your team takes over.</p>
            </div>
            <JourneyInfographic />
          </div>
        </section>

        {/* What: Zentra Relay */}
        <section className="section section-stage" id="relay">
          <div className="section-wrap">
            <div className="section-heading">
              <p className="eyebrow">Meet Zentra Relay</p>
              <h2>The sales half of your ads, running on its own.</h2>
              <p>Your ads bring the enquiry. Relay turns it into a booked appointment, then shows you which ads did it.</p>
            </div>
            <ol className="feature-grid">
              {RELAY_FEATURES.map((feature, i) => (
                <li key={feature.title} className="feature">
                  <span className="feature-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </li>
              ))}
            </ol>
            <div className="mascot-note">
              <span className="mascot-pair">
                <Mascot kind="mochi" state="idle" size={60} />
                <Mascot kind="orb" state="idle" size={60} />
              </span>
              <p><strong>Meet Mochi and Orb.</strong> They live in your Relay dashboard and tell you what needs you. Your customers only ever see your business name.</p>
            </div>
          </div>
        </section>

        {/* The offer */}
        <section className="section" id="offer">
          <div className="section-wrap">
            <div className="offer">
              <div className="offer-main">
                <p className="eyebrow eyebrow-light">The offer</p>
                <h2>The 30-Day Booked Appointments Pilot</h2>
                <p className="offer-sub">Here’s everything you get:</p>
                <ul className="offer-stack">
                  {OFFER_STACK.map((item) => <li key={item}><Check />{item}</li>)}
                </ul>
                <div className="guarantee">
                  <strong>The walk-away guarantee</strong>
                  <p>Free for 30 days. If Relay doesn’t book you appointments in that time, walk away and pay nothing.</p>
                </div>
              </div>
              <div className="offer-side">
                <p className="price-label">From day 31</p>
                <p className="price">RM3,000<span>/month</span></p>
                <p className="price-note">Compare that with the ad money you spend on enquiries nobody chases.</p>
                <p className="scarcity">We set up 5 businesses at a time, so setup stays done-for-you.</p>
                <a className="button button-primary" href="#apply">Start with the free audit <ArrowIcon /></a>
                <Mascot kind="mochi" state="hello" size={130} className="offer-mochi" />
              </div>
            </div>
          </div>
        </section>

        {/* Fit */}
        <section className="section section-card" id="fit">
          <div className="section-wrap">
            <div className="section-heading">
              <p className="eyebrow">Is this for you?</p>
              <h2>Built for businesses already paying for enquiries.</h2>
            </div>
            <div className="fit-grid">
              <div className="fit fit-yes">
                <h3>It’s for you if</h3>
                <ul>{FIT.yes.map((item) => <li key={item}><Check />{item}</li>)}</ul>
              </div>
              <div className="fit fit-no">
                <h3>It’s not for you if</h3>
                <ul>{FIT.no.map((item) => <li key={item}><span className="cross" aria-hidden="true">×</span>{item}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* Proof: past clients */}
        <section className="section" id="proof">
          <div className="section-wrap">
            <div className="section-heading">
              <p className="eyebrow">Client experiences</p>
              <h2>What working with Zentra feels like.</h2>
              <p>From previous Zentra engagements. Not presented as results for this pilot.</p>
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

        {/* Founder */}
        <section className="section section-card" id="founder">
          <div className="section-wrap founder">
            <p className="eyebrow">Who’s behind this</p>
            <h2>Hi, I’m Norbu.</h2>
            <p>
              I run Zentra MY out of Kuala Lumpur. Before building anything, I wanted to know what actually
              happens to an ad enquiry. So I messaged 18 Klang Valley businesses myself, from their own ads,
              as a normal customer.
            </p>
            <p>
              The best one, a chiropractor, replied in a minute, sent prices in about 11 and followed up twice
              with new slots. Most didn’t come close. Relay exists so every business runs like that
              chiropractor, without anyone having to remember.
            </p>
            <p className="signoff">Norbu Lew, founder, Zentra MY</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="section-wrap faq-wrap">
            <div className="section-heading">
              <p className="eyebrow">Questions</p>
              <h2>The practical stuff.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="section section-card apply" id="apply">
          <div className="section-wrap apply-grid">
            <div className="apply-copy">
              <p className="eyebrow">Free Enquiry Audit</p>
              <h2>See what your customers see.</h2>
              <p>
                We send one enquiry to your business the way a customer from your ad would, within 48 hours.
                Then you get a short report:
              </p>
              <ol className="audit-points">
                <li>How fast you replied, and when</li>
                <li>Whether you gave a price or a clear next step</li>
                <li>Whether anyone followed up when we went quiet</li>
                <li>Roughly how many ad enquiries a month end that way</li>
              </ol>
              <p className="ps">
                <strong>P.S.</strong> Even if you never use Relay, the audit shows you exactly what your
                customers see. That’s worth 2 minutes.
              </p>
              <Mascot kind="orb" state="hello" size={88} className="apply-orb" />
            </div>
            <AuditForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-grid">
          <a className="brand" href="#top" aria-label="Zentra MY home"><Brand /></a>
          <p>A business shouldn’t depend on someone remembering to do the work.</p>
          <span>© {new Date().getFullYear()} Zentra MY · Kuala Lumpur</span>
        </div>
      </footer>

      <StickyCta />
    </div>
  );
}
