import type { FingerNumber } from '../../core/constants/guitarChordShapes.ts';

export const FULL_FRETS = 15;
export const CHORD_FRET_WINDOW = 5;
export const FRET_MARKERS = [3, 5, 7, 9, 12, 15];
export const DOUBLE_MARKERS = [12];

export interface FretNote {
  stringIndex: number; // 0 = 6th (low E), 5 = 1st (high E)
  fret: number;
  pitchClass: number;
  midiNumber: number;
}

/** Finger label for display. 0 = open/muted (no label), 'bar' = index finger (1). */
export function fingerLabel(f: FingerNumber | undefined): string {
  if (f === undefined || f === 0) return '';
  if (f === 'bar') return '1';
  return String(f);
}
