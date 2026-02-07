import { useMemo } from 'react';
import { useAppStore } from '../state/store.ts';
import { buildScale } from '../core/constants/scales.ts';
import { getDiatonicChordsForScale } from '../core/constants/chords.ts';
import { getScaleNotesWithOctaves, getVoicedChordNotes, getMidiNumber } from '../core/utils/pianoLayout.ts';
import { getPitchClass } from '../core/constants/notes.ts';
import type { Note, Scale, Chord, PitchedNote } from '../core/types/music.ts';
import { DEGREE_COLORS } from '../design/tokens/colors.ts';

export interface DiatonicChord {
  chord: Chord;
  numeral: string;
  degree: number; // 1-7
}

export interface KeyContextValue {
  scale: Scale;
  scaleNotesWithOctaves: PitchedNote[];
  diatonicChords: DiatonicChord[];
  getNoteColor: (note: Note) => string | undefined;
  getNoteDegree: (note: Note) => number | undefined; // 1-7 or undefined
  scalePitchClasses: Set<number>; // for guitar/circle of fifths (all octaves)
  scaleMidiNumbers: Set<number>; // for piano (limited octave range)
  chordPitchClasses: Set<number>; // pitch classes of selected chord (empty if none)
  chordVoicingMidi: Set<number>; // exact MIDI numbers for the current inversion voicing
  hasSelectedChord: boolean;
  invertedNotes: Note[]; // chord notes in current inversion order
}

/** Rotate array by n positions */
function rotateNotes(notes: Note[], inversion: number): Note[] {
  if (notes.length === 0 || inversion === 0) return notes;
  const n = inversion % notes.length;
  return [...notes.slice(n), ...notes.slice(0, n)];
}

export function useKeyContext(): KeyContextValue {
  const selectedKey = useAppStore((s) => s.selectedKey);
  const selectedScale = useAppStore((s) => s.selectedScale);
  const selectedChord = useAppStore((s) => s.selectedChord);
  const chordInversion = useAppStore((s) => s.chordInversion);
  const scaleOctaves = useAppStore((s) => s.scaleOctaves);
  const baseOctave = useAppStore((s) => s.baseOctave);

  const scale = useMemo(
    () => buildScale(selectedKey, selectedScale),
    [selectedKey, selectedScale]
  );

  const scaleNotesWithOctaves = useMemo(
    () => getScaleNotesWithOctaves(scale.notes, 3),
    [scale]
  );

  const diatonicChords = useMemo(() => {
    const raw = getDiatonicChordsForScale(scale);
    return raw.map((dc, i) => ({
      chord: dc.chord,
      numeral: dc.numeral,
      degree: i + 1,
    }));
  }, [scale]);

  // Map pitch class → degree (1-based)
  const pitchClassToDegree = useMemo(() => {
    const m = new Map<number, number>();
    scale.notes.forEach((note, i) => {
      m.set(getPitchClass(note), i + 1);
    });
    return m;
  }, [scale]);

  const getNoteColor = useMemo(() => {
    return (note: Note): string | undefined => {
      const degree = pitchClassToDegree.get(getPitchClass(note));
      if (degree === undefined) return undefined;
      return DEGREE_COLORS[degree as keyof typeof DEGREE_COLORS];
    };
  }, [pitchClassToDegree]);

  const getNoteDegree = useMemo(() => {
    return (note: Note): number | undefined => {
      return pitchClassToDegree.get(getPitchClass(note));
    };
  }, [pitchClassToDegree]);

  // Pitch class set — used by guitar and circle of fifths (highlights all octaves)
  const scalePitchClasses = useMemo(() => {
    const s = new Set<number>();
    for (const n of scale.notes) s.add(getPitchClass(n));
    return s;
  }, [scale]);

  // MIDI-based scale notes for piano — limited to requested octave range
  const scaleMidiNumbers = useMemo(() => {
    const s = new Set<number>();
    for (let oct = 0; oct < scaleOctaves; oct++) {
      const pitched = getScaleNotesWithOctaves(scale.notes, baseOctave + oct);
      for (const p of pitched) {
        s.add(getMidiNumber(p, p.octave));
      }
    }
    return s;
  }, [scale, scaleOctaves, baseOctave]);

  const chordPitchClasses = useMemo(() => {
    const s = new Set<number>();
    if (selectedChord) {
      for (const n of selectedChord.notes) s.add(getPitchClass(n));
    }
    return s;
  }, [selectedChord]);

  // Compute inverted chord notes
  const invertedNotes = useMemo(() => {
    if (!selectedChord) return [];
    return rotateNotes(selectedChord.notes, chordInversion);
  }, [selectedChord, chordInversion]);

  // Compute exact MIDI numbers for a single voicing at the base octave
  const chordVoicingMidi = useMemo(() => {
    const s = new Set<number>();
    if (!selectedChord || invertedNotes.length === 0) return s;

    const pitched = getVoicedChordNotes(invertedNotes, baseOctave);
    for (const p of pitched) {
      s.add(getMidiNumber(p, p.octave));
    }
    return s;
  }, [selectedChord, invertedNotes, baseOctave]);

  return {
    scale,
    scaleNotesWithOctaves,
    diatonicChords,
    getNoteColor,
    getNoteDegree,
    scalePitchClasses,
    scaleMidiNumbers,
    chordPitchClasses,
    chordVoicingMidi,
    hasSelectedChord: selectedChord !== null,
    invertedNotes,
  };
}
