/**
 * Guitar Voicing Calculations
 *
 * Provides playable guitar fingerings for chords and scale positions instead
 * of naively highlighting every matching note on the fretboard. Converts
 * abstract chord/scale data into concrete fret positions respecting a given
 * tuning, with priority-based note selection that favours root-in-bass and
 * lower fret positions for ergonomic playability.
 */

import { Note, PitchedNote, Chord, Scale } from '../types/music';
import { GuitarTuning, TUNING_STANDARD } from '../constants/guitarTunings';

// Note to pitch class mapping
const NOTE_TO_PITCH_CLASS: Record<string, number> = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
};

/** Convert a Note to its pitch class (0–11, where C=0). */
function getPitchClass(note: Note): number {
  const key = `${note.natural}${note.accidental}`;
  return NOTE_TO_PITCH_CLASS[key] ?? NOTE_TO_PITCH_CLASS[note.natural] ?? 0;
}

// Pitch class to note mapping (for display)
const PITCH_CLASS_TO_NOTE: Note[] = [
  { natural: 'C', accidental: '' },
  { natural: 'C', accidental: '#' },
  { natural: 'D', accidental: '' },
  { natural: 'D', accidental: '#' },
  { natural: 'E', accidental: '' },
  { natural: 'F', accidental: '' },
  { natural: 'F', accidental: '#' },
  { natural: 'G', accidental: '' },
  { natural: 'G', accidental: '#' },
  { natural: 'A', accidental: '' },
  { natural: 'A', accidental: '#' },
  { natural: 'B', accidental: '' },
];

/**
 * Compute the pitched note produced at a given fret on a given string.
 * Adds the fret offset to the open-string pitch class and tracks octave
 * wrap-around to return a fully pitched note.
 */
function getNoteAtFret(
  stringIndex: number,
  fret: number,
  tuning: GuitarTuning = TUNING_STANDARD
): PitchedNote {
  const openString = tuning.strings[stringIndex];
  const openPitchClass = getPitchClass(openString);
  const newPitchClass = (openPitchClass + fret) % 12;
  const octaveIncrease = Math.floor((openPitchClass + fret) / 12);
  const note = PITCH_CLASS_TO_NOTE[newPitchClass];

  return {
    ...note,
    octave: openString.octave + octaveIncrease,
  };
}

// Fret position: which string (0-5) and which fret (0-24)
export interface FretPosition {
  string: number; // 0 = 6th string (low E), 5 = 1st string (high E)
  fret: number; // 0 = open, 1-24 = frets
}

// Guitar voicing: a specific way to play a chord
export interface GuitarVoicing {
  positions: (FretPosition | null)[]; // 6 elements, one per string, null = muted
  barreInfo?: { fret: number; fromString: number; toString: number };
  positionName?: string; // e.g., "Open", "Barre (fret 3)", "Position 5"
}

/**
 * Find the first fret on a string that produces a target pitch class.
 *
 * Scans [minFret, maxFret] and returns the first match, or null if the
 * pitch class does not appear in that range.
 *
 * @param stringIndex       String index (0 = low E through 5 = high E).
 * @param targetPitchClass  Pitch class to locate (0–11).
 * @param minFret           Lowest fret to scan (inclusive).
 * @param maxFret           Highest fret to scan (inclusive).
 * @param tuning            Guitar tuning (defaults to standard).
 */
export function findFretForPitchClass(
  stringIndex: number,
  targetPitchClass: number,
  minFret: number,
  maxFret: number,
  tuning: GuitarTuning = TUNING_STANDARD
): number | null {
  for (let fret = minFret; fret <= maxFret; fret++) {
    const noteAtFret = getNoteAtFret(stringIndex, fret, tuning);
    if (getPitchClass(noteAtFret) === targetPitchClass) {
      return fret;
    }
  }
  return null;
}

/**
 * Calculate a single playable chord voicing.
 *
 * For each string, selects the best chord tone within the fret window using
 * priority: root > 5th > 3rd > other, with a preference for lower frets.
 * Ensures the root is in the bass by muting lower strings if necessary.
 *
 * @param chord     Chord to voice.
 * @param position  'open' (frets 0–4), 'barre' (first root on 6th/5th string),
 *                  or a numeric starting fret.
 * @param tuning    Guitar tuning (defaults to standard).
 */
