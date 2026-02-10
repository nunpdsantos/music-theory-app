/**
 * Spaced Repetition Service — pure functions, zero React imports.
 * All functions accept injectable `now` param for deterministic testing.
 */
import type { ModuleReviewSchedule } from '../core/types/exercise';
import type { CurriculumProgress } from '../core/types/curriculum';

// ─── Constants ──────────────────────────────────────────────────────────────

const DAY_MS = 86_400_000;

/** Interval levels 0-5 → milliseconds */
export const REVIEW_INTERVALS_MS: readonly number[] = [
  1 * DAY_MS,   // Level 0: 1 day
  3 * DAY_MS,   // Level 1: 3 days
  7 * DAY_MS,   // Level 2: 1 week
  14 * DAY_MS,  // Level 3: 2 weeks
  30 * DAY_MS,  // Level 4: 1 month
  90 * DAY_MS,  // Level 5: 3 months
];

const MAX_INTERVAL_LEVEL = REVIEW_INTERVALS_MS.length - 1;

/** Human-readable labels for each interval level */
const INTERVAL_LABELS: readonly string[] = [
  '1 day', '3 days', '1 week', '2 weeks', '1 month', '3 months',
];

// ─── Schedule Lifecycle ─────────────────────────────────────────────────────

/** Create an initial review schedule when a module is first completed. */
export function createInitialSchedule(now: number): ModuleReviewSchedule {
  return {
    completedAt: now,
    nextReviewAt: now + REVIEW_INTERVALS_MS[0],
    intervalLevel: 0,
    reviewCount: 0,
    lastReviewedAt: now,
  };
}

/** Update a schedule after a review attempt. Pass → advance interval. Fail → reset to 1 day. */
export function updateScheduleAfterReview(
  schedule: ModuleReviewSchedule,
  passed: boolean,
  now: number,
): ModuleReviewSchedule {
  const nextLevel = passed
    ? Math.min(schedule.intervalLevel + 1, MAX_INTERVAL_LEVEL)
    : 0;

  return {
    ...schedule,
    nextReviewAt: now + REVIEW_INTERVALS_MS[nextLevel],
    intervalLevel: nextLevel,
    reviewCount: schedule.reviewCount + 1,
    lastReviewedAt: now,
  };
}

// ─── Query Functions ────────────────────────────────────────────────────────

/** Check if a module is due for review right now. */
export function isDueForReview(schedule: ModuleReviewSchedule, now: number): boolean {
  return now >= schedule.nextReviewAt;
}

/** Get all module IDs that are due for review, sorted most-overdue-first. */
export function getDueReviewModuleIds(progress: CurriculumProgress, now: number): string[] {
  const schedules = progress.reviewSchedules;
  if (!schedules) return [];

  const due: { id: string; overdueBy: number }[] = [];

  for (const [moduleId, schedule] of Object.entries(schedules)) {
    if (now >= schedule.nextReviewAt) {
      due.push({ id: moduleId, overdueBy: now - schedule.nextReviewAt });
    }
  }

  due.sort((a, b) => b.overdueBy - a.overdueBy);
  return due.map((d) => d.id);
}

/** Count how many modules are due for review. */
export function getDueReviewCount(progress: CurriculumProgress, now: number): number {
  const schedules = progress.reviewSchedules;
  if (!schedules) return 0;

  let count = 0;
  for (const schedule of Object.values(schedules)) {
    if (now >= schedule.nextReviewAt) count++;
  }
  return count;
}

/**
 * Backfill schedules for modules completed before SRS existed.
 * Sets them as due immediately so they appear in the review queue.
 */
export function backfillSchedules(
  progress: CurriculumProgress,
  now: number,
): Record<string, ModuleReviewSchedule> {
  const existing = progress.reviewSchedules ?? {};
  const backfilled: Record<string, ModuleReviewSchedule> = { ...existing };

  for (const moduleId of progress.completedModules) {
    if (!backfilled[moduleId]) {
      backfilled[moduleId] = {
        completedAt: now,
        nextReviewAt: now, // Due immediately
        intervalLevel: 0,
        reviewCount: 0,
        lastReviewedAt: 0,
      };
    }
  }

  return backfilled;
}

// ─── Display Helpers ────────────────────────────────────────────────────────

/** Format the next review time as a human-readable relative string. */
export function formatNextReview(schedule: ModuleReviewSchedule, now: number): string {
  const diff = schedule.nextReviewAt - now;

  if (diff <= 0) return 'Due now';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return 'Due soon';
  if (hours < 24) return `In ${hours} hour${hours === 1 ? '' : 's'}`;

  const days = Math.floor(diff / DAY_MS);
  if (days === 1) return 'In 1 day';
  if (days < 7) return `In ${days} days`;
  if (days < 14) return 'In 1 week';
  if (days < 30) return `In ${Math.floor(days / 7)} weeks`;
  if (days < 60) return 'In 1 month';
  return `In ${Math.floor(days / 30)} months`;
}

/** Get the label for a given interval level. */
export function getIntervalLabel(intervalLevel: number): string {
  return INTERVAL_LABELS[intervalLevel] ?? INTERVAL_LABELS[MAX_INTERVAL_LEVEL];
}
