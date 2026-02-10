import { describe, it, expect } from 'vitest';
import {
  mergePreferences,
  mergeProgress,
  mergeGamification,
} from '../syncMerge';
import type { PreferencesSnapshot } from '../syncMerge';
import type { CurriculumProgress } from '../../core/types/curriculum';
import type { ModuleExerciseResult, ModuleReviewSchedule } from '../../core/types/exercise';
import type { GamificationData, ActivityDay, AchievementRecord, XPEvent } from '../../core/types/gamification';
import { getDefaultGamificationData } from '../../core/types/gamification';

// ─── Fixtures ───────────────────────────────────────────────────────────────

function makePrefs(overrides?: Partial<PreferencesSnapshot>): PreferencesSnapshot {
  return {
    selectedKey: { natural: 'C', accidental: '' },
    selectedScale: 'major',
    instrument: 'piano',
    guitarTuningId: 'standard',
    baseOctave: 4,
    colorMode: 'degree',
    scaleOctaves: 1,
    volume: 0.8,
    themeMode: 'dark',
    synthPreset: 'piano',
    midiOutputEnabled: false,
    midiOutputDeviceId: null,
    metronomeBPM: 120,
    metronomeBeats: 4,
    metronomeVolume: 0.5,
    language: 'en',
    updatedAt: 1000,
    ...overrides,
  };
}

function makeProgress(overrides?: Partial<CurriculumProgress>): CurriculumProgress {
  return {
    completedModules: [],
    moduleProgress: {},
    ...overrides,
  };
}

function makeExerciseResult(overrides?: Partial<ModuleExerciseResult>): ModuleExerciseResult {
  return {
    scores: {},
    totalAttempts: 0,
    lastAttemptAt: 0,
    passed: false,
    ...overrides,
  };
}

function makeReviewSchedule(overrides?: Partial<ModuleReviewSchedule>): ModuleReviewSchedule {
  return {
    completedAt: 1000,
    nextReviewAt: 2000,
    intervalLevel: 0,
    reviewCount: 0,
    lastReviewedAt: 1000,
    ...overrides,
  };
}

function makeGamification(overrides?: Partial<GamificationData>): GamificationData {
  return { ...getDefaultGamificationData(), ...overrides };
}

function makeXPEvent(overrides?: Partial<XPEvent>): XPEvent {
  return {
    type: 'module_complete',
    xp: 10,
    timestamp: 1000,
    ...overrides,
  };
}

// ─── mergePreferences ───────────────────────────────────────────────────────

describe('mergePreferences', () => {
  it('returns local when local is newer', () => {
    const local = makePrefs({ updatedAt: 2000, language: 'pt' });
    const remote = makePrefs({ updatedAt: 1000, language: 'en' });
    const result = mergePreferences(local, remote);
    expect(result).toBe(local);
    expect(result.language).toBe('pt');
  });

  it('returns remote when remote is newer', () => {
    const local = makePrefs({ updatedAt: 1000, themeMode: 'dark' });
    const remote = makePrefs({ updatedAt: 2000, themeMode: 'light' });
    const result = mergePreferences(local, remote);
    expect(result).toBe(remote);
    expect(result.themeMode).toBe('light');
  });

  it('returns local when timestamps are equal (local >= remote)', () => {
    const local = makePrefs({ updatedAt: 1000, instrument: 'piano' });
    const remote = makePrefs({ updatedAt: 1000, instrument: 'guitar' });
    const result = mergePreferences(local, remote);
    expect(result).toBe(local);
    expect(result.instrument).toBe('piano');
  });

  it('preserves all fields of the winning snapshot', () => {
    const local = makePrefs({
      updatedAt: 500,
      selectedKey: { natural: 'G', accidental: '#' },
      scaleOctaves: 2,
      midiOutputEnabled: true,
      midiOutputDeviceId: 'device-1',
    });
    const remote = makePrefs({
      updatedAt: 900,
      selectedKey: { natural: 'D', accidental: 'b' },
      scaleOctaves: 1,
      volume: 0.3,
    });
    const result = mergePreferences(local, remote);
    expect(result.selectedKey).toEqual({ natural: 'D', accidental: 'b' });
    expect(result.volume).toBe(0.3);
    // local fields should NOT be present — remote won entirely
    expect(result.midiOutputEnabled).toBe(false);
  });
});

