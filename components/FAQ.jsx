'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What exactly does Zentra do for my clinic?',
    a: "Zentra runs your Meta Ads, then responds to every Instagram DM and WhatsApp inquiry within 60 seconds — qualifying the patient and booking them directly into your calendar. You get new patients without adding staff or managing ads yourself.",
  },
  {
    q: "What if a patient asks a clinical question the AI can’t answer?",
    a: "Zentra handles inquiry management, qualification, and booking. For clinical questions — treatment specifics, medical history, contraindications — it flags those for your team to follow up. It knows what it can and can’t handle.",
  },
  {
    q: 'Do you manage the Meta Ads or do we?',
    a: "We handle everything — ad creative, audience targeting, budget management, and monthly optimisation. You review and approve before anything goes live. Your account, fully managed.",
  },
  {
    q: 'How quickly can my clinic go live?',
    a: "Most clinics are live within 3–5 working days. Our team configures the AI scripts, sets up the ad account, and integrates with your booking system. No technical work required from your side.",
  },
  {
    q: 'Is there a contract or lock-in?',
    a: "No contract. Monthly subscription, cancel anytime with 30 days’ notice. We keep clients by getting results — not by locking them in.",
  },
  {
    q: "What’s the guarantee exactly?",
    a: "If we don’t book a new patient into your calendar within 7 days of going live, month 1 is completely free. No questions, no fine print.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" id="faq">
      <div className="faq-layout">
        <div className="faq-left">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-h2">Questions clinic owners ask us every week.</h2>
          <p className="body-text">
            No jargon. If something isn&apos;t covered here, our team responds within the hour.
          </p>
          <a href="#cta" className="btn btn-blue faq-cta">Talk to us →</a>
        </div>
        <div className="faq-items">
          {FAQS.map((f, i) => (
            <div className={'faq-item' + (open === i ? ' open' : '')} key={i}>
              <button
                className="faq-q"
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {f.q}
                <span className="faq-toggle" />
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
