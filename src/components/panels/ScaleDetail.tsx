import { useCallback, useRef, useMemo, Suspense, lazy } from 'react';
import { m } from 'framer-motion';
import { noteToString, type Note, type ModeName } from '../../core/types/music.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';
import {
  playScale,
  SYNTH_PRESETS,
  resumeAudio,
} from '../../core/services/audio.ts';
import { SCALE_TYPE_NAMES, SCALE_FORMULAS } from '../../core/constants/scales.ts';
import { buildAscendingMidi, buildDescendingMidi } from '../../utils/midiHelpers.ts';
import { INTERVAL_SHORT_LABELS, buildChord, CHORD_QUALITY_NAMES, CHORD_SYMBOLS } from '../../core/constants/chords.ts';
import { MODE_INFO } from '../../core/constants/modes.ts';
import { getChordsForScale } from '../../core/constants/chordScaleRelationships.ts';
import { useAppStore } from '../../state/store.ts';
import { getScaleNotesWithOctaves } from '../../core/utils/pianoLayout.ts';
import { getKeySignatureForScale } from '../../utils/notationHelpers.ts';
import { StaffNotationSkeleton } from '../notation/StaffNotationSkeleton.tsx';

const StaffNotation = lazy(() =>
  import('../notation/StaffNotation.tsx').then((m) => ({ default: m.StaffNotation }))
);

// Scales that correspond to modes
const SCALE_TO_MODE: Partial<Record<string, ModeName>> = {
  major: 'ionian',
  dorian: 'dorian',
  phrygian: 'phrygian',
  lydian: 'lydian',
  mixolydian: 'mixolydian',
  natural_minor: 'aeolian',
  locrian: 'locrian',
};

function computeScaleSequenceMidi(
  notes: Note[],
  startOctave: number,
  ascending: boolean,
  descending: boolean,
): number[] {
  const sequence: number[] = [];
  let lastOctaveTrack = startOctave;

  if (ascending) {
    const { midi, finalOctave, finalPitchClass } = buildAscendingMidi(notes, startOctave);
    sequence.push(...midi);
    // Add root at top to complete the octave (continuing from final pitch class)
    const topRoot = buildAscendingMidi([notes[0]], finalOctave, finalPitchClass);
    sequence.push(topRoot.midi[0]);
    lastOctaveTrack = topRoot.finalOctave;
  }

  if (descending) {
    sequence.push(...buildDescendingMidi(notes, lastOctaveTrack));
  }

  return sequence;
}

const FIT_COLORS = {
  primary: '#60A5FA',
  secondary: '#A78BFA',
  color: '#F472B6',
} as const;