// ─── mergeProgress ──────────────────────────────────────────────────────────

describe('mergeProgress', () => {
  describe('completedModules', () => {
    it('unions completed modules from both sides', () => {
      const local = makeProgress({ completedModules: ['l1u1m1', 'l1u1m2'] });
      const remote = makeProgress({ completedModules: ['l1u1m2', 'l1u1m3'] });
      const result = mergeProgress(local, remote);
      expect(result.completedModules).toEqual(
        expect.arrayContaining(['l1u1m1', 'l1u1m2', 'l1u1m3']),
      );
      expect(result.completedModules).toHaveLength(3);
    });

    it('handles one side empty', () => {
      const local = makeProgress({ completedModules: ['l1u1m1'] });
      const remote = makeProgress({ completedModules: [] });
      const result = mergeProgress(local, remote);
      expect(result.completedModules).toEqual(['l1u1m1']);
    });

    it('deduplicates shared modules', () => {
      const local = makeProgress({ completedModules: ['l1u1m1', 'l1u1m2'] });
      const remote = makeProgress({ completedModules: ['l1u1m1', 'l1u1m2'] });
      const result = mergeProgress(local, remote);
      expect(result.completedModules).toHaveLength(2);
    });
  });

  describe('moduleProgress (task unions)', () => {
    it('unions tasks for the same module', () => {
      const local = makeProgress({
        moduleProgress: { 'l1u1m1': ['task-1', 'task-2'] },
      });
      const remote = makeProgress({
        moduleProgress: { 'l1u1m1': ['task-2', 'task-3'] },
      });
      const result = mergeProgress(local, remote);
      expect(result.moduleProgress['l1u1m1']).toEqual(
        expect.arrayContaining(['task-1', 'task-2', 'task-3']),
      );
      expect(result.moduleProgress['l1u1m1']).toHaveLength(3);
    });

    it('includes modules only in local', () => {
      const local = makeProgress({
        moduleProgress: { 'l1u1m1': ['task-1'] },
      });
      const remote = makeProgress({ moduleProgress: {} });
      const result = mergeProgress(local, remote);
      expect(result.moduleProgress['l1u1m1']).toEqual(['task-1']);
    });

    it('includes modules only in remote', () => {
      const local = makeProgress({ moduleProgress: {} });
      const remote = makeProgress({
        moduleProgress: { 'l2u1m1': ['task-a'] },
      });
      const result = mergeProgress(local, remote);
      expect(result.moduleProgress['l2u1m1']).toEqual(['task-a']);
    });

    it('merges distinct modules from both sides', () => {
      const local = makeProgress({
        moduleProgress: { 'l1u1m1': ['t1'] },
      });
      const remote = makeProgress({
        moduleProgress: { 'l2u1m1': ['t2'] },
      });
      const result = mergeProgress(local, remote);
      expect(Object.keys(result.moduleProgress)).toHaveLength(2);
      expect(result.moduleProgress['l1u1m1']).toEqual(['t1']);
      expect(result.moduleProgress['l2u1m1']).toEqual(['t2']);
    });
  });

  describe('exerciseResults', () => {
    it('takes only-local result when remote has none', () => {
      const local = makeProgress({
        exerciseResults: {
          'l1u1m1': makeExerciseResult({ scores: { e1: 1 }, totalAttempts: 1, passed: true }),
        },
      });
      const remote = makeProgress({});
      const result = mergeProgress(local, remote);
      expect(result.exerciseResults!['l1u1m1'].passed).toBe(true);
      expect(result.exerciseResults!['l1u1m1'].scores.e1).toBe(1);
    });

    it('takes only-remote result when local has none', () => {
      const local = makeProgress({});
      const remote = makeProgress({
        exerciseResults: {
          'l1u1m1': makeExerciseResult({ scores: { e1: 0.5 }, totalAttempts: 2 }),
        },
      });
      const result = mergeProgress(local, remote);
      expect(result.exerciseResults!['l1u1m1'].scores.e1).toBe(0.5);
      expect(result.exerciseResults!['l1u1m1'].totalAttempts).toBe(2);
    });

    it('takes the higher score per exercise', () => {
      const local = makeProgress({
        exerciseResults: {
          'l1u1m1': makeExerciseResult({
            scores: { e1: 0.5, e2: 1, e3: 0 },
            totalAttempts: 3,
            lastAttemptAt: 1000,
          }),
        },
      });
      const remote = makeProgress({
        exerciseResults: {
          'l1u1m1': makeExerciseResult({
            scores: { e1: 1, e2: 0.5, e4: 1 },
            totalAttempts: 5,
            lastAttemptAt: 2000,
          }),
        },
      });
      const result = mergeProgress(local, remote);
      const merged = result.exerciseResults!['l1u1m1'];
      expect(merged.scores.e1).toBe(1);   // remote wins
      expect(merged.scores.e2).toBe(1);   // local wins
      expect(merged.scores.e3).toBe(0);   // only local
      expect(merged.scores.e4).toBe(1);   // only remote
    });

    it('takes max totalAttempts', () => {
      const local = makeProgress({
        exerciseResults: {
          'm1': makeExerciseResult({ totalAttempts: 3 }),
        },
      });
      const remote = makeProgress({
        exerciseResults: {
          'm1': makeExerciseResult({ totalAttempts: 7 }),
        },
      });
      const result = mergeProgress(local, remote);
      expect(result.exerciseResults!['m1'].totalAttempts).toBe(7);
    });

    it('takes max lastAttemptAt', () => {
      const local = makeProgress({
        exerciseResults: {
          'm1': makeExerciseResult({ lastAttemptAt: 5000 }),
        },
      });
      const remote = makeProgress({
        exerciseResults: {
          'm1': makeExerciseResult({ lastAttemptAt: 3000 }),
        },
      });
      const result = mergeProgress(local, remote);
      expect(result.exerciseResults!['m1'].lastAttemptAt).toBe(5000);
    });

    it('passed is true if either side passed', () => {
      const local = makeProgress({
        exerciseResults: {
          'm1': makeExerciseResult({ passed: false }),
        },
      });
      const remote = makeProgress({
        exerciseResults: {
          'm1': makeExerciseResult({ passed: true }),
        },
      });
      const result = mergeProgress(local, remote);
      expect(result.exerciseResults!['m1'].passed).toBe(true);
    });

    it('passed remains false if neither side passed', () => {
      const local = makeProgress({
        exerciseResults: {
          'm1': makeExerciseResult({ passed: false }),
        },
      });
      const remote = makeProgress({
        exerciseResults: {
          'm1': makeExerciseResult({ passed: false }),
        },
      });
      const result = mergeProgress(local, remote);
      expect(result.exerciseResults!['m1'].passed).toBe(false);
    });

    it('handles both sides having undefined exerciseResults', () => {
      const local = makeProgress({});
      const remote = makeProgress({});
      const result = mergeProgress(local, remote);
      expect(result.exerciseResults).toEqual({});
    });
  });

  describe('reviewSchedules', () => {
    it('takes only-local schedule when remote has none', () => {
      const schedule = makeReviewSchedule({ reviewCount: 3, intervalLevel: 2 });
      const local = makeProgress({ reviewSchedules: { 'm1': schedule } });
      const remote = makeProgress({});
      const result = mergeProgress(local, remote);
      expect(result.reviewSchedules!['m1']).toEqual(schedule);
    });

    it('takes only-remote schedule when local has none', () => {
      const schedule = makeReviewSchedule({ reviewCount: 5 });
      const local = makeProgress({});
      const remote = makeProgress({ reviewSchedules: { 'm1': schedule } });
      const result = mergeProgress(local, remote);
      expect(result.reviewSchedules!['m1']).toEqual(schedule);
    });

    it('picks schedule with higher reviewCount', () => {
      const localSched = makeReviewSchedule({ reviewCount: 2, intervalLevel: 1 });
      const remoteSched = makeReviewSchedule({ reviewCount: 5, intervalLevel: 3 });
      const local = makeProgress({ reviewSchedules: { 'm1': localSched } });
      const remote = makeProgress({ reviewSchedules: { 'm1': remoteSched } });
      const result = mergeProgress(local, remote);
      expect(result.reviewSchedules!['m1'].reviewCount).toBe(5);
      expect(result.reviewSchedules!['m1'].intervalLevel).toBe(3);
    });

    it('picks local when local reviewCount is higher', () => {
      const localSched = makeReviewSchedule({ reviewCount: 8, lastReviewedAt: 100 });
      const remoteSched = makeReviewSchedule({ reviewCount: 3, lastReviewedAt: 9000 });
      const local = makeProgress({ reviewSchedules: { 'm1': localSched } });
      const remote = makeProgress({ reviewSchedules: { 'm1': remoteSched } });
      const result = mergeProgress(local, remote);
      expect(result.reviewSchedules!['m1'].reviewCount).toBe(8);
    });

    it('uses lastReviewedAt as tiebreaker when reviewCount is equal', () => {
      const localSched = makeReviewSchedule({ reviewCount: 3, lastReviewedAt: 5000 });
      const remoteSched = makeReviewSchedule({ reviewCount: 3, lastReviewedAt: 8000 });
      const local = makeProgress({ reviewSchedules: { 'm1': localSched } });
      const remote = makeProgress({ reviewSchedules: { 'm1': remoteSched } });
      const result = mergeProgress(local, remote);
      expect(result.reviewSchedules!['m1'].lastReviewedAt).toBe(8000);
    });

    it('prefers local on equal reviewCount and equal lastReviewedAt', () => {
      const localSched = makeReviewSchedule({ reviewCount: 3, lastReviewedAt: 5000, intervalLevel: 2 });
      const remoteSched = makeReviewSchedule({ reviewCount: 3, lastReviewedAt: 5000, intervalLevel: 4 });
      const local = makeProgress({ reviewSchedules: { 'm1': localSched } });
      const remote = makeProgress({ reviewSchedules: { 'm1': remoteSched } });
      const result = mergeProgress(local, remote);
      // local.lastReviewedAt >= remote.lastReviewedAt (equal), so local wins
      expect(result.reviewSchedules!['m1'].intervalLevel).toBe(2);
    });

    it('handles both sides having undefined reviewSchedules', () => {
      const local = makeProgress({});
      const remote = makeProgress({});
      const result = mergeProgress(local, remote);
      expect(result.reviewSchedules).toEqual({});
    });
  });
});

