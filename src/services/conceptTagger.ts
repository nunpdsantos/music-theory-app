/**
 * Concept Tagger — derives concept tags from ExerciseConfig fields.
 * No manual tagging needed: concepts are algorithmically inferred.
 */
import type { ExerciseConfig } from '../core/types/exercise';

// ─── Interval name mapping (semitones → concept suffix) ─────────────────────

const INTERVAL_NAME_MAP: Record<number, string> = {
  1: 'minor_2nd',
  2: 'major_2nd',
  3: 'minor_3rd',
  4: 'major_3rd',
  5: 'perfect_4th',
  6: 'tritone',
  7: 'perfect_5th',
  8: 'minor_6th',
  9: 'major_6th',
  10: 'minor_7th',
  11: 'major_7th',
  12: 'octave',
};

// ─── Module-to-concept heuristic for multiple_choice exercises ──────────────

const MODULE_CONCEPT_MAP: Record<string, string[]> = {
  // Level prefixes that map to concept areas
  l1u1: ['note_reading'],
  l1u2: ['note_reading', 'accidentals'],
  l1u3: ['intervals'],
  l2u1: ['scales', 'scale_major'],
  l2u2: ['scales', 'scale_natural_minor'],
  l2u3: ['chords', 'chord_major', 'chord_minor'],
  l3u1: ['intervals'],
  l3u2: ['scales'],
  l3u3: ['chords'],
  l4u1: ['scale_degrees'],
  l4u2: ['chords', 'chord_dominant7'],
  l4u3: ['scales', 'scale_harmonic_minor'],
  l5u1: ['scales', 'scale_melodic_minor'],
  l5u2: ['chords', 'chord_diminished', 'chord_augmented'],
  l5u3: ['scales', 'scale_pentatonic'],
  l6u1: ['scales'],
  l6u2: ['chords'],
  l6u3: ['ear_training'],
  l7u1: ['scales'],
  l7u2: ['chords'],
  l7u3: ['scale_degrees'],
  l8u1: ['scales'],
  l8u2: ['chords'],
  l8u3: ['ear_training'],
  l9u1: ['scales'],
  l9u2: ['chords'],
  l9u3: ['scale_degrees'],
};

/**
 * Derive concept tags from an ExerciseConfig and its moduleId.
 * Returns 1-3 concept strings per exercise.
 */
export function getExerciseConcepts(config: ExerciseConfig, moduleId: string): string[] {
  switch (config.type) {
    case 'note_id': {
      const concepts = ['note_reading'];
      if (config.accidental && config.accidental !== '') {
        concepts.push('accidentals');
      }
      return concepts;
    }

    case 'interval_id': {
      const concepts = ['intervals'];
      const name = INTERVAL_NAME_MAP[config.targetSemitones];
      if (name) concepts.push(`interval_${name}`);
      return concepts;
    }

    case 'scale_build': {
      const concepts = ['scales'];
      const scaleKey = normalizeScaleType(config.scaleType);
      if (scaleKey) concepts.push(`scale_${scaleKey}`);
      return concepts;
    }

    case 'chord_build': {
      const concepts = ['chords'];
      const qualityKey = normalizeChordQuality(config.quality);
      if (qualityKey) concepts.push(`chord_${qualityKey}`);
      return concepts;
    }

    case 'scale_degree_id':
      return ['scale_degrees'];

    case 'ear_training': {
      const concepts = ['ear_training'];
      // Add underlying concept from the ear training mode
      if (config.mode === 'interval' && config.targetSemitones !== undefined) {
        concepts.push('intervals');
        const name = INTERVAL_NAME_MAP[config.targetSemitones];
        if (name) concepts.push(`interval_${name}`);
      } else if (config.mode === 'chord' && config.quality) {
        concepts.push('chords');
        const qualityKey = normalizeChordQuality(config.quality);
        if (qualityKey) concepts.push(`chord_${qualityKey}`);
      } else if (config.mode === 'note') {
        concepts.push('note_reading');
      }
      return concepts;
    }

    case 'multiple_choice': {
      // Infer from moduleId prefix
      const prefix = extractModulePrefix(moduleId);
      return MODULE_CONCEPT_MAP[prefix] ?? ['note_reading'];
    }

    default:
      return ['note_reading'];
  }
}

// ─── Normalization helpers ──────────────────────────────────────────────────

function normalizeScaleType(scaleType: string): string | null {
  const map: Record<string, string> = {
    major: 'major',
    natural_minor: 'natural_minor',
    harmonic_minor: 'harmonic_minor',
    melodic_minor: 'melodic_minor',
    pentatonic_major: 'pentatonic',
    pentatonic_minor: 'pentatonic',
    blues: 'pentatonic',
    dorian: 'dorian',
    phrygian: 'phrygian',
    lydian: 'lydian',
    mixolydian: 'mixolydian',
    aeolian: 'natural_minor',
    locrian: 'locrian',
    whole_tone: 'whole_tone',
    chromatic: 'chromatic',
    diminished: 'diminished',
  };
  return map[scaleType] ?? scaleType;
}

function normalizeChordQuality(quality: string): string | null {
  const map: Record<string, string> = {
    major: 'major',
    minor: 'minor',
    diminished: 'diminished',
    augmented: 'augmented',
    dominant7: 'dominant7',
    major7: 'major7',
    minor7: 'minor7',
    dim7: 'diminished',
    sus2: 'sus',
    sus4: 'sus',
  };
  return map[quality] ?? quality;
}

