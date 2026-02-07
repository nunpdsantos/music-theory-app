/**
 * Educational Content
 *
 * Shared tooltip and display-name functions for music theory UI components.
 * These provide educational context for intervals, scale degrees, and
 * roman numeral chord labels across ChordCard, ScaleBlock, ModeCard,
 * and KeyCard.
 */

// ============================================================================
// Interval Tooltips & Names
// ============================================================================

/** Educational tooltip for interval abbreviations (R, m3, P5, etc.) */
export function getIntervalTooltip(label: string): string {
  const tooltips: Record<string, string> = {
    R: 'Root - the note the chord is named after',
    '3': 'Major 3rd - defines the major quality, creates a bright sound',
    m3: 'Minor 3rd - defines the minor quality, creates a darker sound',
    b3: 'Minor 3rd - defines the minor quality, creates a darker sound',
    '5': 'Perfect 5th - adds stability and power to the chord',
    b5: 'Diminished 5th - creates tension and instability',
    '#5': 'Augmented 5th - creates an unsettled, dreamy quality',
    '7': 'Major 7th - adds richness and sophistication',
    b7: 'Minor 7th - creates the dominant or bluesy sound',
    '6': 'Major 6th - adds color and warmth',
    '2': 'Major 2nd - suspended note, creates openness',
    '4': 'Perfect 4th - suspended note, creates tension wanting to resolve',
    '9': 'Major 9th - extension that adds color (same as 2nd, octave higher)',
  };
  return tooltips[label] || `Interval: ${label}`;
}

/** Full interval name for display (R -> Root, m3 -> Min 3rd, etc.) */
export function getIntervalFullName(label: string): string {
  const fullNames: Record<string, string> = {
    R: 'Root',
    '3': 'Maj 3rd',
    m3: 'Min 3rd',
    b3: 'Min 3rd',
    '5': '5th',
    b5: 'Dim 5th',
    '#5': 'Aug 5th',
    '7': 'Maj 7th',
    b7: 'Min 7th',
    '6': '6th',
    '2': '2nd',
    '4': '4th',
    '9': '9th',
  };
  return fullNames[label] || label;
}

// ============================================================================
// Scale Degree Tooltips
// ============================================================================

/** Educational tooltip for scale degrees 1-8 */
export function getScaleDegreeTooltip(degree: number): string {
  const tooltips: Record<number, string> = {
    1: '1st degree (Tonic) - The home base, most stable note of the scale',
    2: '2nd degree (Supertonic) - One step above tonic, wants to move',
    3: '3rd degree (Mediant) - Defines major/minor quality of the scale',
    4: '4th degree (Subdominant) - Creates pull toward the dominant',
    5: '5th degree (Dominant) - Second most important, wants to resolve to tonic',
    6: '6th degree (Submediant) - Adds color, often used in minor keys',
    7: '7th degree (Leading Tone) - Strong pull to resolve up to tonic',
    8: '8th degree (Octave) - Same as tonic, one octave higher',
  };
  return tooltips[degree] || `Scale degree ${degree}`;
}

// ============================================================================
// Roman Numeral Tooltips
// ============================================================================

/** Educational tooltip for roman numeral chord labels (I, ii, V, vii°, etc.) */
export function getRomanNumeralTooltip(numeral: string): string {
  const isMinor = numeral === numeral.toLowerCase();
  const isDiminished = numeral.includes('\u00b0') || numeral.includes('\u00B0');
  const isAugmented = numeral.includes('+');

  let explanation = isMinor ? 'Minor chord' : 'Major chord';
  if (isDiminished) explanation = 'Diminished chord';
  if (isAugmented) explanation = 'Augmented chord';

  return `${explanation} built on this scale degree. Uppercase = major, lowercase = minor`;
}
