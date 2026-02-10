import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { CurriculumProgress, CurriculumLevel, CurriculumUnit, LevelState } from '../core/types/curriculum';
import type { ModuleExerciseResult, ModuleReviewSchedule } from '../core/types/exercise';
import {
  getDefaultProgress,
  getLevelCompletedModuleCount as _getLevelCompleted,
  getLevelModuleCount,
  isLevelCompleted as _isLevelCompleted,
  isUnitCompleted as _isUnitCompleted,
  computeLevelState,
} from '../data/curriculumLoader';
import {
  createInitialSchedule,
  updateScheduleAfterReview,
  getDueReviewModuleIds,
  getDueReviewCount,
  backfillSchedules,
} from '../services/spacedRepetition';

const STORAGE_KEY = 'music-theory-progress';

function loadProgress(): CurriculumProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted data — start fresh
  }
  return getDefaultProgress();
}

function saveProgress(progress: CurriculumProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useLearnProgress() {
  const [progress, setProgress] = useState<CurriculumProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const toggleTask = useCallback((moduleId: string, taskId: string) => {
    setProgress((prev) => {
      const moduleTasks = prev.moduleProgress[moduleId] ?? [];
      const isCompleted = moduleTasks.includes(taskId);
      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: isCompleted
            ? moduleTasks.filter((id) => id !== taskId)
            : [...moduleTasks, taskId],
        },
      };
    });
  }, []);

  const completeModule = useCallback((moduleId: string) => {
    setProgress((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        reviewSchedules: {
          ...(prev.reviewSchedules ?? {}),
          [moduleId]: createInitialSchedule(Date.now()),
        },
      };
    });
  }, []);

  const uncompleteModule = useCallback((moduleId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedModules: prev.completedModules.filter((id) => id !== moduleId),
    }));
  }, []);

  const isModuleCompleted = useCallback(
    (moduleId: string) => progress.completedModules.includes(moduleId),
    [progress.completedModules],
  );

  const isTaskCompleted = useCallback(
    (moduleId: string, taskId: string) =>
      (progress.moduleProgress[moduleId] ?? []).includes(taskId),
    [progress.moduleProgress],
  );

  const getModuleCompletedTaskCount = useCallback(
    (moduleId: string) => (progress.moduleProgress[moduleId] ?? []).length,
    [progress.moduleProgress],
  );

  const getUnitCompletedModuleCount = useCallback(
    (moduleIds: string[]) =>
      moduleIds.filter((id) => progress.completedModules.includes(id)).length,
    [progress.completedModules],
  );

  // ─── Exercise tracking ─────────────────────────────────────────────────────

  const recordExerciseResult = useCallback(
    (moduleId: string, exerciseId: string, score: 0 | 0.5 | 1) => {
      setProgress((prev) => {
        const results = prev.exerciseResults ?? {};
        const existing = results[moduleId] ?? {
          scores: {},
          totalAttempts: 0,
          lastAttemptAt: 0,
          passed: false,
        };
        const updatedScores = { ...existing.scores, [exerciseId]: score };
        const totalAttempts = existing.totalAttempts + 1;
        const lastAttemptAt = Date.now();

        return {
          ...prev,
          exerciseResults: {
            ...results,
            [moduleId]: {
              scores: updatedScores,
              totalAttempts,
              lastAttemptAt,
              // passed is computed externally via isModuleExercisesPassed
              passed: existing.passed,
            },
          },
        };
      });
    },
    [],
  );

  const markExercisesPassed = useCallback(
    (moduleId: string) => {
      setProgress((prev) => {
        const results = prev.exerciseResults ?? {};
        const existing = results[moduleId];
        if (!existing) return prev;
        return {
          ...prev,
          exerciseResults: {
            ...results,
            [moduleId]: { ...existing, passed: true },
          },
        };
      });
    },
    [],
  );

  const getModuleExerciseResult = useCallback(
    (moduleId: string): ModuleExerciseResult | undefined =>
      (progress.exerciseResults ?? {})[moduleId],
    [progress.exerciseResults],
  );

  const getModuleExerciseScore = useCallback(
    (moduleId: string, totalExercises: number): { earned: number; total: number } => {
      const result = (progress.exerciseResults ?? {})[moduleId];
      if (!result) return { earned: 0, total: totalExercises };
      const earned = Object.values(result.scores).reduce<number>((sum, s) => sum + s, 0);
      return { earned, total: totalExercises };
    },
    [progress.exerciseResults],
  );

  const isModuleExercisesPassed = useCallback(
    (moduleId: string, totalExercises: number): boolean => {
      if (totalExercises === 0) return true;
      const result = (progress.exerciseResults ?? {})[moduleId];
      if (!result) return false;
      if (result.passed) return true;
      const earned = Object.values(result.scores).reduce<number>((sum, s) => sum + s, 0);
      return earned >= totalExercises * 0.8;
    },
    [progress.exerciseResults],
  );

  // Level-aware helpers
  const getLevelCompletedModuleCount = useCallback(
    (level: CurriculumLevel) => _getLevelCompleted(level, progress.completedModules),
    [progress.completedModules],
  );

  const isLevelCompleted = useCallback(
    (level: CurriculumLevel) => _isLevelCompleted(level, progress.completedModules),
    [progress.completedModules],
  );

  const isUnitCompleted = useCallback(
    (unit: CurriculumUnit) => _isUnitCompleted(unit, progress.completedModules),
    [progress.completedModules],
  );

  const getLevelState = useCallback(
    (level: CurriculumLevel, allLevels: CurriculumLevel[]): LevelState =>
      computeLevelState(level, allLevels, progress.completedModules),
    [progress.completedModules],
  );

  // ─── Spaced repetition ──────────────────────────────────────────────────────

  // One-time backfill for modules completed before SRS existed
  const backfillDone = useRef(false);
  useEffect(() => {
    if (backfillDone.current) return;
    if (progress.completedModules.length === 0) return;

    const existing = progress.reviewSchedules ?? {};
    const needsBackfill = progress.completedModules.some((id) => !existing[id]);
    if (!needsBackfill) return;

    backfillDone.current = true;
    setProgress((prev) => ({
      ...prev,
      reviewSchedules: backfillSchedules(prev, Date.now()),
    }));
  }, [progress.completedModules, progress.reviewSchedules]);

  const scheduleModuleReview = useCallback((moduleId: string) => {
    setProgress((prev) => ({
      ...prev,
      reviewSchedules: {
        ...(prev.reviewSchedules ?? {}),
        [moduleId]: createInitialSchedule(Date.now()),
      },
    }));
  }, []);

  const recordReviewResult = useCallback((moduleId: string, passed: boolean) => {
    setProgress((prev) => {
      const schedules = prev.reviewSchedules ?? {};
      const existing = schedules[moduleId];
      if (!existing) return prev;
      return {
        ...prev,
        reviewSchedules: {
          ...schedules,
          [moduleId]: updateScheduleAfterReview(existing, passed, Date.now()),
        },
      };
    });
  }, []);

  const getReviewQueue = useCallback(
    () => getDueReviewModuleIds(progress, Date.now()),
    [progress],
  );

  const reviewDueCount = useMemo(
    () => getDueReviewCount(progress, Date.now()),
    [progress],
  );

  const getModuleReviewSchedule = useCallback(
    (moduleId: string): ModuleReviewSchedule | undefined =>
      (progress.reviewSchedules ?? {})[moduleId],
    [progress.reviewSchedules],
  );

  return {
    progress,
    toggleTask,
    completeModule,
    uncompleteModule,
    isModuleCompleted,
    isTaskCompleted,
    getModuleCompletedTaskCount,
    getUnitCompletedModuleCount,
    getLevelCompletedModuleCount,
    isLevelCompleted,
    isUnitCompleted,
    getLevelState,
    // Exercise tracking
    recordExerciseResult,
    markExercisesPassed,
    getModuleExerciseResult,
    getModuleExerciseScore,
    isModuleExercisesPassed,
    // Spaced repetition
    scheduleModuleReview,
    recordReviewResult,
    getReviewQueue,
    reviewDueCount,
    getModuleReviewSchedule,
  };
}
