// Query detection utilities — detect ambiguous/single-note queries

import { Note } from '../types/music';

/**
 * Detect if a query is ambiguous (just a note name like "G", "F#", "Bb").
 * Returns the parsed Note if ambiguous, or null otherwise.
 */
export function detectAmbiguousQuery(query: string): Note | null {
  const trimmed = query.trim();

  // Normalize the query
  const normalized = trimmed.replace(/[\s-]?flat/gi, 'b').replace(/[\s-]?sharp/gi, '#');

  // Check if it's just a note name (1-3 characters like "G", "F#", "Bb", "C##")
  const noteMatch = normalized.match(/^([A-Ga-g])([#b]{0,2})$/);

  if (noteMatch) {
    const natural = noteMatch[1].toUpperCase() as 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
    const accidental = noteMatch[2] as '' | '#' | 'b' | '##' | 'bb';
    return { natural, accidental };
  }

  return null;
}
