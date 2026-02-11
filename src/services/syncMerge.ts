/**
 * Pure merge functions for bidirectional cloud sync.
 * Each domain has a specific conflict resolution strategy:
 * - Preferences: last-write-wins (compare updated_at)
 * - Curriculum progress: union modules, higher scores, higher review counts
 * - Gamification: max counters, union activity/achievements, higher streak
 *
 * All functions are pure — no side effects, no store access.
 */

import type { CurriculumProgress } from '../core/types/curriculum';
import type { ModuleExerciseResult, ModuleReviewSchedule } from '../core/types/exercise';
import type {
  GamificationData,
  ActivityDay,
  AchievementRecord,
  XPEvent,
} from '../core/types/gamification';
import type { ConceptRecord, ConceptHistoryEntry } from '../state/conceptStore';

// ─── Preferences ─────────────────────────────────────────────────────────────

/** Subset of AppState that gets synced as preferences */
export interface PreferencesSnapshot {
  selectedKey: { natural: string; accidental: string };
  selectedScale: string;
  instrument: string;
  guitarTuningId: string;
  baseOctave: number;
  colorMode: string;
  scaleOctaves: 1 | 2;
  volume: number;
  themeMode: string;
  synthPreset: string;
  midiOutputEnabled: boolean;
  midiOutputDeviceId: string | null;
  midiInputEnabled: boolean;
  midiInputDeviceId: string | null;
  metronomeBPM: number;
  metronomeBeats: number;
  metronomeVolume: number;
  language: string;
  updatedAt: number;
}

/**
 * Last-write-wins: return whichever snapshot has the later updatedAt.
 */
export function mergePreferences(
  local: PreferencesSnapshot,
  remote: PreferencesSnapshot,
): PreferencesSnapshot {
  return local.updatedAt >= remote.updatedAt ? local : remote;
}

// ─── Curriculum Progress ─────────────────────────────────────────────────────

/**
 * Union merge for curriculum progress:
 * - completedModules: union of both sets
 * - moduleProgress: union of task IDs per module
 * - exerciseResults: higher score per exercise, higher attempts
 * - reviewSchedules: higher reviewCount, later nextReviewAt
 */
export function mergeProgress(
  local: CurriculumProgress,
  remote: CurriculumProgress,
): CurriculumProgress {
  // Union completed modules
  const completedModules = Array.from(
    new Set([...local.completedModules, ...remote.completedModules]),
  );

  // Union module progress (task completion)
  const allModuleIds = new Set([
    ...Object.keys(local.moduleProgress),
    ...Object.keys(remote.moduleProgress),
  ]);
  const moduleProgress: Record<string, string[]> = {};
  for (const moduleId of allModuleIds) {
    const localTasks = local.moduleProgress[moduleId] ?? [];
    const remoteTasks = remote.moduleProgress[moduleId] ?? [];
    moduleProgress[moduleId] = Array.from(new Set([...localTasks, ...remoteTasks]));
  }

  // Merge exercise results
  const localResults = local.exerciseResults ?? {};
  const remoteResults = remote.exerciseResults ?? {};
  const allResultIds = new Set([
    ...Object.keys(localResults),
    ...Object.keys(remoteResults),
  ]);
  const exerciseResults: Record<string, ModuleExerciseResult> = {};
  for (const moduleId of allResultIds) {
    const l = localResults[moduleId];
    const r = remoteResults[moduleId];
    if (!l) { exerciseResults[moduleId] = r!; continue; }
    if (!r) { exerciseResults[moduleId] = l; continue; }
    exerciseResults[moduleId] = mergeModuleExerciseResult(l, r);
  }

  // Merge review schedules
  const localSchedules = local.reviewSchedules ?? {};
  const remoteSchedules = remote.reviewSchedules ?? {};
  const allScheduleIds = new Set([
    ...Object.keys(localSchedules),
    ...Object.keys(remoteSchedules),
  ]);
  const reviewSchedules: Record<string, ModuleReviewSchedule> = {};
  for (const moduleId of allScheduleIds) {
    const l = localSchedules[moduleId];
    const r = remoteSchedules[moduleId];
    if (!l) { reviewSchedules[moduleId] = r!; continue; }
    if (!r) { reviewSchedules[moduleId] = l; continue; }
    reviewSchedules[moduleId] = mergeReviewSchedule(l, r);
  }

  return { completedModules, moduleProgress, exerciseResults, reviewSchedules };
}

function mergeModuleExerciseResult(
  local: ModuleExerciseResult,
  remote: ModuleExerciseResult,
): ModuleExerciseResult {
  // Merge scores: take higher score per exercise
  const allExerciseIds = new Set([
    ...Object.keys(local.scores),
    ...Object.keys(remote.scores),
  ]);
  const scores: Record<string, 0 | 0.5 | 1> = {};
  for (const id of allExerciseIds) {
    const lScore = local.scores[id] ?? 0;
    const rScore = remote.scores[id] ?? 0;
    scores[id] = (Math.max(lScore, rScore) as 0 | 0.5 | 1);
  }

  return {
    scores,
    totalAttempts: Math.max(local.totalAttempts, remote.totalAttempts),
    lastAttemptAt: Math.max(local.lastAttemptAt, remote.lastAttemptAt),
    passed: local.passed || remote.passed,
  };
}

