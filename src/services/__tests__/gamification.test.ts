import { describe, it, expect } from 'vitest';
import {
  getISODate,
  getISOWeek,
  recordActivity,
  pruneActivityLog,
  isStreakMilestone,
  awardXP,
  computeModuleXP,
  resetWeeklyXPIfNeeded,
  checkAchievements,
  unlockAchievements,
  markAchievementsNotified,
  backfillFromProgress,
  incrementDailyReviews,
  getWeekActivityDayCount,
} from '../gamification';
import { getDefaultGamificationData } from '../../core/types/gamification';
import type { GamificationData } from '../../core/types/gamification';
import type { CurriculumProgress } from '../../core/types/curriculum';
import type { AchievementDefinition } from '../gamification';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeData(overrides?: Partial<GamificationData>): GamificationData {
  return { ...getDefaultGamificationData(), ...overrides };
}

function makeProgress(overrides?: Partial<CurriculumProgress>): CurriculumProgress {
  return {
    completedModules: [],
    moduleProgress: {},
    ...overrides,
  };
}

/** Create a timestamp for a given date string. */
function ts(date: string): number {
  return new Date(date + 'T12:00:00Z').getTime();
}

// ─── Date Helpers ────────────────────────────────────────────────────────────

describe('getISODate', () => {
  it('returns YYYY-MM-DD in UTC', () => {
    expect(getISODate(ts('2026-02-10'))).toBe('2026-02-10');
  });

  it('handles midnight boundary', () => {
    // 2026-02-10T23:59:59Z
    expect(getISODate(new Date('2026-02-10T23:59:59Z').getTime())).toBe('2026-02-10');
  });
});

describe('getISOWeek', () => {
  it('returns correct ISO week', () => {
    // 2026-02-10 is Tuesday of W07
    expect(getISOWeek(ts('2026-02-10'))).toBe('2026-W07');
  });

  it('handles year boundary (2025-12-31 = W01 of 2026)', () => {
    expect(getISOWeek(ts('2025-12-31'))).toBe('2026-W01');
  });

  it('handles first week', () => {
    expect(getISOWeek(ts('2026-01-05'))).toBe('2026-W02');
  });
});

// ─── Streak Logic ────────────────────────────────────────────────────────────

describe('recordActivity', () => {
  it('initializes streak on first activity', () => {
    const data = makeData();
    const result = recordActivity(data, ts('2026-02-10'));
    expect(result.streak.currentStreak).toBe(1);
    expect(result.streak.bestStreak).toBe(1);
    expect(result.streak.lastActivityDate).toBe('2026-02-10');
    expect(result.activityLog).toHaveLength(1);
    expect(result.activityLog[0]).toEqual({ date: '2026-02-10', activities: 1 });
  });

  it('increments streak on consecutive day', () => {
    const data = makeData({
      streak: { currentStreak: 3, bestStreak: 5, lastActivityDate: '2026-02-09', graceUsedDate: null },
      activityLog: [{ date: '2026-02-09', activities: 1 }],
    });
    const result = recordActivity(data, ts('2026-02-10'));
    expect(result.streak.currentStreak).toBe(4);
    expect(result.streak.bestStreak).toBe(5);
  });

  it('updates best streak when current exceeds it', () => {
    const data = makeData({
      streak: { currentStreak: 5, bestStreak: 5, lastActivityDate: '2026-02-09', graceUsedDate: null },
    });
    const result = recordActivity(data, ts('2026-02-10'));
    expect(result.streak.currentStreak).toBe(6);
    expect(result.streak.bestStreak).toBe(6);
  });

  it('does not change streak on same day', () => {
    const data = makeData({
      streak: { currentStreak: 3, bestStreak: 3, lastActivityDate: '2026-02-10', graceUsedDate: null },
      activityLog: [{ date: '2026-02-10', activities: 2 }],
    });
    const result = recordActivity(data, ts('2026-02-10'));
    expect(result.streak.currentStreak).toBe(3);
    expect(result.activityLog[0].activities).toBe(3);
  });

  it('preserves streak with 1-day grace period (2-day gap)', () => {
    const data = makeData({
      streak: { currentStreak: 5, bestStreak: 5, lastActivityDate: '2026-02-08', graceUsedDate: null },
    });
    const result = recordActivity(data, ts('2026-02-10'));
    expect(result.streak.currentStreak).toBe(5); // preserved, not incremented
    expect(result.streak.graceUsedDate).toBe('2026-02-08');
  });

  it('resets streak if grace already used for the same gap', () => {
    const data = makeData({
      streak: { currentStreak: 5, bestStreak: 5, lastActivityDate: '2026-02-08', graceUsedDate: '2026-02-08' },
    });
    const result = recordActivity(data, ts('2026-02-10'));
    expect(result.streak.currentStreak).toBe(1);
  });

  it('resets streak after 3+ day gap', () => {
    const data = makeData({
      streak: { currentStreak: 10, bestStreak: 10, lastActivityDate: '2026-02-06', graceUsedDate: null },
    });
    const result = recordActivity(data, ts('2026-02-10'));
    expect(result.streak.currentStreak).toBe(1);
    expect(result.streak.bestStreak).toBe(10); // best preserved
  });
});

