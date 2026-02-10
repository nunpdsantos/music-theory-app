import { useState, useCallback, useEffect } from 'react';
import type { CurriculumProgress, CurriculumLevel, CurriculumUnit, LevelState } from '../core/types/curriculum';
import type { ModuleExerciseResult } from '../core/types/exercise';
import {
  getDefaultProgress,
  getLevelCompletedModuleCount as _getLevelCompleted,
  getLevelModuleCount,
  isLevelCompleted as _isLevelCompleted,
  isUnitCompleted as _isUnitCompleted,
  computeLevelState,
} from '../data/curriculumLoader';

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
    setProgress((prev) => ({
      ...prev,
      completedModules: prev.completedModules.includes(moduleId)
        ? prev.completedModules
        : [...prev.completedModules, moduleId],
    }));
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
  };
}