// ─── mergeGamification ──────────────────────────────────────────────────────

describe('mergeGamification', () => {
  describe('max counters', () => {
    it('takes max of all counter fields', () => {
      const local = makeGamification({
        totalXP: 100,
        totalExercisesAttempted: 20,
        totalPerfectExercises: 5,
        totalModulesCompleted: 10,
        totalReviewsCompleted: 8,
        totalReviewsCompletedToday: 3,
      });
      const remote = makeGamification({
        totalXP: 200,
        totalExercisesAttempted: 15,
        totalPerfectExercises: 7,
        totalModulesCompleted: 6,
        totalReviewsCompleted: 12,
        totalReviewsCompletedToday: 1,
      });
      const result = mergeGamification(local, remote);
      expect(result.totalXP).toBe(200);
      expect(result.totalExercisesAttempted).toBe(20);
      expect(result.totalPerfectExercises).toBe(7);
      expect(result.totalModulesCompleted).toBe(10);
      expect(result.totalReviewsCompleted).toBe(12);
      expect(result.totalReviewsCompletedToday).toBe(3);
    });

    it('picks later totalReviewsTodayDate', () => {
      const local = makeGamification({ totalReviewsTodayDate: '2026-02-08' });
      const remote = makeGamification({ totalReviewsTodayDate: '2026-02-10' });
      const result = mergeGamification(local, remote);
      expect(result.totalReviewsTodayDate).toBe('2026-02-10');
    });

    it('handles one side having null totalReviewsTodayDate', () => {
      const local = makeGamification({ totalReviewsTodayDate: null });
      const remote = makeGamification({ totalReviewsTodayDate: '2026-02-05' });
      const result = mergeGamification(local, remote);
      expect(result.totalReviewsTodayDate).toBe('2026-02-05');
    });

    it('returns null when both totalReviewsTodayDate are null', () => {
      const local = makeGamification({ totalReviewsTodayDate: null });
      const remote = makeGamification({ totalReviewsTodayDate: null });
      const result = mergeGamification(local, remote);
      expect(result.totalReviewsTodayDate).toBeNull();
    });
  });

  describe('streak', () => {
    it('takes higher currentStreak and bestStreak', () => {
      const local = makeGamification({
        streak: { currentStreak: 5, bestStreak: 10, lastActivityDate: '2026-02-08', graceUsedDate: null },
      });
      const remote = makeGamification({
        streak: { currentStreak: 8, bestStreak: 8, lastActivityDate: '2026-02-09', graceUsedDate: null },
      });
      const result = mergeGamification(local, remote);
      expect(result.streak.currentStreak).toBe(8);
      expect(result.streak.bestStreak).toBe(10);
    });

    it('takes later lastActivityDate', () => {
      const local = makeGamification({
        streak: { currentStreak: 1, bestStreak: 1, lastActivityDate: '2026-02-10', graceUsedDate: null },
      });
      const remote = makeGamification({
        streak: { currentStreak: 1, bestStreak: 1, lastActivityDate: '2026-02-07', graceUsedDate: null },
      });
      const result = mergeGamification(local, remote);
      expect(result.streak.lastActivityDate).toBe('2026-02-10');
    });

    it('takes later graceUsedDate', () => {
      const local = makeGamification({
        streak: { currentStreak: 1, bestStreak: 1, lastActivityDate: null, graceUsedDate: '2026-01-15' },
      });
      const remote = makeGamification({
        streak: { currentStreak: 1, bestStreak: 1, lastActivityDate: null, graceUsedDate: '2026-02-01' },
      });
      const result = mergeGamification(local, remote);
      expect(result.streak.graceUsedDate).toBe('2026-02-01');
    });

    it('handles null lastActivityDate on one side', () => {
      const local = makeGamification({
        streak: { currentStreak: 0, bestStreak: 0, lastActivityDate: null, graceUsedDate: null },
      });
      const remote = makeGamification({
        streak: { currentStreak: 1, bestStreak: 1, lastActivityDate: '2026-02-09', graceUsedDate: null },
      });
      const result = mergeGamification(local, remote);
      expect(result.streak.lastActivityDate).toBe('2026-02-09');
    });
  });

  describe('activityLog', () => {
    it('unions activity days from both sides', () => {
      const local = makeGamification({
        activityLog: [{ date: '2026-02-08', activities: 3 }],
      });
      const remote = makeGamification({
        activityLog: [{ date: '2026-02-09', activities: 2 }],
      });
      const result = mergeGamification(local, remote);
      expect(result.activityLog).toHaveLength(2);
      expect(result.activityLog.map(d => d.date)).toEqual(['2026-02-08', '2026-02-09']);
    });

    it('takes max activities for the same day', () => {
      const local = makeGamification({
        activityLog: [{ date: '2026-02-08', activities: 5 }],
      });
      const remote = makeGamification({
        activityLog: [{ date: '2026-02-08', activities: 3 }],
      });
      const result = mergeGamification(local, remote);
      expect(result.activityLog).toHaveLength(1);
      expect(result.activityLog[0].activities).toBe(5);
    });

    it('sorts merged activity log by date ascending', () => {
      const local = makeGamification({
        activityLog: [{ date: '2026-02-10', activities: 1 }],
      });
      const remote = makeGamification({
        activityLog: [
          { date: '2026-02-08', activities: 2 },
          { date: '2026-02-09', activities: 4 },
        ],
      });
      const result = mergeGamification(local, remote);
      expect(result.activityLog.map(d => d.date)).toEqual([
        '2026-02-08',
        '2026-02-09',
        '2026-02-10',
      ]);
    });

    it('handles empty activity logs', () => {
      const local = makeGamification({ activityLog: [] });
      const remote = makeGamification({ activityLog: [] });
      const result = mergeGamification(local, remote);
      expect(result.activityLog).toEqual([]);
    });
  });

  describe('achievements', () => {
    it('unions achievements from both sides', () => {
      const local = makeGamification({
        achievements: [{ id: 'first_module', unlockedAt: 1000, notified: true }],
      });
      const remote = makeGamification({
        achievements: [{ id: 'first_perfect', unlockedAt: 2000, notified: false }],
      });
      const result = mergeGamification(local, remote);
      expect(result.achievements).toHaveLength(2);
      expect(result.achievements.map(a => a.id)).toEqual(
        expect.arrayContaining(['first_module', 'first_perfect']),
      );
    });

    it('keeps earlier unlockedAt when same achievement on both sides', () => {
      const local = makeGamification({
        achievements: [{ id: 'streak_3', unlockedAt: 5000, notified: true }],
      });
      const remote = makeGamification({
        achievements: [{ id: 'streak_3', unlockedAt: 3000, notified: false }],
      });
      const result = mergeGamification(local, remote);
      expect(result.achievements).toHaveLength(1);
      expect(result.achievements[0].unlockedAt).toBe(3000);
      // The remote record won because it has earlier unlockedAt
      expect(result.achievements[0].notified).toBe(false);
    });

    it('sorts merged achievements by unlockedAt ascending', () => {
      const local = makeGamification({
        achievements: [{ id: 'a', unlockedAt: 5000, notified: true }],
      });
      const remote = makeGamification({
        achievements: [
          { id: 'b', unlockedAt: 1000, notified: true },
          { id: 'c', unlockedAt: 3000, notified: true },
        ],
      });
      const result = mergeGamification(local, remote);
      expect(result.achievements.map(a => a.id)).toEqual(['b', 'c', 'a']);
    });
  });

  describe('weeklyXP', () => {
    it('takes max weeklyXP when same week', () => {
      const local = makeGamification({ weeklyXP: 50, weeklyXPWeek: '2026-W07' });
      const remote = makeGamification({ weeklyXP: 80, weeklyXPWeek: '2026-W07' });
      const result = mergeGamification(local, remote);
      expect(result.weeklyXP).toBe(80);
      expect(result.weeklyXPWeek).toBe('2026-W07');
    });

    it('takes weeklyXP from later week when different weeks', () => {
      const local = makeGamification({ weeklyXP: 200, weeklyXPWeek: '2026-W06' });
      const remote = makeGamification({ weeklyXP: 30, weeklyXPWeek: '2026-W07' });
      const result = mergeGamification(local, remote);
      expect(result.weeklyXP).toBe(30);
      expect(result.weeklyXPWeek).toBe('2026-W07');
    });

    it('takes local weeklyXP when local week is later', () => {
      const local = makeGamification({ weeklyXP: 75, weeklyXPWeek: '2026-W08' });
      const remote = makeGamification({ weeklyXP: 150, weeklyXPWeek: '2026-W05' });
      const result = mergeGamification(local, remote);
      expect(result.weeklyXP).toBe(75);
      expect(result.weeklyXPWeek).toBe('2026-W08');
    });
  });

  describe('recentXPEvents', () => {
    it('deduplicates events by timestamp+type+ref', () => {
      const ev1 = makeXPEvent({ type: 'module_complete', timestamp: 1000, ref: 'm1', xp: 10 });
      const ev2 = makeXPEvent({ type: 'module_complete', timestamp: 1000, ref: 'm1', xp: 10 });
      const local = makeGamification({ recentXPEvents: [ev1] });
      const remote = makeGamification({ recentXPEvents: [ev2] });
      const result = mergeGamification(local, remote);
      expect(result.recentXPEvents).toHaveLength(1);
    });

    it('merges distinct events from both sides', () => {
      const ev1 = makeXPEvent({ type: 'module_complete', timestamp: 1000, ref: 'm1' });
      const ev2 = makeXPEvent({ type: 'exercise_perfect', timestamp: 2000, ref: 'e1' });
      const local = makeGamification({ recentXPEvents: [ev1] });
      const remote = makeGamification({ recentXPEvents: [ev2] });
      const result = mergeGamification(local, remote);
      expect(result.recentXPEvents).toHaveLength(2);
    });

    it('sorts merged events by timestamp descending', () => {
      const ev1 = makeXPEvent({ timestamp: 1000 });
      const ev2 = makeXPEvent({ timestamp: 3000, type: 'exercise_perfect' });
      const ev3 = makeXPEvent({ timestamp: 2000, type: 'review_on_time' });
      const local = makeGamification({ recentXPEvents: [ev1] });
      const remote = makeGamification({ recentXPEvents: [ev2, ev3] });
      const result = mergeGamification(local, remote);
      expect(result.recentXPEvents.map(e => e.timestamp)).toEqual([3000, 2000, 1000]);
    });

    it('caps merged events at 50', () => {
      const localEvents = Array.from({ length: 30 }, (_, i) =>
        makeXPEvent({ timestamp: i, type: 'module_complete', ref: `local-${i}` }),
      );
      const remoteEvents = Array.from({ length: 30 }, (_, i) =>
        makeXPEvent({ timestamp: i + 100, type: 'exercise_perfect', ref: `remote-${i}` }),
      );
      const local = makeGamification({ recentXPEvents: localEvents });
      const remote = makeGamification({ recentXPEvents: remoteEvents });
      const result = mergeGamification(local, remote);
      expect(result.recentXPEvents).toHaveLength(50);
    });

    it('treats events with different ref as distinct even if same timestamp+type', () => {
      const ev1 = makeXPEvent({ type: 'module_complete', timestamp: 1000, ref: 'm1' });
      const ev2 = makeXPEvent({ type: 'module_complete', timestamp: 1000, ref: 'm2' });
      const local = makeGamification({ recentXPEvents: [ev1] });
      const remote = makeGamification({ recentXPEvents: [ev2] });
      const result = mergeGamification(local, remote);
      expect(result.recentXPEvents).toHaveLength(2);
    });

    it('handles events with no ref', () => {
      const ev1 = makeXPEvent({ type: 'level_complete', timestamp: 5000 });
      delete (ev1 as unknown as Record<string, unknown>).ref;
      const ev2 = makeXPEvent({ type: 'level_complete', timestamp: 5000 });
      delete (ev2 as unknown as Record<string, unknown>).ref;
      const local = makeGamification({ recentXPEvents: [ev1] });
      const remote = makeGamification({ recentXPEvents: [ev2] });
      const result = mergeGamification(local, remote);
      // Same timestamp+type+undefined ref => deduplicated
      expect(result.recentXPEvents).toHaveLength(1);
    });
  });
});
