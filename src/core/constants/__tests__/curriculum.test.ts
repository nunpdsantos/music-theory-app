import { describe, it, expect } from 'vitest';
import {
  getModuleById,
  getUnitByModuleId,
  getNextModule,
  getPreviousModule,
  arePrerequisitesMet,
  getNextIncompleteModule,
  getDefaultProgress,
  CURRICULUM_LEVELS,
} from '../curriculum';
import type { CurriculumProgress } from '../../types/curriculum';

// ---------------------------------------------------------------------------
// getModuleById
// ---------------------------------------------------------------------------
describe('getModuleById', () => {
  it('returns module for valid L1 ID', () => {
    const mod = getModuleById('l1u1m1');
    expect(mod).toBeDefined();
    expect(mod!.id).toBe('l1u1m1');
    expect(mod!.title).toBe('The Staff and Clefs');
  });

  it('returns module for valid L2 ID', () => {
    const mod = getModuleById('l2u4m1');
    expect(mod).toBeDefined();
    expect(mod!.levelId).toBe('l2');
  });

  it('returns undefined for invalid ID', () => {
    expect(getModuleById('nonexistent')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(getModuleById('')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getUnitByModuleId
// ---------------------------------------------------------------------------
describe('getUnitByModuleId', () => {
  it('returns parent unit for L1 module', () => {
    const unit = getUnitByModuleId('l1u1m1');
    expect(unit).toBeDefined();
    expect(unit!.id).toBe('u1');
    expect(unit!.title).toBe('Notation and Pitch');
  });

  it('returns parent unit for module in later unit', () => {
    const unit = getUnitByModuleId('l1u3m1');
    expect(unit).toBeDefined();
    expect(unit!.id).toBe('u3');
  });

  it('returns undefined for invalid module ID', () => {
    expect(getUnitByModuleId('invalid')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getNextModule / getPreviousModule
// ---------------------------------------------------------------------------
describe('getNextModule', () => {
  it('returns next module within same unit', () => {
    const next = getNextModule('l1u1m1');
    expect(next).toBeDefined();
    expect(next!.id).toBe('l1u1m2');
  });

  it('crosses unit boundary', () => {
    // l1u1m4 is last in unit 1, next should be l1u2m1
    const next = getNextModule('l1u1m4');
    expect(next).toBeDefined();
    expect(next!.id).toBe('l1u2m1');
  });

  it('crosses level boundary (L1 last → L2 first)', () => {
    const next = getNextModule('l1u3m4');
    expect(next).toBeDefined();
    expect(next!.levelId).toBe('l2');
    expect(next!.id).toBe('l2u4m1');
  });

  it('returns undefined for the very last module in the entire curriculum', () => {
    // Find the absolute last module
    const allModules = CURRICULUM_LEVELS.flatMap(l => l.units.flatMap(u => u.modules));
    const lastModule = allModules[allModules.length - 1];
    expect(getNextModule(lastModule.id)).toBeUndefined();
  });

  it('returns undefined for invalid ID', () => {
    expect(getNextModule('invalid')).toBeUndefined();
  });
});

describe('getPreviousModule', () => {
  it('returns previous module within same unit', () => {
    const prev = getPreviousModule('l1u1m2');
    expect(prev).toBeDefined();
    expect(prev!.id).toBe('l1u1m1');
  });

  it('crosses unit boundary backwards', () => {
    const prev = getPreviousModule('l1u2m1');
    expect(prev).toBeDefined();
    expect(prev!.id).toBe('l1u1m4');
  });

  it('crosses level boundary backwards (L2 first → L1 last)', () => {
    const prev = getPreviousModule('l2u4m1');
    expect(prev).toBeDefined();
    expect(prev!.id).toBe('l1u3m4');
  });

  it('returns undefined for the very first module', () => {
    expect(getPreviousModule('l1u1m1')).toBeUndefined();
  });

  it('returns undefined for invalid ID', () => {
    expect(getPreviousModule('invalid')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// arePrerequisitesMet
// ---------------------------------------------------------------------------
describe('arePrerequisitesMet', () => {
  it('returns true when module has no prerequisites', () => {
    const progress: CurriculumProgress = { completedModules: [], moduleProgress: {} };
    expect(arePrerequisitesMet('l1u1m1', progress)).toBe(true);
  });

  it('returns true when all prerequisites are completed', () => {
    const progress: CurriculumProgress = {
      completedModules: ['l1u1m1'],
      moduleProgress: {},
    };
    // l1u1m2 requires l1u1m1
    expect(arePrerequisitesMet('l1u1m2', progress)).toBe(true);
  });

  it('returns false when prerequisites are not met', () => {
    const progress: CurriculumProgress = { completedModules: [], moduleProgress: {} };
    // l1u1m2 requires l1u1m1
    expect(arePrerequisitesMet('l1u1m2', progress)).toBe(false);
  });

  it('returns false for invalid module ID', () => {
    const progress: CurriculumProgress = { completedModules: [], moduleProgress: {} };
    expect(arePrerequisitesMet('nonexistent', progress)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getNextIncompleteModule
// ---------------------------------------------------------------------------
describe('getNextIncompleteModule', () => {
  it('returns first module when nothing is completed', () => {
    const progress: CurriculumProgress = { completedModules: [], moduleProgress: {} };
    const result = getNextIncompleteModule(progress);
    expect(result).toBeDefined();
    expect(result!.module.id).toBe('l1u1m1');
  });

  it('returns next available module after completing first', () => {
    const progress: CurriculumProgress = {
      completedModules: ['l1u1m1'],
      moduleProgress: {},
    };
    const result = getNextIncompleteModule(progress);
    expect(result).toBeDefined();
    expect(result!.module.id).toBe('l1u1m2');
  });

  it('prioritizes in-progress module over next available', () => {
    // Complete first two, have task progress on third, but fourth is also available
    const progress: CurriculumProgress = {
      completedModules: ['l1u1m1', 'l1u1m2'],
      moduleProgress: { l1u1m3: ['l1u1m3t1'] },
    };
    const result = getNextIncompleteModule(progress);
    expect(result).toBeDefined();
    expect(result!.module.id).toBe('l1u1m3');
  });

  it('returns undefined when all non-comingSoon modules are completed', () => {
    // Complete every module across all levels
    const allModuleIds = CURRICULUM_LEVELS.flatMap(l =>
      l.units.flatMap(u => u.modules.filter(m => !m.comingSoon).map(m => m.id))
    );
    const progress: CurriculumProgress = {
      completedModules: allModuleIds,
      moduleProgress: {},
    };
    const result = getNextIncompleteModule(progress);
    expect(result).toBeUndefined();
  });

  it('skips comingSoon levels', () => {
    // Use a custom levels array with a comingSoon level to verify it's skipped
    const progress: CurriculumProgress = { completedModules: [], moduleProgress: {} };
    const result = getNextIncompleteModule(progress, [{
      id: 'test-coming-soon',
      number: 99,
      title: 'Coming Soon',
      description: '',
      difficulty: 'beginner',
      difficultyLabel: '',
      accentColor: '',
      prerequisites: [],
      comingSoon: true,
      units: [{
        id: 'test-u',
        levelId: 'test-coming-soon',
        title: '',
        description: '',
        icon: '',
        modules: [{
          id: 'test-m',
          unitId: 'test-u',
          levelId: 'test-coming-soon',
          title: 'Test',
          subtitle: '',
          objectives: [],
          concepts: [],
          tasks: [],
          prerequisites: [],
        }],
      }],
    }]);
    expect(result).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getDefaultProgress
// ---------------------------------------------------------------------------
describe('getDefaultProgress', () => {
  it('returns empty progress', () => {
    const p = getDefaultProgress();
    expect(p.completedModules).toEqual([]);
    expect(p.moduleProgress).toEqual({});
  });
});
