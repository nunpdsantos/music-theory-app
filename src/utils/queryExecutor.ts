/**
 * Parses curriculum "Try This" queries and executes them against the app store.
 * Handles: scales, chords, key-of, and circle of fifths.
 * Falls back to switching to Explore view for unrecognized queries.
 */

import { useAppStore } from '../state/store';
import { stringToNote } from '../core/types/music';
import { buildChord } from '../core/constants/chords';
import type { ChordQuality, ScaleType } from '../core/types/music';

const SCALE_MAP: Record<string, ScaleType> = {
  major: 'major',
  minor: 'natural_minor',
  'natural minor': 'natural_minor',
  'harmonic minor': 'harmonic_minor',
  'melodic minor': 'melodic_minor',
  dorian: 'dorian',
  mixolydian: 'mixolydian',
  lydian: 'lydian',
  phrygian: 'phrygian',
  locrian: 'locrian',
  blues: 'blues',
  pentatonic: 'pentatonic_major',
  'pentatonic major': 'pentatonic_major',
  'pentatonic minor': 'pentatonic_minor',
  chromatic: 'chromatic',
  'whole tone': 'whole_tone',
};

const CHORD_SUFFIX_MAP: Record<string, ChordQuality> = {
  '': 'major',
  major: 'major',
  m: 'minor',
  minor: 'minor',
  maj7: 'major7',
  m7: 'minor7',
  '7': 'dominant7',
  dim: 'diminished',
  aug: 'augmented',
  sus2: 'sus2',
  sus4: 'sus4',
  add9: 'add9',
  '6': 'major6',
  '9': 'dominant9',
};

export function executeTheoryQuery(query: string): void {
  const store = useAppStore.getState();
  const q = query.trim();

  // "key of X"
  const keyMatch = q.match(/^key\s+of\s+([A-Ga-g][#b]?)$/i);
  if (keyMatch) {
    store.setKey(stringToNote(keyMatch[1]));
    store.setView('explore');
    return;
  }

  // "circle of fifths" — just switch to explore
  if (q.toLowerCase() === 'circle of fifths') {
    store.setView('explore');
    return;
  }

  // "X [scale type] scale" or "X [scale type]"
  const scaleMatch = q.match(/^([A-Ga-g][#b]?)\s+([\w\s]+?)(?:\s+scale)?$/i);
  if (scaleMatch) {
    const scaleTypeName = scaleMatch[2].trim().toLowerCase();
    const scaleType = SCALE_MAP[scaleTypeName];
    if (scaleType) {
      store.setKey(stringToNote(scaleMatch[1]));
      store.setScale(scaleType);
      store.setView('explore');
      return;
    }
  }

  // "X major chord" / "X minor chord"
  const chordWordMatch = q.match(
    /^([A-Ga-g][#b]?)\s+(major|minor)\s+chord$/i,
  );
  if (chordWordMatch) {
    const root = stringToNote(chordWordMatch[1]);
    const quality: ChordQuality =
      chordWordMatch[2].toLowerCase() === 'minor' ? 'minor' : 'major';
    store.setSelectedChord(buildChord(root, quality));
    store.setView('explore');
    return;
  }

  // Chord symbols: "Cmaj7", "Am", "Bb7", "F#dim"
  const chordSymbolMatch = q.match(
    /^([A-Ga-g][#b]?)(maj7|m7|7|dim|aug|m|sus2|sus4|add9|6|9)?$/i,
  );
  if (chordSymbolMatch) {
    const root = stringToNote(chordSymbolMatch[1]);
    const suffix = (chordSymbolMatch[2] ?? '').toLowerCase();
    const quality = CHORD_SUFFIX_MAP[suffix] ?? 'major';
    store.setSelectedChord(buildChord(root, quality));
    store.setView('explore');
    return;
  }

  // Fallback: switch to explore
  store.setView('explore');
}
