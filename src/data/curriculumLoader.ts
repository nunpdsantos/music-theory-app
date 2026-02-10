/**
 * Lightweight curriculum data loader — enables code-splitting of L1–L9 data.
 *
 * LEVEL_METADATA is statically available (~2 KB) for card rendering.
 * Full level data (units/modules/concepts/tasks) loads on demand via loadLevel().
 *
 * All helper functions here are self-contained — they do NOT import from
 * core/constants/levels.ts, curriculum.ts, or levelHelpers.ts, which would
 * transitively pull all 9 curriculum files into a single chunk.
 */
import type {
  CurriculumLevel,
  CurriculumUnit,
  CurriculumModule,
  CurriculumProgress,
  DifficultyTier,
  LevelState,
} from '../core/types/curriculum';

// ─── Lightweight metadata ────────────────────────────────────────────────────

export interface LevelMeta {
  id: string;
  number: number;
  title: string;
  description: string;
  difficulty: DifficultyTier;
  difficultyLabel: string;
  accentColor: string;
  prerequisites: string[];
  parallel?: boolean;
  comingSoon?: boolean;
  unitCount: number;
  moduleCount: number;
}

export const LEVEL_METADATA: LevelMeta[] = [
  { id: 'l1', number: 1, title: 'Foundations of Music Literacy', description: 'Staff notation, pitch fundamentals, rhythm and meter, the major scale, basic intervals, and major triads.', difficulty: 'beginner', difficultyLabel: 'Absolute Beginner', accentColor: '#60A5FA', prerequisites: [], unitCount: 3, moduleCount: 10 },
  { id: 'l2', number: 2, title: 'Expanding Fundamentals', description: 'All key signatures, scale degree names, minor scales, compound meter, syncopation, interval quality, all triad types, inversions, and diatonic harmony.', difficulty: 'beginner', difficultyLabel: 'Beginner', accentColor: '#38BDF8', prerequisites: ['l1'], unitCount: 4, moduleCount: 12 },
  { id: 'l3', number: 3, title: 'Harmony Foundations', description: 'Seventh chords, voice leading, cadences, phrase structure, and non-chord tones.', difficulty: 'beginner', difficultyLabel: 'Upper Beginner', accentColor: '#34D399', prerequisites: ['l2'], unitCount: 3, moduleCount: 13 },
  { id: 'l4', number: 4, title: 'Diatonic Mastery', description: 'Advanced non-chord tones, dominant seventh mastery, harmonic function, sequences, and counterpoint.', difficulty: 'intermediate', difficultyLabel: 'Intermediate', accentColor: '#2DD4BF', prerequisites: ['l3'], unitCount: 3, moduleCount: 15 },
  { id: 'l5', number: 5, title: 'Chromaticism & Modulation', description: 'Secondary dominants, tonicization, modulation, mode mixture, and musical form.', difficulty: 'intermediate', difficultyLabel: 'Upper Intermediate', accentColor: '#FBBF24', prerequisites: ['l4'], unitCount: 3, moduleCount: 14 },
  { id: 'l6', number: 6, title: 'Chromatic Harmony', description: 'Neapolitan chord, augmented sixths, enharmonic modulation, and advanced counterpoint.', difficulty: 'intermediate', difficultyLabel: 'Advanced Intermediate', accentColor: '#FB923C', prerequisites: ['l5'], unitCount: 3, moduleCount: 12 },
  { id: 'l7', number: 7, title: 'Jazz, Pop & Modal Harmony', description: 'Jazz chord symbols, ii-V-I progressions, modal harmony, pop analysis, and complete scale/chord taxonomy.', difficulty: 'advanced', difficultyLabel: 'Advanced', accentColor: '#F472B6', prerequisites: ['l6'], unitCount: 3, moduleCount: 16 },
  { id: 'l8', number: 8, title: 'Analysis, Counterpoint & Post-Tonal', description: 'Fugue analysis, large form, orchestration, set theory, and twentieth-century techniques.', difficulty: 'advanced', difficultyLabel: 'Advanced', accentColor: '#A78BFA', prerequisites: ['l7'], unitCount: 3, moduleCount: 11 },
  { id: 'l9', number: 9, title: 'Ear Training & Aural Skills', description: 'Interval recognition, chord identification, melodic dictation, sight singing, and contextual listening.', difficulty: 'beginner', difficultyLabel: 'All Levels', accentColor: '#F87171', prerequisites: [], parallel: true, unitCount: 3, moduleCount: 15 },
];

