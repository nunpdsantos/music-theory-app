import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressStore } from '../progressStore';
import { getDefaultProgress } from '../../data/curriculumLoader';

beforeEach(() => {
  localStorage.clear();
  useProgressStore.setState({ progress: getDefaultProgress() });
});

describe('progressStore', () => {
  it('starts with default progress', () => {
    const { progress } = useProgressStore.getState();
    expect(progress.completedModules).toEqual([]);
    expect(progress.moduleProgress).toEqual({});
  });

  it('completeModule adds to completedModules', () => {
    useProgressStore.getState().completeModule('l1u1m1');
    const { progress } = useProgressStore.getState();
    expect(progress.completedModules).toContain('l1u1m1');
  });

  it('completeModule is idempotent', () => {
    useProgressStore.getState().completeModule('l1u1m1');
    useProgressStore.getState().completeModule('l1u1m1');
    const { progress } = useProgressStore.getState();
    expect(progress.completedModules.filter(id => id === 'l1u1m1')).toHaveLength(1);
  });

  it('uncompleteModule removes from completedModules', () => {
    useProgressStore.getState().completeModule('l1u1m1');
    useProgressStore.getState().uncompleteModule('l1u1m1');
    const { progress } = useProgressStore.getState();
    expect(progress.completedModules).not.toContain('l1u1m1');
  });

  it('toggleTask adds a task', () => {
    useProgressStore.getState().toggleTask('l1u1m1', 'l1u1m1t1');
    const { progress } = useProgressStore.getState();
    expect(progress.moduleProgress['l1u1m1']).toContain('l1u1m1t1');
  });

  it('toggleTask removes a task on second call', () => {
    useProgressStore.getState().toggleTask('l1u1m1', 'l1u1m1t1');
    useProgressStore.getState().toggleTask('l1u1m1', 'l1u1m1t1');
    const { progress } = useProgressStore.getState();
    expect(progress.moduleProgress['l1u1m1']).not.toContain('l1u1m1t1');
  });

  it('recordExerciseResult stores score', () => {
    useProgressStore.getState().recordExerciseResult('l1u1m1', 'e1', 1);
    const { progress } = useProgressStore.getState();
    const result = progress.exerciseResults!['l1u1m1'];
    expect(result.scores['e1']).toBe(1);
    expect(result.totalAttempts).toBe(1);
  });

  it('markExercisesPassed sets passed flag', () => {
    useProgressStore.getState().recordExerciseResult('l1u1m1', 'e1', 1);
    useProgressStore.getState().markExercisesPassed('l1u1m1');
    const { progress } = useProgressStore.getState();
    expect(progress.exerciseResults!['l1u1m1'].passed).toBe(true);
  });

  it('completeModule creates review schedule', () => {
    useProgressStore.getState().completeModule('l1u1m1');
    const { progress } = useProgressStore.getState();
    const schedule = progress.reviewSchedules!['l1u1m1'];
    expect(schedule).toBeDefined();
    expect(schedule.reviewCount).toBe(0);
    expect(schedule.intervalLevel).toBe(0);
  });

  it('recordReviewResult updates schedule', () => {
    useProgressStore.getState().completeModule('l1u1m1');
    useProgressStore.getState().recordReviewResult('l1u1m1', true);
    const { progress } = useProgressStore.getState();
    const schedule = progress.reviewSchedules!['l1u1m1'];
    expect(schedule.reviewCount).toBe(1);
    expect(schedule.intervalLevel).toBe(1);
  });

  it('replaceProgress replaces the entire progress object', () => {
    const newProgress = {
      completedModules: ['l1u1m1', 'l1u1m2'],
      moduleProgress: { l1u1m1: ['t1'] },
    };
    useProgressStore.getState().replaceProgress(newProgress);
    const { progress } = useProgressStore.getState();
    expect(progress.completedModules).toEqual(['l1u1m1', 'l1u1m2']);
    expect(progress.moduleProgress['l1u1m1']).toEqual(['t1']);
  });
});
