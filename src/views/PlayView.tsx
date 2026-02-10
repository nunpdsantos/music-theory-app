import { useCallback } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useKeyContext } from '../hooks/useKeyContext.ts';
import { noteToString } from '../core/types/music.ts';
import { SCALE_TYPE_NAMES } from '../core/constants/scales.ts';
import { useAppStore } from '../state/store.ts';
import { DEGREE_COLORS } from '../design/tokens/colors.ts';
import { setMasterVolume } from '../core/services/audio.ts';
import { MetronomeControl } from '../components/play/MetronomeControl.tsx';
import { MidiOutputControl } from '../components/play/MidiOutputControl.tsx';
import { ChordProgressionBuilder } from '../components/play/ChordProgressionBuilder.tsx';
import { RecordingControl } from '../components/play/RecordingControl.tsx';
import type { SynthPresetName } from '../core/types/visual.ts';

// ─── Animation variants ─────────────────────────────────────────────────────

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

// ─── Preset metadata ─────────────────────────────────────────────────────────

const PRESET_META: Record<SynthPresetName, { labelKey: string; descKey: string }> = {
  piano: { labelKey: 'preset.piano', descKey: 'preset.pianoDesc' },
  classic: { labelKey: 'preset.classic', descKey: 'preset.classicDesc' },
  organ: { labelKey: 'preset.organ', descKey: 'preset.organDesc' },
  strings: { labelKey: 'preset.strings', descKey: 'preset.stringsDesc' },
  pluck: { labelKey: 'preset.pluck', descKey: 'preset.pluckDesc' },
};

const PRESET_ORDER: SynthPresetName[] = ['piano', 'classic', 'organ', 'strings', 'pluck'];

// SVG icons per preset
function PresetIcon({ preset }: { preset: SynthPresetName }) {
  const s = 14;
  switch (preset) {
    case 'piano':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="8" y1="4" x2="8" y2="14" />
          <line x1="12" y1="4" x2="12" y2="14" />
          <line x1="16" y1="4" x2="16" y2="14" />
        </svg>
      );
    case 'classic':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0" />
        </svg>
      );
    case 'organ':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="4" y="8" width="2" height="12" rx="1" />
          <rect x="8" y="5" width="2" height="15" rx="1" />
          <rect x="12" y="3" width="2" height="17" rx="1" />
          <rect x="16" y="5" width="2" height="15" rx="1" />
          <rect x="20" y="8" width="2" height="12" rx="1" />
        </svg>
      );
    case 'strings':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 20l14-14" />
          <path d="M5 4c3 3 6 4 9 4" />
          <path d="M19 20c-3-3-6-4-9-4" />
        </svg>
      );
    case 'pluck':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 3v18" />
          <path d="M6 6c3 2 3 6 0 8" />
          <path d="M18 6c-3 2-3 6 0 8" />
        </svg>
      );
  }
}

// ─── Function labels ─────────────────────────────────────────────────────────

const FUNCTION_KEYS: Record<number, string> = {
  1: 'degree.tonic', 2: 'degree.supertonic', 3: 'degree.mediant',
  4: 'degree.subdominant', 5: 'degree.dominant', 6: 'degree.submediant', 7: 'degree.leading',
};

const ROMAN = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

// ─── Component ───────────────────────────────────────────────────────────────

