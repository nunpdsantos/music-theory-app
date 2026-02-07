/**
 * Music Theory Normalizers
 *
 * Canonical normalization functions for converting user input strings
 * into typed music theory values (ChordQuality, ScaleType, ModeName).
 *
 * These handle natural language, abbreviations, alternate spellings,
 * and unicode symbols (♯, ♭). Each normalizer maps a broad set of
 * input variations to a single canonical type.
 */

import { ChordQuality, ScaleType, ModeName } from '../types/music';

// ============================================================================
// Note String Normalization
// ============================================================================

/**
 * Normalize a note string — handles "C flat", "C-flat", "Cflat", "cb",
 * "C#", "c sharp", etc. Returns uppercase letter + lowercase accidental.
 */
export function normalizeNoteString(input: string): string {
  let str = input.trim();

  // Handle spelled-out accidentals
  str = str.replace(/[\s-]?flat/gi, 'b');
  str = str.replace(/[\s-]?sharp/gi, '#');

  // Uppercase the letter, keep accidentals
  if (str.length >= 1) {
    str = str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  // Handle double accidentals
  str = str.replace(/bb/g, 'bb').replace(/##/g, '##');

  return str;
}

// ============================================================================
// Chord Quality Normalization
// ============================================================================

/**
 * Normalize a chord quality string to a canonical ChordQuality value.
 * Handles natural language ("major 7", "half diminished"), abbreviations
 * ("maj7", "m7b5"), and symbols ("ø", "+", "°").
 */
export function normalizeChordQuality(quality: string): ChordQuality {
  const normalized = quality.toLowerCase().replace(/[_\s-]/g, '');

  const mappings: Record<string, ChordQuality> = {
    major: 'major',
    maj: 'major',
    '': 'major',
    minor: 'minor',
    min: 'minor',
    m: 'minor',
    diminished: 'diminished',
    dim: 'diminished',
    augmented: 'augmented',
    aug: 'augmented',
    // 6th chords
    '6': 'major6',
    major6: 'major6',
    maj6: 'major6',
    minor6: 'minor6',
    m6: 'minor6',
    min6: 'minor6',
    // 7th chords
    major7: 'major7',
    maj7: 'major7',
    minor7: 'minor7',
    min7: 'minor7',
    m7: 'minor7',
    dominant7: 'dominant7',
    dom7: 'dominant7',
    '7': 'dominant7',
    diminished7: 'diminished7',
    dim7: 'diminished7',
    // Half-diminished / m7b5
    halfdiminished7: 'half_diminished7',
    halfdiminished: 'half_diminished7',
    halfdim7: 'half_diminished7',
    halfdim: 'half_diminished7',
    m7b5: 'half_diminished7',
    min7b5: 'half_diminished7',
    minor7b5: 'half_diminished7',
    m7flat5: 'half_diminished7',
    min7flat5: 'half_diminished7',
    minor7flat5: 'half_diminished7',
    ø: 'half_diminished7',
    ø7: 'half_diminished7',
    augmented7: 'augmented7',
    aug7: 'augmented7',
    // Suspended chords
    sus2: 'sus2',
    sus4: 'sus4',
    sus: 'sus4',
    // Add chords
    add9: 'add9',
    add2: 'add9',
    // Minor-Major 7
    minormajor7: 'minor_major7',
    minmaj7: 'minor_major7',
    mmaj7: 'minor_major7',
    mm7: 'minor_major7',
    minormaj7: 'minor_major7',
    minmajor7: 'minor_major7',
    'm(maj7)': 'minor_major7',
    'min(maj7)': 'minor_major7',
    'minor(maj7)': 'minor_major7',
    mM7: 'minor_major7',
    // Power chord
    power: 'power',
    powerchord: 'power',
    '5': 'power',
    // Suspended dominant
    dominant7sus4: 'dominant7sus4',
    '7sus4': 'dominant7sus4',
    '7sus': 'dominant7sus4',
    // 9th chords
    major9: 'major9',
    maj9: 'major9',
    minor9: 'minor9',
    min9: 'minor9',
    m9: 'minor9',
    dominant9: 'dominant9',
    dom9: 'dominant9',
    '9': 'dominant9',
    // Altered Dominants
    dominant7flat9: 'dominant7flat9',
    dom7b9: 'dominant7flat9',
    '7b9': 'dominant7flat9',
    dominant7sharp9: 'dominant7sharp9',
    dom7sharp9: 'dominant7sharp9',
    '7#9': 'dominant7sharp9',
    dominant7flat5: 'dominant7flat5',
    dom7b5: 'dominant7flat5',
    '7b5': 'dominant7flat5',
    dominant7sharp5: 'dominant7sharp5',
    dom7sharp5: 'dominant7sharp5',
    '7#5': 'dominant7sharp5',
    dominant7alt: 'dominant7alt',
    '7alt': 'dominant7alt',
    altered: 'dominant7alt',
    altereddom: 'dominant7alt',
    altereddominant: 'dominant7alt',
    // Extended 11th chords
    dominant11: 'dominant11',
    dom11: 'dominant11',
    '11': 'dominant11',
    major11: 'major11',
    maj11: 'major11',
    minor11: 'minor11',
    min11: 'minor11',
    m11: 'minor11',
    dominant9sharp11: 'dominant9sharp11',
    '9#11': 'dominant9sharp11',
    // Extended 13th chords
    dominant13: 'dominant13',
    dom13: 'dominant13',
    '13': 'dominant13',
    major13: 'major13',
    maj13: 'major13',
    minor13: 'minor13',
    min13: 'minor13',
    m13: 'minor13',
    dominant13flat9: 'dominant13flat9',
    '13b9': 'dominant13flat9',
    // Added tones
    add11: 'add11',
    sixnine: 'six_nine',
    '69': 'six_nine',
    minorsixnine: 'minor_six_nine',
    m69: 'minor_six_nine',
    // Additional suspensions
    dominant9sus4: 'dominant9sus4',
    '9sus4': 'dominant9sus4',
    '9sus': 'dominant9sus4',
    sus2sus4: 'sus2sus4',
    // Major 7 altered
    augmentedmajor7: 'augmented_major7',
    maj7sharp5: 'augmented_major7',
    // Diminished major 7
    diminishedmajor7: 'diminished_major7',
    dimmaj7: 'diminished_major7',
    'dim(maj7)': 'diminished_major7',
    major7flat5: 'major7flat5',
    maj7b5: 'major7flat5',
  };

  return mappings[normalized] || 'major';
}

// ============================================================================
// Scale Type Normalization
// ============================================================================

/**
 * Normalize a scale type string to a canonical ScaleType value.
 * Handles alternate names ("aeolian" → "natural_minor", "ionian" → "major"),
 * compound names ("harmonic minor", "lydian dominant"), and world scale names
 * ("byzantine" → "double_harmonic", "gypsy minor" → "hungarian_minor").
 */
export function normalizeScaleType(type: string): ScaleType {
  const normalized = type.toLowerCase().replace(/[_\s-]/g, '_');

  const mappings: Record<string, ScaleType> = {
    major: 'major',
    minor: 'natural_minor',
    natural_minor: 'natural_minor',
    harmonic_minor: 'harmonic_minor',
    melodic_minor: 'melodic_minor',
    dorian: 'dorian',
    phrygian: 'phrygian',
    lydian: 'lydian',
    mixolydian: 'mixolydian',
    locrian: 'locrian',
    aeolian: 'natural_minor',
    ionian: 'major',
    // Pentatonic
    pentatonic: 'pentatonic_major',
    pentatonic_major: 'pentatonic_major',
    major_pentatonic: 'pentatonic_major',
    pentatonic_minor: 'pentatonic_minor',
    minor_pentatonic: 'pentatonic_minor',
    blues: 'blues',
    // Symmetric and chromatic
    whole_tone: 'whole_tone',
    wholetone: 'whole_tone',
    diminished: 'diminished_whole_half',
    diminished_whole_half: 'diminished_whole_half',
    diminished_half_whole: 'diminished_half_whole',
    octatonic: 'diminished_whole_half',
    chromatic: 'chromatic',
    // Altered / Super Locrian
    altered: 'altered',
    superlocrian: 'altered',
    super_locrian: 'altered',
    diminished_whole_tone: 'altered',
    // Lydian Dominant
    lydian_dominant: 'lydian_dominant',
    lydiandominant: 'lydian_dominant',
    lydian_b7: 'lydian_dominant',
    overtone: 'lydian_dominant',
    overtone_scale: 'lydian_dominant',
    acoustic: 'lydian_dominant',
    acoustic_scale: 'lydian_dominant',
    // Phrygian Dominant
    phrygian_dominant: 'phrygian_dominant',
    phrygiandominant: 'phrygian_dominant',
    spanish: 'phrygian_dominant',
    spanish_phrygian: 'phrygian_dominant',
    freygish: 'phrygian_dominant',
    jewish: 'phrygian_dominant',
    jewish_scale: 'phrygian_dominant',
    hijaz: 'phrygian_dominant',
    // Major Blues
    major_blues: 'major_blues',
    majorblues: 'major_blues',
    blues_major: 'major_blues',
    // Locrian Natural 2
    locrian_natural2: 'locrian_natural2',
    locrian_natural_2: 'locrian_natural2',
    'locrian_#2': 'locrian_natural2',
    'locrian#2': 'locrian_natural2',
    half_diminished: 'locrian_natural2',
    halfdiminished: 'locrian_natural2',
    half_diminished_scale: 'locrian_natural2',
    // Bebop scales
    bebop_dominant: 'bebop_dominant',
    bebopdominant: 'bebop_dominant',
    bebop_mixolydian: 'bebop_dominant',
    dominant_bebop: 'bebop_dominant',
    bebop_major: 'bebop_major',
    bebopmajor: 'bebop_major',
    major_bebop: 'bebop_major',
    bebop_dorian: 'bebop_dorian',
    bebopdorian: 'bebop_dorian',
    bebop_minor: 'bebop_dorian',
    bebopminor: 'bebop_dorian',
    minor_bebop: 'bebop_dorian',
    // Melodic minor modes
    dorian_b2: 'dorian_b2',
    dorianb2: 'dorian_b2',
    dorian_flat2: 'dorian_b2',
    'phrygian_#6': 'dorian_b2',
    'phrygian#6': 'dorian_b2',
    javanese: 'dorian_b2',
    assyrian: 'dorian_b2',
    lydian_augmented: 'lydian_augmented',
    lydianaugmented: 'lydian_augmented',
    'lydian_#5': 'lydian_augmented',
    'lydian#5': 'lydian_augmented',
    mixolydian_b6: 'mixolydian_b6',
    mixolydianb6: 'mixolydian_b6',
    mixolydian_flat6: 'mixolydian_b6',
    mixolydian_b13: 'mixolydian_b6',
    mixolydianb13: 'mixolydian_b6',
    hindu: 'mixolydian_b6',
    hindu_scale: 'mixolydian_b6',
    aeolian_dominant: 'mixolydian_b6',
    // World/Ethnic scales
    hungarian_minor: 'hungarian_minor',
    hungarianminor: 'hungarian_minor',
    gypsy_minor: 'hungarian_minor',
    gypsyminor: 'hungarian_minor',
    double_harmonic_minor: 'hungarian_minor',
    hungarian_major: 'hungarian_major',
    hungarianmajor: 'hungarian_major',
    double_harmonic: 'double_harmonic',
    doubleharmonic: 'double_harmonic',
    byzantine: 'double_harmonic',
    byzantine_scale: 'double_harmonic',
    arabic: 'double_harmonic',
    arabic_scale: 'double_harmonic',
    gypsy_major: 'double_harmonic',
    gypsymajor: 'double_harmonic',
    hijaz_kar: 'double_harmonic',
    hijazkar: 'double_harmonic',
    persian: 'persian',
    persian_scale: 'persian',
    neapolitan_minor: 'neapolitan_minor',
    neapolitanminor: 'neapolitan_minor',
    neapolitan_major: 'neapolitan_major',
    neapolitanmajor: 'neapolitan_major',
    // Japanese
    hirajoshi: 'hirajoshi',
    hirajoshi_scale: 'hirajoshi',
    in_sen: 'in_sen',
    insen: 'in_sen',
    iwato: 'iwato',
    iwato_scale: 'iwato',
    // Egyptian
    egyptian: 'egyptian',
    egyptian_scale: 'egyptian',
    suspended_pentatonic: 'egyptian',
    suspendedpentatonic: 'egyptian',
  };

  return mappings[normalized] || 'major';
}

// ============================================================================
// Mode Name Normalization
// ============================================================================

/**
 * Normalize a mode name string to a canonical ModeName value.
 */
export function normalizeModeName(mode: string): ModeName {
  const normalized = mode.toLowerCase().replace(/[_\s-]/g, '');

  const mappings: Record<string, ModeName> = {
    ionian: 'ionian',
    major: 'ionian',
    dorian: 'dorian',
    phrygian: 'phrygian',
    lydian: 'lydian',
    mixolydian: 'mixolydian',
    aeolian: 'aeolian',
    naturalminor: 'aeolian',
    minor: 'aeolian',
    locrian: 'locrian',
  };

  return mappings[normalized] || 'ionian';
}
