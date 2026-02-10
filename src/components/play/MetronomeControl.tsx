import { useCallback } from 'react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMetronome } from '../../hooks/useMetronome.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';

const BEAT_OPTIONS = [
  { value: 2, label: '2/4' },
  { value: 3, label: '3/4' },
  { value: 4, label: '4/4' },
  { value: 6, label: '6/8' },
];

export function MetronomeControl() {
  const {
    active,
    currentBeat,
    bpm,
    beats,
    metronomeVolume,
    toggle,
    setBPM,
    setBeats,
    setMetronomeVolume,
  } = useMetronome();
  const { t } = useTranslation();

  const tonicColor = DEGREE_COLORS[1];

  const handleBPMChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBPM(parseInt(e.target.value, 10));
    },
    [setBPM],
  );

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMetronomeVolume(parseFloat(e.target.value));
    },
    [setMetronomeVolume],
  );

  return (
    <div className="space-y-3">
      {/* Header + Play/Stop */}
      <div className="flex items-center justify-between">
        <h3 className="type-section">
          {t('metronome.title')}
        </h3>
        <m.button
          onClick={toggle}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          style={{
            backgroundColor: active ? `${tonicColor}20` : 'var(--card-hover)',
            color: active ? tonicColor : 'var(--text-muted)',
            border: active ? `1.5px solid ${tonicColor}50` : '1.5px solid var(--border)',
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          aria-label={active ? t('metronome.stopLabel') : t('metronome.startLabel')}
        >
          {active ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
          {active ? t('common.stop') : t('common.start')}
        </m.button>
      </div>

      {/* Beat indicator dots */}
      <div className="flex items-center justify-center gap-2 py-2" aria-live="off" role="presentation">
        {Array.from({ length: beats }, (_, i) => {
          const isActive = active && currentBeat === i;
          const isAccent = i === 0;
          return (
            <div
              key={i}
              className="rounded-full transition-all duration-75"
              style={{
                width: isAccent ? 14 : 10,
                height: isAccent ? 14 : 10,
                backgroundColor: isActive
                  ? (isAccent ? tonicColor : 'var(--text-muted)')
                  : 'var(--border)',
                boxShadow: isActive ? `0 0 12px ${isAccent ? tonicColor : '#a1a1aa'}40` : 'none',
                transform: isActive ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          );
        })}
      </div>

      {/* BPM slider */}
      <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 60%, transparent)', border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
        <span className="text-[10px] font-bold uppercase tracking-wider w-8" style={{ color: 'var(--text-dim)' }}>
          {t('metronome.bpm')}
        </span>
        <input
          type="range"
          min="30"
          max="300"
          step="1"
          value={bpm}
          onChange={handleBPMChange}
          className="volume-slider flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${tonicColor} ${((bpm - 30) / 270) * 100}%, var(--border) ${((bpm - 30) / 270) * 100}%)`,
          }}
          aria-label={t('metronome.tempo')}
        />
        <span className="text-[11px] font-mono w-8 text-right tabular-nums" style={{ color: 'var(--text-dim)' }}>
          {bpm}
        </span>
      </div>

      {/* Time Signature */}
      <div className="flex gap-1.5" role="radiogroup" aria-label={t('metronome.timeSig')}>
        {BEAT_OPTIONS.map(({ value, label }) => {
          const isActive = beats === value;
          return (
            <button
              key={value}
              role="radio"
              aria-checked={isActive}
              onClick={() => setBeats(value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold flex-1 transition-all duration-150"
              style={{
                backgroundColor: isActive ? `${tonicColor}18` : 'var(--card)',
                color: isActive ? tonicColor : 'var(--text-muted)',
                border: isActive ? `1.5px solid ${tonicColor}50` : '1.5px solid var(--card-hover)',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Volume slider */}
      <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 60%, transparent)', border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2" strokeLinecap="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={metronomeVolume}
          onChange={handleVolumeChange}
          className="volume-slider flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${tonicColor} ${metronomeVolume * 100}%, var(--border) ${metronomeVolume * 100}%)`,
          }}
          aria-label={t('metronome.volume')}
        />
        <span className="text-[11px] font-mono w-8 text-right tabular-nums" style={{ color: 'var(--text-dim)' }}>
          {Math.round(metronomeVolume * 100)}
        </span>
      </div>
    </div>
  );
}
