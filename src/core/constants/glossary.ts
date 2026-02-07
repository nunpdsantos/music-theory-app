/**
 * Music Theory Glossary
 *
 * Short, beginner-friendly definitions for theory terms displayed across cards.
 * Used by the TheoryTerm tooltip component.
 */

export const THEORY_GLOSSARY: Record<string, string> = {
  // Modes - with "try it" suggestions
  ionian: 'The standard major scale pattern. Bright, happy, and stable. Try: "C ionian"',
  dorian: 'A minor scale with a bright 6th. Common in jazz, funk, and blues. Try: "D dorian"',
  phrygian: 'A minor scale with a dark, Spanish-sounding flat 2nd. Try: "E phrygian"',
  lydian: 'A major scale with a dreamy, floating raised 4th. Try: "F lydian"',
  mixolydian: 'A major scale with a flat 7th. The classic blues/rock sound. Try: "G mixolydian"',
  aeolian: 'The natural minor scale. Sad, dark, and introspective. Try: "A aeolian"',
  locrian:
    'The darkest mode with a flat 2nd and flat 5th. Rarely used as a key center. Try: "B locrian"',

  // Scale types - with examples
  major: 'The most common scale in Western music. Sounds happy and resolved. Try: "C major scale"',
  minor: 'The second most common scale. Sounds sad, dark, or moody. Try: "A minor scale"',
  'natural minor': 'The basic minor scale, same as Aeolian mode. Try: "A natural minor"',
  'harmonic minor':
    'Minor scale with a raised 7th, creating a dramatic leading tone. Try: "A harmonic minor"',
  'melodic minor': 'Minor scale with raised 6th and 7th when ascending. Try: "A melodic minor"',
  pentatonic:
    'A five-note scale. Very common in rock, blues, pop, and folk music. Try: "C pentatonic"',
  'major pentatonic':
    'Five notes from the major scale. Sounds bright and open. Try: "C major pentatonic"',
  'pentatonic major':
    'Five notes from the major scale. Sounds bright and open. Try: "C major pentatonic"',
  'minor pentatonic':
    'Five notes from the minor scale. The go-to for rock and blues soloing. Try: "A minor pentatonic"',
  'pentatonic minor':
    'Five notes from the minor scale. The go-to for rock and blues soloing. Try: "A minor pentatonic"',
  blues:
    'The minor pentatonic with an added "blue note" (flat 5th). Sounds gritty. Try: "A blues scale"',
  chromatic: 'All twelve notes in order, each a half step apart.',
  'whole tone': 'A scale of whole steps only. Sounds dreamy and ambiguous. Try: "C whole tone"',
  diminished: 'Alternating half and whole steps. Creates tension and mystery. Try: "C diminished"',
  'diminished whole half': 'Alternating whole and half steps. Creates tension and mystery.',
  'diminished half whole': 'Alternating half and whole steps. A dominant diminished sound.',
  'altered scale':
    'A scale with every possible alteration. Used over dominant 7th chords in jazz. Try: "G altered"',
  bebop: 'A jazz scale with an added passing tone for smooth eighth-note lines. Try: "C bebop"',
  'lydian dominant': 'Mixolydian with a raised 4th. Bright and jazzy. Try: "G lydian dominant"',
  'phrygian dominant':
    'Phrygian with a major 3rd. Common in flamenco and Middle Eastern music. Try: "E phrygian dominant"',
  'major blues': 'The major pentatonic with an added flat 3rd "blue note." Try: "C major blues"',

  // Chord qualities - with examples
  'major chord':
    'A bright, stable, happy-sounding chord built from the 1st, 3rd, and 5th. Try: "C"',
  'minor chord': 'A darker, sadder chord with a lowered 3rd. Try: "Am"',
  'diminished chord': 'A tense, unstable chord with a lowered 3rd and 5th. Try: "Bdim"',
  'augmented chord': 'A dreamy, unsettled chord with a raised 5th. Try: "Caug"',
  'dominant 7th': 'A major chord with a flat 7th. Creates tension that wants to resolve. Try: "G7"',
  'major 7th': 'A lush, jazzy chord that adds the major 7th to a major triad. Try: "Cmaj7"',
  'minor 7th': 'A warm, mellow chord. Adds a flat 7th to a minor triad. Try: "Am7"',
  suspended:
    'A chord where the 3rd is replaced by the 2nd or 4th, creating an open sound. Try: "Csus4"',

  // General theory terms - with context
  diatonic:
    'Notes or chords that belong to the current key. "In key" notes. See a key to view its diatonic chords.',
  enharmonic:
    'Two names for the same pitch (e.g., C# and Db are the same note). Same key on piano, different spelling.',
  interval:
    'The distance between two notes, measured in half steps or scale degrees. Try Ear Training to practice!',
  tritone:
    'An interval of three whole steps (6 semitones). Sounds tense and unstable. The "devil\'s interval."',
  inversion:
    'Rearranging chord notes so a different note is on the bottom. Click the dots on any chord card to hear inversions.',
  'relative major':
    'The major key that shares all the same notes as a minor key. A minor → C major.',
  'relative minor':
    'The minor key that shares all the same notes as a major key. C major → A minor.',
  'parallel major':
    'The major key with the same root note. C minor → C major (same root, different notes).',
  'parallel minor':
    'The minor key with the same root note. C major → C minor (same root, different notes).',
  tonic: 'The home note or chord of a key. Feels like "home base." The I chord.',
  subdominant: 'The 4th degree of a scale. Creates pull toward the dominant. The IV chord.',
  dominant: 'The 5th degree of a scale. Creates strong pull back to the tonic. The V chord.',
  'circle of fifths':
    'A diagram showing how all 12 keys relate to each other by fifths. Try "Circle of 5ths" in Explore!',
  'chord progression':
    'A sequence of chords played in order. Try "I IV V I in C" or use the Progression Builder!',
  'roman numerals':
    'A system for labeling chords by their position in a key. Uppercase = major, lowercase = minor.',
  voicing:
    'The specific arrangement and spacing of notes in a chord. Open voicings spread notes across octaves.',
  'slash chord':
    'A chord with a different bass note than its root. Try: "C/E" (C chord with E in the bass).',
  improvisation:
    'Creating music spontaneously over a chord progression. Match scales to chord qualities!',
  'scale degree':
    "A note's position within a scale, numbered 1 through 7. The 5th degree is the dominant.",
};

/**
 * Look up a term in the glossary (case-insensitive).
 * Tries exact match first, then with underscores replaced by spaces.
 * Returns the definition or undefined if not found.
 */
export function getTermDefinition(term: string): string | undefined {
  const key = term.toLowerCase();
  return THEORY_GLOSSARY[key] ?? THEORY_GLOSSARY[key.replace(/_/g, ' ')];
}