export function getChordVoicing(
  chord: Chord,
  position: 'open' | 'barre' | number = 'open',
  tuning: GuitarTuning = TUNING_STANDARD
): GuitarVoicing {
  const chordPitchClasses = chord.notes.map((n) => getPitchClass(n));
  const rootPitchClass = getPitchClass(chord.root);

  // For open position, try to find a voicing in frets 0-4
  // For barre or numbered position, use that as the starting fret
  let minFret = 0;
  let maxFret = 4;

  if (typeof position === 'number') {
    minFret = position;
    maxFret = position + 4;
  } else if (position === 'barre') {
    // Find the first barre position where root is on 6th or 5th string
    for (let fret = 1; fret <= 12; fret++) {
      const note6 = getNoteAtFret(0, fret, tuning);
      const note5 = getNoteAtFret(1, fret, tuning);
      if (getPitchClass(note6) === rootPitchClass || getPitchClass(note5) === rootPitchClass) {
        minFret = fret;
        maxFret = fret + 4;
        break;
      }
    }
  }

  const positions: (FretPosition | null)[] = [];

  // For each string, try to find a chord tone
  for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
    let bestFret: number | null = null;
    let bestPriority = -1;

    for (let fret = minFret; fret <= maxFret; fret++) {
      const noteAtFret = getNoteAtFret(stringIndex, fret, tuning);
      const pitchClass = getPitchClass(noteAtFret);

      // Check if this pitch class is in the chord
      const chordIndex = chordPitchClasses.indexOf(pitchClass);
      if (chordIndex !== -1) {
        // Prioritize: root > 5th > 3rd > other tones
        let priority = 0;
        if (pitchClass === rootPitchClass) priority = 4;
        else if (chordIndex === 2)
          priority = 3; // 5th
        else if (chordIndex === 1)
          priority = 2; // 3rd
        else priority = 1;

        // Prefer lower frets for easier playing
        priority -= fret * 0.1;

        if (priority > bestPriority) {
          bestPriority = priority;
          bestFret = fret;
        }
      }
    }

    if (bestFret !== null) {
      positions.push({ string: stringIndex, fret: bestFret });
    } else {
      positions.push(null); // Muted string
    }
  }

  // Ensure root is in bass (mute lower strings if needed)
  const bassStringIndex = positions.findIndex((p) => p !== null);
  if (bassStringIndex !== -1) {
    const bassNote = positions[bassStringIndex];
    if (bassNote) {
      const bassPitchClass = getPitchClass(getNoteAtFret(bassNote.string, bassNote.fret, tuning));
      if (bassPitchClass !== rootPitchClass) {
        // Try to find root on a lower string
        for (let i = 0; i < bassStringIndex; i++) {
          if (positions[i] === null) continue;
          const pos = positions[i]!;
          const pc = getPitchClass(getNoteAtFret(pos.string, pos.fret, tuning));
          if (pc !== rootPitchClass) {
            positions[i] = null; // Mute strings below root
          } else {
            break;
          }
        }
      }
    }
  }

  const positionName =
    typeof position === 'number'
      ? `Position ${position}`
      : position === 'barre'
        ? `Barre (fret ${minFret})`
        : 'Open';

  return { positions, positionName };
}

/**
 * Convert a GuitarVoicing into an array of PitchedNotes suitable for
 * fretboard highlighting. Skips muted strings (null positions).
 */
export function voicingToPitchedNotes(
  voicing: GuitarVoicing,
  tuning: GuitarTuning = TUNING_STANDARD
): PitchedNote[] {
  const notes: PitchedNote[] = [];

  for (const pos of voicing.positions) {
    if (pos !== null) {
      notes.push(getNoteAtFret(pos.string, pos.fret, tuning));
    }
  }

  return notes;
}

/**
 * Collect all scale tones within a fretboard position (fret window).
 *
 * Scans every string across [position, position + span] and returns pitched
 * notes whose pitch class belongs to the scale — useful for rendering a
 * single-position scale box pattern.
 *
 * @param scale     Scale whose notes define the target pitch classes.
 * @param position  Starting fret of the box (default 0).
 * @param span      Number of frets to span (default 4).
 * @param tuning    Guitar tuning (defaults to standard).
 */
export function getScaleInPosition(
  scale: Scale,
  position: number = 0,
  span: number = 4,
  tuning: GuitarTuning = TUNING_STANDARD
): PitchedNote[] {
  const scalePitchClasses = scale.notes.map((n) => getPitchClass(n));
  const notes: PitchedNote[] = [];

  const minFret = position;
  const maxFret = position + span;

  // For each string, find scale tones within the position
  for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
    for (let fret = minFret; fret <= maxFret; fret++) {
      const noteAtFret = getNoteAtFret(stringIndex, fret, tuning);
      const pitchClass = getPitchClass(noteAtFret);

      if (scalePitchClasses.includes(pitchClass)) {
        notes.push(noteAtFret);
      }
    }
  }

  return notes;
}

/**
 * Determine up to 5 common fret positions where a scale's box pattern can
 * be played. Finds where the root appears on the 6th string (frets 0–12),
 * then adds nearby box offsets (root − 3, root − 2, root, root + 2) for
 * a practical set of starting positions.
 */
export function getScalePositions(scale: Scale, tuning: GuitarTuning = TUNING_STANDARD): number[] {
  // Return common scale position starting frets based on the root
  const rootPitchClass = getPitchClass(scale.root);

  // Find where the root appears on the 6th string
  const positions: number[] = [];
  for (let fret = 0; fret <= 12; fret++) {
    const note = getNoteAtFret(0, fret, tuning);
    if (getPitchClass(note) === rootPitchClass) {
      positions.push(fret);
    }
  }

  // Also add common box positions (2-3 frets before root positions)
  const boxPositions = new Set<number>();
  for (const pos of positions) {
    boxPositions.add(Math.max(0, pos - 3));
    boxPositions.add(Math.max(0, pos - 2));
    boxPositions.add(pos);
    boxPositions.add(pos + 2);
  }

  return Array.from(boxPositions)
    .sort((a, b) => a - b)
    .slice(0, 5);
}

/**
 * Convenience wrapper: compute a chord voicing and return its notes as
 * PitchedNotes for direct use in fretboard highlighting.
 */
export function getGuitarChordNotes(
  chord: Chord,
  position: 'open' | 'barre' | number = 'open',
  tuning: GuitarTuning = TUNING_STANDARD
): PitchedNote[] {
  const voicing = getChordVoicing(chord, position, tuning);
  return voicingToPitchedNotes(voicing, tuning);
}
