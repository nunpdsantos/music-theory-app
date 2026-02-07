import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
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

const QUALITY_DISPLAY: Record<string, string> = {
  major: 'Major',
  minor: 'Minor',
  diminished: 'Diminished',
  augmented: 'Augmented',
  major7: 'Major 7th',
  minor7: 'Minor 7th',
  dominant7: 'Dominant 7th',
  half_diminished7: 'Half-Diminished 7th',
  diminished7: 'Diminished 7th',
  augmented_major7: 'Augmented Major 7th',
  minor_major7: 'Minor-Major 7th',
};

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

export function ChordDetail({ chord }: ChordDetailProps) {
  const { getNoteDegree, invertedNotes } = useKeyContext();
  const synthPreset = useAppStore((s) => s.synthPreset);
  const chordInversion = useAppStore((s) => s.chordInversion);
  const setChordInversion = useAppStore((s) => s.setChordInversion);
  const baseOctave = useAppStore((s) => s.baseOctave);
  const addActiveNote = useAppStore((s) => s.addActiveNote);
  const removeActiveNote = useAppStore((s) => s.removeActiveNote);
  const degree = getNoteDegree(chord.root);
  const color = degree ? DEGREE_COLORS[degree as keyof typeof DEGREE_COLORS] : '#a1a1aa';

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearVisualTimeouts = useCallback(() => {
    for (const t of timeoutsRef.current) clearTimeout(t);
    timeoutsRef.current = [];
  }, []);

  const maxInversion = chord.notes.length - 1;
  const notesForPlayback = invertedNotes.length > 0 ? invertedNotes : chord.notes;

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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-zinc-100 learn-serif">
          {noteToString(chord.root)}
          <span className="text-zinc-400 font-normal ml-1.5">
            {QUALITY_DISPLAY[chord.quality] ?? chord.quality}
          </span>
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
        <h3 className="text-[10px] font-bold text-zinc-600 mb-2 uppercase tracking-widest">
          Notes
        </h3>
        <div className="flex gap-1.5">
          {notesForPlayback.map((note, i) => {
            const noteDegree = getNoteDegree(note);
            const noteColor = noteDegree
              ? DEGREE_COLORS[noteDegree as keyof typeof DEGREE_COLORS]
              : '#a1a1aa';
            const isBass = i === 0 && chordInversion > 0;
            return (
              <span
                key={i}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  backgroundColor: `${noteColor}15`,
                  color: noteColor,
                  border: isBass ? `1.5px solid ${noteColor}` : `1px solid ${noteColor}30`,
                }}
              >
                {noteToString(note)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Inversions */}
      <div>
        <h3 className="text-[10px] font-bold text-zinc-600 mb-2 uppercase tracking-widest">
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
                  backgroundColor: isActive ? `${color}20` : '#18181b',
                  color: isActive ? color : '#a1a1aa',
                  border: isActive ? `1px solid ${color}50` : '1px solid #27272a',
                }}
              >
                {INVERSION_LABELS[i] ?? `${i}th Inv`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Formula */}
      <div>
        <h3 className="text-[10px] font-bold text-zinc-600 mb-2 uppercase tracking-widest">
          Formula
        </h3>
        <div className="flex items-center gap-1.5">
          {chord.notes.map((_, i) => (
            <span
              key={i}
              className="text-xs font-mono text-zinc-400 bg-zinc-800/60 px-2 py-1 rounded-md"
            >
              {i === 0 ? 'R' : `${i + 1}`}
            </span>
          ))}
        </div>
      </div>

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
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-800/60 border border-zinc-700/50 hover:bg-zinc-800 hover:text-zinc-100 transition-all duration-150 hover:scale-[1.02]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Arpeggio
        </button>
      </div>
    </motion.div>
  );
}
