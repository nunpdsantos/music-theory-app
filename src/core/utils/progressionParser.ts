// Progression Parser - Parse chord progressions from user input

import { Note, Chord } from '../types/music';
import { buildChord } from '../constants/chords';
import { CustomProgressionCardData } from '../types/visual';
import { PROGRESSION_PATTERNS } from '../constants/progressionPatterns';
import { buildScale } from '../constants/scales';
import { getPitchClass, getNaturalAtInterval, NATURAL_TO_PITCH_CLASS } from '../constants/notes';

// Roman numeral mapping for major keys
const MAJOR_KEY_NUMERALS: Record<
  string,
  { degree: number; quality: 'major' | 'minor' | 'diminished' | 'augmented' }
> = {
  I: { degree: 0, quality: 'major' },
  i: { degree: 0, quality: 'minor' },
  'I+': { degree: 0, quality: 'augmented' },
  II: { degree: 2, quality: 'major' },
  ii: { degree: 2, quality: 'minor' },
  'II+': { degree: 2, quality: 'augmented' },
  'ii°': { degree: 2, quality: 'diminished' },
  iio: { degree: 2, quality: 'diminished' },
  III: { degree: 4, quality: 'major' },
  iii: { degree: 4, quality: 'minor' },
  'III+': { degree: 4, quality: 'augmented' },
  IV: { degree: 5, quality: 'major' },
  iv: { degree: 5, quality: 'minor' },
  'IV+': { degree: 5, quality: 'augmented' },
  V: { degree: 7, quality: 'major' },
  v: { degree: 7, quality: 'minor' },
  'V+': { degree: 7, quality: 'augmented' },
  VI: { degree: 9, quality: 'major' },
  vi: { degree: 9, quality: 'minor' },
  'VI+': { degree: 9, quality: 'augmented' },
  'vi°': { degree: 9, quality: 'diminished' },
  vio: { degree: 9, quality: 'diminished' },
  VII: { degree: 11, quality: 'major' },
  vii: { degree: 11, quality: 'minor' },
  'vii°': { degree: 11, quality: 'diminished' },
  viio: { degree: 11, quality: 'diminished' },
  // Flat variations (borrowed chords)
  bII: { degree: 1, quality: 'major' },
  'bII°': { degree: 1, quality: 'diminished' },
  'bII+': { degree: 1, quality: 'augmented' },
  biii: { degree: 3, quality: 'minor' },
  bIII: { degree: 3, quality: 'major' },
  'bIII+': { degree: 3, quality: 'augmented' },
  bVI: { degree: 8, quality: 'major' },
  bvi: { degree: 8, quality: 'minor' },
  'bVI+': { degree: 8, quality: 'augmented' },
  bVII: { degree: 10, quality: 'major' },
  bvii: { degree: 10, quality: 'minor' },
  'bVII+': { degree: 10, quality: 'augmented' },
};

