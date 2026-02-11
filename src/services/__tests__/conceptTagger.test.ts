import { describe, it, expect } from 'vitest';
import {
  getExerciseConcepts,
  ALL_CONCEPTS,
  CONCEPT_LABELS,
  CONCEPT_GROUPS,
} from '../conceptTagger';
import type { ExerciseConfig } from '../../core/types/exercise';

describe('conceptTagger', () => {
  describe('getExerciseConcepts', () => {
    // ─── note_id ──────────────────────────────────────────────────────
    it('returns note_reading for a natural note_id', () => {
      const config: ExerciseConfig = { type: 'note_id', note: 'C', accidental: '', octave: 4 };
      expect(getExerciseConcepts(config, 'l1u1m1e1')).toEqual(['note_reading']);
    });

    it('returns note_reading + accidentals for a sharp note_id', () => {
      const config: ExerciseConfig = { type: 'note_id', note: 'F', accidental: '#', octave: 4 };
      expect(getExerciseConcepts(config, 'l1u2m1e1')).toEqual(['note_reading', 'accidentals']);
    });

    it('returns note_reading + accidentals for a flat note_id', () => {
      const config: ExerciseConfig = { type: 'note_id', note: 'B', accidental: 'b', octave: 3 };
      expect(getExerciseConcepts(config, 'l1u2m1e2')).toEqual(['note_reading', 'accidentals']);
    });

    // ─── interval_id ──────────────────────────────────────────────────
    it('returns intervals + specific interval for interval_id', () => {
      const config: ExerciseConfig = {
        type: 'interval_id', root: 'C', rootAccidental: '', rootOctave: 4,
        targetSemitones: 7, direction: 'ascending',
      };
      expect(getExerciseConcepts(config, 'l1u3m1e1')).toEqual(['intervals', 'interval_perfect_5th']);
    });

    it('handles minor 2nd interval', () => {
      const config: ExerciseConfig = {
        type: 'interval_id', root: 'E', rootAccidental: '', rootOctave: 4,
        targetSemitones: 1, direction: 'ascending',
      };
      expect(getExerciseConcepts(config, 'l1u3m1e2')).toEqual(['intervals', 'interval_minor_2nd']);
    });

    it('handles tritone interval', () => {
      const config: ExerciseConfig = {
        type: 'interval_id', root: 'C', rootAccidental: '', rootOctave: 4,
        targetSemitones: 6, direction: 'ascending',
      };
      expect(getExerciseConcepts(config, 'l3u1m1e1')).toEqual(['intervals', 'interval_tritone']);
    });

    it('handles octave interval', () => {
      const config: ExerciseConfig = {
        type: 'interval_id', root: 'A', rootAccidental: '', rootOctave: 3,
        targetSemitones: 12, direction: 'ascending',
      };
      expect(getExerciseConcepts(config, 'l3u1m1e2')).toEqual(['intervals', 'interval_octave']);
    });

    // ─── scale_build ──────────────────────────────────────────────────
    it('returns scales + scale type for scale_build', () => {
      const config: ExerciseConfig = {
        type: 'scale_build', root: 'G', rootAccidental: '', scaleType: 'major', noteCount: 7,
      };
      expect(getExerciseConcepts(config, 'l2u1m1e1')).toEqual(['scales', 'scale_major']);
    });

    it('normalizes natural_minor to scale_natural_minor', () => {
      const config: ExerciseConfig = {
        type: 'scale_build', root: 'A', rootAccidental: '', scaleType: 'natural_minor', noteCount: 7,
      };
      expect(getExerciseConcepts(config, 'l2u2m1e1')).toEqual(['scales', 'scale_natural_minor']);
    });

    it('handles harmonic minor', () => {
      const config: ExerciseConfig = {
        type: 'scale_build', root: 'D', rootAccidental: '', scaleType: 'harmonic_minor', noteCount: 7,
      };
      expect(getExerciseConcepts(config, 'l4u3m1e1')).toEqual(['scales', 'scale_harmonic_minor']);
    });

    it('normalizes pentatonic_major to scale_pentatonic', () => {
      const config: ExerciseConfig = {
        type: 'scale_build', root: 'C', rootAccidental: '', scaleType: 'pentatonic_major', noteCount: 5,
      };
      expect(getExerciseConcepts(config, 'l5u3m1e1')).toEqual(['scales', 'scale_pentatonic']);
    });

    // ─── chord_build ──────────────────────────────────────────────────
    it('returns chords + chord quality for chord_build', () => {
      const config: ExerciseConfig = {
        type: 'chord_build', root: 'C', rootAccidental: '', quality: 'major', noteCount: 3,
      };
      expect(getExerciseConcepts(config, 'l2u3m1e1')).toEqual(['chords', 'chord_major']);
    });

    it('handles minor chord', () => {
      const config: ExerciseConfig = {
        type: 'chord_build', root: 'A', rootAccidental: '', quality: 'minor', noteCount: 3,
      };
      expect(getExerciseConcepts(config, 'l2u3m2e1')).toEqual(['chords', 'chord_minor']);
    });

    it('handles diminished chord', () => {
      const config: ExerciseConfig = {
        type: 'chord_build', root: 'B', rootAccidental: '', quality: 'diminished', noteCount: 3,
      };
      expect(getExerciseConcepts(config, 'l5u2m1e1')).toEqual(['chords', 'chord_diminished']);
    });

    it('handles dominant7 chord', () => {
      const config: ExerciseConfig = {
        type: 'chord_build', root: 'G', rootAccidental: '', quality: 'dominant7', noteCount: 4,
      };
      expect(getExerciseConcepts(config, 'l4u2m1e1')).toEqual(['chords', 'chord_dominant7']);
    });

    // ─── scale_degree_id ──────────────────────────────────────────────
    it('returns scale_degrees for scale_degree_id', () => {
      const config: ExerciseConfig = {
        type: 'scale_degree_id', root: 'C', rootAccidental: '',
        scaleType: 'major', note: 'E', noteAccidental: '', correctDegree: 3,
      };
      expect(getExerciseConcepts(config, 'l4u1m1e1')).toEqual(['scale_degrees']);
    });

    // ─── ear_training ─────────────────────────────────────────────────
    it('returns ear_training + note_reading for note mode ear training', () => {
      const config: ExerciseConfig = {
        type: 'ear_training', mode: 'note', note: 'C', accidental: '', octave: 4,
      };
      expect(getExerciseConcepts(config, 'l6u3m1e1')).toEqual(['ear_training', 'note_reading']);
    });

    it('returns ear_training + intervals for interval mode', () => {
      const config: ExerciseConfig = {
        type: 'ear_training', mode: 'interval',
        root: 'C', rootAccidental: '', rootOctave: 4,
        targetSemitones: 4, direction: 'ascending',
      };
      const concepts = getExerciseConcepts(config, 'l6u3m2e1');
      expect(concepts).toEqual(['ear_training', 'intervals', 'interval_major_3rd']);
    });

    it('returns ear_training + chords for chord mode', () => {
      const config: ExerciseConfig = {
        type: 'ear_training', mode: 'chord',
        chordRoot: 'C', chordRootAccidental: '', quality: 'minor',
        choices: [{ label: 'Major', correct: false }, { label: 'Minor', correct: true }],
      };
      const concepts = getExerciseConcepts(config, 'l6u3m3e1');
      expect(concepts).toEqual(['ear_training', 'chords', 'chord_minor']);
    });

    // ─── multiple_choice ──────────────────────────────────────────────
    it('infers concepts from moduleId prefix for multiple_choice', () => {
      const config: ExerciseConfig = {
        type: 'multiple_choice',
        choices: [{ label: 'True', correct: true }, { label: 'False', correct: false }],
      };
      expect(getExerciseConcepts(config, 'l2u1m1e5')).toEqual(['scales', 'scale_major']);
    });

    it('falls back to note_reading for unknown moduleId prefix', () => {
      const config: ExerciseConfig = {
        type: 'multiple_choice',
        choices: [{ label: 'A', correct: true }, { label: 'B', correct: false }],
      };
      expect(getExerciseConcepts(config, 'unknown_id')).toEqual(['note_reading']);
    });
  });

  describe('ALL_CONCEPTS', () => {
    it('has no duplicates', () => {
      const unique = new Set(ALL_CONCEPTS);
      expect(unique.size).toBe(ALL_CONCEPTS.length);
    });

    it('has labels for every concept', () => {
      for (const concept of ALL_CONCEPTS) {
        expect(CONCEPT_LABELS[concept]).toBeDefined();
        expect(typeof CONCEPT_LABELS[concept]).toBe('string');
      }
    });
  });

  describe('CONCEPT_GROUPS', () => {
    it('covers all major categories', () => {
      expect(CONCEPT_GROUPS).toHaveLength(6);
      const ids = CONCEPT_GROUPS.map((g) => g.id);
      expect(ids).toContain('note_reading');
      expect(ids).toContain('intervals');
      expect(ids).toContain('scales');
      expect(ids).toContain('chords');
      expect(ids).toContain('scale_degrees');
      expect(ids).toContain('ear_training');
    });

    it('has labelKey for each group', () => {
      for (const group of CONCEPT_GROUPS) {
        expect(group.labelKey).toBeTruthy();
        expect(group.concepts.length).toBeGreaterThan(0);
      }
    });
  });
});
