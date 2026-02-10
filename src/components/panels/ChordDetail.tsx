import { useCallback, useRef, useMemo } from 'react';
import { m } from 'framer-motion';
import { noteToString, type Chord, type Note } from '../../core/types/music.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';
import {
  playChordVoiced,
  playArpeggioAscending,
  SYNTH_PRESETS,
  resumeAudio,
} from '../../core/services/audio.ts';
import { getPitchClass } from '../../core/constants/notes.ts';
import { getMidiNumber } from '../../core/utils/pianoLayout.ts';
import { useAppStore } from '../../state/store.ts';
import {
  CHORD_QUALITY_NAMES,
  getChordShortIntervalLabels,
} from '../../core/constants/chords.ts';
import { getScaleSuggestions } from '../../core/constants/chordScaleRelationships.ts';
import { SCALE_TYPE_NAMES } from '../../core/constants/scales.ts';

interface ChordDetailProps {
  chord: Chord;
}

const INVERSION_LABELS = ['Root', '1st Inv', '2nd Inv', '3rd Inv'];

function computeVoicedMidi(notes: Note[], startOctave: number): number[] {
  const midiNumbers: number[] = [];
  let currentOctave = startOctave;
  let lastPitchClass = -1;

  for (let i = 0; i < notes.length; i++) {
    const pc = getPitchClass(notes[i]);
    if (i > 0 && pc <= lastPitchClass) {
      currentOctave++;
    }
    midiNumbers.push(getMidiNumber(notes[i], currentOctave));
    lastPitchClass = pc;
  }
  return midiNumbers;
}

const FIT_COLORS = {
  primary: '#60A5FA',
  secondary: '#A78BFA',
  color: '#F472B6',
} as const;

