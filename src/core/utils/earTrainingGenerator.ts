// earTrainingGenerator.ts — Pure functions for generating ear training exercises

import { Note, ChordQuality, ScaleType } from '../types/music';
import { INTERVAL_LABELS, CHORD_QUALITY_NAMES, buildChord } from '../constants/chords';
import { PITCH_CLASS_SPELLINGS } from '../constants/notes';
import { buildScale, SCALE_TYPE_NAMES } from '../constants/scales';

// ============================================================================
// Types
// ============================================================================

export interface IntervalExercise {
  rootNote: Note;
  rootOctave: number;
  targetNote: Note;
  targetOctave: number;
  intervalSemitones: number; // 1-12
  intervalName: string;
}

export interface ChordExercise {
  rootNote: Note;
  rootOctave: number;
  quality: ChordQuality;
  qualityName: string;
  notes: Note[];
}

export interface ScaleExercise {
  rootNote: Note;
  rootOctave: number;
  scaleType: ScaleType;
  scaleName: string;
  notes: Note[];
}

export interface AnswerOption {
  label: string;
  value: string;
  correct: boolean;
}

export interface SessionStats {
  total: number;
  correct: number;
  streak: number;
  bestStreak: number;
}

export type ChordDifficulty = 'basic' | 'intermediate' | 'advanced';
export type ScaleDifficulty = 'basic' | 'intermediate' | 'advanced';

// ============================================================================
// Constants
// ============================================================================

/**
 * Educational explanations for each interval.
 * Used to provide feedback when users answer incorrectly.
 */
export const INTERVAL_EXPLANATIONS: Record<
  number,
  { name: string; character: string; tip: string }
> = {
  1: {
    name: 'Minor 2nd',
    character: 'Dissonant, tense — the smallest interval. Think "Jaws" theme.',
    tip: 'Very close together, almost rubbing against each other.',
  },
  2: {
    name: 'Major 2nd',
    character: 'Bright step — the basic whole step in melodies.',
    tip: 'A comfortable step up, like the start of a major scale.',
  },
  3: {
    name: 'Minor 3rd',
    character: 'Sad, dark — the interval that makes chords sound minor.',
    tip: 'Has a melancholic quality. Think of minor chord arpeggios.',
  },
  4: {
    name: 'Major 3rd',
    character: 'Happy, bright — the interval that makes chords sound major.',
    tip: 'Warm and stable. Think of the first two notes of "Oh! Susanna".',
  },
  5: {
    name: 'Perfect 4th',
    character: 'Open, suspended — creates a floating, unresolved feeling.',
    tip: 'Strong but wants to resolve. "Here Comes the Bride" starts with this.',
  },
  6: {
    name: 'Tritone',
    character: 'Unstable, tense — the "devil\'s interval." Extremely dissonant.',
    tip: 'Creates strong tension. The first two notes of "The Simpsons" theme.',
  },
  7: {
    name: 'Perfect 5th',
    character: 'Strong, stable — the most consonant interval after the octave.',
    tip: 'Open and powerful. "Twinkle Twinkle Little Star" starts with this.',
  },
  8: {
    name: 'Minor 6th',
    character: 'Bittersweet, wide — has a longing quality.',
    tip: 'Wide and expressive. Common in romantic melodies.',
  },
  9: {
    name: 'Major 6th',
    character: 'Warm, nostalgic — a pleasant, wide interval.',
    tip: 'Think "My Bonnie Lies Over the Ocean" (My Bon-nie).',
  },
  10: {
    name: 'Minor 7th',
    character: 'Bluesy, jazzy — wants to resolve down by a step.',
    tip: 'Has tension but is softer than a major 7th.',
  },
  11: {
    name: 'Major 7th',
    character: 'Dreamy, tense — very close to the octave but not quite there.',
    tip: 'Almost an octave but with a strong pull. Very dissonant.',
  },
  12: {
    name: 'Octave',
    character: 'Perfect unity — the same note, one register higher.',
    tip: 'Sounds like the same note at different heights. "Somewhere Over the Rainbow".',
  },
};

/**
 * Educational explanations for each chord quality.
 * Used to provide feedback when users answer incorrectly.
 */