export function ScaleDetail() {
  const { scale } = useKeyContext();
  const synthPreset = useAppStore((s) => s.synthPreset);
  const selectedScale = useAppStore((s) => s.selectedScale);
  const scaleOctaves = useAppStore((s) => s.scaleOctaves);
  const setScaleOctaves = useAppStore((s) => s.setScaleOctaves);
  const baseOctave = useAppStore((s) => s.baseOctave);
  const addActiveNote = useAppStore((s) => s.addActiveNote);
  const removeActiveNote = useAppStore((s) => s.removeActiveNote);
  const setSelectedChord = useAppStore((s) => s.setSelectedChord);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prevMidiRef = useRef<number | null>(null);

  const clearVisualTimeouts = useCallback(() => {
    for (const t of timeoutsRef.current) clearTimeout(t);
    timeoutsRef.current = [];
    if (prevMidiRef.current !== null) {
      removeActiveNote(prevMidiRef.current);
      prevMidiRef.current = null;
    }
  }, [removeActiveNote]);

  // Formula from core
  const formula = SCALE_FORMULAS[selectedScale];
  const formulaLabels = useMemo(
    () => formula.map((s) => INTERVAL_SHORT_LABELS[s] ?? `${s}`),
    [formula],
  );

  // Mode info (if this scale corresponds to a mode)
  const modeName = SCALE_TO_MODE[selectedScale];
  const modeInfo = modeName ? MODE_INFO[modeName] : null;

  // Compatible chords
  const chordSuggestions = useMemo(
    () => getChordsForScale(selectedScale),
    [selectedScale],
  );

  const playWithVisuals = useCallback(
    async (ascending: boolean, descending: boolean, noteDuration: number) => {
      await resumeAudio();
      clearVisualTimeouts();
      const config = SYNTH_PRESETS[synthPreset] ?? {};
      const midiSequence = computeScaleSequenceMidi(scale.notes, baseOctave, ascending, descending);
      playScale(
        scale.notes,
        baseOctave,
        ascending,
        descending,
        noteDuration,
        (seqIndex) => {
          if (prevMidiRef.current !== null) removeActiveNote(prevMidiRef.current);
          const midi = midiSequence[seqIndex];
          if (midi !== undefined) {
            addActiveNote(midi);
            prevMidiRef.current = midi;
          }
        },
        () => {
          const t = setTimeout(() => {
            if (prevMidiRef.current !== null) {
              removeActiveNote(prevMidiRef.current);
              prevMidiRef.current = null;
            }
          }, noteDuration * 1000);
          timeoutsRef.current.push(t);
        },
        config,
      );
    },
    [scale, synthPreset, baseOctave, addActiveNote, removeActiveNote, clearVisualTimeouts],
  );

  const handlePlayAscending = useCallback(
    () => playWithVisuals(true, false, 0.35),
    [playWithVisuals],
  );

  const handlePlayBoth = useCallback(
    () => playWithVisuals(true, true, 0.3),
    [playWithVisuals],
  );

  const tonicColor = DEGREE_COLORS[1];

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-xl font-bold learn-serif" style={{ color: 'var(--text)' }}>
          {noteToString(scale.root)}{' '}
          <span className="font-normal" style={{ color: 'var(--text-muted)' }}>
            {SCALE_TYPE_NAMES[selectedScale]}
          </span>
        </h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full mt-2 inline-block" style={{ color: 'var(--text-dim)', backgroundColor: 'color-mix(in srgb, var(--card) 60%, transparent)' }}>
          {scale.notes.length} notes
        </span>
      </div>

      {/* Notes with degree colors */}
      <div>
        <h3 className="type-section mb-2">
          Notes
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {scale.notes.map((note, i) => {
            const degree = (i + 1) as keyof typeof DEGREE_COLORS;
            const color = DEGREE_COLORS[degree] ?? 'var(--text-muted)';
            return (
              <span
                key={i}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  backgroundColor: `${color}15`,
                  color,
                  border: `1px solid ${color}30`,
                }}
              >
                {noteToString(note)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Staff Notation */}
      <div>
        <h3 className="type-section mb-2">
          Staff
        </h3>
        <Suspense fallback={<StaffNotationSkeleton height={120} />}>
          <StaffNotation
            notes={getScaleNotesWithOctaves(scale.notes, baseOctave)}
            keySignature={getKeySignatureForScale(scale.root, selectedScale) ?? undefined}
            noteColors={Object.fromEntries(
              scale.notes.map((_, i) => [i, DEGREE_COLORS[(i + 1) as keyof typeof DEGREE_COLORS] ?? 'var(--text-muted)'])
            )}
            height={120}
            duration="q"
          />
        </Suspense>
      </div>

      {/* Formula */}
      <div>
        <h3 className="type-section mb-2">
          Formula
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          {formulaLabels.map((label, i) => (
            <span
              key={i}
              className="text-xs font-mono px-2 py-1 rounded-md"
              style={{ color: 'var(--text-muted)', backgroundColor: 'color-mix(in srgb, var(--card) 60%, transparent)' }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Mode info */}
      {modeInfo && (
        <div>
          <h3 className="type-section mb-2">
            Mode
          </h3>
          <div className="rounded-xl px-3 py-2.5 space-y-1.5" style={{ backgroundColor: 'color-mix(in srgb, var(--card) 40%, transparent)', border: '1px solid color-mix(in srgb, var(--border) 40%, transparent)' }}>
            <p className="text-xs" style={{ color: 'var(--text)' }}>{modeInfo.description}</p>
            <p className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
              Mood: <span style={{ color: 'var(--text-muted)' }}>{modeInfo.mood}</span>
            </p>
            <p className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
              Degree {modeInfo.degree} of the parent major scale
            </p>
          </div>
        </div>
      )}

      {/* Compatible Chords */}
      {chordSuggestions.length > 0 && (
        <div>
          <h3 className="type-section mb-2">
            Compatible Chords
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {chordSuggestions.slice(0, 12).map((s) => {
              const fitColor = FIT_COLORS[s.fit];
              const symbol = CHORD_SYMBOLS[s.quality];
              return (
                <button
                  key={s.quality}
                  onClick={() => {
                    const chord = buildChord(scale.root, s.quality);
                    setSelectedChord(chord);
                  }}
                  className="px-2 py-1 rounded-lg text-[11px] font-medium transition-all hover:brightness-125"
                  style={{
                    backgroundColor: `${fitColor}12`,
                    color: fitColor,
                    border: `1px solid ${fitColor}30`,
                  }}
                  title={s.context}
                >
                  {noteToString(scale.root)}{symbol}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Octave range */}
      <div>
        <h3 className="type-section mb-2">
          Piano Range
        </h3>
        <div className="flex gap-1.5" role="radiogroup" aria-label="Scale octave range">
          {([1, 2] as const).map((n) => {
            const isActive = scaleOctaves === n;
            return (
              <button
                key={n}
                role="radio"
                aria-checked={isActive}
                onClick={() => setScaleOctaves(n)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                style={{
                  backgroundColor: isActive ? `${tonicColor}20` : 'var(--card)',
                  color: isActive ? tonicColor : 'var(--text-muted)',
                  border: isActive ? `1px solid ${tonicColor}50` : '1px solid var(--border)',
                }}
              >
                {n} Octave{n > 1 ? 's' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Play controls */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handlePlayAscending}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 hover:scale-[1.02]"
          style={{
            backgroundColor: `${tonicColor}15`,
            color: tonicColor,
            border: `1px solid ${tonicColor}30`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Ascending
        </button>
        <button
          onClick={handlePlayBoth}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 hover:scale-[1.02]"
          style={{
            color: 'var(--text)',
            backgroundColor: 'color-mix(in srgb, var(--card) 60%, transparent)',
            border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Up & Down
        </button>
      </div>
    </m.div>
  );
}