function mergeReviewSchedule(
  local: ModuleReviewSchedule,
  remote: ModuleReviewSchedule,
): ModuleReviewSchedule {
  // Take the schedule with more reviews (more progress)
  if (local.reviewCount !== remote.reviewCount) {
    return local.reviewCount > remote.reviewCount ? local : remote;
  }
  // Same review count: prefer later nextReviewAt (more recent review)
  return local.lastReviewedAt >= remote.lastReviewedAt ? local : remote;
}

// ─── Gamification ────────────────────────────────────────────────────────────

/**
 * Max counters, union activity/achievements, higher streak.
 */
export function mergeGamification(
  local: GamificationData,
  remote: GamificationData,
): GamificationData {
  return {
    activityLog: mergeActivityLogs(local.activityLog, remote.activityLog),
    streak: {
      currentStreak: Math.max(local.streak.currentStreak, remote.streak.currentStreak),
      bestStreak: Math.max(local.streak.bestStreak, remote.streak.bestStreak),
      lastActivityDate: maxDateString(local.streak.lastActivityDate, remote.streak.lastActivityDate),
      graceUsedDate: maxDateString(local.streak.graceUsedDate, remote.streak.graceUsedDate),
    },
    totalXP: Math.max(local.totalXP, remote.totalXP),
    weeklyXP: mergeWeeklyXP(local, remote),
    weeklyXPWeek: local.weeklyXPWeek >= remote.weeklyXPWeek
      ? local.weeklyXPWeek
      : remote.weeklyXPWeek,
    recentXPEvents: mergeXPEvents(local.recentXPEvents, remote.recentXPEvents),
    achievements: mergeAchievements(local.achievements, remote.achievements),
    totalExercisesAttempted: Math.max(local.totalExercisesAttempted, remote.totalExercisesAttempted),
    totalPerfectExercises: Math.max(local.totalPerfectExercises, remote.totalPerfectExercises),
    totalModulesCompleted: Math.max(local.totalModulesCompleted, remote.totalModulesCompleted),
    totalReviewsCompleted: Math.max(local.totalReviewsCompleted, remote.totalReviewsCompleted),
    totalReviewsCompletedToday: Math.max(local.totalReviewsCompletedToday, remote.totalReviewsCompletedToday),
    totalReviewsTodayDate: maxDateString(local.totalReviewsTodayDate, remote.totalReviewsTodayDate),
  };
}

function mergeWeeklyXP(local: GamificationData, remote: GamificationData): number {
  // If same week, take max. Otherwise take whichever is the later week.
  if (local.weeklyXPWeek === remote.weeklyXPWeek) return Math.max(local.weeklyXP, remote.weeklyXP);
  return local.weeklyXPWeek > remote.weeklyXPWeek ? local.weeklyXP : remote.weeklyXP;
}

function mergeActivityLogs(local: ActivityDay[], remote: ActivityDay[]): ActivityDay[] {
  const map = new Map<string, number>();
  for (const day of local) map.set(day.date, day.activities);
  for (const day of remote) {
    const existing = map.get(day.date) ?? 0;
    map.set(day.date, Math.max(existing, day.activities));
  }
  return Array.from(map.entries())
    .map(([date, activities]) => ({ date, activities }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function mergeAchievements(local: AchievementRecord[], remote: AchievementRecord[]): AchievementRecord[] {
  const map = new Map<string, AchievementRecord>();
  for (const a of local) map.set(a.id, a);
  for (const a of remote) {
    const existing = map.get(a.id);
    if (!existing || a.unlockedAt < existing.unlockedAt) {
      map.set(a.id, a);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.unlockedAt - b.unlockedAt);
}

function mergeXPEvents(local: XPEvent[], remote: XPEvent[]): XPEvent[] {
  // Deduplicate by timestamp+type+ref, keep max 50, sorted by timestamp desc
  const seen = new Set<string>();
  const merged: XPEvent[] = [];
  for (const ev of [...local, ...remote]) {
    const key = `${ev.timestamp}:${ev.type}:${ev.ref ?? ''}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(ev);
    }
  }
  merged.sort((a, b) => b.timestamp - a.timestamp);
  return merged.slice(0, 50);
}

function maxDateString(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a >= b ? a : b;
}

// ─── Concept Tracking ────────────────────────────────────────────────────────

/**
 * Per concept: union history entries by date (take max correct/total per date),
 * sum lifetime totals.
 */
export function mergeConceptTracking(
  local: Record<string, ConceptRecord>,
  remote: Record<string, ConceptRecord>,
): Record<string, ConceptRecord> {
  const allIds = new Set([...Object.keys(local), ...Object.keys(remote)]);
  const merged: Record<string, ConceptRecord> = {};

  for (const id of allIds) {
    const l = local[id];
    const r = remote[id];
    if (!l) { merged[id] = r!; continue; }
    if (!r) { merged[id] = l; continue; }
    merged[id] = mergeConceptRecord(l, r);
  }

  return merged;
}

function mergeConceptRecord(local: ConceptRecord, remote: ConceptRecord): ConceptRecord {
  // Merge history: per date, take max correct/total
  const historyMap = new Map<string, ConceptHistoryEntry>();
  for (const entry of local.history) {
    historyMap.set(entry.date, entry);
  }
  for (const entry of remote.history) {
    const existing = historyMap.get(entry.date);
    if (!existing) {
      historyMap.set(entry.date, entry);
    } else {
      historyMap.set(entry.date, {
        date: entry.date,
        correct: Math.max(existing.correct, entry.correct),
        total: Math.max(existing.total, entry.total),
      });
    }
  }

  const history = Array.from(historyMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return {
    correct: Math.max(local.correct, remote.correct),
    total: Math.max(local.total, remote.total),
    history,
  };
}