export const CHORD_EXPLANATIONS: Record<
  string,
  { character: string; intervals: string; tip: string }
> = {
  major: {
    character: 'Bright, happy, stable',
    intervals: 'Root + major 3rd + perfect 5th',
    tip: 'The major 3rd gives it a happy sound.',
  },
  minor: {
    character: 'Dark, sad, introspective',
    intervals: 'Root + minor 3rd + perfect 5th',
    tip: 'The lowered 3rd creates the darker mood.',
  },
  diminished: {
    character: 'Tense, unstable, spooky',
    intervals: 'Root + minor 3rd + diminished 5th',
    tip: 'Both 3rd AND 5th are lowered, creating maximum tension.',
  },
  augmented: {
    character: 'Dreamy, unsettled, mysterious',
    intervals: 'Root + major 3rd + augmented 5th',
    tip: 'The raised 5th creates an unresolved, floating feeling.',
  },
  major7: {
    character: 'Lush, jazzy, sophisticated',
    intervals: 'Major triad + major 7th',
    tip: 'The major 7th adds richness without much tension.',
  },
  minor7: {
    character: 'Warm, mellow, smooth',
    intervals: 'Minor triad + minor 7th',
    tip: 'Very common in jazz and R&B. Relaxed but complex.',
  },
  dominant7: {
    character: 'Bluesy, tense, wants to resolve',
    intervals: 'Major triad + minor 7th',
    tip: 'The tension between major 3rd and minor 7th creates pull.',
  },
  diminished7: {
    character: 'Extremely tense, symmetrical',
    intervals: 'All minor 3rds stacked',
    tip: 'Every note is 3 semitones apart. Maximum instability.',
  },
  half_diminished7: {
    character: 'Dark, jazzy, less tense than fully diminished',
    intervals: 'Diminished triad + minor 7th',
    tip: 'Common as the ii chord in minor keys (ii-V-i).',
  },
  sus2: {
    character: 'Open, modern, ambiguous',
    intervals: 'Root + major 2nd + perfect 5th',
    tip: "No 3rd means it's neither major nor minor.",
  },
  sus4: {
    character: 'Suspended, wants to resolve to major',
    intervals: 'Root + perfect 4th + perfect 5th',
    tip: 'The 4th wants to fall down to the 3rd.',
  },
  augmented7: {
    character: 'Tense, altered dominant',
    intervals: 'Augmented triad + minor 7th',
    tip: 'The raised 5th adds extra tension to the dominant function.',
  },
  minor_major7: {
    character: 'Dark but bright, unique tension',
    intervals: 'Minor triad + major 7th',
    tip: 'The contrast between minor 3rd and major 7th is striking.',
  },
  major9: {
    character: 'Rich, extended, sophisticated',
    intervals: 'Major 7th + major 9th',
    tip: 'Adds more color to the major 7th sound.',
  },
  minor9: {
    character: 'Smooth, neo-soul, R&B',
    intervals: 'Minor 7th + major 9th',
    tip: 'Very common in modern R&B and neo-soul.',
  },
  dominant9: {
    character: 'Funky, bluesy, extended',
    intervals: 'Dominant 7th + major 9th',
    tip: 'Adds richness while keeping the dominant tension.',
  },
};

/**
 * Educational explanations for each scale type.
 * Used to provide feedback when users answer incorrectly.
 */
export const SCALE_EXPLANATIONS: Record<
  string,
  { character: string; keyFeature: string; tip: string }
