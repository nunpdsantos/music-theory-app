// All notes and their relationships

import { Note, NaturalNote, PitchClass } from '../types/music';

// Natural note to pitch class mapping
export const NATURAL_TO_PITCH_CLASS: Record<NaturalNote, PitchClass> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

// Accidental semitone modifications
export const ACCIDENTAL_SEMITONES: Record<string, number> = {
  '': 0,
  '#': 1,
  b: -1,
  '##': 2,
  bb: -2,
};

// Get pitch class for any note
export function getPitchClass(note: Note): PitchClass {
  const base = NATURAL_TO_PITCH_CLASS[note.natural];
  const modifier = ACCIDENTAL_SEMITONES[note.accidental] || 0;
  return ((base + modifier + 12) % 12) as PitchClass;
}

// All 12 pitch classes with their common enharmonic spellings
// Index = pitch class (0 = C, 1 = C#/Db, etc.)
export const PITCH_CLASS_SPELLINGS: Note[][] = [
  // 0: C
  [
    { natural: 'C', accidental: '' },
    { natural: 'B', accidental: '#' },
    { natural: 'D', accidental: 'bb' },
  ],
  // 1: C#/Db
  [
    { natural: 'C', accidental: '#' },
    { natural: 'D', accidental: 'b' },
    { natural: 'B', accidental: '##' },
  ],
  // 2: D
  [
    { natural: 'D', accidental: '' },
    { natural: 'C', accidental: '##' },
    { natural: 'E', accidental: 'bb' },
  ],
  // 3: D#/Eb
  [
    { natural: 'D', accidental: '#' },
    { natural: 'E', accidental: 'b' },
    { natural: 'F', accidental: 'bb' },
  ],
  // 4: E
  [
    { natural: 'E', accidental: '' },
    { natural: 'F', accidental: 'b' },
    { natural: 'D', accidental: '##' },
  ],
  // 5: F
  [
    { natural: 'F', accidental: '' },
    { natural: 'E', accidental: '#' },
    { natural: 'G', accidental: 'bb' },
  ],
  // 6: F#/Gb
  [
    { natural: 'F', accidental: '#' },
    { natural: 'G', accidental: 'b' },
    { natural: 'E', accidental: '##' },
  ],
  // 7: G
  [
    { natural: 'G', accidental: '' },
    { natural: 'F', accidental: '##' },
    { natural: 'A', accidental: 'bb' },
  ],
  // 8: G#/Ab
  [
    { natural: 'G', accidental: '#' },
    { natural: 'A', accidental: 'b' },
  ],
  // 9: A
  [
    { natural: 'A', accidental: '' },
    { natural: 'G', accidental: '##' },
    { natural: 'B', accidental: 'bb' },
  ],
  // 10: A#/Bb
  [
    { natural: 'A', accidental: '#' },
    { natural: 'B', accidental: 'b' },
    { natural: 'C', accidental: 'bb' },
  ],
  // 11: B
  [
    { natural: 'B', accidental: '' },
    { natural: 'C', accidental: 'b' },
    { natural: 'A', accidental: '##' },
  ],
];

// Order of naturals for scale construction
export const NATURAL_NOTE_ORDER: NaturalNote[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Get next natural note
export function getNextNatural(note: NaturalNote): NaturalNote {
  const index = NATURAL_NOTE_ORDER.indexOf(note);
  return NATURAL_NOTE_ORDER[(index + 1) % 7];
}

// Get natural note at interval (number of letter names away)
export function getNaturalAtInterval(root: NaturalNote, interval: number): NaturalNote {
  const index = NATURAL_NOTE_ORDER.indexOf(root);
  return NATURAL_NOTE_ORDER[(((index + interval) % 7) + 7) % 7];
}

// Check if two notes are enharmonically equivalent
export function areEnharmonic(note1: Note, note2: Note): boolean {
  return getPitchClass(note1) === getPitchClass(note2);
}

// Get the simplest enharmonic spelling (fewest accidentals)
export function getSimplestSpelling(pitchClass: PitchClass): Note {
  const spellings = PITCH_CLASS_SPELLINGS[pitchClass];
  // Prefer no accidentals, then single accidentals, then double
  return spellings.reduce((simplest, current) => {
    const currentComplexity = current.accidental.length;
    const simplestComplexity = simplest.accidental.length;
    return currentComplexity < simplestComplexity ? current : simplest;
  });
}

// Frequency of A4 (standard tuning)
export const A4_FREQUENCY = 440;

// Calculate frequency for any note
export function getNoteFrequency(note: Note, octave: number): number {
  const pitchClass = getPitchClass(note);
  // A4 is pitch class 9, octave 4
  const semitonesFromA4 = (octave - 4) * 12 + (pitchClass - 9);
  return A4_FREQUENCY * Math.pow(2, semitonesFromA4 / 12);
}

// All frequencies for standard piano range (A0 to C8)
export function getAllNoteFrequencies(): Map<string, number> {
  const frequencies = new Map<string, number>();
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  for (let octave = 0; octave <= 8; octave++) {
    for (let i = 0; i < notes.length; i++) {
      const noteName = notes[i];
      const noteKey = `${noteName}${octave}`;
      // Calculate semitones from A4
      const semitones = (octave - 4) * 12 + (i - 9);
      frequencies.set(noteKey, A4_FREQUENCY * Math.pow(2, semitones / 12));
    }
  }

  return frequencies;
}