export function ChordDetail({ chord }: ChordDetailProps) {
  const { getNoteDegree, invertedNotes } = useKeyContext();
  const synthPreset = useAppStore((s) => s.synthPreset);
  const chordInversion = useAppStore((s) => s.chordInversion);
  const setChordInversion = useAppStore((s) => s.setChordInversion);
  const baseOctave = useAppStore((s) => s.baseOctave);
  const addActiveNote = useAppStore((s) => s.addActiveNote);
  const removeActiveNote = useAppStore((s) => s.removeActiveNote);
  const setScale = useAppStore((s) => s.setScale);
  const setKey = useAppStore((s) => s.setKey);
  const degree = getNoteDegree(chord.root);
  const color = degree ? DEGREE_COLORS[degree as keyof typeof DEGREE_COLORS] : 'var(--text-muted)';

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearVisualTimeouts = useCallback(() => {
    for (const t of timeoutsRef.current) clearTimeout(t);
    timeoutsRef.current = [];
  }, []);

  const maxInversion = chord.notes.length - 1;
  const notesForPlayback = invertedNotes.length > 0 ? invertedNotes : chord.notes;

  // Real interval labels from core
  const intervalLabels = useMemo(
    () => chord.algorithmicIntervalLabels ?? getChordShortIntervalLabels(chord.quality),
    [chord],
  );

  // Compatible scales
  const scaleSuggestions = useMemo(
    () => getScaleSuggestions(chord.quality),
    [chord.quality],
  );

  const handlePlayChord = useCallback(async () => {
    await resumeAudio();
    clearVisualTimeouts();
    const config = SYNTH_PRESETS[synthPreset] ?? {};
    const duration = 1.5;
    const midiNumbers = computeVoicedMidi(notesForPlayback, baseOctave);
    for (const m of midiNumbers) addActiveNote(m);
    playChordVoiced(notesForPlayback, baseOctave, duration, config);
    const t = setTimeout(() => {
      for (const m of midiNumbers) removeActiveNote(m);
    }, duration * 1000);
    timeoutsRef.current.push(t);
  }, [notesForPlayback, synthPreset, baseOctave, addActiveNote, removeActiveNote, clearVisualTimeouts]);

  const handlePlayArpeggio = useCallback(async () => {
    await resumeAudio();
    clearVisualTimeouts();
    const config = SYNTH_PRESETS[synthPreset] ?? {};
    const noteDuration = 0.35;
    const midiNumbers = computeVoicedMidi(notesForPlayback, baseOctave);
    const litNotes: number[] = [];
    playArpeggioAscending(
      notesForPlayback,
      baseOctave,
      noteDuration,
      (noteIndex) => {
        const midi = midiNumbers[noteIndex];
        if (midi !== undefined) {
          addActiveNote(midi);
          litNotes.push(midi);
        }
      },
      () => {
        const t = setTimeout(() => {
          for (const m of litNotes) removeActiveNote(m);
        }, noteDuration * 1000);
        timeoutsRef.current.push(t);
      },
      config,
    );
  }, [notesForPlayback, synthPreset, baseOctave, addActiveNote, removeActiveNote, clearVisualTimeouts]);

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold learn-serif" style={{ color: 'var(--text)' }}>
          {chord.algorithmicDisplayName
            ? <>{noteToString(chord.root)}<span className="font-normal ml-1.5" style={{ color: 'var(--text-muted)' }}>{chord.algorithmicDisplayName}</span></>
            : <>{noteToString(chord.root)}<span className="font-normal ml-1.5" style={{ color: 'var(--text-muted)' }}>{CHORD_QUALITY_NAMES[chord.quality]}</span></>
          }
          {chord.bassNote && (
            <span className="font-normal ml-0.5" style={{ color: 'var(--text-dim)' }}>/{noteToString(chord.bassNote)}</span>
          )}
        </h2>
        {degree && (
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full mt-2 inline-block"
            style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}35` }}
          >
            Degree {degree}
          </span>
        )}
      </div>

      {/* Notes */}
      <div>
        <h3 className="text-[10px] font-bold mb-2 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
          Notes
        </h3>
        <div className="flex gap-1.5">
          {notesForPlayback.map((note, i) => {
            const noteDegree = getNoteDegree(note);
            const noteColor = noteDegree
              ? DEGREE_COLORS[noteDegree as keyof typeof DEGREE_COLORS]
              : 'var(--text-muted)';
            const isBass = i === 0 && chordInversion > 0;
            const isSlashBass = chord.bassNote &&
              noteToString(note) === noteToString(chord.bassNote) && i === 0;
            return (
              <span
                key={i}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  backgroundColor: `${noteColor}15`,
                  color: noteColor,
                  border: isSlashBass
                    ? `1.5px dashed ${noteColor}`
                    : isBass ? `1.5px solid ${noteColor}` : `1px solid ${noteColor}30`,
                }}
                title={isSlashBass ? 'Slash bass note' : undefined}
              >
                {noteToString(note)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Inversions */}
      <div>
        <h3 className="text-[10px] font-bold mb-2 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
          Voicing
        </h3>
        <div className="flex gap-1.5" role="radiogroup" aria-label="Chord inversion">
          {Array.from({ length: maxInversion + 1 }, (_, i) => {
            const isActive = chordInversion === i;
            return (
              <button
                key={i}
                role="radio"
                aria-checked={isActive}
                onClick={() => setChordInversion(i)}
                className="relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                style={{
                  backgroundColor: isActive ? `${color}20` : 'var(--card)',
                  color: isActive ? color : 'var(--text-muted)',
                  border: isActive ? `1px solid ${color}50` : '1px solid var(--border)',
                }}
              >
                {INVERSION_LABELS[i] ?? `${i}th Inv`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Formula — real interval labels */}
      <div>
        <h3 className="text-[10px] font-bold mb-2 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
          Formula
        </h3>
        <div className="flex items-center gap-1.5">
          {intervalLabels.map((label, i) => (
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

      {/* Compatible Scales */}
      {scaleSuggestions.length > 0 && (
        <div>
          <h3 className="text-[10px] font-bold mb-2 uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
            Compatible Scales
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {scaleSuggestions.map((s) => {
              const fitColor = FIT_COLORS[s.fit];
              return (
                <button
                  key={s.scale}
                  onClick={() => {
                    setKey(chord.root);
                    setScale(s.scale);
                  }}
                  className="px-2 py-1 rounded-lg text-[11px] font-medium transition-all hover:brightness-125"
                  style={{
                    backgroundColor: `${fitColor}12`,
                    color: fitColor,
                    border: `1px solid ${fitColor}30`,
                  }}
                  title={s.context}
                >
                  {SCALE_TYPE_NAMES[s.scale]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Play controls */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handlePlayChord}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 hover:scale-[1.02]"
          style={{
            backgroundColor: `${color}15`,
            color,
            border: `1px solid ${color}30`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Chord
        </button>
        <button
          onClick={handlePlayArpeggio}
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
          Arpeggio
        </button>
      </div>
    </m.div>
  );
}
