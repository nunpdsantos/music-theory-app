/**
 * Gamification Service — pure functions, zero React imports.
 * All functions accept injectable `now` param for deterministic testing.
 */
import type {
  GamificationData,
  ActivityDay,
  XPEvent,
  XPEventType,
  AchievementRecord,
} from '../core/types/gamification';
import { getDefaultGamificationData } from '../core/types/gamification';
import type { CurriculumProgress } from '../core/types/curriculum';

// ─── Date Helpers ────────────────────────────────────────────────────────────

const DAY_MS = 86_400_000;

/** Get ISO date string (YYYY-MM-DD) in UTC for a timestamp. */
export function getISODate(ts: number): string {
  const d = new Date(ts);
  return d.toISOString().slice(0, 10);
}

/** Get ISO week string (YYYY-Www) for a timestamp. */
export function getISOWeek(ts: number): string {
  const d = new Date(ts);
  d.setUTCHours(0, 0, 0, 0);
  // Set to nearest Thursday: current date + 4 - day number (Mon=1, Sun=7)
  const dayOfWeek = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / DAY_MS + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

/** Count calendar days between two YYYY-MM-DD strings. Positive if b > a. */
function daysBetween(a: string, b: string): number {
  const ta = new Date(a + 'T00:00:00Z').getTime();
  const tb = new Date(b + 'T00:00:00Z').getTime();
  return Math.round((tb - ta) / DAY_MS);
}

// ─── Activity + Streak ──────────────────────────────────────────────────────

/** Record an activity event for the current day and update streak. */
export function recordActivity(
  data: GamificationData,
  now: number,
): GamificationData {
  const today = getISODate(now);
  const updatedLog = addToActivityLog(data.activityLog, today);
  const updatedStreak = updateStreak(data.streak, today);

  return {
    ...data,
    activityLog: updatedLog,
    streak: updatedStreak,
  };
}

function addToActivityLog(log: ActivityDay[], date: string): ActivityDay[] {
  const existing = log.find((d) => d.date === date);
  if (existing) {
    return log.map((d) =>
      d.date === date ? { ...d, activities: d.activities + 1 } : d,
    );
  }
  return [...log, { date, activities: 1 }];
}

function updateStreak(streak: import('../core/types/gamification').StreakData, today: string) {
  const { lastActivityDate, currentStreak, bestStreak, graceUsedDate } = streak;

  // First ever activity
  if (!lastActivityDate) {
    return {
      currentStreak: 1,
      bestStreak: Math.max(bestStreak, 1),
      lastActivityDate: today,
      graceUsedDate: null,
    };
  }

  const gap = daysBetween(lastActivityDate, today);

  // Same day — no streak change
  if (gap === 0) {
    return streak;
  }

  // Consecutive day — increment
  if (gap === 1) {
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      bestStreak: Math.max(bestStreak, newStreak),
      lastActivityDate: today,
      graceUsedDate: null,
    };
  }

  // 2-day gap — grace period (streak preserved, not incremented)
  if (gap === 2 && graceUsedDate !== lastActivityDate) {
    return {
      currentStreak,
      bestStreak,
      lastActivityDate: today,
      graceUsedDate: lastActivityDate,
    };
  }

  // More than 2 days or grace already used — reset
  return {
    currentStreak: 1,
    bestStreak,
    lastActivityDate: today,
    graceUsedDate: null,
  };
}

/** Prune activity log to keep only the last 90 days. */
export function pruneActivityLog(log: ActivityDay[], now: number): ActivityDay[] {
  const cutoff = getISODate(now - 90 * DAY_MS);
  return log.filter((d) => d.date >= cutoff);
}

/** Check if a streak count is a milestone worth celebrating. */
export function isStreakMilestone(streak: number): boolean {
  return streak === 7 || streak === 14 || streak === 30 || streak === 60 || streak === 100;
}

// ─── XP System ──────────────────────────────────────────────────────────────

/** XP amounts by module level tier */
export function computeModuleXP(moduleId: string): number {
  const levelNum = parseInt(moduleId.slice(1), 10);
  if (levelNum <= 3) return 10;
  if (levelNum <= 6) return 15;
  return 20;
}

/** Award XP and add event to recent history. */
export function awardXP(
  data: GamificationData,
  type: XPEventType,
  xp: number,
  now: number,
  ref?: string,
): GamificationData {
  const event: XPEvent = { type, xp, timestamp: now, ref };
  const currentWeek = getISOWeek(now);

  // Reset weekly XP if new week
  const weeklyXP = data.weeklyXPWeek === currentWeek
    ? data.weeklyXP + xp
    : xp;

  // Keep last 50 events
  const recentXPEvents = [...data.recentXPEvents, event].slice(-50);

  return {
    ...data,
    totalXP: data.totalXP + xp,
    weeklyXP,
    weeklyXPWeek: currentWeek,
    recentXPEvents,
  };
}

