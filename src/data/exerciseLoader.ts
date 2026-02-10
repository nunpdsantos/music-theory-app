/**
 * Exercise data loader — enables code-splitting of exercise data per level.
 * Mirrors the curriculumLoader.ts pattern: dynamic import + cache.
 */
import type { ExerciseDefinition } from '../core/types/exercise';

type ExerciseMap = Record<string, ExerciseDefinition[]>;

const EXERCISE_IMPORTERS: Record<string, () => Promise<{ default: ExerciseMap }>> = {
  l1: () => import('./exercises/exercisesL1'),
  l2: () => import('./exercises/exercisesL2'),
  l3: () => import('./exercises/exercisesL3'),
  l4: () => import('./exercises/exercisesL4'),
  l5: () => import('./exercises/exercisesL5'),
  l6: () => import('./exercises/exercisesL6'),
  l7: () => import('./exercises/exercisesL7'),
  l8: () => import('./exercises/exercisesL8'),
  l9: () => import('./exercises/exercisesL9'),
};

const exerciseCache = new Map<string, ExerciseMap>();

export async function loadExercises(levelId: string): Promise<ExerciseMap> {
  const cached = exerciseCache.get(levelId);
  if (cached) return cached;

  const importer = EXERCISE_IMPORTERS[levelId];
  if (!importer) return {};

  const mod = await importer();
  const exercises = mod.default;
  exerciseCache.set(levelId, exercises);
  return exercises;
}

export function getExercisesForModule(
  exerciseMap: ExerciseMap,
  moduleId: string,
): ExerciseDefinition[] {
  return exerciseMap[moduleId] ?? [];
}
