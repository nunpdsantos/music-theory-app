import type { Note } from '../core/types/music.ts';
import { getPitchClass } from '../core/constants/notes.ts';
import { getMidiNumber } from '../core/utils/pianoLayout.ts';

/**
 * Build ascending MIDI numbers from a note array, tracking octave wraps.
 * When a note's pitch class is <= the previous, the octave increments.
 * Returns { midi, finalOctave } so callers can continue with descending.
 */
export function buildAscendingMidi(
  notes: Note[],
  startOctave: number,
  prevPitchClass = -1,
): { midi: number[]; finalOctave: number; finalPitchClass: number } {
  const midi: number[] = [];
  let currentOctave = startOctave;
  let lastPitchClass = prevPitchClass;

  for (let i = 0; i < notes.length; i++) {
    const pc = getPitchClass(notes[i]);
    if (i > 0 && pc <= lastPitchClass) {
      currentOctave++;
    }
    midi.push(getMidiNumber(notes[i], currentOctave));
    lastPitchClass = pc;
  }

  return { midi, finalOctave: currentOctave, finalPitchClass: lastPitchClass };
}

/**
 * Build descending MIDI numbers from a note array, tracking octave wraps.
 * Used for scale descent after an ascending run.
 */
export function buildDescendingMidi(
  notes: Note[],
  startOctave: number,
): number[] {
  const midi: number[] = [];
  let currentOctave = startOctave;
  let lastPitchClass = getPitchClass(notes[0]); // root pitch class

  for (let i = notes.length - 1; i >= 0; i--) {
    const pc = getPitchClass(notes[i]);
    if (pc >= lastPitchClass) currentOctave--;
    midi.push(getMidiNumber(notes[i], currentOctave));
    lastPitchClass = pc;
  }

  return midi;
}