// ─── Dynamic level loading ───────────────────────────────────────────────────

const LEVEL_IMPORTERS: Record<string, () => Promise<Record<string, CurriculumUnit[]>>> = {
  l1: () => import('../core/constants/curriculumL1'),
  l2: () => import('../core/constants/curriculumL2'),
  l3: () => import('../core/constants/curriculumL3'),
  l4: () => import('../core/constants/curriculumL4'),
  l5: () => import('../core/constants/curriculumL5'),
  l6: () => import('../core/constants/curriculumL6'),
  l7: () => import('../core/constants/curriculumL7'),
  l8: () => import('../core/constants/curriculumL8'),
  l9: () => import('../core/constants/curriculumL9'),
};

const UNITS_KEYS: Record<string, string> = {
  l1: 'L1_UNITS', l2: 'L2_UNITS', l3: 'L3_UNITS',
  l4: 'L4_UNITS', l5: 'L5_UNITS', l6: 'L6_UNITS',
  l7: 'L7_UNITS', l8: 'L8_UNITS', l9: 'L9_UNITS',
};

const levelCache = new Map<string, CurriculumLevel>();

export async function loadLevel(levelId: string): Promise<CurriculumLevel | undefined> {
  const cached = levelCache.get(levelId);
  if (cached) return cached;

  const meta = LEVEL_METADATA.find((m) => m.id === levelId);
  if (!meta) return undefined;

  const importer = LEVEL_IMPORTERS[levelId];
  if (!importer) return undefined;

  const mod = await importer();
  const units: CurriculumUnit[] = mod[UNITS_KEYS[levelId]] ?? [];

  const level: CurriculumLevel = {
    id: meta.id,
    number: meta.number,
    title: meta.title,
    description: meta.description,
    difficulty: meta.difficulty,
    difficultyLabel: meta.difficultyLabel,
    accentColor: meta.accentColor,
    prerequisites: meta.prerequisites,
    parallel: meta.parallel,
    comingSoon: meta.comingSoon,
    units,
  };

  levelCache.set(levelId, level);
  return level;
}

export async function loadAllLevels(): Promise<CurriculumLevel[]> {
  const results = await Promise.all(LEVEL_METADATA.map((m) => loadLevel(m.id)));
  return results.filter((l): l is CurriculumLevel => l !== undefined);
}

// ─── Pure utility functions (no static curriculum data imports) ──────────────

export function getLevelModuleCount(level: CurriculumLevel): number {
  return level.units.reduce((sum, u) => sum + u.modules.length, 0);
}

export function getLevelCompletedModuleCount(
  level: CurriculumLevel,
  completedModules: string[],
): number {
  let count = 0;
  for (const unit of level.units) {
    for (const mod of unit.modules) {
      if (completedModules.includes(mod.id)) count++;
    }
  }
  return count;
}

export function isLevelCompleted(
  level: CurriculumLevel,
  completedModules: string[],
): boolean {
  const total = getLevelModuleCount(level);
  if (total === 0) return false;
  return getLevelCompletedModuleCount(level, completedModules) === total;
}

export function isUnitCompleted(
  unit: CurriculumUnit,
  completedModules: string[],
): boolean {
  if (unit.modules.length === 0) return false;
  return unit.modules.every((m) => completedModules.includes(m.id));
}