export function PlayView() {
  const { scale, getNoteDegree } = useKeyContext();
  const selectedScale = useAppStore((s) => s.selectedScale);
  const activeNotes = useAppStore((s) => s.activeNotes);
  const synthPreset = useAppStore((s) => s.synthPreset);
  const setSynthPreset = useAppStore((s) => s.setSynthPreset);
  const volume = useAppStore((s) => s.volume);
  const setVolume = useAppStore((s) => s.setVolume);
  const baseOctave = useAppStore((s) => s.baseOctave);
  const setBaseOctave = useAppStore((s) => s.setBaseOctave);
  const { t } = useTranslation();

  const tonicColor = DEGREE_COLORS[1];

  // Volume change handler — updates both store and audio engine
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setVolume(v);
      setMasterVolume(v);
    },
    [setVolume],
  );

  // Derive active note info with degree data
  const activeInfo = Array.from(activeNotes).map((midi) => {
    const pitchClass = (midi - 12) % 12;
    const noteMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const name = noteMap[pitchClass] ?? 'C';
    const note = { natural: name[0] as 'C', accidental: (name.slice(1) || '') as '' };
    const degree = getNoteDegree(note);
    const color = degree
      ? DEGREE_COLORS[degree as keyof typeof DEGREE_COLORS]
      : 'var(--text-dim)';
    const octave = Math.floor((midi - 12) / 12);
    return { midi, name, degree, color, octave, functionKey: degree ? FUNCTION_KEYS[degree] : undefined };
  });

  return (
    <div className="flex-1 overflow-y-auto" role="region" aria-label={t('nav.play')}>
      <m.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto px-5 max-sm:px-3 py-5 max-sm:py-3 space-y-6 max-sm:space-y-4"
      >
        {/* ─── Key Context ──────────────────────────────────────── */}
        <m.div
          variants={fadeUp}
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: `${tonicColor}06`,
            border: `1px solid ${tonicColor}12`,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${tonicColor}08 0%, transparent 60%)`,
            }}
          />
          <div className="relative px-5 py-3.5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold learn-serif" style={{ color: 'var(--text)' }}>
                {noteToString(scale.root)}{' '}
                <span className="font-normal" style={{ color: 'var(--text-muted)' }}>
                  {SCALE_TYPE_NAMES[selectedScale]}
                </span>
              </h2>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-dim)' }}>
                {scale.notes.length} notes &middot; {scale.notes.map((n) => noteToString(n)).join(' ')}
              </p>
            </div>
            <div className="text-[10px] font-medium" style={{ color: 'var(--text-dim)' }}>
              {t('play.performanceMode')}
            </div>
          </div>
        </m.div>

        {/* ─── Sound Preset ─────────────────────────────────────── */}
        <m.div variants={fadeUp}>
          <h3 className="text-[10px] font-bold mb-2.5 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
            {t('play.sound')}
          </h3>
          <div className="flex gap-1.5 max-sm:grid max-sm:grid-cols-3" role="radiogroup" aria-label={t('play.synthPreset')}>
            {PRESET_ORDER.map((preset) => {
              const isActive = synthPreset === preset;
              const meta = PRESET_META[preset];
              return (
                <m.button
                  key={preset}
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSynthPreset(preset)}
                  className="relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl flex-1 min-w-0 group transition-colors overflow-hidden"
                  style={{
                    backgroundColor: isActive ? `${tonicColor}15` : 'var(--card)',
                    border: isActive ? `1.5px solid ${tonicColor}50` : '1.5px solid var(--card-hover)',
                  }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span
                    className="relative z-10 transition-colors"
                    style={{ color: isActive ? tonicColor : 'var(--text-dim)' }}
                  >
                    <PresetIcon preset={preset} />
                  </span>
                  <span
                    className="relative z-10 text-[11px] font-semibold transition-colors"
                    style={{ color: isActive ? tonicColor : 'var(--text-muted)' }}
                  >
                    {t(meta.labelKey)}
                  </span>
                </m.button>
              );
            })}
          </div>
        </m.div>

        {/* ─── Metronome ─────────────────────────────────────────── */}
        <m.div variants={fadeUp}>
          <MetronomeControl />
        </m.div>

        {/* ─── Chord Progression Builder ──────────────────────── */}
        <m.div variants={fadeUp}>
          <ChordProgressionBuilder />
        </m.div>

        {/* ─── Recording ───────────────────────────────────────── */}
        <m.div variants={fadeUp}>
          <RecordingControl />
        </m.div>

        {/* ─── MIDI Output ──────────────────────────────────────── */}
        <m.div variants={fadeUp}>
          <MidiOutputControl />
        </m.div>

        {/* ─── Controls: Volume + Octave ────────────────────────── */}
        <m.div variants={fadeUp} className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
          {/* Volume */}
          <div>
            <h3 className="text-[10px] font-bold mb-2.5 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
              {t('play.volume')}
            </h3>
            <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 60%, transparent)', border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${tonicColor} ${volume * 100}%, var(--border) ${volume * 100}%)`,
                }}
                aria-label={t('play.volume')}
              />
              <span className="text-[11px] font-mono w-8 text-right tabular-nums" style={{ color: 'var(--text-dim)' }}>
                {Math.round(volume * 100)}
              </span>
            </div>
          </div>

          {/* Octave */}
          <div>
            <h3 className="text-[10px] font-bold mb-2.5 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
              {t('play.octave')}
            </h3>
            <div className="flex gap-1.5" role="radiogroup" aria-label={t('play.baseOctave')}>
              {[2, 3, 4, 5, 6].map((oct) => {
                const isActive = baseOctave === oct;
                return (
                  <button
                    key={oct}
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setBaseOctave(oct)}
                    className="px-3 py-2.5 rounded-xl text-xs font-semibold flex-1 transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? `${tonicColor}18` : 'var(--card)',
                      color: isActive ? tonicColor : 'var(--text-muted)',
                      border: isActive ? `1.5px solid ${tonicColor}50` : '1.5px solid var(--card-hover)',
                    }}
                  >
                    C{oct}
                  </button>
                );
              })}
            </div>
          </div>
        </m.div>

        {/* ─── Active Notes HUD ─────────────────────────────────── */}
        <m.div variants={fadeUp}>
          <h3 className="text-[10px] font-bold mb-2.5 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
            {t('play.nowPlaying')}
          </h3>
          <div
            className="relative min-h-[100px] rounded-2xl flex items-center justify-center px-4 py-5 overflow-hidden"
            style={{ border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)', backgroundColor: 'color-mix(in srgb, var(--bg) 30%, transparent)' }}
            aria-live="polite"
            aria-label={t('play.activeNotes')}
          >
            {/* Subtle animated background glow when notes are playing */}
            <AnimatePresence>
              {activeInfo.length > 0 && (
                <m.div
                  key="glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${activeInfo[0].color}08 0%, transparent 70%)`,
                  }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {activeInfo.length === 0 ? (
                <m.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                  <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
                    {t('play.playInstrumentBelow')}
                  </p>
                </m.div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                  {activeInfo.map(({ midi, name, degree, color, octave, functionKey }) => (
                    <m.div
                      key={midi}
                      initial={{ scale: 0.6, opacity: 0, y: 8 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.6, opacity: 0, y: -8 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="flex flex-col items-center px-5 py-3 rounded-xl"
                      style={{
                        backgroundColor: `${color}15`,
                        border: `1.5px solid ${color}50`,
                        boxShadow: `0 0 24px ${color}15`,
                      }}
                    >
                      <span className="text-xl font-bold leading-none" style={{ color }}>
                        {name}
                        <span className="text-[11px] font-normal ml-0.5" style={{ color: 'var(--text-dim)' }}>
                          {octave}
                        </span>
                      </span>
                      {degree && functionKey && (
                        <span className="text-[10px] mt-1.5" style={{ color: 'var(--text-dim)' }}>
                          {t(functionKey)}
                        </span>
                      )}
                    </m.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </m.div>

        {/* ─── Scale Reference Strip ────────────────────────────── */}
        {scale.notes.length === 7 && (
          <m.div variants={fadeUp}>
            <h3 className="text-[10px] font-bold mb-2.5 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
              {t('play.scaleReference')}
            </h3>
            <div className="flex items-stretch gap-1 max-sm:grid max-sm:grid-cols-4 max-sm:gap-1" role="group" aria-label={t('play.scaleReference')}>
              {scale.notes.map((note, i) => {
                const degree = i + 1;
                const color = DEGREE_COLORS[degree as keyof typeof DEGREE_COLORS];
                const pc = (12 + ({'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}[note.natural] ?? 0) +
                  (note.accidental === '#' ? 1 : note.accidental === 'b' ? -1 : 0)) % 12;
                // Check if any active note matches this pitch class
                const isActive = Array.from(activeNotes).some((midi) => (midi - 12) % 12 === pc);

                return (
                  <div
                    key={`${noteToString(note)}-${i}`}
                    className="flex flex-col items-center gap-1 py-2 rounded-lg flex-1 min-w-0 transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? `${color}20` : 'transparent',
                      border: isActive ? `1px solid ${color}40` : '1px solid transparent',
                    }}
                  >
                    <span
                      className="text-[10px] font-bold leading-none"
                      style={{ color }}
                    >
                      {ROMAN[i]}
                    </span>
                    <span
                      className="text-xs font-medium leading-none transition-colors"
                      style={{ color: isActive ? 'var(--text)' : 'var(--text-muted)' }}
                    >
                      {noteToString(note)}
                    </span>
                  </div>
                );
              })}
            </div>
          </m.div>
        )}
      </m.div>
    </div>
  );
}
