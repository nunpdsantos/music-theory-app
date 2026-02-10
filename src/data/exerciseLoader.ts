/**
 * Exercise data loader — enables code-splitting of exercise data per level.
 * Mirrors the curriculumLoader.ts pattern: dynamic import + cache.
 * Merges hand-authored exercises with programmatically generated ones.
 */
import type { ExerciseDefinition } from '../core/types/exercise';
import type { ModuleTemplateConfig } from './exercises/exerciseTemplates';
import { generateAllForLevel, mergeExerciseMaps } from './exercises/exerciseGenerator';

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

const TEMPLATE_IMPORTERS: Record<string, () => Promise<{ default: ModuleTemplateConfig[] }>> = {
  l1: () => import('./exercises/templatesL1'),
  l2: () => import('./exercises/templatesL2'),
  l3: () => import('./exercises/templatesL3'),
  l4: () => import('./exercises/templatesL4'),
  l5: () => import('./exercises/templatesL5'),
  l6: () => import('./exercises/templatesL6'),
  l7: () => import('./exercises/templatesL7'),
  l8: () => import('./exercises/templatesL8'),
  l9: () => import('./exercises/templatesL9'),
};

const exerciseCache = new Map<string, ExerciseMap>();

export async function loadExercises(levelId: string): Promise<ExerciseMap> {
  const cached = exerciseCache.get(levelId);
  if (cached) return cached;

  const importer = EXERCISE_IMPORTERS[levelId];
  if (!importer) return {};

  // Load hand-authored exercises
  const mod = await importer();
  let exercises = mod.default;

  // Load and merge generated exercises from templates
  const templateImporter = TEMPLATE_IMPORTERS[levelId];
  if (templateImporter) {
    try {
      const templateMod = await templateImporter();
      const generated = generateAllForLevel(templateMod.default);
      exercises = mergeExerciseMaps(exercises, generated);
    } catch {
      // Template file may not exist yet — silently continue with authored only
    }
  }

  exerciseCache.set(levelId, exercises);
  return exercises;
}

export function getExercisesForModule(
  exerciseMap: ExerciseMap,
  moduleId: string,
): ExerciseDefinition[] {
  return exerciseMap[moduleId] ?? [];
}
