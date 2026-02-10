import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLearnProgress } from '../useLearnProgress';
import { CURRICULUM_LEVELS } from '../../core/constants/levels';

const STORAGE_KEY = 'music-theory-progress';
const L1 = CURRICULUM_LEVELS.find(l => l.id === 'l1')!;
const UNIT1 = L1.units.find(u => u.id === 'u1')!;

beforeEach(() => {
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
describe('initial state', () => {
  it('starts with empty progress', () => {
    const { result } = renderHook(() => useLearnProgress());
    expect(result.current.progress.completedModules).toEqual([]);
    expect(result.current.progress.moduleProgress).toEqual({});
  });

  it('restores progress from localStorage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completedModules: ['l1u1m1'], moduleProgress: { l1u1m1: ['l1u1m1t1'] } })
    );
    const { result } = renderHook(() => useLearnProgress());
    expect(result.current.progress.completedModules).toEqual(['l1u1m1']);
    expect(result.current.progress.moduleProgress.l1u1m1).toEqual(['l1u1m1t1']);
  });

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{');
    const { result } = renderHook(() => useLearnProgress());
    expect(result.current.progress.completedModules).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// toggleTask
// ---------------------------------------------------------------------------
describe('toggleTask', () => {
  it('adds a task on first toggle', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.toggleTask('l1u1m1', 'l1u1m1t1'));
    expect(result.current.isTaskCompleted('l1u1m1', 'l1u1m1t1')).toBe(true);
  });

  it('removes a task on second toggle', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.toggleTask('l1u1m1', 'l1u1m1t1'));
    act(() => result.current.toggleTask('l1u1m1', 'l1u1m1t1'));
    expect(result.current.isTaskCompleted('l1u1m1', 'l1u1m1t1')).toBe(false);
  });

  it('handles multiple tasks in same module independently', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.toggleTask('l1u1m1', 'l1u1m1t1'));
    act(() => result.current.toggleTask('l1u1m1', 'l1u1m1t2'));
    expect(result.current.isTaskCompleted('l1u1m1', 'l1u1m1t1')).toBe(true);
    expect(result.current.isTaskCompleted('l1u1m1', 'l1u1m1t2')).toBe(true);
    expect(result.current.getModuleCompletedTaskCount('l1u1m1')).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// completeModule / uncompleteModule
// ---------------------------------------------------------------------------
describe('completeModule / uncompleteModule', () => {
  it('marks a module as completed', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.completeModule('l1u1m1'));
    expect(result.current.isModuleCompleted('l1u1m1')).toBe(true);
  });

  it('is idempotent — completing twice does not duplicate', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.completeModule('l1u1m1'));
    act(() => result.current.completeModule('l1u1m1'));
    expect(result.current.progress.completedModules.filter(id => id === 'l1u1m1')).toHaveLength(1);
  });

  it('uncompletes a completed module', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.completeModule('l1u1m1'));
    act(() => result.current.uncompleteModule('l1u1m1'));
    expect(result.current.isModuleCompleted('l1u1m1')).toBe(false);
  });

  it('uncompleteModule is no-op if module not completed', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.uncompleteModule('l1u1m1'));
    expect(result.current.progress.completedModules).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getModuleCompletedTaskCount
// ---------------------------------------------------------------------------
describe('getModuleCompletedTaskCount', () => {
  it('returns 0 when no tasks completed', () => {
    const { result } = renderHook(() => useLearnProgress());
    expect(result.current.getModuleCompletedTaskCount('l1u1m1')).toBe(0);
  });

  it('returns correct count after completing tasks', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.toggleTask('l1u1m1', 'l1u1m1t1'));
    expect(result.current.getModuleCompletedTaskCount('l1u1m1')).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// getUnitCompletedModuleCount
// ---------------------------------------------------------------------------
describe('getUnitCompletedModuleCount', () => {
  it('returns 0 when nothing completed', () => {
    const { result } = renderHook(() => useLearnProgress());
    const moduleIds = UNIT1.modules.map(m => m.id);
    expect(result.current.getUnitCompletedModuleCount(moduleIds)).toBe(0);
  });

  it('counts completed modules within unit', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.completeModule('l1u1m1'));
    act(() => result.current.completeModule('l1u1m2'));
    const moduleIds = UNIT1.modules.map(m => m.id);
    expect(result.current.getUnitCompletedModuleCount(moduleIds)).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Level-aware helpers
// ---------------------------------------------------------------------------
describe('level-aware helpers', () => {
  it('getLevelCompletedModuleCount returns 0 initially', () => {
    const { result } = renderHook(() => useLearnProgress());
    expect(result.current.getLevelCompletedModuleCount(L1)).toBe(0);
  });

  it('isLevelCompleted returns false initially', () => {
    const { result } = renderHook(() => useLearnProgress());
    expect(result.current.isLevelCompleted(L1)).toBe(false);
  });

  it('isUnitCompleted returns false initially', () => {
    const { result } = renderHook(() => useLearnProgress());
    expect(result.current.isUnitCompleted(UNIT1)).toBe(false);
  });

  it('getLevelState returns available for L1 initially', () => {
    const { result } = renderHook(() => useLearnProgress());
    expect(result.current.getLevelState(L1, CURRICULUM_LEVELS)).toBe('available');
  });

  it('getLevelState returns in-progress after partial completion', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.completeModule('l1u1m1'));
    expect(result.current.getLevelState(L1, CURRICULUM_LEVELS)).toBe('in-progress');
  });
});

// ---------------------------------------------------------------------------
// localStorage persistence
// ---------------------------------------------------------------------------
describe('localStorage persistence', () => {
  it('persists completed modules to localStorage', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.completeModule('l1u1m1'));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.completedModules).toContain('l1u1m1');
  });

  it('persists task progress to localStorage', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.toggleTask('l1u1m1', 'l1u1m1t1'));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.moduleProgress.l1u1m1).toContain('l1u1m1t1');
  });
});

// ---------------------------------------------------------------------------
// Cross-module
// ---------------------------------------------------------------------------
describe('cross-module operations', () => {
  it('tracks progress across different units and levels', () => {
    const { result } = renderHook(() => useLearnProgress());
    act(() => result.current.completeModule('l1u1m1'));
    act(() => result.current.completeModule('l1u3m1'));
    act(() => result.current.toggleTask('l1u1m1', 'l1u1m1t1'));
    act(() => result.current.toggleTask('l1u3m1', 'l1u3m1t1'));

    expect(result.current.isModuleCompleted('l1u1m1')).toBe(true);
    expect(result.current.isModuleCompleted('l1u3m1')).toBe(true);
    expect(result.current.isTaskCompleted('l1u1m1', 'l1u1m1t1')).toBe(true);
    expect(result.current.isTaskCompleted('l1u3m1', 'l1u3m1t1')).toBe(true);
  });
});
