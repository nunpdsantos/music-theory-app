// Interval query parser
// Handles queries like "major third", "M3", "perfect fifth from D", "P5 from Eb"

import { Note, NaturalNote, Accidental } from '../types/music';
import { IntervalBlockData } from '../types/visual';
import {
  INTERVAL_NAME_TO_SEMITONES,
  ABBREVIATION_TO_SEMITONES,
  SEMITONES_TO_INTERVAL,
  buildInterval,
} from '../constants/intervals';
import { generateId } from './generateId';

// ============================================================================
// Internal Helpers
// ============================================================================

/** Parse a note string like "C", "Eb", "F#" into a Note object */
function parseNoteString(noteStr: string): Note | null {
  const match = noteStr.match(/^([A-Ga-g])([#b\u266F\u266D]?)$/);
  if (!match) return null;

  const natural = match[1].toUpperCase() as NaturalNote;
  let accidental: Accidental = '';
  if (match[2]) {
    const acc = match[2].replace(/\u266F/g, '#').replace(/\u266D/g, 'b');
    if (acc === '#' || acc === 'b') {
      accidental = acc;
    }
  }
  return { natural, accidental };
}

/** Default root note (C) */
const DEFAULT_ROOT: Note = { natural: 'C', accidental: '' };

// ============================================================================
// Main Parser
// ============================================================================

/**
 * Parse an interval query and return IntervalBlockData or null.
 *
 * Supported formats:
 * - Bare interval names: "major third", "minor 7th", "tritone", "octave"
 * - Abbreviations (case-sensitive): "M3", "m3", "P5", "A4", "d5", "TT"
 * - With "interval" suffix: "major third interval"
 * - With root note: "perfect fifth from C", "M3 from Eb"
 */
export function parseIntervalQuery(query: string): IntervalBlockData | null {
  let q = query.trim();

  // Quick rejection: if it looks like a chord symbol (note + quality), bail out.
  // "C major" with no interval-specific words should NOT match.
  // But "major third" should match.
  // Also reject anything that looks like a progression (contains Roman numerals or dashes between chords)
  if (/\b[IViv]{1,4}\b/.test(q) && !/\binterval\b/i.test(q)) return null;

  // Strip trailing "interval" word
  q = q.replace(/\s+interval\s*$/i, '');

  // Check for "from [note]" suffix — extract root note if present
  let rootNote: Note = DEFAULT_ROOT;
  const fromMatch = q.match(/\s+from\s+([A-Ga-g][#b\u266F\u266D]?)\s*$/i);
  if (fromMatch) {
    const parsed = parseNoteString(fromMatch[1]);
    if (parsed) {
      rootNote = parsed;
    }
    q = q.slice(0, fromMatch.index!).trim();
  }

  // Try abbreviation match FIRST (case-sensitive — M vs m matters)
  let semitones: number | undefined;

  if (q in ABBREVIATION_TO_SEMITONES) {
    semitones = ABBREVIATION_TO_SEMITONES[q];
  }

  // Try full name match (case-insensitive)
  if (semitones === undefined) {
    const lower = q.toLowerCase();
    if (lower in INTERVAL_NAME_TO_SEMITONES) {
      semitones = INTERVAL_NAME_TO_SEMITONES[lower];
    }
  }

  // No match
  if (semitones === undefined) return null;

  // Look up the Interval object
  const interval = SEMITONES_TO_INTERVAL[semitones];
  if (!interval) return null;

  // Build the note pair
  const { lowerNote, upperNote } = buildInterval(rootNote, semitones);

  return {
    id: generateId('interval'),
    type: 'interval',
    interval,
    lowerNote,
    upperNote,
    dismissable: true,
  };
}
