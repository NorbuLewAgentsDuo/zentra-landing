import '@/app/mascot.css';

// Mochi and Orb, ported from Zentra Relay's components/assistant/Assistant.tsx (rig + keyframes as-is,
// minus the team gear and the one-shot "booked" state). States: idle, needs, thinking, clear, hello.
// Pure CSS animation, so this works in server and client components.

export function Mascot({
  kind,
  state = "idle",
  size = 96,
  tint,
  className = "",
}) {
  return (
    <span
      className={`mascot${size < 60 ? " mascot--sm" : ""} ${className}`}
      data-state={state}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {kind === "mochi" ? <Mochi tint={tint} /> : <Orb tint={tint} />}
    </span>
  );
}

const MOCHI_BODY = "M100 46 C150 46 178 82 178 122 C178 158 146 172 100 172 C54 172 22 158 22 122 C22 82 50 46 100 46 Z";

function Mochi({ tint }) {
  return (
    <svg className="m-mochi" viewBox="0 0 200 200" focusable="false">
      <g className="char">
        <circle className="ring" cx="100" cy="106" r="84" fill="none" stroke="#F5A524" strokeWidth="5" />
        <g className="body">
          <ellipse cx="100" cy="178" rx="52" ry="7" fill="#2D3142" opacity="0.10" />
          <path d={MOCHI_BODY} fill={tint || "#D9CBF5"} />
          <path d={MOCHI_BODY} fill="none" stroke="#2D3142" strokeWidth="3" opacity="0.14" />
          <ellipse cx="74" cy="76" rx="26" ry="12" fill="#FFFFFF" opacity="0.55" transform="rotate(-18 74 76)" />
          <path d="M90 50 Q100 60 110 50" fill="none" stroke="#2D3142" strokeWidth="3" strokeLinecap="round" opacity="0.18" />
          <g className="face">
            <circle className="eye" cx="80" cy="102" r="7" fill="#2D3142" />
            <circle className="eye" cx="120" cy="102" r="7" fill="#2D3142" />
            <path className="happy" d="M72 104 Q80 94 88 104" fill="none" stroke="#2D3142" strokeWidth="5" strokeLinecap="round" />
            <path className="happy" d="M112 104 Q120 94 128 104" fill="none" stroke="#2D3142" strokeWidth="5" strokeLinecap="round" />
            <path className="smile" d="M93 120 Q100 126 107 120" fill="none" stroke="#2D3142" strokeWidth="4" strokeLinecap="round" />
            <path className="grin" d="M89 118 Q100 132 111 118" fill="none" stroke="#2D3142" strokeWidth="4" strokeLinecap="round" />
            <circle className="oh" cx="100" cy="123" r="5" fill="#2D3142" />
            <circle cx="62" cy="117" r="9" fill="#F5A5B0" opacity="0.8" />
            <circle cx="138" cy="117" r="9" fill="#F5A5B0" opacity="0.8" />
          </g>
        </g>
        <g className="dots" fill="#2D3142">
          <circle cx="150" cy="40" r="5" />
          <circle cx="166" cy="32" r="5" />
          <circle cx="182" cy="24" r="5" />
        </g>
        <g className="tick">
          <circle cx="164" cy="44" r="20" fill="#1F8A70" />
          <path d="M154 44 L161 51 L175 37" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <circle className="dot" cx="164" cy="44" r="16" fill="#F5A524" />
        <g className="spark">
          <path d="M156 30 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill="#F5A524" />
          <path d="M36 42 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#F5A5B0" />
        </g>
      </g>
    </svg>
  );
}

function Orb({ tint }) {
  return (
    <svg className="m-orb" viewBox="0 0 200 200" focusable="false">
      <g className="char">
        <circle className="ring" cx="100" cy="100" r="84" fill="none" stroke="#F5A524" strokeWidth="5" />
        <g className="body">
          <ellipse cx="100" cy="180" rx="44" ry="6" fill="#000000" opacity="0.18" />
          <circle cx="100" cy="100" r="70" fill={tint || "#1B2D5A"} />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#5B74B8" strokeWidth="3" opacity="0.6" />
          <ellipse cx="76" cy="66" rx="20" ry="9" fill="#FFFFFF" opacity="0.12" transform="rotate(-24 76 66)" />
          <g className="face">
            <circle className="eye" cx="82" cy="98" r="8" fill="#FFFFFF" />
            <circle className="eye" cx="118" cy="98" r="8" fill="#FFFFFF" />
            <path className="happy" d="M74 100 Q82 90 90 100" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <path className="happy" d="M110 100 Q118 90 126 100" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <path className="smile" d="M91 120 Q100 126 109 120" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
            <path className="grin" d="M88 118 Q100 130 112 118" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <circle className="oh" cx="100" cy="122" r="5" fill="#FFFFFF" />
          </g>
        </g>
        <g className="dots" fill="#93B5FF">
          <circle cx="150" cy="40" r="5" />
          <circle cx="166" cy="32" r="5" />
          <circle cx="182" cy="24" r="5" />
        </g>
        <g className="tick">
          <circle cx="160" cy="44" r="20" fill="#1F8A70" />
          <path d="M150 44 L157 51 L171 37" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <circle className="dot" cx="160" cy="44" r="14" fill="#F5A524" />
        <g className="spark">
          <path d="M152 30 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill="#F5A524" />
        </g>
      </g>
    </svg>
  );
}