describe('pruneActivityLog', () => {
  it('removes entries older than 90 days', () => {
    const now = ts('2026-06-01');
    const log = [
      { date: '2026-02-01', activities: 1 }, // 120 days ago
      { date: '2026-03-15', activities: 2 }, // ~78 days ago
      { date: '2026-05-30', activities: 3 }, // 2 days ago
    ];
    const result = pruneActivityLog(log, now);
    expect(result).toHaveLength(2);
    expect(result[0].date).toBe('2026-03-15');
  });

  it('keeps all entries within 90 days', () => {
    const now = ts('2026-06-01');
    const log = [
      { date: '2026-04-01', activities: 1 },
      { date: '2026-05-01', activities: 2 },
    ];
    expect(pruneActivityLog(log, now)).toHaveLength(2);
  });
});

describe('isStreakMilestone', () => {
  it('returns true for milestone values', () => {
    expect(isStreakMilestone(7)).toBe(true);
    expect(isStreakMilestone(14)).toBe(true);
    expect(isStreakMilestone(30)).toBe(true);
    expect(isStreakMilestone(60)).toBe(true);
    expect(isStreakMilestone(100)).toBe(true);
  });

  it('returns false for non-milestone values', () => {
    expect(isStreakMilestone(1)).toBe(false);
    expect(isStreakMilestone(8)).toBe(false);
    expect(isStreakMilestone(50)).toBe(false);
  });
});

// ─── XP System ───────────────────────────────────────────────────────────────

describe('computeModuleXP', () => {
  it('returns 10 for levels 1-3', () => {
    expect(computeModuleXP('l1u1m1')).toBe(10);
    expect(computeModuleXP('l2u3m2')).toBe(10);
    expect(computeModuleXP('l3u1m1')).toBe(10);
  });

  it('returns 15 for levels 4-6', () => {
    expect(computeModuleXP('l4u1m1')).toBe(15);
    expect(computeModuleXP('l5u2m3')).toBe(15);
    expect(computeModuleXP('l6u1m1')).toBe(15);
  });

  it('returns 20 for levels 7-9', () => {
    expect(computeModuleXP('l7u1m1')).toBe(20);
    expect(computeModuleXP('l8u1m1')).toBe(20);
    expect(computeModuleXP('l9u1m1')).toBe(20);
  });
});

