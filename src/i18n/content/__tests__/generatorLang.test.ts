import { describe, it, expect } from 'vitest';
import { generateExercises, generateAllForLevel } from '../../../data/exercises/exerciseGenerator';
import type { ModuleTemplateConfig } from '../../../data/exercises/exerciseTemplates';

const SCALE_CONFIG: ModuleTemplateConfig = {
  moduleId: 'l1u3m1',
  targetCount: 3,
  templates: [
    {
      type: 'scale_build',
      promptTemplate: 'Build the {root} {scaleType} scale',
      hintTemplate: 'The {scaleType} scale starting from {root}',
      params: {
        roots: ['C', 'G', 'D'],
        accidentals: ['', '', ''],
        scaleTypes: ['major', 'natural_minor'],
        noteCounts: [7],
      },
    },
  ],
};

const INTERVAL_CONFIG: ModuleTemplateConfig = {
  moduleId: 'l1u3m3',
  targetCount: 2,
  templates: [
    {
      type: 'interval_id',
      promptTemplate: 'Identify the {direction} interval from {root}',
      hintTemplate: 'Count {semitones} semitones {direction} from {root}',
      params: {
        roots: ['C', 'G'],
        accidentals: ['', ''],
        intervals: [5, 7],
        directions: ['ascending', 'descending'],
        octaves: [4],
      },
    },
  ],
};

const CHORD_CONFIG: ModuleTemplateConfig = {
  moduleId: 'l1u3m4',
  targetCount: 2,
  templates: [
    {
      type: 'chord_build',
      promptTemplate: 'Build the {root} {quality} chord',
      hintTemplate: 'A {quality} chord on {root}',
      params: {
        roots: ['C', 'G'],
        accidentals: ['', ''],
        chordQualities: ['major', 'minor'],
        noteCounts: [3],
      },
    },
  ],
};

describe('exerciseGenerator with language', () => {
  it('uses Portuguese scale type names', () => {
    const exercises = generateExercises(SCALE_CONFIG, 42, 'pt');
    for (const ex of exercises) {
      // Should NOT contain English "major" or "natural minor"
      // Should contain Portuguese equivalents
      expect(ex.prompt).not.toContain('{scaleType}');
      const hasPortuguese = ex.prompt.includes('maior') || ex.prompt.includes('menor natural');
      expect(hasPortuguese).toBe(true);
    }
  });

  it('uses Spanish scale type names', () => {
    const exercises = generateExercises(SCALE_CONFIG, 42, 'es');
    for (const ex of exercises) {
      const hasSpanish = ex.prompt.includes('mayor') || ex.prompt.includes('menor natural');
      expect(hasSpanish).toBe(true);
    }
  });

  it('uses English scale type names for en', () => {
    const exercises = generateExercises(SCALE_CONFIG, 42, 'en');
    for (const ex of exercises) {
      const hasEnglish = ex.prompt.includes('major') || ex.prompt.includes('natural minor');
      expect(hasEnglish).toBe(true);
    }
  });

  it('translates directions in interval exercises', () => {
    const exercises = generateExercises(INTERVAL_CONFIG, 42, 'pt');
    for (const ex of exercises) {
      const hasPortuguese = ex.prompt.includes('ascendente') || ex.prompt.includes('descendente');
      expect(hasPortuguese).toBe(true);
    }
  });

  it('translates chord qualities', () => {
    const exercises = generateExercises(CHORD_CONFIG, 42, 'pt');
    for (const ex of exercises) {
      const hasPortuguese = ex.prompt.includes('maior') || ex.prompt.includes('menor');
      expect(hasPortuguese).toBe(true);
    }
  });

  it('generateAllForLevel forwards language', () => {
    const result = generateAllForLevel([SCALE_CONFIG], 'pt');
    const exercises = result['l1u3m1'];
    expect(exercises.length).toBeGreaterThan(0);
    for (const ex of exercises) {
      const hasPortuguese = ex.prompt.includes('maior') || ex.prompt.includes('menor natural');
      expect(hasPortuguese).toBe(true);
    }
  });

  it('lang defaults to en when omitted', () => {
    const exercises = generateExercises(SCALE_CONFIG, 42);
    for (const ex of exercises) {
      const hasEnglish = ex.prompt.includes('major') || ex.prompt.includes('natural minor');
      expect(hasEnglish).toBe(true);
    }
  });
});
