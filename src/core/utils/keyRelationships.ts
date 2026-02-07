// Key Relationships - Utilities for finding related keys

import { Note, NaturalNote, Accidental } from '../types/music';
import { getPitchClass, NATURAL_TO_PITCH_CLASS } from '../constants/notes';

// Natural notes in order for calculations
const NATURALS: NaturalNote[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Calculate accidental needed for a target pitch class from a natural note
function getAccidentalForPitchClass(natural: NaturalNote, targetPc: number): Accidental {
  const naturalPc = NATURAL_TO_PITCH_CLASS[natural];
  const diff = (targetPc - naturalPc + 12) % 12;

  if (diff === 0) return '';
  if (diff === 1) return '#';
  if (diff === 11) return 'b';
  if (diff === 2) return '##';
  if (diff === 10) return 'bb';

  return diff > 6 ? 'b' : '#';
}

// Build a note from natural and pitch class
function buildNote(natural: NaturalNote, pitchClass: number): Note {
  return {
    natural,
    accidental: getAccidentalForPitchClass(natural, pitchClass),
  };
}

// Get the relative minor of a major key (down a minor 3rd / up a major 6th)
// E.g., C major -> A minor
export function getRelativeMinor(majorRoot: Note): Note {
  const majorPc = getPitchClass(majorRoot);
  const minorPc = (majorPc + 9) % 12; // Up a major 6th = relative minor

  // Natural should be 2 letters before (A is relative of C, F# is relative of A)
  const majorNaturalIndex = NATURALS.indexOf(majorRoot.natural);
  const minorNaturalIndex = (majorNaturalIndex + 5) % 7; // 5 steps forward = 2 steps back in 7
  const minorNatural = NATURALS[minorNaturalIndex];

  return buildNote(minorNatural, minorPc);
}

// Get the relative major of a minor key (up a minor 3rd)
// E.g., A minor -> C major
export function getRelativeMajor(minorRoot: Note): Note {
  const minorPc = getPitchClass(minorRoot);
  const majorPc = (minorPc + 3) % 12; // Up a minor 3rd = relative major

  // Natural should be 2 letters after (C is relative of A)
  const minorNaturalIndex = NATURALS.indexOf(minorRoot.natural);
  const majorNaturalIndex = (minorNaturalIndex + 2) % 7;
  const majorNatural = NATURALS[majorNaturalIndex];

  return buildNote(majorNatural, majorPc);
}

// Get the parallel minor of a major key (same root, different mode)
// E.g., C major -> C minor
export function getParallelMinor(majorRoot: Note): Note {
  return { ...majorRoot }; // Same root, just different mode
}

// Get the parallel major of a minor key (same root, different mode)
// E.g., C minor -> C major
export function getParallelMajor(minorRoot: Note): Note {
  return { ...minorRoot }; // Same root, just different mode
}

// Get dominant key (up a perfect 5th)
// E.g., C major -> G major
export function getDominantKey(root: Note): Note {
  const rootPc = getPitchClass(root);
  const dominantPc = (rootPc + 7) % 12;

  const rootNaturalIndex = NATURALS.indexOf(root.natural);
  const dominantNaturalIndex = (rootNaturalIndex + 4) % 7;
  const dominantNatural = NATURALS[dominantNaturalIndex];

  return buildNote(dominantNatural, dominantPc);
}

// Get subdominant key (up a perfect 4th / down a perfect 5th)
// E.g., C major -> F major
export function getSubdominantKey(root: Note): Note {
  const rootPc = getPitchClass(root);
  const subdominantPc = (rootPc + 5) % 12;

  const rootNaturalIndex = NATURALS.indexOf(root.natural);
  const subdominantNaturalIndex = (rootNaturalIndex + 3) % 7;
  const subdominantNatural = NATURALS[subdominantNaturalIndex];

  return buildNote(subdominantNatural, subdominantPc);
}

// Related key information
export interface RelatedKey {
  root: Note;
  mode: 'major' | 'minor';
  relationship: string;
  description: string;
}

// Get all related keys for a given key
export function getRelatedKeys(root: Note, mode: 'major' | 'minor'): RelatedKey[] {
  const results: RelatedKey[] = [];

  if (mode === 'major') {
    // Relative minor
    results.push({
      root: getRelativeMinor(root),
      mode: 'minor',
      relationship: 'Relative Minor',
      description: 'Shares all the same notes',
    });

    // Parallel minor
    results.push({
      root: getParallelMinor(root),
      mode: 'minor',
      relationship: 'Parallel Minor',
      description: 'Same root, different character',
    });

    // Dominant key
    results.push({
      root: getDominantKey(root),
      mode: 'major',
      relationship: 'Dominant',
      description: 'Up a 5th on Circle of Fifths',
    });

    // Subdominant key
    results.push({
      root: getSubdominantKey(root),
      mode: 'major',
      relationship: 'Subdominant',
      description: 'Down a 5th on Circle of Fifths',
    });
  } else {
    // Relative major
    results.push({
      root: getRelativeMajor(root),
      mode: 'major',
      relationship: 'Relative Major',
      description: 'Shares all the same notes',
    });

    // Parallel major
    results.push({
      root: getParallelMajor(root),
      mode: 'major',
      relationship: 'Parallel Major',
      description: 'Same root, different character',
    });

    // Dominant key (minor)
    results.push({
      root: getDominantKey(root),
      mode: 'minor',
      relationship: 'Dominant Minor',
      description: 'Up a 5th on Circle of Fifths',
    });

    // Subdominant key (minor)
    results.push({
      root: getSubdominantKey(root),
      mode: 'minor',
      relationship: 'Subdominant Minor',
      description: 'Down a 5th on Circle of Fifths',
    });
  }

  return results;
}
