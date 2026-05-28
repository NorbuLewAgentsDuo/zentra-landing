'use client';

import { useEffect, useRef, useState } from 'react';

const BAR_COUNT = 30;

function formatTime(s) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return m + ':' + String(r).padStart(2, '0');
}

export default function AudioDemo() {
  const audioRef = useRef(null);
  const barsRef = useRef(null);
  const intervalRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState('0:00');
  const [total, setTotal] = useState('0:00');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onMeta = () => setTotal(formatTime(audio.duration));
    const onTime = () => {
      const pct = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(pct);
      setCurrent(formatTime(audio.currentTime));
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent('0:00');
      stopWave();
    };
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      stopWave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function animateWave() {
    const bars = barsRef.current?.querySelectorAll('.wave-bar');
    if (!bars) return;
    bars.forEach((b) => {
      b.style.height = 15 + Math.random() * 85 + '%';
    });
  }
  function stopWave() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    const bars = barsRef.current?.querySelectorAll('.wave-bar');
    bars?.forEach((b) => (b.style.height = '20%'));
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch((err) => console.error('audio play failed', err));
      setPlaying(true);
      intervalRef.current = setInterval(animateWave, 140);
    } else {
      audio.pause();
      setPlaying(false);
      stopWave();
    }
  }

  return (
    <section className="section" id="demo">
      <div className="demo-layout">
        <div className="demo-left">
          <span className="eyebrow">Hear It Live</span>
          <h2 className="section-h2">Hear Zentra qualify a real clinic inquiry.</h2>
          <p className="body-text">
            A potential patient has shown interest in a treatment. Hear how Zentra qualifies them, handles pricing questions, and books the appointment — naturally, in under 90 seconds.
          </p>
          <div className="demo-callbox">
            <span className="demo-live-dot" />
            Live recording · Aesthetic Clinic
          </div>
          <div className="demo-captions">
            <div className="demo-cap-item">
              <span className="demo-cap-num">0:47</span>
              <span className="demo-cap-label">Call length</span>
            </div>
            <div className="demo-cap-item">
              <span className="demo-cap-num">100%</span>
              <span className="demo-cap-label">AI voice</span>
            </div>
            <div className="demo-cap-item">
              <span className="demo-cap-num">EN / BM</span>
              <span className="demo-cap-label">Languages</span>
            </div>
          </div>
        </div>

        <div className="phone-frame">
          <div className="phone-caller">
            <div className="phone-avatar">Z</div>
            <div className="phone-caller-info">
              <div className="phone-caller-name">Zentra AI</div>
              <div className="phone-caller-role">Qualifying clinic inquiry…</div>
            </div>
            <div className="phone-status">{playing ? 'On call' : 'Ready'}</div>
          </div>
          <div className="waveform" ref={barsRef}>
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <div className="wave-bar" key={i} />
            ))}
          </div>
          <div className="phone-progress-wrap">
            <span className="phone-time">{current}</span>
            <div className="phone-progress-track">
              <div className="phone-progress-fill" style={{ width: progress + '%' }} />
            </div>
            <span className="phone-time">{total}</span>
          </div>
          <div className="phone-controls">
            <button
              className="phone-btn"
              type="button"
              aria-label={playing ? 'Pause demo' : 'Play demo'}
              onClick={toggle}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
          <audio ref={audioRef} src="/assets/recording.wav" preload="metadata" />
        </div>
      </div>
    </section>
  );
}
