// Constants and types for the ProgressionBuilderCard

import { Note, Chord } from '../types/music';

export const CHROMATIC_NOTES: Note[] = [
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

export const CHROMATIC_LABELS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const MAX_SEQUENCE = 8;

// Chord function labels for education
// T = Tonic (stable, home), SD = Subdominant (moving away), D = Dominant (tension, wants to resolve)
export const MAJOR_FUNCTIONS: Record<string, { fn: string; label: string }> = {
  I: { fn: 'T', label: 'Tonic — home, stable' },
  ii: { fn: 'SD', label: 'Subdominant — moving away' },
  iii: { fn: 'T', label: 'Mediant — tonic color' },
  IV: { fn: 'SD', label: 'Subdominant — moving away' },
  V: { fn: 'D', label: 'Dominant — tension, wants home' },
  vi: { fn: 'T', label: 'Relative minor — tonic substitute' },
  'vii\u00B0': { fn: 'D', label: 'Leading tone — strong pull to I' },
  // Seventh chord variants
  Imaj7: { fn: 'T', label: 'Tonic — home, stable' },
  ii7: { fn: 'SD', label: 'Subdominant — moving away' },
  iii7: { fn: 'T', label: 'Mediant — tonic color' },
  IVmaj7: { fn: 'SD', label: 'Subdominant — moving away' },
  V7: { fn: 'D', label: 'Dominant — tension, wants home' },
  vi7: { fn: 'T', label: 'Relative minor — tonic substitute' },
  'vii\u00F87': { fn: 'D', label: 'Leading tone — strong pull to I' },
};

export const MINOR_FUNCTIONS: Record<string, { fn: string; label: string }> = {
  i: { fn: 'T', label: 'Tonic — home, stable' },
  'ii\u00B0': { fn: 'SD', label: 'Subdominant — moving away' },
  III: { fn: 'T', label: 'Relative major — tonic color' },
  iv: { fn: 'SD', label: 'Subdominant — moving away' },
  V: { fn: 'D', label: 'Dominant — tension, wants home' },
  v: { fn: 'D', label: 'Minor dominant — softer tension' },
  VI: { fn: 'SD', label: 'Submediant — subdominant color' },
  VII: { fn: 'SD', label: 'Subtonic — can move to III' },
  // Seventh chord variants
  imMaj7: { fn: 'T', label: 'Tonic — home, stable' },
  'ii\u00F87': { fn: 'SD', label: 'Subdominant — moving away' },
  IIImaj7: { fn: 'T', label: 'Relative major — tonic color' },
  iv7: { fn: 'SD', label: 'Subdominant — moving away' },
  V7: { fn: 'D', label: 'Dominant — tension, wants home' },
  v7: { fn: 'D', label: 'Minor dominant — softer tension' },
  VImaj7: { fn: 'SD', label: 'Submediant — subdominant color' },
  VII7: { fn: 'SD', label: 'Subtonic — can move to III' },
};

export interface SequenceItem {
  chord: Chord;
  numeral: string;
}