describe('awardXP', () => {
  it('adds XP to total and weekly', () => {
    const data = makeData({ weeklyXPWeek: '2026-W07' });
    const result = awardXP(data, 'module_complete', 10, ts('2026-02-10'), 'l1u1m1');
    expect(result.totalXP).toBe(10);
    expect(result.weeklyXP).toBe(10);
    expect(result.recentXPEvents).toHaveLength(1);
    expect(result.recentXPEvents[0].type).toBe('module_complete');
  });

  it('accumulates weekly XP in same week', () => {
    const data = makeData({ totalXP: 50, weeklyXP: 20, weeklyXPWeek: '2026-W07' });
    const result = awardXP(data, 'exercise_perfect', 2, ts('2026-02-10'));
    expect(result.totalXP).toBe(52);
    expect(result.weeklyXP).toBe(22);
  });

  it('resets weekly XP on new week', () => {
    const data = makeData({ totalXP: 50, weeklyXP: 20, weeklyXPWeek: '2026-W06' });
    const result = awardXP(data, 'module_complete', 10, ts('2026-02-10'));
    expect(result.totalXP).toBe(60);
    expect(result.weeklyXP).toBe(10); // reset
    expect(result.weeklyXPWeek).toBe('2026-W07');
  });

  it('caps recent events at 50', () => {
    const events = Array.from({ length: 50 }, (_, i) => ({
      type: 'module_complete' as const,
      xp: 10,
      timestamp: ts('2026-01-01') + i * 1000,
    }));
    const data = makeData({ recentXPEvents: events });
    const result = awardXP(data, 'exercise_perfect', 2, ts('2026-02-10'));
    expect(result.recentXPEvents).toHaveLength(50);
    expect(result.recentXPEvents[49].type).toBe('exercise_perfect');
  });
});

describe('resetWeeklyXPIfNeeded', () => {
  it('resets if different week', () => {
    const data = makeData({ weeklyXP: 100, weeklyXPWeek: '2026-W06' });
    const result = resetWeeklyXPIfNeeded(data, ts('2026-02-10'));
    expect(result.weeklyXP).toBe(0);
    expect(result.weeklyXPWeek).toBe('2026-W07');
  });

  it('no-ops if same week', () => {
    const data = makeData({ weeklyXP: 100, weeklyXPWeek: '2026-W07' });
    const result = resetWeeklyXPIfNeeded(data, ts('2026-02-10'));
    expect(result).toBe(data); // same reference
  });
});

// ─── Achievements ────────────────────────────────────────────────────────────

describe('checkAchievements', () => {
  const testDefs: AchievementDefinition[] = [
    {
      id: 'test_a',
      category: 'curriculum',
      titleKey: 'a.title',
      descriptionKey: 'a.desc',
      icon: 'M0 0',
      check: (data) => data.totalModulesCompleted >= 1,
    },
    {
      id: 'test_b',
      category: 'exercise',
      titleKey: 'b.title',
      descriptionKey: 'b.desc',
      icon: 'M0 0',
      check: (data) => data.totalExercisesAttempted >= 10,
    },
  ];

  it('returns newly unlocked achievement IDs', () => {
    const data = makeData({ totalModulesCompleted: 1 });
    const result = checkAchievements(data, makeProgress(), testDefs);
    expect(result).toEqual(['test_a']);
  });

  it('does not return already unlocked achievements', () => {
    const data = makeData({
      totalModulesCompleted: 1,
      achievements: [{ id: 'test_a', unlockedAt: 0, notified: true }],
    });
    const result = checkAchievements(data, makeProgress(), testDefs);
    expect(result).toEqual([]);
  });

  it('returns multiple newly unlocked achievements', () => {
    const data = makeData({ totalModulesCompleted: 1, totalExercisesAttempted: 10 });
    const result = checkAchievements(data, makeProgress(), testDefs);
    expect(result).toEqual(['test_a', 'test_b']);
  });

  it('returns empty array when none qualify', () => {
    const data = makeData();
    expect(checkAchievements(data, makeProgress(), testDefs)).toEqual([]);
  });
});

describe('unlockAchievements', () => {
  it('adds records for newly unlocked IDs', () => {
    const data = makeData();
    const result = unlockAchievements(data, ['test_a', 'test_b'], 1000);
    expect(result.achievements).toHaveLength(2);
    expect(result.achievements[0].id).toBe('test_a');
    expect(result.achievements[0].unlockedAt).toBe(1000);
    expect(result.achievements[0].notified).toBe(false);
  });

  it('no-ops with empty array', () => {
    const data = makeData();
    expect(unlockAchievements(data, [], 1000)).toBe(data);
  });
});

describe('markAchievementsNotified', () => {
  it('marks specified achievements as notified', () => {
    const data = makeData({
      achievements: [
        { id: 'a', unlockedAt: 0, notified: false },
        { id: 'b', unlockedAt: 0, notified: false },
      ],
    });
    const result = markAchievementsNotified(data, ['a']);
    expect(result.achievements[0].notified).toBe(true);
    expect(result.achievements[1].notified).toBe(false);
  });
});

