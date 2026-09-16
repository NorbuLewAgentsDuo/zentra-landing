'use client';

import { useState } from 'react';
import '@/app/journey-infographic.css';

const STAGES = [
  {
    id: 'capture',
    number: '01',
    title: 'Capture',
    body: 'Bring each new enquiry from an approved channel into one known workflow.',
    output: 'Output: enquiry recorded',
    example: 'A prospect submits a Meta form. The system records their contact details, source and time received.',
  },
  {
    id: 'qualify',
    number: '02',
    title: 'Qualify',
    body: 'Ask the agreed questions that determine fit and the right next step.',
    output: 'Output: useful context',
    example: 'The prospect shares what they need, their location, timing and other criteria approved by the business.',
  },
  {
    id: 'follow',
    number: '03',
    title: 'Follow up',
    body: 'Continue the approved conversation and stop or escalate when the rules require it.',
    output: 'Output: next action owned',
    example: 'A quiet prospect receives the next approved message. A question requiring judgement is routed to the team.',
  },
  {
    id: 'book',
    number: '04',
    title: 'Book',
    body: 'Offer the appropriate appointment options and confirm the selected time.',
    output: 'Output: appointment confirmed',
    example: 'A suitable prospect selects an available appointment and receives the agreed confirmation details.',
  },
  {
    id: 'attend',
    number: '05',
    title: 'Attend + report',
    body: 'Record the outcome supplied by the business and make the journey visible to the owner.',
    output: 'Output: outcome recorded',
    example: 'The team confirms attended, rescheduled or no-show. The system reflects that outcome in reporting.',
  },
];

function StageIcon({ id }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {id === 'capture' && <><path {...common} d="M4 5.5h16v13H4z"/><path {...common} d="m5 7 7 5 7-5"/></>}
      {id === 'qualify' && <><circle {...common} cx="10.5" cy="10.5" r="5.5"/><path {...common} d="m15 15 4.5 4.5M8.5 10.5l1.4 1.4 2.8-3"/></>}
      {id === 'follow' && <><path {...common} d="M5 5.5h14v10H9l-4 3v-13Z"/><path {...common} d="M8 9h8M8 12h5"/></>}
      {id === 'book' && <><rect {...common} x="4" y="6" width="16" height="14" rx="2"/><path {...common} d="M8 4v4M16 4v4M4 10h16M8 14h3"/></>}
      {id === 'attend' && <><path {...common} d="M5 4h14v16H5zM8 9h8M8 13h5M8 17h7"/><path {...common} d="m15 6 1 1 2-2"/></>}
    </svg>
  );
}

export default function JourneyInfographic() {
  const [active, setActive] = useState(0);

  return (
    <div className="ji-shell">
      <div className="ji-inputs" aria-label="Approved enquiry sources">
        <span className="ji-inputs-label">Approved inputs</span>
        <div className="ji-channel-list">
          <span>Meta lead form</span>
          <span>Website form</span>
          <span>Inbound message</span>
          <span>Existing lead source</span>
        </div>
        <span className="ji-input-arrow" aria-hidden="true">↓</span>
      </div>

      <div className="ji-map" aria-label="Five-stage enquiry-to-appointment workflow">
        {STAGES.map((stage, index) => (
          <div className={`ji-stage-wrap ji-stage-${stage.id}`} key={stage.id}>
            <button
              className={`ji-stage ${active === index ? 'is-active' : ''}`}
              type="button"
              aria-pressed={active === index}
              aria-controls="ji-stage-detail"
              onClick={() => setActive(index)}
            >
              <span className="ji-stage-top">
                <span className="ji-icon"><StageIcon id={stage.id} /></span>
                <span className="ji-number">{stage.number}</span>
              </span>
              <strong>{stage.title}</strong>
              <span className="ji-body">{stage.body}</span>
              <span className="ji-output">{stage.output}</span>
            </button>
            {index < STAGES.length - 1 ? <span className="ji-connector" aria-hidden="true"><i /></span> : null}
            {stage.id === 'follow' ? (
              <div className="ji-handoff">
                <span className="ji-handoff-line" aria-hidden="true" />
                <span className="ji-handoff-label">Human handoff</span>
                <strong>Your team owns judgement</strong>
                <p>Answer questions, handle exceptions and lead the appointment.</p>
                <span className="ji-return" aria-hidden="true">Returns to the agreed workflow ↗</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="ji-detail" id="ji-stage-detail" aria-live="polite">
        <span className="ji-detail-label">Illustrative example · {STAGES[active].number}</span>
        <div>
          <strong>{STAGES[active].title}</strong>
          <p>{STAGES[active].example}</p>
        </div>
        <span className="ji-detail-hint">Select any stage to inspect it</span>
      </div>

      <div className="ji-report">
        <span className="ji-report-icon"><StageIcon id="attend" /></span>
        <div>
          <span>Owner-visible reporting</span>
          <strong>See the recorded path from enquiry to appointment outcome.</strong>
          <p>Your team confirms attendance. The system reports the information it receives; it does not infer an outcome.</p>
        </div>
      </div>
    </div>
  );
}