/** Reset weekly XP if we're in a new ISO week. */
export function resetWeeklyXPIfNeeded(data: GamificationData, now: number): GamificationData {
  const currentWeek = getISOWeek(now);
  if (data.weeklyXPWeek === currentWeek) return data;
  return { ...data, weeklyXP: 0, weeklyXPWeek: currentWeek };
}

// ─── Achievements ───────────────────────────────────────────────────────────

export interface AchievementDefinition {
  id: string;
  category: 'curriculum' | 'streak' | 'exercise' | 'engagement';
  titleKey: string;
  descriptionKey: string;
  icon: string; // SVG path data
  check: (data: GamificationData, progress: CurriculumProgress) => boolean;
}

/** Check for newly unlocked achievements. Returns array of newly unlocked IDs. */
export function checkAchievements(
  data: GamificationData,
  progress: CurriculumProgress,
  definitions: AchievementDefinition[],
): string[] {
  const alreadyUnlocked = new Set(data.achievements.map((a) => a.id));
  const newlyUnlocked: string[] = [];

  for (const def of definitions) {
    if (alreadyUnlocked.has(def.id)) continue;
    if (def.check(data, progress)) {
      newlyUnlocked.push(def.id);
    }
  }

  return newlyUnlocked;
}

/** Add achievement records for newly unlocked achievements. */
export function unlockAchievements(
  data: GamificationData,
  ids: string[],
  now: number,
): GamificationData {
  if (ids.length === 0) return data;

  const newRecords: AchievementRecord[] = ids.map((id) => ({
    id,
    unlockedAt: now,
    notified: false,
  }));

  return {
    ...data,
    achievements: [...data.achievements, ...newRecords],
  };
}

/** Mark achievements as notified so toasts aren't repeated. */
export function markAchievementsNotified(
  data: GamificationData,
  ids: string[],
): GamificationData {
  const idSet = new Set(ids);
  return {
    ...data,
    achievements: data.achievements.map((a) =>
      idSet.has(a.id) ? { ...a, notified: true } : a,
    ),
  };
}

// ─── Backfill ───────────────────────────────────────────────────────────────

/** One-time backfill for users with existing progress but no gamification data. */
export function backfillFromProgress(
  progress: CurriculumProgress,
  now: number,
): GamificationData {
  const data: GamificationData = getDefaultGamificationData();

  const completedModules = progress.completedModules.length;
  data.totalModulesCompleted = completedModules;

  // Count exercises
  const results = progress.exerciseResults ?? {};
  let totalAttempts = 0;
  let totalPerfect = 0;
  for (const result of Object.values(results)) {
    totalAttempts += result.totalAttempts;
    totalPerfect += Object.values(result.scores).filter((s) => s === 1).length;
  }
  data.totalExercisesAttempted = totalAttempts;
  data.totalPerfectExercises = totalPerfect;

  // Count reviews
  const schedules = progress.reviewSchedules ?? {};
  let totalReviews = 0;
  for (const schedule of Object.values(schedules)) {
    totalReviews += schedule.reviewCount;
  }
  data.totalReviewsCompleted = totalReviews;

  // Compute backfill XP
  let xp = 0;
  for (const moduleId of progress.completedModules) {
    xp += computeModuleXP(moduleId);
  }
  // Level completion bonuses
  const levelCounts = new Map<string, number>();
  const LEVEL_MODULE_COUNTS: Record<string, number> = {
    l1: 10, l2: 12, l3: 13, l4: 15, l5: 14, l6: 12, l7: 16, l8: 11, l9: 15,
  };
  for (const moduleId of progress.completedModules) {
    const levelId = moduleId.slice(0, 2);
    levelCounts.set(levelId, (levelCounts.get(levelId) ?? 0) + 1);
  }
  for (const [levelId, count] of levelCounts) {
    if (count >= (LEVEL_MODULE_COUNTS[levelId] ?? Infinity)) {
      xp += 50; // level complete bonus
    }
  }
  // Exercise XP: 2 per perfect, 1 per partial
  for (const result of Object.values(results)) {
    for (const score of Object.values(result.scores)) {
      if (score === 1) xp += 2;
      else if (score === 0.5) xp += 1;
    }
  }
  // Review XP: 5 per review
  xp += totalReviews * 5;

  data.totalXP = xp;
  data.weeklyXPWeek = getISOWeek(now);

  return data;
}

// ─── Daily review counter ───────────────────────────────────────────────────

/** Increment daily review counter, resetting if it's a new day. */
export function incrementDailyReviews(data: GamificationData, now: number): GamificationData {
  const today = getISODate(now);
  if (data.totalReviewsTodayDate !== today) {
    return { ...data, totalReviewsCompletedToday: 1, totalReviewsTodayDate: today };
  }
  return { ...data, totalReviewsCompletedToday: data.totalReviewsCompletedToday + 1 };
}

// ─── Weekly activity count ──────────────────────────────────────────────────

/** Count unique activity days in the current ISO week. */
export function getWeekActivityDayCount(log: ActivityDay[], now: number): number {
  const currentWeek = getISOWeek(now);
  return log.filter((d) => getISOWeek(new Date(d.date + 'T00:00:00Z').getTime()) === currentWeek).length;
}
