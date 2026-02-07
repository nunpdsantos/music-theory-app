/**
 * Slash Chord Parser
 *
 * Detects and parses slash chord queries like "Cmaj7/G", "Am/E", "D7/F#".
 * Handles both direct chord symbols and natural language queries
 * ("what is Am/E", "play D7/F#").
 */

import { Note, Accidental, ChordQuality } from '../types/music';
import { buildSlashChord } from '../constants/chords';
import { SlashChordCardData } from '../types/visual';
import { generateId } from './generateId';

// ============================================================================
// Types
// ============================================================================

export interface ParsedSlashChord {
  root: Note;
  quality: ChordQuality;
  bassNote: Note;
}

// ============================================================================
// Internal Helpers
// ============================================================================

/** Normalize accidental symbols (♯→#, ♭→b) to standard notation */
function normalizeAccidental(acc: string): Accidental {
  if (!acc) return '';
  const normalized = acc.replace(/♯/g, '#').replace(/♭/g, 'b');
  if (normalized === '#' || normalized === 'b' || normalized === '##' || normalized === 'bb') {
    return normalized as Accidental;
  }
  return '';
}

/** Normalize chord quality from symbol notation for slash chords */
function normalizeSlashChordQuality(symbol: string): ChordQuality {
  if (!symbol) return 'major';

  const s = symbol.toLowerCase().replace(/\s+/g, '');

  // Order matters - check longer patterns first
  const mappings: [string, ChordQuality][] = [
    // 13th chords
    ['maj13', 'major13'],
    ['min13', 'minor13'],
    ['m13', 'minor13'],
    ['13b9', 'dominant13flat9'],
    ['13', 'dominant13'],
    // 11th chords
    ['maj11', 'major11'],
    ['min11', 'minor11'],
    ['m11', 'minor11'],
    ['9#11', 'dominant9sharp11'],
    ['11', 'dominant11'],
    // 9th chords
    ['maj9', 'major9'],
    ['min9', 'minor9'],
    ['m9', 'minor9'],
    ['9sus4', 'dominant9sus4'],
    ['9sus', 'dominant9sus4'],
    ['9', 'dominant9'],
    // 7th chords
    ['maj7', 'major7'],
    ['mmaj7', 'minor_major7'],
    ['min7', 'minor7'],
    ['m7b5', 'half_diminished7'],
    ['m7', 'minor7'],
    ['dim7', 'diminished7'],
    ['aug7', 'augmented7'],
    ['7sus4', 'dominant7sus4'],
    ['7sus', 'dominant7sus4'],
    ['7b9', 'dominant7flat9'],
    ['7#9', 'dominant7sharp9'],
    ['7b5', 'dominant7flat5'],
    ['7#5', 'dominant7sharp5'],
    ['7alt', 'dominant7alt'],
    ['7', 'dominant7'],
    // 6th chords
    ['6/9', 'six_nine'],
    ['69', 'six_nine'],
    ['m6/9', 'minor_six_nine'],
    ['m69', 'minor_six_nine'],
    ['m6', 'minor6'],
    ['6', 'major6'],
    // Triads and others
    ['maj', 'major'],
    ['min', 'minor'],
    ['dim', 'diminished'],
    ['aug', 'augmented'],
    ['+', 'augmented'],
    ['sus2', 'sus2'],
    ['sus4', 'sus4'],
    ['add9', 'add9'],
    ['add11', 'add11'],
    ['5', 'power'],
    ['m', 'minor'],
  ];

  for (const [pattern, quality] of mappings) {
    if (s === pattern) return quality;
  }

  return 'major';
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Parse a slash chord symbol like "Cmaj7/G", "Am/E", "D7/F#".
 * Returns parsed data if valid, null otherwise.
 */
export function parseSlashChordQuery(query: string): ParsedSlashChord | null {
  if (query === null || query === undefined) return null;
  if (typeof query !== 'string') return null;
  if (query.length === 0 || query.length > 50) return null;

  const cleaned = query.trim();

  const slashChordPattern =
    /^([A-Ga-g])([#b♯♭]?)(maj13|min13|m13|maj11|min11|m11|maj9|min9|m9|mmaj7|mMaj7|maj7|min7|m7b5|m7|dim7|aug7|7sus4|9sus4|7b9|7#9|7b5|7#5|7alt|9#11|9|13b9|13|11|maj|min|dim|aug|add11|add9|6\/9|m6\/9|69|m69|sus2|sus4|m6|m|7|6|5|\+)?\/([A-Ga-g])([#b♯♭]?)$/i;

  const match = cleaned.match(slashChordPattern);
  if (!match) return null;

  const [, rootLetter, rootAcc, qualityStr, bassLetter, bassAcc] = match;

  try {
    const root: Note = {
      natural: rootLetter.toUpperCase() as Note['natural'],
      accidental: normalizeAccidental(rootAcc),
    };

    const bassNote: Note = {
      natural: bassLetter.toUpperCase() as Note['natural'],
      accidental: normalizeAccidental(bassAcc),
    };

    const quality = normalizeSlashChordQuality(qualityStr || '');

    return { root, quality, bassNote };
  } catch (e) {
    console.warn('Failed to parse slash chord:', e);
    return null;
  }
}

/**
 * Detect slash chord in a query, handling prefixes like "what is", "show me", "play".
 */
export function detectSlashChordQuery(query: string): ParsedSlashChord | null {
  if (query === null || query === undefined) return null;
  if (typeof query !== 'string') return null;
  if (query.length === 0 || query.length > 100) return null;

  const cleaned = query.trim();

  // Direct slash chord
  const direct = parseSlashChordQuery(cleaned);
  if (direct) return direct;

  // Query with prefix
  const prefixPattern =
    /^(?:what\s+is\s+(?:a\s+|an\s+|the\s+)?|show\s+(?:me\s+)?(?:a\s+|an\s+|the\s+)?|play\s+(?:a\s+|an\s+|the\s+)?|explain\s+(?:a\s+|an\s+|the\s+)?|how\s+(?:do\s+(?:i|you)\s+)?play\s+(?:a\s+|an\s+|the\s+)?)?(.+?)(?:\s+chord)?(?:\?)?$/i;

  const prefixMatch = cleaned.match(prefixPattern);
  if (prefixMatch && prefixMatch[1]) {
    const chordPart = prefixMatch[1].trim();
    const slashChord = parseSlashChordQuery(chordPart);
    if (slashChord) return slashChord;
  }

  return null;
}

/**
 * Create a SlashChordCardData component from parsed slash chord data.
 */
export function createSlashChordComponent(parsed: ParsedSlashChord): SlashChordCardData {
  const slashChord = buildSlashChord(parsed.root, parsed.quality, parsed.bassNote, 4);

  return {
    id: generateId('slash'),
    type: 'slashChord',
    slashChord,
    dismissable: true,
  };
}