/** Extract 'l1u2' from 'l1u2m3' or 'l1u2m3e1' */
function extractModulePrefix(moduleId: string): string {
  const match = moduleId.match(/^(l\du\d)/);
  return match ? match[1] : '';
}

// ─── Concept taxonomy ───────────────────────────────────────────────────────

export const ALL_CONCEPTS = [
  // Pitch
  'note_reading',
  'accidentals',
  // Intervals
  'intervals',
  'interval_minor_2nd',
  'interval_major_2nd',
  'interval_minor_3rd',
  'interval_major_3rd',
  'interval_perfect_4th',
  'interval_tritone',
  'interval_perfect_5th',
  'interval_minor_6th',
  'interval_major_6th',
  'interval_minor_7th',
  'interval_major_7th',
  'interval_octave',
  // Scales
  'scales',
  'scale_major',
  'scale_natural_minor',
  'scale_harmonic_minor',
  'scale_melodic_minor',
  'scale_pentatonic',
  'scale_dorian',
  'scale_phrygian',
  'scale_lydian',
  'scale_mixolydian',
  'scale_locrian',
  'scale_whole_tone',
  'scale_chromatic',
  'scale_diminished',
  // Chords
  'chords',
  'chord_major',
  'chord_minor',
  'chord_diminished',
  'chord_augmented',
  'chord_dominant7',
  'chord_major7',
  'chord_minor7',
  'chord_sus',
  // Functional
  'scale_degrees',
  'ear_training',
] as const;

export type ConceptId = (typeof ALL_CONCEPTS)[number];

export const CONCEPT_LABELS: Record<string, string> = {
  note_reading: 'Note Reading',
  accidentals: 'Accidentals',
  intervals: 'Intervals',
  interval_minor_2nd: 'Minor 2nd',
  interval_major_2nd: 'Major 2nd',
  interval_minor_3rd: 'Minor 3rd',
  interval_major_3rd: 'Major 3rd',
  interval_perfect_4th: 'Perfect 4th',
  interval_tritone: 'Tritone',
  interval_perfect_5th: 'Perfect 5th',
  interval_minor_6th: 'Minor 6th',
  interval_major_6th: 'Major 6th',
  interval_minor_7th: 'Minor 7th',
  interval_major_7th: 'Major 7th',
  interval_octave: 'Octave',
  scales: 'Scales',
  scale_major: 'Major Scale',
  scale_natural_minor: 'Natural Minor',
  scale_harmonic_minor: 'Harmonic Minor',
  scale_melodic_minor: 'Melodic Minor',
  scale_pentatonic: 'Pentatonic',
  scale_dorian: 'Dorian',
  scale_phrygian: 'Phrygian',
  scale_lydian: 'Lydian',
  scale_mixolydian: 'Mixolydian',
  scale_locrian: 'Locrian',
  scale_whole_tone: 'Whole Tone',
  scale_chromatic: 'Chromatic',
  scale_diminished: 'Diminished',
  chords: 'Chords',
  chord_major: 'Major Chord',
  chord_minor: 'Minor Chord',
  chord_diminished: 'Diminished Chord',
  chord_augmented: 'Augmented Chord',
  chord_dominant7: 'Dominant 7th',
  chord_major7: 'Major 7th',
  chord_minor7: 'Minor 7th',
  chord_sus: 'Suspended',
  scale_degrees: 'Scale Degrees',
  ear_training: 'Ear Training',
};

// ─── Radar chart grouping ───────────────────────────────────────────────────

export interface ConceptGroup {
  id: string;
  labelKey: string;
  concepts: string[];
}

export const CONCEPT_GROUPS: ConceptGroup[] = [
  {
    id: 'note_reading',
    labelKey: 'concepts.noteReading',
    concepts: ['note_reading', 'accidentals'],
  },
  {
    id: 'intervals',
    labelKey: 'concepts.intervals',
    concepts: [
      'intervals',
      'interval_minor_2nd', 'interval_major_2nd',
      'interval_minor_3rd', 'interval_major_3rd',
      'interval_perfect_4th', 'interval_tritone', 'interval_perfect_5th',
      'interval_minor_6th', 'interval_major_6th',
      'interval_minor_7th', 'interval_major_7th', 'interval_octave',
    ],
  },
  {
    id: 'scales',
    labelKey: 'concepts.scales',
    concepts: [
      'scales', 'scale_major', 'scale_natural_minor',
      'scale_harmonic_minor', 'scale_melodic_minor', 'scale_pentatonic',
      'scale_dorian', 'scale_phrygian', 'scale_lydian', 'scale_mixolydian',
      'scale_locrian', 'scale_whole_tone', 'scale_chromatic', 'scale_diminished',
    ],
  },
  {
    id: 'chords',
    labelKey: 'concepts.chords',
    concepts: [
      'chords', 'chord_major', 'chord_minor',
      'chord_diminished', 'chord_augmented',
      'chord_dominant7', 'chord_major7', 'chord_minor7', 'chord_sus',
    ],
  },
  {
    id: 'scale_degrees',
    labelKey: 'concepts.scaleDegrees',
    concepts: ['scale_degrees'],
  },
  {
    id: 'ear_training',
    labelKey: 'concepts.earTraining',
    concepts: ['ear_training'],
  },
];
