import { useState, useCallback, useEffect } from 'react';
import type { CurriculumProgress } from '../core/types/curriculum';
import { getDefaultProgress } from '../core/constants/curriculum';

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

  return {
    progress,
    toggleTask,
    completeModule,
    uncompleteModule,
    isModuleCompleted,
    isTaskCompleted,
    getModuleCompletedTaskCount,
    getUnitCompletedModuleCount,
  };
}
