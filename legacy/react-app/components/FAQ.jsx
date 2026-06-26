'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What exactly does Zentra MY do?',
    a: 'Zentra MY designs and runs AI systems for your business. That can include lead response, follow-up, booking, workflow automation, reporting, customer routing, and internal task handoffs.',
  },
  {
    q: 'Is this only for clinics?',
    a: 'No. Zentra can work for service businesses, property teams, education providers, wellness brands, home services, ecommerce, agencies, and other businesses with repeated customer or admin workflows.',
  },
  {
    q: 'Do I need to understand AI or prompts?',
    a: 'No. We handle the strategy, setup, prompts, integrations, testing, and improvement. You explain how the business works, then we build the system around it.',
  },
  {
    q: 'How quickly can we launch something useful?',
    a: 'Most businesses can launch a first focused system within 3 to 5 working days after we map the workflow and confirm access to the tools involved.',
  },
  {
    q: 'What tools can Zentra connect with?',
    a: 'Common channels include WhatsApp, Instagram, website forms, Google Sheets, calendars, CRM tools, email, and internal notifications. We confirm the exact setup during the demo.',
  },
  {
    q: 'Will AI replace my team?',
    a: 'No. Zentra removes repetitive work and gives your team better next actions. Humans still handle judgement, relationships, approvals, and exceptions.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" id="faq">
      <div className="faq-layout">
        <div className="faq-left">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-h2">Questions business owners ask before using AI systems.</h2>
          <p className="body-text">
            No jargon. We start with one workflow, prove the value, then expand only where it makes sense.
          </p>
          <a href="#cta" className="btn btn-blue faq-cta">Talk to us</a>
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