> = {
  major: {
    character: 'Bright, happy, resolved',
    keyFeature: 'No altered notes — the reference scale',
    tip: 'The "do re mi" sound. All whole steps except 3-4 and 7-8.',
  },
  natural_minor: {
    character: 'Dark, sad, melancholic',
    keyFeature: 'Lowered 3rd, 6th, and 7th',
    tip: 'Same notes as the relative major, but starting from the 6th degree.',
  },
  pentatonic_major: {
    character: 'Open, folk, universal',
    keyFeature: 'Only 5 notes — removes the 4th and 7th',
    tip: 'No half steps means no dissonance. Works over almost anything.',
  },
  pentatonic_minor: {
    character: 'Bluesy, rock, soulful',
    keyFeature: 'Minor version — 5 notes with b3 and b7',
    tip: 'The backbone of blues and rock solos.',
  },
  dorian: {
    character: 'Minor but bright — jazzy, sophisticated',
    keyFeature: 'Natural 6th in a minor scale',
    tip: 'Like natural minor but with a raised 6th. Common in jazz and funk.',
  },
  mixolydian: {
    character: 'Major but bluesy — rock, folk',
    keyFeature: 'Lowered 7th in a major scale',
    tip: "Like major but with a b7. The dominant chord's home scale.",
  },
  harmonic_minor: {
    character: 'Exotic, classical, tense',
    keyFeature: 'Raised 7th creates a leading tone',
    tip: 'The jump from b6 to natural 7 creates that "Middle Eastern" sound.',
  },
  blues: {
    character: 'Gritty, soulful, expressive',
    keyFeature: 'Minor pentatonic plus the "blue note" (b5)',
    tip: 'That extra b5 adds the signature blues tension.',
  },
  phrygian: {
    character: 'Dark, Spanish, flamenco',
    keyFeature: 'Lowered 2nd — the b2 is the signature sound',
    tip: 'The darkest of the common modes. Think flamenco guitar.',
  },
  lydian: {
    character: 'Dreamy, floating, bright',
    keyFeature: 'Raised 4th — #4 is the signature sound',
    tip: 'Like major but even brighter. That raised 4th sounds "magical".',
  },
  locrian: {
    character: 'Unstable, diminished, rarely used',
    keyFeature: 'Lowered 2nd AND 5th — the only mode with b5',
    tip: 'Too unstable for most uses, but fits over half-diminished chords.',
  },
  melodic_minor: {
    character: 'Jazz minor — smooth, sophisticated',
    keyFeature: 'Minor with raised 6th AND 7th',
    tip: 'Like major scale with a minor 3rd. The basis of jazz harmony.',
  },
  whole_tone: {
    character: 'Dreamy, floating, no gravity',
    keyFeature: 'All whole steps — completely symmetrical',
    tip: 'Only 6 notes. Creates a suspended, unresolved feeling.',
  },
};

/**
 * Get comparison feedback between two intervals.
 */
export function getIntervalComparisonFeedback(
  guessedSemitones: number,
  correctSemitones: number
): string {
  const guessed = INTERVAL_EXPLANATIONS[guessedSemitones];
  const correct = INTERVAL_EXPLANATIONS[correctSemitones];

  if (!guessed || !correct) return '';

  const diff = correctSemitones - guessedSemitones;
  const direction = diff > 0 ? 'wider' : 'narrower';
  const semitones = Math.abs(diff);

  return `The ${correct.name} is ${semitones} semitone${semitones > 1 ? 's' : ''} ${direction} than the ${guessed.name}. ${correct.tip}`;
}

/**
 * Get comparison feedback between two chord qualities.
 */
export function getChordComparisonFeedback(guessedQuality: string, correctQuality: string): string {
  const guessed = CHORD_EXPLANATIONS[guessedQuality];
  const correct = CHORD_EXPLANATIONS[correctQuality];

  if (!correct) return '';

  const correctName = CHORD_QUALITY_NAMES[correctQuality as ChordQuality];
  const guessedName = CHORD_QUALITY_NAMES[guessedQuality as ChordQuality];

  if (guessed) {
    return `You heard ${guessedName} (${guessed.character}), but it was ${correctName}: ${correct.character}. ${correct.tip}`;
  }

  return `${correctName}: ${correct.character}. ${correct.tip}`;
}

/**
 * Get comparison feedback between two scale types.
 */
export function getScaleComparisonFeedback(guessedType: string, correctType: string): string {
  const guessed = SCALE_EXPLANATIONS[guessedType];
  const correct = SCALE_EXPLANATIONS[correctType];

  if (!correct) return '';

  const correctName = SCALE_TYPE_NAMES[correctType as ScaleType] || correctType;
  const guessedName = SCALE_TYPE_NAMES[guessedType as ScaleType] || guessedType;

  if (guessed) {
    return `You heard ${guessedName} (${guessed.character}), but it was ${correctName}: ${correct.character}. ${correct.tip}`;
  }

  return `${correctName}: ${correct.character}. ${correct.tip}`;
}

