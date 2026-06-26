'use client';

import { useEffect, useRef, useState } from 'react';
import { submitLead, isValidPhone } from '@/lib/submitLead';

const DEFAULT_LABEL = 'Get Your Free Demo';

export default function Hero() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const [state, setState] = useState({ loading: false, label: DEFAULT_LABEL, success: false, error: '' });

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;

    function onMove(e) {
      const rect = hero.getBoundingClientRect();
      glow.style.left = e.clientX - rect.left + 'px';
      glow.style.top = e.clientY - rect.top + 'px';
      glow.style.opacity = '1';
    }
    function onLeave() {
      glow.style.opacity = '0';
    }
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const businessType = form.businessType.value;

    if (!name || name.length < 2) return setState((s) => ({ ...s, error: 'Please enter your name.' }));
    if (!isValidPhone(phone)) return setState((s) => ({ ...s, error: 'Please enter a valid phone number.' }));
    if (!businessType) return setState((s) => ({ ...s, error: 'Please select your business type.' }));

    setState({ loading: true, label: 'Sending...', success: false, error: '' });
    try {
      await submitLead({ name, phone, businessType, formLocation: 'hero' });
      form.reset();
      setState({ loading: false, label: 'Request received', success: true, error: '' });
      setTimeout(() => setState({ loading: false, label: DEFAULT_LABEL, success: false, error: '' }), 4000);
    } catch (err) {
      console.error(err);
      setState({
        loading: false,
        label: DEFAULT_LABEL,
        success: false,
        error: 'Something went wrong. Please try again or WhatsApp us.',
      });
    }
  }

  return (
    <section ref={heroRef} className="hero" id="hero">
      <div className="hero-glow" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div ref={glowRef} className="hero-cursor-glow" />

      <div className="hero-inner">
        <div className="hero-tag">
          <span className="hero-tag-dot" /> AI systems for Malaysian business owners
        </div>
        <h1 className="hero-h1">
          Run intelligent systems
          <br />
          that <em>grow on their own</em>.
        </h1>
        <p className="hero-sub">
          Zentra MY gives any business the power to run intelligent systems that think, adapt, and grow on their own without the complexity.
        </p>
        <div className="hero-proof">
          <div className="hero-proof-item">
            <span className="hero-proof-label">Built for</span>
            <span className="hero-proof-num">Leads, follow-up, bookings, and operations</span>
          </div>
          <div className="hero-proof-item">
            <span className="hero-proof-label">Owner effort</span>
            <span className="hero-proof-num">No prompts, tools, or technical setup to manage</span>
          </div>
          <div className="hero-proof-item">
            <span className="hero-proof-label">Channels</span>
            <span className="hero-proof-num">WhatsApp, Instagram, forms, CRM, and calendars</span>
          </div>
        </div>
      </div>

      <div className="hero-form-card">
        <div className="form-card-kicker">
          <span className="form-card-dot" />
          Business systems audit
        </div>
        <div className="form-card-head">
          <div>
            <div className="hero-form-title">See what Zentra can automate</div>
            <div className="hero-form-sub">Get a free demo mapped to your business. No commitment.</div>
          </div>
          <div className="form-card-badge">20 min</div>
        </div>
        <div className="form-pipeline" aria-hidden="true">
          <span className="pipeline-step active">Map</span>
          <span className="pipeline-line" />
          <span className="pipeline-step active">Build</span>
          <span className="pipeline-line" />
          <span className="pipeline-step">Run</span>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="heroName">Your Name</label>
            <input id="heroName" name="name" type="text" placeholder="Ahmad Razif" autoComplete="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="heroPhone">Business Phone Number</label>
            <input id="heroPhone" name="phone" type="tel" placeholder="+60 12-345 6789" autoComplete="tel" required />
          </div>
          <div className="form-group">
            <label htmlFor="heroBusiness">Business Type</label>
            <select id="heroBusiness" name="businessType" defaultValue="" required>
              <option value="" disabled>Select your industry</option>
              <option>Service Business</option>
              <option>Clinic / Wellness</option>
              <option>Real Estate / Property</option>
              <option>Education / Training</option>
              <option>Retail / Ecommerce</option>
              <option>Professional Services</option>
              <option>Home Services</option>
              <option>Other</option>
            </select>
          </div>
          <button
            type="submit"
            className={`btn btn-blue-lg form-submit${state.success ? ' btn-success' : ''}`}
            disabled={state.loading}
          >
            {state.label}
          </button>
          <div className="form-error" aria-live="polite">{state.error}</div>
        </form>
        <div className="hero-outcome-grid" aria-hidden="true">
          <div>
            <span>First system</span>
            <strong>3-5 days</strong>
          </div>
          <div>
            <span>Owner setup</span>
            <strong>Done for you</strong>
          </div>
        </div>
        <p className="form-note">No setup complexity. No technical team needed.</p>
      </div>
    </section>
  );
}