// ─── Backfill ────────────────────────────────────────────────────────────────

describe('backfillFromProgress', () => {
  it('reconstructs XP from completed modules', () => {
    const progress = makeProgress({
      completedModules: ['l1u1m1', 'l1u1m2', 'l4u1m1'],
    });
    const result = backfillFromProgress(progress, ts('2026-02-10'));
    // l1 modules: 10 each = 20, l4 module: 15 = 35 total module XP
    expect(result.totalModulesCompleted).toBe(3);
    expect(result.totalXP).toBeGreaterThanOrEqual(35);
  });

  it('counts exercises from results', () => {
    const progress = makeProgress({
      completedModules: ['l1u1m1'],
      exerciseResults: {
        l1u1m1: {
          scores: { e1: 1, e2: 0.5, e3: 0 },
          totalAttempts: 5,
          lastAttemptAt: 0,
          passed: true,
        },
      },
    });
    const result = backfillFromProgress(progress, ts('2026-02-10'));
    expect(result.totalExercisesAttempted).toBe(5);
    expect(result.totalPerfectExercises).toBe(1);
  });

  it('counts review completions', () => {
    const progress = makeProgress({
      completedModules: ['l1u1m1'],
      reviewSchedules: {
        l1u1m1: {
          completedAt: 0,
          nextReviewAt: 0,
          intervalLevel: 2,
          reviewCount: 3,
          lastReviewedAt: 0,
        },
      },
    });
    const result = backfillFromProgress(progress, ts('2026-02-10'));
    expect(result.totalReviewsCompleted).toBe(3);
    // 3 reviews * 5 XP = 15
    expect(result.totalXP).toBeGreaterThanOrEqual(15);
  });

  it('awards level completion bonus', () => {
    // Complete all 10 L1 modules
    const modules = Array.from({ length: 10 }, (_, i) => `l1u${Math.floor(i / 3) + 1}m${(i % 3) + 1}`);
    const progress = makeProgress({ completedModules: modules });
    const result = backfillFromProgress(progress, ts('2026-02-10'));
    // 10 * 10 (module XP) + 50 (level bonus) = 150
    expect(result.totalXP).toBe(150);
  });

  it('starts with fresh streak (no timestamps to reconstruct from)', () => {
    const progress = makeProgress({ completedModules: ['l1u1m1'] });
    const result = backfillFromProgress(progress, ts('2026-02-10'));
    expect(result.streak.currentStreak).toBe(0);
    expect(result.streak.lastActivityDate).toBeNull();
  });
});

// ─── Daily Reviews ───────────────────────────────────────────────────────────

describe('incrementDailyReviews', () => {
  it('starts new count for new day', () => {
    const data = makeData({ totalReviewsCompletedToday: 3, totalReviewsTodayDate: '2026-02-09' });
    const result = incrementDailyReviews(data, ts('2026-02-10'));
    expect(result.totalReviewsCompletedToday).toBe(1);
    expect(result.totalReviewsTodayDate).toBe('2026-02-10');
  });

  it('increments on same day', () => {
    const data = makeData({ totalReviewsCompletedToday: 3, totalReviewsTodayDate: '2026-02-10' });
    const result = incrementDailyReviews(data, ts('2026-02-10'));
    expect(result.totalReviewsCompletedToday).toBe(4);
  });
});

// ─── Weekly Activity ─────────────────────────────────────────────────────────

describe('getWeekActivityDayCount', () => {
  it('counts unique days in current ISO week', () => {
    // 2026-W07 starts Mon 2026-02-09
    const log = [
      { date: '2026-02-09', activities: 2 },
      { date: '2026-02-10', activities: 1 },
      { date: '2026-02-11', activities: 3 },
      { date: '2026-02-02', activities: 1 }, // previous week
    ];
    expect(getWeekActivityDayCount(log, ts('2026-02-10'))).toBe(3);
  });

  it('returns 0 for no activity this week', () => {
    const log = [{ date: '2026-02-02', activities: 1 }];
    expect(getWeekActivityDayCount(log, ts('2026-02-10'))).toBe(0);
  });
});
