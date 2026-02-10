import { describe, it, expect } from 'vitest';
import { validateAnswer } from '../validateExercise';
import type {
  NoteIdConfig,
  IntervalIdConfig,
  ScaleBuildConfig,
  ChordBuildConfig,
  MultipleChoiceConfig,
} from '../../../../core/types/exercise';

describe('validateAnswer', () => {
  describe('note_id', () => {
    const config: NoteIdConfig = {
      type: 'note_id',
      note: 'C',
      accidental: '#',
      octave: 4,
    };

    it('accepts exact match', () => {
      const result = validateAnswer(config, 'C#');
      expect(result.correct).toBe(true);
    });

    it('accepts enharmonic equivalent by default', () => {
      const result = validateAnswer(config, 'Db');
      expect(result.correct).toBe(true);
    });

    it('rejects enharmonic when acceptEnharmonic is false', () => {
      const strict: NoteIdConfig = { ...config, acceptEnharmonic: false };
      const result = validateAnswer(strict, 'Db');
      expect(result.correct).toBe(false);
    });

    it('rejects wrong note', () => {
      const result = validateAnswer(config, 'D');
      expect(result.correct).toBe(false);
      expect(result.expected).toBe('C#');
    });

    it('handles natural notes', () => {
      const nat: NoteIdConfig = { type: 'note_id', note: 'E', accidental: '', octave: 4 };
      expect(validateAnswer(nat, 'E').correct).toBe(true);
      expect(validateAnswer(nat, 'F').correct).toBe(false);
    });
  });

  describe('interval_id', () => {
    const config: IntervalIdConfig = {
      type: 'interval_id',
      root: 'C',
      rootAccidental: '',
      rootOctave: 4,
      targetSemitones: 7,
      direction: 'ascending',
    };

    it('accepts correct semitone count', () => {
      const result = validateAnswer(config, '7');
      expect(result.correct).toBe(true);
      expect(result.explanation).toContain('Perfect 5th');
    });

    it('rejects wrong semitone count', () => {
      const result = validateAnswer(config, '5');
      expect(result.correct).toBe(false);
      expect(result.expected).toBe('Perfect 5th');
    });
  });

  describe('scale_build', () => {
    const config: ScaleBuildConfig = {
      type: 'scale_build',
      root: 'C',
      rootAccidental: '',
      scaleType: 'major',
      noteCount: 7,
    };

    it('accepts correct pitch class set for C major', () => {
      // C major: C(0) D(2) E(4) F(5) G(7) A(9) B(11)
      const answer = new Set([0, 2, 4, 5, 7, 9, 11]);
      const result = validateAnswer(config, answer);
      expect(result.correct).toBe(true);
    });

    it('rejects incomplete set', () => {
      const answer = new Set([0, 2, 4, 5, 7, 9]); // missing B
      const result = validateAnswer(config, answer);
      expect(result.correct).toBe(false);
      expect(result.explanation).toContain('missing');
    });

    it('rejects set with extra notes', () => {
      const answer = new Set([0, 1, 2, 4, 5, 7, 9, 11]); // extra C#
      const result = validateAnswer(config, answer);
      expect(result.correct).toBe(false);
      expect(result.explanation).toContain('extra');
    });

    it('validates G major scale', () => {
      const gMajor: ScaleBuildConfig = {
        type: 'scale_build',
        root: 'G',
        rootAccidental: '',
        scaleType: 'major',
        noteCount: 7,
      };
      // G major: G(7) A(9) B(11) C(0) D(2) E(4) F#(6)
      const answer = new Set([7, 9, 11, 0, 2, 4, 6]);
      expect(validateAnswer(gMajor, answer).correct).toBe(true);
    });
  });

  describe('chord_build', () => {
    const config: ChordBuildConfig = {
      type: 'chord_build',
      root: 'C',
      rootAccidental: '',
      quality: 'major',
      noteCount: 3,
    };

    it('accepts correct pitch class set for C major chord', () => {
      // C major: C(0) E(4) G(7)
      const answer = new Set([0, 4, 7]);
      const result = validateAnswer(config, answer);
      expect(result.correct).toBe(true);
    });

    it('rejects wrong notes', () => {
      // C minor instead of C major: C(0) Eb(3) G(7)
      const answer = new Set([0, 3, 7]);
      const result = validateAnswer(config, answer);
      expect(result.correct).toBe(false);
    });

    it('validates G major chord', () => {
      const gMajor: ChordBuildConfig = {
        type: 'chord_build',
        root: 'G',
        rootAccidental: '',
        quality: 'major',
        noteCount: 3,
      };
      // G major: G(7) B(11) D(2)
      const answer = new Set([7, 11, 2]);
      expect(validateAnswer(gMajor, answer).correct).toBe(true);
    });
  });

  describe('multiple_choice', () => {
    const config: MultipleChoiceConfig = {
      type: 'multiple_choice',
      choices: [
        { label: 'True', correct: true },
        { label: 'False', correct: false },
      ],
    };

    it('accepts correct choice', () => {
      const result = validateAnswer(config, 'True');
      expect(result.correct).toBe(true);
    });

    it('rejects wrong choice', () => {
      const result = validateAnswer(config, 'False');
      expect(result.correct).toBe(false);
      expect(result.expected).toBe('True');
    });
  });
});
