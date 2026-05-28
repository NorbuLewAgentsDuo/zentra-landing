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

    setState({ loading: true, label: 'Sending…', success: false, error: '' });
    try {
      await submitLead({ name, phone, businessType, formLocation: 'hero' });
      form.reset();
      setState({ loading: false, label: '✓ Request received', success: true, error: '' });
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
          <span className="hero-tag-dot" /> For Aesthetic Clinics in Malaysia
        </div>
        <h1 className="hero-h1">
          First new patient booked
          <br />
          in <em>7 days</em>, or you don&apos;t pay.
        </h1>
        <p className="hero-sub">
          Zentra runs your Meta Ads, responds to every Instagram and WhatsApp inquiry in under 60 seconds, and books appointments directly into your calendar, 24/7, without adding a single staff member.
        </p>
        <div className="hero-proof">
          <div className="hero-proof-item">
            <span className="hero-proof-label">Response target</span>
            <span className="hero-proof-num">&lt;60s on every inquiry</span>
          </div>
          <div className="hero-proof-item">
            <span className="hero-proof-label">Commercial promise</span>
            <span className="hero-proof-num">First booking guaranteed</span>
          </div>
          <div className="hero-proof-item">
            <span className="hero-proof-label">Coverage</span>
            <span className="hero-proof-num">Instagram and WhatsApp</span>
          </div>
        </div>
      </div>

      <div className="hero-form-card">
        <div className="form-card-kicker">
          <span className="form-card-dot" />
          Live clinic growth audit
        </div>
        <div className="form-card-head">
          <div>
            <div className="hero-form-title">See Zentra in Action</div>
            <div className="hero-form-sub">Get a free demo personalised to your clinic. No commitment.</div>
          </div>
          <div className="form-card-badge">20 min</div>
        </div>
        <div className="form-pipeline" aria-hidden="true">
          <span className="pipeline-step active">Lead</span>
          <span className="pipeline-line" />
          <span className="pipeline-step active">Qualify</span>
          <span className="pipeline-line" />
          <span className="pipeline-step">Book</span>
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
              <option>Aesthetic Clinic / Skincare</option>
              <option>Dental / Medical Clinic</option>
              <option>Hair Salon / Barbershop</option>
              <option>Real Estate / Property</option>
              <option>Education / Tuition</option>
              <option>Fitness / Gym</option>
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
            <span>Avg. reply</span>
            <strong>&lt;60s</strong>
          </div>
          <div>
            <span>Setup</span>
            <strong>3-5 days</strong>
          </div>
        </div>
        <p className="form-note">No setup fees · No contracts · Cancel anytime</p>
      </div>
    </section>
  );
}
