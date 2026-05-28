'use client';

import { useState } from 'react';
import { submitLead, isValidPhone } from '@/lib/submitLead';

const DEFAULT_LABEL = 'Get Free Demo';

export default function CTA() {
  const [state, setState] = useState({ loading: false, label: DEFAULT_LABEL, success: false, error: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = form.phone.value.trim();
    if (!isValidPhone(phone)) return setState((s) => ({ ...s, error: 'Please enter a valid WhatsApp number.' }));

    setState({ loading: true, label: 'Sending…', success: false, error: '' });
    try {
      await submitLead({ phone, formLocation: 'cta' });
      form.reset();
      setState({ loading: false, label: "✓ We'll be in touch!", success: true, error: '' });
      setTimeout(() => setState({ loading: false, label: DEFAULT_LABEL, success: false, error: '' }), 4000);
    } catch (err) {
      console.error(err);
      setState({
        loading: false,
        label: DEFAULT_LABEL,
        success: false,
        error: 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <section className="cta-section" id="cta">
      <div className="cta-glow" />
      <div className="cta-inner">
        <span className="eyebrow">Zero Risk</span>
        <h2 className="cta-h2">First new patient booked<br />in 7 days — or month 1 is free.</h2>
        <p className="cta-sub">
          Book a free 20-minute demo. We&apos;ll show you Zentra responding to a real clinic inquiry — live, on the call with you.
        </p>
        <form className="cta-form" onSubmit={handleSubmit} noValidate>
          <input
            type="tel"
            name="phone"
            placeholder="Your WhatsApp number"
            autoComplete="tel"
            required
          />
          <button
            type="submit"
            className={`btn btn-blue-lg${state.success ? ' btn-success' : ''}`}
            disabled={state.loading}
          >
            {state.label}
          </button>
        </form>
        <p className="cta-note">No commitment. No contract. Our team responds within the hour.</p>
        <div className="cta-error" aria-live="polite">{state.error}</div>
      </div>
    </section>
  );
}
