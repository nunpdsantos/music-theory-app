// Map scale types to guitar pattern types
// Used by GuitarStrip to determine which pattern diagram to show

export const GUITAR_SCALE_TYPE_MAP: Record<string, string> = {
  // Core scales
  pentatonic_minor: 'pentatonic_minor',
  pentatonic_major: 'pentatonic_major',
  blues: 'blues',
  major: 'major',
  natural_minor: 'natural_minor',

  // Modes
  dorian: 'dorian',
  phrygian: 'phrygian',
  lydian: 'lydian',
  mixolydian: 'mixolydian',
  locrian: 'locrian',
  ionian: 'major',
  aeolian: 'natural_minor',

  // Additional scales
  harmonic_minor: 'harmonic_minor',
  melodic_minor: 'melodic_minor',
  whole_tone: 'whole_tone',
  diminished_half_whole: 'diminished_half_whole',
  diminished_whole_half: 'diminished_whole_half',
  chromatic: 'chromatic',
  altered: 'altered',
  lydian_dominant: 'lydian_dominant',
  phrygian_dominant: 'phrygian_dominant',
  major_blues: 'major_blues',
  locrian_natural2: 'locrian_natural2',

  // Bebop scales
  bebop_dominant: 'bebop_dominant',
  bebop_major: 'bebop_major',
  bebop_dorian: 'bebop_dorian',

  // Melodic minor modes
  dorian_b2: 'dorian_b2',
  lydian_augmented: 'lydian_augmented',
  mixolydian_b6: 'mixolydian_b6',

  // World/Ethnic scales
  hungarian_minor: 'hungarian_minor',
  hungarian_major: 'hungarian_major',
  double_harmonic: 'double_harmonic',
  persian: 'persian',
  neapolitan_minor: 'neapolitan_minor',
  neapolitan_major: 'neapolitan_major',

  // Japanese pentatonics
  hirajoshi: 'hirajoshi',
  in_sen: 'in_sen',
  iwato: 'iwato',
  egyptian: 'egyptian',
};

// Get guitar scale type, returns null if not supported
export function getGuitarScaleType(scaleType: string): string | null {
  return GUITAR_SCALE_TYPE_MAP[scaleType] || null;
}
