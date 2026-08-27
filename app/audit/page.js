'use client';

import { useState } from 'react';
import { submitLead, isValidPhone } from '@/lib/submitLead';

// ---------------------------------------------------------------------------
// Drop the VSL in here after filming. Any embed URL works (YouTube
// `/embed/<id>`, Vimeo `player.vimeo.com/video/<id>`) — or set VSL_MP4 to a
// file in /public and leave this empty. While both are empty the page renders
// a placeholder, so the form and copy can be tested and shared today.
const VSL_EMBED_URL = '';
const VSL_MP4 = '';
// ---------------------------------------------------------------------------

// The dropdowns ARE the qualifier — same principle as the Leak Finder
// diagnostic: read the row before you get on a call. Profit-per-sale is the
// load-bearing gate; the rest is context the audit starts from.
const PROFIT_BANDS = [
  'Under RM1,000',
  'RM1,000 – RM5,000',
  'RM5,000 – RM15,000',
  'RM15,000+',
];

const SPEND_BANDS = [
  'Not running ads yet',
  'Under RM2,000/month',
  'RM2,000 – RM10,000/month',
  'RM10,000+/month',
];

const DECISION_ROLES = [
  'I decide — nobody to ask',
  'I decide with a partner',
  'I need approval from someone else',
];