export function computeLevelState(
  level: CurriculumLevel,
  allLevels: CurriculumLevel[],
  completedModules: string[],
): LevelState {
  if (level.comingSoon) return 'coming-soon';
  for (const prereqId of level.prerequisites) {
    const prereq = allLevels.find((l) => l.id === prereqId);
    if (prereq && !isLevelCompleted(prereq, completedModules)) return 'locked';
  }
  const total = getLevelModuleCount(level);
  if (total === 0) return 'coming-soon';
  const completed = getLevelCompletedModuleCount(level, completedModules);
  if (completed === total) return 'completed';
  if (completed > 0) return 'in-progress';
  return 'available';
}

// ─── Metadata-only helpers (no full level data needed) ───────────────────────

/** Count completed modules for a level using module ID prefix convention */
function countLevelCompletedModulesMeta(levelId: string, completedModules: string[]): number {
  return completedModules.filter((id) => id.startsWith(levelId)).length;
}

function isLevelCompletedMeta(meta: LevelMeta, completedModules: string[]): boolean {
  if (meta.moduleCount === 0) return false;
  return countLevelCompletedModulesMeta(meta.id, completedModules) >= meta.moduleCount;
}

export function computeLevelStateMeta(
  meta: LevelMeta,
  allMeta: LevelMeta[],
  completedModules: string[],
): LevelState {
  if (meta.comingSoon) return 'coming-soon';
  for (const prereqId of meta.prerequisites) {
    const prereq = allMeta.find((m) => m.id === prereqId);
    if (prereq && !isLevelCompletedMeta(prereq, completedModules)) return 'locked';
  }
  if (meta.moduleCount === 0) return 'coming-soon';
  const completed = countLevelCompletedModulesMeta(meta.id, completedModules);
  if (completed >= meta.moduleCount) return 'completed';
  if (completed > 0) return 'in-progress';
  return 'available';
}

export function getLevelCompletedCountMeta(levelId: string, completedModules: string[]): number {
  return countLevelCompletedModulesMeta(levelId, completedModules);
}

// ─── Module navigation helpers ───────────────────────────────────────────────

export function areModulePrereqsMet(
  module: CurriculumModule,
  progress: CurriculumProgress,
): boolean {
  return module.prerequisites.every((prereq) => progress.completedModules.includes(prereq));
}

export function getNextModuleInLevel(
  currentModuleId: string,
  level: CurriculumLevel,
): CurriculumModule | undefined {
  const allModules = level.units.flatMap((u) => u.modules);
  const index = allModules.findIndex((m) => m.id === currentModuleId);
  if (index === -1 || index === allModules.length - 1) return undefined;
  return allModules[index + 1];
}

export function getPreviousModuleInLevel(
  currentModuleId: string,
  level: CurriculumLevel,
): CurriculumModule | undefined {
  const allModules = level.units.flatMap((u) => u.modules);
  const index = allModules.findIndex((m) => m.id === currentModuleId);
  if (index <= 0) return undefined;
  return allModules[index - 1];
}

export function findNextIncompleteModule(
  progress: CurriculumProgress,
  levels: CurriculumLevel[],
): { module: CurriculumModule; unit: CurriculumUnit; level: CurriculumLevel } | undefined {
  const candidates: { module: CurriculumModule; unit: CurriculumUnit; level: CurriculumLevel }[] = [];
  for (const level of levels) {
    if (level.comingSoon) continue;
    for (const unit of level.units) {
      for (const mod of unit.modules) {
        if (mod.comingSoon) continue;
        if (progress.completedModules.includes(mod.id)) continue;
        if (!areModulePrereqsMet(mod, progress)) continue;
        candidates.push({ module: mod, unit, level });
      }
    }
  }
  if (candidates.length === 0) return undefined;
  const inProgress = candidates.find((c) => progress.moduleProgress[c.module.id]?.length > 0);
  return inProgress ?? candidates[0];
}

export function getDefaultProgress(): CurriculumProgress {
  return { completedModules: [], moduleProgress: {}, exerciseResults: {}, reviewSchedules: {} };
}
