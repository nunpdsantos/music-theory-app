// Interval constants and utilities

import { Note, Interval } from '../types/music';
import { getPitchClass, PITCH_CLASS_SPELLINGS } from './notes';

// ============================================================================
// Interval Name Lookups
// ============================================================================

/** Maps full interval name strings (lowercase) to semitone counts */
export const INTERVAL_NAME_TO_SEMITONES: Record<string, number> = {
  // Full names
  'perfect unison': 0,
  unison: 0,
  'minor second': 1,
  'major second': 2,
  'minor third': 3,
  'major third': 4,
  'perfect fourth': 5,
  'augmented fourth': 6,
  'diminished fifth': 6,
  tritone: 6,
  'perfect fifth': 7,
  'minor sixth': 8,
  'major sixth': 9,
  'minor seventh': 10,
  'major seventh': 11,
  'perfect octave': 12,
  octave: 12,
  // With ordinals
  'minor 2nd': 1,
  'major 2nd': 2,
  'minor 3rd': 3,
  'major 3rd': 4,
  'perfect 4th': 5,
  'augmented 4th': 6,
  'diminished 5th': 6,
  'perfect 5th': 7,
  'minor 6th': 8,
  'major 6th': 9,
  'minor 7th': 10,
  'major 7th': 11,
};

/** Maps interval abbreviations to semitone counts (case-sensitive: M = major, m = minor) */
export const ABBREVIATION_TO_SEMITONES: Record<string, number> = {
  P1: 0,
  m2: 1,
  M2: 2,
  m3: 3,
  M3: 4,
  P4: 5,
  A4: 6,
  d5: 6,
  TT: 6,
  P5: 7,
  m6: 8,
  M6: 9,
  m7: 10,
  M7: 11,
  P8: 12,
};

// ============================================================================
// Semitone to Interval Object
// ============================================================================

/** Maps semitone count to default Interval object */
export const SEMITONES_TO_INTERVAL: Record<number, Interval> = {
  0: { quality: 'perfect', number: 1, semitones: 0 },
  1: { quality: 'minor', number: 2, semitones: 1 },
  2: { quality: 'major', number: 2, semitones: 2 },
  3: { quality: 'minor', number: 3, semitones: 3 },
  4: { quality: 'major', number: 3, semitones: 4 },
  5: { quality: 'perfect', number: 4, semitones: 5 },
  6: { quality: 'augmented', number: 4, semitones: 6 },
  7: { quality: 'perfect', number: 5, semitones: 7 },
  8: { quality: 'minor', number: 6, semitones: 8 },
  9: { quality: 'major', number: 6, semitones: 9 },
  10: { quality: 'minor', number: 7, semitones: 10 },
  11: { quality: 'major', number: 7, semitones: 11 },
  12: { quality: 'perfect', number: 8, semitones: 12 },
};

// ============================================================================
// Interval Builder
// ============================================================================

/**
 * Given a root note and semitone count, compute the lower and upper notes.
 *
 * Spelling logic:
 * - If the root uses flats (Bb, Eb, Ab, Db, Gb), prefer flat spelling for the upper note
 * - Otherwise prefer sharp spelling
 * - Always prefer natural (no accidental) spellings when available
 */
export function buildInterval(
  rootNote: Note,
  semitones: number
): { lowerNote: Note; upperNote: Note } {
  const rootPc = getPitchClass(rootNote);
  const upperPc = ((rootPc + semitones) % 12) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

  const spellings = PITCH_CLASS_SPELLINGS[upperPc];
  const prefersFlats = rootNote.accidental === 'b' || rootNote.accidental === 'bb';

  // Find the best spelling
  let upperNote: Note = spellings[0];

  // First pass: prefer no accidental
  const natural = spellings.find((s) => s.accidental === '');
  if (natural) {
    upperNote = natural;
  } else if (prefersFlats) {
    // Prefer flat spelling
    const flat = spellings.find((s) => s.accidental === 'b');
    if (flat) upperNote = flat;
  } else {
    // Prefer sharp spelling
    const sharp = spellings.find((s) => s.accidental === '#');
    if (sharp) upperNote = sharp;
  }

  return { lowerNote: rootNote, upperNote };
}