export default function AuditPage() {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    website: '',
    email: '',
    phone: '',
    profitPerSale: '',
    adSpend: '',
    decisionRole: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.businessName.trim()) {
      setError('Name and business name, please.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setError('A real email — the audit gets sent there.');
      return;
    }
    if (!isValidPhone(form.phone)) {
      setError('That phone number does not look right.');
      return;
    }
    if (!form.profitPerSale || !form.adSpend || !form.decisionRole) {
      setError('Please answer all three dropdowns.');
      return;
    }

    setStatus('sending');
    try {
      await submitLead({ ...form, formLocation: 'audit-vsl', source: 'vsl-audit-page' });
      setStatus('done');
    } catch {
      setStatus('idle');
      setError('Something broke on our side — try again in a minute.');
    }
  }

  if (status === 'done') {
    return (
      <main className="vsl">
        <section className="vsl-thanks">
          <p className="vsl-eyebrow">Got it</p>
          <h1 className="vsl-h1">Your audit is in the queue.</h1>
          <p className="vsl-lede">
            I read every one myself. If your business clears the bar I&rsquo;ll message you
            within two working days. If it doesn&rsquo;t, I&rsquo;ll tell you that too, and why.
            No pitch either way.
          </p>
          <p className="vsl-fine">Check spam for anything from zentramy.com.</p>
        </section>
        <Styles />
      </main>
    );
  }

  return (
    <main className="vsl">
      {/* 1–3 · Qualify, then the gap, then the video. Nothing above the fold  */}
      {/* tries to teach — warm traffic already knows who he is.              */}
      <section className="vsl-hero">
        <p className="vsl-eyebrow">
          For owner-led service businesses spending real money on ads
        </p>

        <h1 className="vsl-h1">
          You know what you spend on ads.
          <br />
          <span className="vsl-accent">Can you say what it bought?</span>
        </h1>

        <p className="vsl-lede">
          I&rsquo;ll go through your funnel the way one of your buyers would, and tell you
          exactly where it breaks. Free, and you keep it whether or not we ever work together.
        </p>

        <div className="vsl-video">
          {VSL_EMBED_URL ? (
            <iframe
              src={VSL_EMBED_URL}
              title="The free funnel audit — Zentra"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : VSL_MP4 ? (
            <video controls preload="metadata" playsInline src={VSL_MP4} />
          ) : (
            <div className="vsl-video-placeholder">
              <span className="vsl-mono">VSL</span>
              <p>90 seconds. Filming 2026-08-25.</p>
            </div>
          )}
        </div>

        <a href="#apply" className="vsl-cta">Apply for the free audit</a>
        <p className="vsl-fine">Two minutes. No call needed to apply.</p>
      </section>

      {/* 4 · What it actually is. Concrete beats persuasive — the barrier is  */}
      {/* trust, not desire.                                                   */}
      <section className="vsl-block">
        <h2 className="vsl-h2">What you actually get</h2>
        <p className="vsl-body">
          I click your ad, land where your buyers land, fill in your form, and time how long
          it takes anyone to come back. Sometimes nobody does — that&rsquo;s usually the whole
          audit right there. Then I send you four things:
        </p>
        <ol className="vsl-four">
          <li>
            <span className="vsl-num">01</span>
            <div>Where your chain breaks — the specific step, not &ldquo;improve your marketing.&rdquo;</div>
          </li>
          <li>
            <span className="vsl-num">02</span>
            <div>What that break costs you at the spend you&rsquo;re already running.</div>
          </li>
          <li>
            <span className="vsl-num">03</span>
            <div>What I&rsquo;d fix first — and what I&rsquo;d leave alone.</div>
          </li>
          <li>
            <span className="vsl-num">04</span>
            <div>Whether you need me at all. Sometimes the answer is no, and I&rsquo;ll say so.</div>
          </li>
        </ol>
      </section>

      {/* 5 · Free, with the reason attached. Unexplained free reads as a catch. */}
      <section className="vsl-block">
        <h2 className="vsl-h2">Why it&rsquo;s free</h2>
        <p className="vsl-body">
          Straight answer: I&rsquo;m nineteen, and I&rsquo;ve just changed who my company sells
          to — which means I have no case studies yet for the kind of business I want to work
          with. Right now I need proof more than I need your money.
        </p>
        <p className="vsl-body">
          You keep the whole audit either way. If it turns into work later, good. If it
          doesn&rsquo;t, you&rsquo;ve still got the audit.
        </p>
      </section>

      {/* 6 · Disqualify out loud. Saves an hour on both sides.                */}
      <section className="vsl-block">
        <h2 className="vsl-h2">Who this isn&rsquo;t for</h2>
        <ul className="vsl-list">
          <li>E-commerce and product resellers — different mechanics entirely</li>
          <li>Commission-only salespeople — I need whoever owns the ad budget</li>
          <li>Under roughly RM5,000 gross profit per sale — the maths won&rsquo;t clear</li>
          <li>Anyone who needs three people to agree before anything changes</li>
        </ul>
      </section>

      {/* 7 · The form. Four questions that double as the qualifier.          */}
      <section className="vsl-block" id="apply">
        <h2 className="vsl-h2">Apply</h2>
        <p className="vsl-body">
          Same questions I&rsquo;d ask on a call, so answering them here means the audit starts
          before we speak.
        </p>

        <form className="vsl-form" onSubmit={onSubmit} noValidate>
          <div className="vsl-row">
            <label>
              <span>Your name</span>
              <input value={form.name} onChange={set('name')} autoComplete="name" />
            </label>
            <label>
              <span>Business name</span>
              <input
                value={form.businessName}
                onChange={set('businessName')}
                autoComplete="organization"
              />
            </label>
          </div>

          <label>
            <span>Website, or the page your ads point at</span>
            <input
              value={form.website}
              onChange={set('website')}
              placeholder="yourbusiness.com"
              inputMode="url"
            />
          </label>

          <div className="vsl-row">
            <label>
              <span>Email</span>
              <input value={form.email} onChange={set('email')} type="email" autoComplete="email" />
            </label>
            <label>
              <span>WhatsApp number</span>
              <input value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
            </label>
          </div>

          <label>
            <span>Gross profit on one sale, case or client</span>
            <select value={form.profitPerSale} onChange={set('profitPerSale')}>
              <option value="">Pick one</option>
              {PROFIT_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>

          <label>
            <span>Roughly what you spend on ads</span>
            <select value={form.adSpend} onChange={set('adSpend')}>
              <option value="">Pick one</option>
              {SPEND_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>

          <label>
            <span>Who decides whether to fix it</span>
            <select value={form.decisionRole} onChange={set('decisionRole')}>
              <option value="">Pick one</option>
              {DECISION_ROLES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>

          {error && <p className="vsl-error">{error}</p>}

          <button type="submit" className="vsl-cta vsl-cta-wide" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send my application'}
          </button>
          <p className="vsl-fine">
            I read these myself. If you don&rsquo;t clear the bar I&rsquo;ll tell you, and why.
          </p>
        </form>
      </section>

      <footer className="vsl-footer">
        <p className="vsl-mono">ZENTRA MY</p>
        <p className="vsl-fine">
          Zentra improves the offer, traffic, conversion and follow-up that create the
          opportunity to close. It does not guarantee closed sales or revenue.
        </p>
      </footer>

      <Styles />
    </main>
  );
}

function Styles() {
  return (
    <style>{`
      .vsl {
        --blue: #0021F3;
        --pearl: #C1BFE3;
        --soft: #F5F4FF;
        --ink: #05040a;
        background: var(--ink);
        color: var(--soft);
        font-family: Sora, system-ui, -apple-system, "Segoe UI", sans-serif;
        line-height: 1.6;
        min-height: 100vh;
        padding: 0 20px 80px;
      }
      .vsl * { box-sizing: border-box; }

      .vsl-hero, .vsl-block, .vsl-thanks, .vsl-footer { max-width: 720px; margin: 0 auto; }
      .vsl-hero { padding: 72px 0 56px; text-align: center; }
      .vsl-thanks { padding: 120px 0; text-align: center; }
      .vsl-block { padding: 52px 0; border-top: 1px solid rgba(193,191,227,0.14); }

      .vsl-eyebrow {
        font-family: "DM Mono", ui-monospace, monospace;
        font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
        color: var(--pearl); margin: 0 0 18px;
      }
      .vsl-h1 {
        font-size: clamp(30px, 6vw, 50px); line-height: 1.12;
        letter-spacing: -0.02em; margin: 0 0 20px; font-weight: 700;
      }
      .vsl-h2 {
        font-size: clamp(22px, 4vw, 30px); line-height: 1.2;
        letter-spacing: -0.01em; margin: 0 0 16px; font-weight: 700;
      }
      .vsl-accent { color: var(--pearl); }
      .vsl-lede {
        font-size: clamp(16px, 2.2vw, 19px); color: rgba(245,244,255,0.82);
        margin: 0 auto 32px; max-width: 600px;
      }
      .vsl-body { font-size: 16px; color: rgba(245,244,255,0.82); margin: 0 0 16px; }

      .vsl-video {
        position: relative; width: 100%; aspect-ratio: 16 / 9; margin: 0 0 30px;
        border-radius: 14px; overflow: hidden; background: #0b0a18;
        border: 1px solid rgba(193,191,227,0.2);
      }
      .vsl-video iframe, .vsl-video video { width: 100%; height: 100%; border: 0; display: block; }
      .vsl-video-placeholder {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        height: 100%; gap: 10px; color: rgba(193,191,227,0.55);
      }
      .vsl-video-placeholder p { margin: 0; font-size: 14px; }

      .vsl-mono {
        font-family: "DM Mono", ui-monospace, monospace;
        letter-spacing: 0.18em; font-size: 13px; text-transform: uppercase;
      }

      .vsl-cta {
        display: inline-block; background: var(--blue); color: #fff; text-decoration: none;
        font-weight: 600; font-size: 16px; padding: 16px 34px; border-radius: 10px;
        border: 0; cursor: pointer; font-family: inherit;
        transition: transform .12s ease, filter .12s ease;
      }
      .vsl-cta:hover { filter: brightness(1.12); transform: translateY(-1px); }
      .vsl-cta:disabled { opacity: .55; cursor: default; transform: none; }
      .vsl-cta-wide { width: 100%; margin-top: 6px; }
      .vsl-fine { font-size: 13px; color: rgba(193,191,227,0.62); margin: 14px 0 0; }

      .vsl-four { list-style: none; padding: 0; margin: 0; }
      .vsl-four li {
        display: flex; gap: 16px; align-items: flex-start; padding: 15px 0;
        border-bottom: 1px solid rgba(193,191,227,0.1);
        font-size: 16px; color: rgba(245,244,255,0.82);
      }
      .vsl-num {
        font-family: "DM Mono", ui-monospace, monospace; color: var(--pearl);
        font-size: 13px; padding-top: 3px; flex: 0 0 auto;
      }

      .vsl-list { margin: 0; padding-left: 20px; }
      .vsl-list li { margin-bottom: 9px; color: rgba(245,244,255,0.7); font-size: 16px; }

      .vsl-form { display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
      .vsl-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .vsl-form label { display: flex; flex-direction: column; gap: 7px; font-size: 14px; }
      .vsl-form label span { color: var(--pearl); }
      .vsl-form input, .vsl-form select {
        background: #0b0a18; border: 1px solid rgba(193,191,227,0.24); border-radius: 9px;
        color: var(--soft); padding: 13px 14px; font-size: 16px;
        font-family: inherit; width: 100%;
      }
      .vsl-form input:focus, .vsl-form select:focus { outline: 2px solid var(--blue); outline-offset: 1px; }
      .vsl-form select option { background: #0b0a18; }

      .vsl-error {
        color: #ffb4b4; font-size: 14px; margin: 0;
        background: rgba(255,80,80,0.09); border: 1px solid rgba(255,80,80,0.28);
        border-radius: 8px; padding: 11px 13px;
      }

      .vsl-footer {
        padding: 44px 0 0; border-top: 1px solid rgba(193,191,227,0.14); text-align: center;
      }
      .vsl-footer .vsl-mono { color: var(--pearl); margin: 0 0 10px; }

      @media (max-width: 620px) {
        .vsl-row { grid-template-columns: 1fr; }
        .vsl-hero { padding: 48px 0 40px; }
      }
    `}</style>
  );
}