const CHORD_POOLS: Record<ChordDifficulty, ChordQuality[]> = {
  basic: ['major', 'minor', 'diminished', 'augmented'],
  intermediate: [
    'major',
    'minor',
    'diminished',
    'augmented',
    'major7',
    'minor7',
    'dominant7',
    'diminished7',
    'half_diminished7',
    'sus2',
    'sus4',
  ],
  advanced: [
    'major',
    'minor',
    'diminished',
    'augmented',
    'major7',
    'minor7',
    'dominant7',
    'diminished7',
    'half_diminished7',
    'sus2',
    'sus4',
    'augmented7',
    'minor_major7',
    'major9',
    'minor9',
    'dominant9',
  ],
};

const SCALE_POOLS: Record<ScaleDifficulty, ScaleType[]> = {
  basic: ['major', 'natural_minor', 'pentatonic_major', 'pentatonic_minor'],
  intermediate: [
    'major',
    'natural_minor',
    'pentatonic_major',
    'pentatonic_minor',
    'dorian',
    'mixolydian',
    'harmonic_minor',
    'blues',
  ],
  advanced: [
    'major',
    'natural_minor',
    'pentatonic_major',
    'pentatonic_minor',
    'dorian',
    'mixolydian',
    'harmonic_minor',
    'blues',
    'phrygian',
    'lydian',
    'locrian',
    'melodic_minor',
    'whole_tone',
  ],
};

// ============================================================================
// Helpers
// ============================================================================

/** Pick a random integer from min (inclusive) to max (inclusive) */
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

/** Shuffle an array (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Get a random root note from the 12 chromatic pitch classes */
function randomRootNote(): Note {
  const pitchClass = randInt(0, 11);
  // Use the first (simplest) spelling
  return PITCH_CLASS_SPELLINGS[pitchClass][0];
}

// ============================================================================
// Exercise Generators
// ============================================================================

/**
 * Generate an interval exercise.
 * Random root note in octave 3-4, random interval 1-12 semitones.
 */
export function generateIntervalExercise(): IntervalExercise {
  const rootNote = randomRootNote();
  const rootOctave = randInt(3, 4);
  const intervalSemitones = randInt(1, 12);

  // Calculate target note
  const rootPitchClass = PITCH_CLASS_SPELLINGS.findIndex((spellings) =>
    spellings.some((s) => s.natural === rootNote.natural && s.accidental === rootNote.accidental)
  );
  const targetPitchClass = (rootPitchClass + intervalSemitones) % 12;
  const targetNote = PITCH_CLASS_SPELLINGS[targetPitchClass][0];

  // Determine target octave
  const targetOctave = rootPitchClass + intervalSemitones >= 12 ? rootOctave + 1 : rootOctave;

  const intervalName = INTERVAL_LABELS[intervalSemitones] || `${intervalSemitones} semitones`;

  return {
    rootNote,
    rootOctave,
    targetNote,
    targetOctave,
    intervalSemitones,
    intervalName,
  };
}

/**
 * Generate a chord exercise.
 * Random root in octave 3-4, random quality from difficulty pool.
 */
export function generateChordExercise(difficulty: ChordDifficulty = 'basic'): ChordExercise {
  const rootNote = randomRootNote();
  const rootOctave = randInt(3, 4);
  const pool = CHORD_POOLS[difficulty];
  const quality = pick(pool);
  const chord = buildChord(rootNote, quality);

  return {
    rootNote,
    rootOctave,
    quality,
    qualityName: CHORD_QUALITY_NAMES[quality],
    notes: chord.notes,
  };
}

/**
 * Generate a scale exercise.
 * Random root in octave 3-4, random scale type from difficulty pool.
 */
