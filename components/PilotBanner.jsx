'use client';

import { useEffect, useState } from 'react';

export default function PilotBanner({ deadline, label }) {
  const [now, setNow] = useState(null);
  const hasTimezone = typeof deadline === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(deadline);
  const end = hasTimezone ? Date.parse(deadline) : NaN;
  const configured = Number.isFinite(end) && Boolean(label?.trim());

  useEffect(() => {
    if (!configured) return;
    const tick = () => setNow(Date.now());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [configured, deadline]);

  const seconds = now === null ? null : Math.max(0, Math.floor((end - now) / 1000));
  const expired = seconds === 0;
  const units = seconds === null ? [] : [
    [Math.floor(seconds / 86400), 'days'],
    [Math.floor(seconds / 3600) % 24, 'hrs'],
    [Math.floor(seconds / 60) % 60, 'min'],
    [seconds % 60, 'sec'],
  ];
  const dateLabel = configured ? new Intl.DateTimeFormat('en-MY', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kuala_Lumpur',
  }).format(new Date(end)) : '';

  return (
    <aside className="pilot-banner" aria-label="Pilot announcement">
      <a className="pilot-banner-inner" href="#apply">
        <div className="pilot-banner-copy">
          <span className="banner-badge">FREE PILOT</span>
          <span><strong>{configured ? (expired ? 'This pilot deadline has passed' : label) : 'Put your enquiry workflow to work.'}</strong>
            {configured ? <small>{`${dateLabel} MYT${expired ? ' · Ask about future availability' : ''}`}</small> : null}
          </span>
        </div>
        {configured && now !== null && !expired ? (
          <div className="banner-countdown" role="timer" aria-label={`Time remaining until ${dateLabel} Malaysia time`}>
            {units.map(([value, unit]) => <span key={unit}><b>{String(value).padStart(2, '0')}</b><small>{unit}</small></span>)}
          </div>
        ) : null}
        <span className="banner-action">{expired ? 'Ask about availability' : 'See if you’re a fit'} <span aria-hidden="true">→</span></span>
      </a>
    </aside>
  );
}
