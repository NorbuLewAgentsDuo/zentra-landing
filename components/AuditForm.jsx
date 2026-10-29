'use client';

import { useEffect, useRef, useState } from 'react';
import { AD_SPEND_OPTIONS, BUSINESS_TYPES, UTM_KEYS, normalisePhone } from '@/lib/auditOptions.mjs';
import { Mascot } from './Mascot';

const EMPTY_FORM = {
  name: '',
  businessName: '',
  businessType: '',
  whatsapp: '',
  adSpend: '',
  enquiryChannel: '',
  email: '',
  company_website: '',
  contactConsent: false,
};

export default function AuditForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const source = useRef({});
  const submittingRef = useRef(false);

  // Where the visitor came from, read once in the browser and sent with the request.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = { referrer: document.referrer.slice(0, 500), landingPath: (window.location.pathname + window.location.search).slice(0, 500) };
    for (const key of UTM_KEYS) found[key] = (params.get(key) || '').slice(0, 200);
    source.current = found;
  }, []);

  const update = (field) => (event) => {
    const value = field === 'contactConsent' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    if (field === 'whatsapp') setPhoneError('');
  };

  async function submit(event) {
    event.preventDefault();
    if (submittingRef.current) return;
    if (!event.currentTarget.reportValidity()) return;
    if (!normalisePhone(form.whatsapp)) {
      setPhoneError('That number doesn’t look right. Try 012-345 6789.');
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
        body: JSON.stringify({ ...form, ...source.current }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'We could not send your request.');
      setStatus('success');
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

  if (status === 'success') {
    return (
      <div className="audit-card audit-success" role="status" aria-live="polite">
        <Mascot kind="mochi" state="clear" size={112} />
        <h3>Got it.</h3>
        <p>We’ll send one enquiry to your business within 48 hours, then send the report to your WhatsApp.</p>
      </div>
    );
  }

  return (
    <form className="audit-card audit-form" onSubmit={submit} aria-busy={status === 'submitting'}>
      <div className="form-row">
        <label>Your name
          <input type="text" name="name" value={form.name} onChange={update('name')} autoComplete="name" required maxLength={120} />
        </label>
        <label>Business name
          <input type="text" name="businessName" value={form.businessName} onChange={update('businessName')} autoComplete="organization" required maxLength={200} />
        </label>
      </div>
      <div className="form-row">
        <label>Business type
          <select name="businessType" value={form.businessType} onChange={update('businessType')} required>
            <option value="" disabled>Choose one</option>
            {BUSINESS_TYPES.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <label>Monthly ad spend
          <select name="adSpend" value={form.adSpend} onChange={update('adSpend')} required>
            <option value="" disabled>Choose one</option>
            {AD_SPEND_OPTIONS.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      </div>
      <label>WhatsApp number <span>Where we send your report</span>
        <input
          type="tel" inputMode="tel" name="whatsapp" value={form.whatsapp} onChange={update('whatsapp')}
          autoComplete="tel" placeholder="012-345 6789" required maxLength={20}
          aria-invalid={phoneError ? 'true' : undefined} aria-describedby={phoneError ? 'whatsapp-error' : undefined}
        />
        {phoneError ? <small id="whatsapp-error" className="field-error">{phoneError}</small> : null}
      </label>
      <label>Where should we enquire? <span>Optional · FB page, IG handle or WhatsApp link</span>
        <input type="text" name="enquiryChannel" value={form.enquiryChannel} onChange={update('enquiryChannel')} maxLength={300} placeholder="instagram.com/yourbusiness" />
      </label>
      <label>Email <span>Optional</span>
        <input type="email" name="email" value={form.email} onChange={update('email')} autoComplete="email" maxLength={254} />
      </label>

      {/* Honeypot: hidden from people, bots fill it in. Checked in lib/lead-handler.mjs. */}
      <div className="honeypot" aria-hidden="true">
        <label>Company website<input type="text" name="company_website" value={form.company_website} onChange={update('company_website')} tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="consent-row">
        <input type="checkbox" name="contactConsent" checked={form.contactConsent} onChange={update('contactConsent')} required />
        <span>I agree that Zentra may contact me about this audit.</span>
      </label>
      <button className="button button-primary submit-button" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send me my audit →'}
      </button>
      {message ? <p className="form-message error" role="alert">{message}</p> : null}
      <p className="form-fineprint">
        We use these details only to run your audit and send you the report. We don’t sell or share them.
      </p>
    </form>
  );
}