export function generateScaleExercise(difficulty: ScaleDifficulty = 'basic'): ScaleExercise {
  const rootNote = randomRootNote();
  const rootOctave = randInt(3, 4);
  const pool = SCALE_POOLS[difficulty];
  const scaleType = pick(pool);
  const scale = buildScale(rootNote, scaleType);

  return {
    rootNote,
    rootOctave,
    scaleType,
    scaleName: SCALE_TYPE_NAMES[scaleType] || scaleType,
    notes: scale.notes,
  };
}

// ============================================================================
// Choice Generators
// ============================================================================

/**
 * Generate 4 answer options for an interval exercise.
 * Correct answer + 3 nearby distractors within +/-3 semitones.
 */
export function getIntervalChoices(correctSemitones: number): AnswerOption[] {
  const correctLabel = INTERVAL_LABELS[correctSemitones] || `${correctSemitones} semitones`;

  // Build a pool of distractor semitone values (1-12, excluding correct)
  const distractorPool: number[] = [];
  for (let offset = -3; offset <= 3; offset++) {
    if (offset === 0) continue;
    const candidate = correctSemitones + offset;
    if (candidate >= 1 && candidate <= 12 && candidate !== correctSemitones) {
      distractorPool.push(candidate);
    }
  }

  // If not enough nearby, expand further
  if (distractorPool.length < 3) {
    for (let s = 1; s <= 12; s++) {
      if (s !== correctSemitones && !distractorPool.includes(s)) {
        distractorPool.push(s);
      }
      if (distractorPool.length >= 6) break;
    }
  }

  // Pick 3 unique distractors
  const distractors = shuffle(distractorPool).slice(0, 3);

  const options: AnswerOption[] = [
    { label: correctLabel, value: String(correctSemitones), correct: true },
    ...distractors.map((s) => ({
      label: INTERVAL_LABELS[s] || `${s} semitones`,
      value: String(s),
      correct: false,
    })),
  ];

  return shuffle(options);
}

/**
 * Generate 4 answer options for a chord exercise.
 * Correct quality + 3 distractors from the difficulty pool.
 */
export function getChordChoices(
  correctQuality: ChordQuality,
  difficulty: ChordDifficulty = 'basic'
): AnswerOption[] {
  const pool = CHORD_POOLS[difficulty];
  const correctLabel = CHORD_QUALITY_NAMES[correctQuality];

  // Build distractors from pool, excluding correct
  const distractorPool = pool.filter((q) => q !== correctQuality);
  const distractors = shuffle(distractorPool).slice(0, 3);

  const options: AnswerOption[] = [
    { label: correctLabel, value: correctQuality, correct: true },
    ...distractors.map((q) => ({
      label: CHORD_QUALITY_NAMES[q],
      value: q,
      correct: false,
    })),
  ];

  return shuffle(options);
}

/**
 * Generate 4 answer options for a scale exercise.
 * Correct scale type + 3 distractors from the difficulty pool.
 */
export function getScaleChoices(
  correctScaleType: ScaleType,
  difficulty: ScaleDifficulty = 'basic'
): AnswerOption[] {
  const pool = SCALE_POOLS[difficulty];
  const correctLabel = SCALE_TYPE_NAMES[correctScaleType] || correctScaleType;

  // Build distractors from pool, excluding correct
  const distractorPool = pool.filter((s) => s !== correctScaleType);
  const distractors = shuffle(distractorPool).slice(0, 3);

  const options: AnswerOption[] = [
    { label: correctLabel, value: correctScaleType, correct: true },
    ...distractors.map((s) => ({
      label: SCALE_TYPE_NAMES[s] || s,
      value: s,
      correct: false,
    })),
  ];

  return shuffle(options);
}

// ============================================================================
// Stats
// ============================================================================

export function createInitialStats(): SessionStats {
  return { total: 0, correct: 0, streak: 0, bestStreak: 0 };
}

export function updateStats(stats: SessionStats, isCorrect: boolean): SessionStats {
  const newStreak = isCorrect ? stats.streak + 1 : 0;
  return {
    total: stats.total + 1,
    correct: stats.correct + (isCorrect ? 1 : 0),
    streak: newStreak,
    bestStreak: Math.max(stats.bestStreak, newStreak),
  };
}

// ============================================================================
// Exports for external use
// ============================================================================

export { CHORD_POOLS, SCALE_POOLS };
