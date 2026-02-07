// Enharmonic equivalent helper functions

import { Note, noteToString } from '../types/music';
import { getPitchClass } from '../constants/notes';

// Enharmonic equivalents map - maps note strings to their equivalents
const ENHARMONIC_EQUIVALENTS: Record<string, string[]> = {
  // Natural notes with simpler equivalents
  C: ['B#'],
  D: ['C##', 'Ebb'],
  E: ['Fb', 'D##'],
  F: ['E#'],
  G: ['F##', 'Abb'],
  A: ['G##', 'Bbb'],
  B: ['Cb', 'A##'],

  // Sharps and their equivalents
  'C#': ['Db'],
  'D#': ['Eb'],
  'E#': ['F'],
  'F#': ['Gb'],
  'G#': ['Ab'],
  'A#': ['Bb'],
  'B#': ['C'],

  // Flats and their equivalents
  Cb: ['B'],
  Db: ['C#'],
  Eb: ['D#'],
  Fb: ['E'],
  Gb: ['F#'],
  Ab: ['G#'],
  Bb: ['A#'],

  // Double sharps
  'C##': ['D'],
  'D##': ['E'],
  'E##': ['F#', 'Gb'],
  'F##': ['G'],
  'G##': ['A'],
  'A##': ['B'],
  'B##': ['C#', 'Db'],

  // Double flats
  Cbb: ['Bb', 'A#'],
  Dbb: ['C'],
  Ebb: ['D'],
  Fbb: ['Eb', 'D#'],
  Gbb: ['F'],
  Abb: ['G'],
  Bbb: ['A'],
};

/**
 * Get all enharmonic equivalents for a note
 * @param note The note to find equivalents for
 * @returns Array of enharmonic equivalent notes, empty if none
 */
export function getEnharmonicEquivalents(note: Note): Note[] {
  const noteStr = noteToString(note);
  const equivalents = ENHARMONIC_EQUIVALENTS[noteStr];

  if (!equivalents) {
    return [];
  }

  return equivalents.map((eq) => parseNoteString(eq)).filter((n): n is Note => n !== null);
}

/**
 * Get the simplest enharmonic equivalent (prefers naturals, then single accidentals)
 * @param note The note to simplify
 * @returns The simplest enharmonic equivalent, or the original note if it's already simplest
 */
export function getSimplestEnharmonic(note: Note): Note {
  const noteStr = noteToString(note);
  const equivalents = ENHARMONIC_EQUIVALENTS[noteStr] || [];

  // Include original note in the comparison
  const allOptions = [noteStr, ...equivalents];

  // Sort by complexity: naturals < single accidentals < double accidentals
  const sorted = allOptions.sort((a, b) => {
    const complexityA = getAccidentalComplexity(a);
    const complexityB = getAccidentalComplexity(b);
    return complexityA - complexityB;
  });

  const simplest = sorted[0];
  if (simplest === noteStr) {
    return note;
  }

  const parsed = parseNoteString(simplest);
  return parsed || note;
}

/**
 * Get the accidental complexity (for sorting)
 * 0 = natural, 1 = single accidental, 2 = double accidental
 */
function getAccidentalComplexity(noteStr: string): number {
  if (noteStr.includes('##') || noteStr.includes('bb')) {
    return 2;
  }
  if (noteStr.includes('#') || noteStr.includes('b')) {
    return 1;
  }
  return 0;
}

/**
 * Check if a note has an enharmonic equivalent
 * @param note The note to check
 * @returns true if the note has enharmonic equivalents
 */
export function hasEnharmonicEquivalent(note: Note): boolean {
  const noteStr = noteToString(note);
  return ENHARMONIC_EQUIVALENTS[noteStr] !== undefined;
}

/**
 * Check if two notes are enharmonically equivalent (same pitch class)
 * @param note1 First note
 * @param note2 Second note
 * @returns true if the notes are enharmonically equivalent
 */
export function areEnharmonic(note1: Note, note2: Note): boolean {
  return getPitchClass(note1) === getPitchClass(note2);
}

/**
 * Parse a note string into a Note object
 * @param noteStr String like "C#", "Db", "F##"
 * @returns Note object or null if invalid
 */
function parseNoteString(noteStr: string): Note | null {
  if (!noteStr || noteStr.length === 0) {
    return null;
  }

  const natural = noteStr[0].toUpperCase();
  if (!'CDEFGAB'.includes(natural)) {
    return null;
  }

  const accidentalStr = noteStr.slice(1);
  let accidental: '' | '#' | 'b' | '##' | 'bb' = '';

  if (accidentalStr === '#') {
    accidental = '#';
  } else if (accidentalStr === 'b') {
    accidental = 'b';
  } else if (accidentalStr === '##') {
    accidental = '##';
  } else if (accidentalStr === 'bb') {
    accidental = 'bb';
  } else if (accidentalStr !== '') {
    return null; // Invalid accidental
  }

  return {
    natural: natural as Note['natural'],
    accidental,
  };
}

/**
 * Format note with enharmonic hint if applicable
 * Useful for display purposes
 * @param note The note to format
 * @returns Object with note string and optional enharmonic hint
 */
export function getNoteWithEnharmonicHint(note: Note): { noteStr: string; hint: string | null } {
  const noteStr = noteToString(note);

  // Only show hints for double accidentals or unusual enharmonics
  if (note.accidental === '##' || note.accidental === 'bb') {
    const simplest = getSimplestEnharmonic(note);
    const simplestStr = noteToString(simplest);
    if (simplestStr !== noteStr) {
      return { noteStr, hint: `(=${simplestStr})` };
    }
  }

  // Also show hints for E#/Fb and B#/Cb which are unusual
  if (['E#', 'Fb', 'B#', 'Cb'].includes(noteStr)) {
    const simplest = getSimplestEnharmonic(note);
    const simplestStr = noteToString(simplest);
    return { noteStr, hint: `(=${simplestStr})` };
  }

  return { noteStr, hint: null };
}
