/**
 * Notation helpers — bridge between app Note types and VexFlow key strings.
 */
import type { Note, PitchedNote } from '../core/types/music';
import { noteToString } from '../core/types/music';

// ─── Note → VexFlow Conversion ─────────────────────────────────────────────

const ACCIDENTAL_MAP: Record<string, string> = {
  '': '',
  '#': '#',
  'b': 'b',
  '##': '##',
  'bb': 'bb',
};

/**
 * Convert a PitchedNote to VexFlow key string: "c#/4"
 */
export function pitchedNoteToVexKey(note: PitchedNote): string {
  const letter = note.natural.toLowerCase();
  const acc = ACCIDENTAL_MAP[note.accidental] ?? '';
  return `${letter}${acc}/${note.octave}`;
}

/**
 * Get the VexFlow accidental string for a note, or null if natural.
 */
export function getVexAccidental(note: Note): string | null {
  if (note.accidental === '') return null;
  return ACCIDENTAL_MAP[note.accidental] ?? null;
}

/**
 * Convert the app's root Note + mode to a VexFlow key signature string.
 * VexFlow accepts: C, G, D, A, E, B, F#, C#, F, Bb, Eb, Ab, Db, Gb, Cb
 * For minor: append 'm' (e.g., "Am", "Dm", "F#m")
 */
export function noteToVexKeySignature(root: Note, mode: 'major' | 'minor' = 'major'): string {
  const str = noteToString(root);
  return mode === 'minor' ? `${str}m` : str;
}

// ─── Valid VexFlow Key Signatures ───────────────────────────────────────────

const VALID_MAJOR_KEY_SIGS = new Set([
  'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#',
  'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb',
]);

const VALID_MINOR_KEY_SIGS = new Set([
  'Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m',
  'Dm', 'Gm', 'Cm', 'Fm', 'Bbm', 'Ebm', 'Abm',
]);

/**
 * Determine the VexFlow key signature string for a given root + scale type.
 * Returns null for non-diatonic scales where a key signature is misleading.
 */
export function getKeySignatureForScale(
  root: Note,
  scaleType: string,
): string | null {
  if (scaleType === 'major') {
    const sig = noteToVexKeySignature(root, 'major');
    return VALID_MAJOR_KEY_SIGS.has(sig) ? sig : null;
  }

  if (scaleType === 'natural_minor' || scaleType === 'harmonic_minor' || scaleType === 'melodic_minor') {
    const sig = noteToVexKeySignature(root, 'minor');
    return VALID_MINOR_KEY_SIGS.has(sig) ? sig : null;
  }

  // Non-diatonic scales: no key signature (would be misleading)
  return null;
}