// Generate unique ID
function generateId(): string {
  return `prog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Parse a root note from string (C, C#, Db, etc.)
function parseRoot(str: string): Note | null {
  const match = str.match(/^([A-Ga-g])([#b]?)$/);
  if (!match) return null;
  const natural = match[1].toUpperCase() as Note['natural'];
  const accidental = (match[2] || '') as Note['accidental'];
  return { natural, accidental };
}

// Parse a chord quality from string
function parseChordQuality(
  str: string
): 'major' | 'minor' | 'diminished' | 'augmented' | 'dominant7' | 'major7' | 'minor7' | null {
  // Case-sensitive checks first (M = major, Δ = major7)
  const raw = str.replace(/♯/g, '#').replace(/♭/g, 'b');
  if (raw === 'M7' || raw === 'Δ7' || raw === 'Δ') return 'major7';

  // Now lowercase for case-insensitive matching
  const s = raw.toLowerCase();
  if (s === '' || s === 'maj') return 'major';
  if (s === 'm' || s === 'min' || s === 'minor') return 'minor';
  if (s === 'dim' || s === '°' || s === 'o') return 'diminished';
  if (s === 'aug' || s === '+') return 'augmented';
  if (s === '7' || s === 'dom7') return 'dominant7';
  if (s === 'maj7') return 'major7';
  if (s === 'm7' || s === 'min7') return 'minor7';
  return null;
}

// Parse a single chord string (e.g., "Am", "F#m7", "Cmaj7")
function parseChordString(str: string): Chord | null {
  // Match root note followed by optional quality
  const match = str.match(/^([A-Ga-g][#b]?)(.*)$/);
  if (!match) return null;

  const root = parseRoot(match[1]);
  if (!root) return null;

  const qualityStr = match[2];
  const quality = parseChordQuality(qualityStr) || 'major';

  return buildChord(root, quality);
}

// Helper to calculate the correct accidental for a pitch class given a natural letter
function getAccidentalForPitch(
  targetPitchClass: number,
  naturalLetter: Note['natural']
): Note['accidental'] {
  const basePitchClass = NATURAL_TO_PITCH_CLASS[naturalLetter];
  const diff = (targetPitchClass - basePitchClass + 12) % 12;

  if (diff === 0) return '';
  if (diff === 1) return '#';
  if (diff === 11) return 'b';
  if (diff === 2) return '##';
  if (diff === 10) return 'bb';
  // Fallback for unusual cases
  return diff > 6 ? 'b' : '#';
}

// Convert a roman numeral to a chord in a given key
function romanNumeralToChord(
  numeral: string,
  keyRoot: Note,
  keyMode: 'major' | 'minor'
): Chord | null {
  // Clean up the numeral
  const cleanNumeral = numeral.replace(/\s/g, '');

  // Look up the numeral
  const info = MAJOR_KEY_NUMERALS[cleanNumeral];
  if (!info) return null;

  // Calculate the root pitch class
  const scale = buildScale(keyRoot, keyMode === 'major' ? 'major' : 'natural_minor');

  // Map semitone degrees to scale indices for diatonic chords
  const degreeMap: Record<number, number> = {
    0: 0, // I
    2: 1, // II
    4: 2, // III
    5: 3, // IV
    7: 4, // V
    9: 5, // VI
    11: 6, // VII
  };

  const scaleIndex = degreeMap[info.degree];

  if (scaleIndex === undefined) {
    // Handle flat numerals (bII, bIII, bVI, bVII)
    // Map flat numeral semitone offsets to their base degree letter index
    const flatDegreeMap: Record<number, number> = {
      1: 1, // bII - uses 2nd degree letter
      3: 2, // bIII - uses 3rd degree letter
      8: 5, // bVI - uses 6th degree letter
      10: 6, // bVII - uses 7th degree letter
    };

    const letterIndex = flatDegreeMap[info.degree];
    if (letterIndex === undefined) {
      // Unknown flat numeral, fall back
      return buildChord(keyRoot, info.quality);
    }

    // Get the natural letter for this degree from the key root
    const naturalLetter = getNaturalAtInterval(keyRoot.natural, letterIndex);

    // Calculate target pitch class
    const keyRootPc = getPitchClass(keyRoot);
    const targetPitchClass = (keyRootPc + info.degree) % 12;

    // Get the correct accidental
    const accidental = getAccidentalForPitch(targetPitchClass, naturalLetter);

    const chordRoot: Note = { natural: naturalLetter, accidental };
    return buildChord(chordRoot, info.quality);
  }

  const chordRoot = scale.notes[scaleIndex];
  if (!chordRoot) return null;

  return buildChord(chordRoot, info.quality);
}

// Check if the query matches a named progression pattern
function matchNamedProgression(
  query: string,
  keyRoot: Note,
  keyMode: 'major' | 'minor'
): CustomProgressionCardData | null {
  const lowerQuery = query.toLowerCase();

  for (const pattern of PROGRESSION_PATTERNS) {
    // Check if query mentions this pattern
    const patternNameLower = pattern.name.toLowerCase();
    const descriptionLower = pattern.description.toLowerCase();

    if (
      lowerQuery.includes(patternNameLower) ||
      lowerQuery.includes(descriptionLower) ||
      (lowerQuery.includes('pop') && pattern.name === 'I-V-vi-IV') ||
      (lowerQuery.includes('jazz') && pattern.name === 'ii-V-I') ||
      (lowerQuery.includes('cadence') && pattern.name.includes('V-I'))
    ) {
      // Build the chords for this pattern in the given key
      const chords: Chord[] = [];
      for (const numeral of pattern.numerals) {
        const chord = romanNumeralToChord(numeral, keyRoot, keyMode);
        if (chord) {
          chords.push(chord);
        }
      }

      if (chords.length > 0) {
        return {
          id: generateId(),
          type: 'customProgression',
          chords,
          romanNumerals: pattern.numerals,
          key: keyRoot,
          keyMode,
          originalQuery: query,
        };
      }
    }
  }

  return null;
}

// Parse the key specification from query (e.g., "in G", "in C minor", "key of Bb")
function parseKeyFromQuery(query: string): { root: Note; mode: 'major' | 'minor' } | null {
  // Match "in [note]" or "in [note] [mode]" or "key of [note]"
  const keyMatch = query.match(/(?:in|key\s+of)\s+([A-Ga-g][#b]?)\s*(major|minor|maj|min|m)?/i);

  if (keyMatch) {
    const root = parseRoot(keyMatch[1]);
    if (!root) return null;

    const modeStr = keyMatch[2]?.toLowerCase() || '';
    const mode: 'major' | 'minor' =
      modeStr === 'minor' || modeStr === 'min' || modeStr === 'm' ? 'minor' : 'major';

    return { root, mode };
  }

  return null;
}

// Main progression parser function
export function parseProgressionQuery(query: string): CustomProgressionCardData | null {
  if (!query || query.trim().length < 2) return null;

  const trimmedQuery = query.trim();

  // Parse key from query (default to C major if not specified)
  const keyInfo = parseKeyFromQuery(trimmedQuery);
  const keyRoot = keyInfo?.root || { natural: 'C' as const, accidental: '' as const };
  const keyMode = keyInfo?.mode || 'major';

  // Extract just the numeral part (before "in")
  const numeralPart = trimmedQuery.replace(/\s+in\s+.*$/i, '').trim();

  // Check if input looks like roman numerals (starts with i, v, I, V, or b for flat)
  // Use a permissive check and let the actual parsing validate
  const looksLikeRomanNumerals = /^[ivIVb]/.test(numeralPart);

  if (looksLikeRomanNumerals) {
    // Split on spaces, dashes, or commas
    const numerals = numeralPart.split(/[\s\-–,]+/).filter((n) => n.length > 0);

    if (numerals.length >= 2) {
      const chords: Chord[] = [];
      const cleanNumerals: string[] = [];

      for (const numeral of numerals) {
        const chord = romanNumeralToChord(numeral, keyRoot, keyMode);
        if (chord) {
          chords.push(chord);
          cleanNumerals.push(numeral);
        }
      }

      // Only return if we parsed at least 2 valid roman numerals
      if (chords.length >= 2) {
        return {
          id: generateId(),
          type: 'customProgression',
          chords,
          romanNumerals: cleanNumerals,
          key: keyRoot,
          keyMode,
          originalQuery: query,
        };
      }
    }
  }

  // Check for chord sequence pattern: "Am F C G" or "Am-F-C-G"
  const chordPattern = /^([A-Ga-g][#b]?(?:m|maj|min|dim|aug|7|maj7|m7)?(?:\s*[-–,\s]\s*)?)+$/i;

  if (chordPattern.test(trimmedQuery)) {
    // Split on spaces, dashes, or commas
    const chordStrings = trimmedQuery.split(/[\s\-–,]+/).filter((s) => s.length > 0);

    if (chordStrings.length >= 2) {
      const chords: Chord[] = [];

      for (const chordStr of chordStrings) {
        const chord = parseChordString(chordStr);
        if (chord) {
          chords.push(chord);
        }
      }

      if (chords.length >= 2) {
        return {
          id: generateId(),
          type: 'customProgression',
          chords,
          originalQuery: query,
        };
      }
    }
  }

  // Check for named progression patterns
  const namedResult = matchNamedProgression(trimmedQuery, keyRoot, keyMode);
  if (namedResult) {
    return namedResult;
  }

  return null;
}
