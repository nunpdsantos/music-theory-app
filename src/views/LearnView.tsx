import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import type { CurriculumLevel } from '../core/types/curriculum';
import type { ExerciseDefinition } from '../core/types/exercise';
import { loadLevel } from '../data/curriculumLoader';
import { loadExercises } from '../data/exerciseLoader';
import { useLearnProgress } from '../hooks/useLearnProgress';
import { LevelsOverview } from '../components/learn/LevelsOverview';
import { LevelDetail } from '../components/learn/LevelDetail';
import { UnitDetail } from '../components/learn/UnitDetail';
import { ModuleView } from '../components/learn/ModuleView';

// ─── Screen state machine ───────────────────────────────────────────────────

type LearnScreen =
  | { type: 'levels' }
  | { type: 'level'; levelId: string }
  | { type: 'unit'; levelId: string; unitId: string }
  | { type: 'module'; levelId: string; unitId: string; moduleId: string };

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 35 };

export function LearnView() {
  const [screen, setScreen] = useState<LearnScreen>({ type: 'levels' });
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    progress,
    toggleTask,
    completeModule,
    isModuleCompleted,
    isTaskCompleted,
    getModuleCompletedTaskCount,
    getUnitCompletedModuleCount,
    getLevelCompletedModuleCount,
    getLevelState,
    recordExerciseResult,
    markExercisesPassed,
    isModuleExercisesPassed,
  } = useLearnProgress();

  // Navigation helpers
  const navigate = useCallback((next: LearnScreen, dir: 'forward' | 'back') => {
    setDirection(dir);
    setScreen(next);
  }, []);

  const goToLevels = useCallback(() => navigate({ type: 'levels' }, 'back'), [navigate]);
  const goToLevel = useCallback((levelId: string) => navigate({ type: 'level', levelId }, 'forward'), [navigate]);
  const goToLevelBack = useCallback((levelId: string) => navigate({ type: 'level', levelId }, 'back'), [navigate]);
  const goToUnit = useCallback((levelId: string, unitId: string) => navigate({ type: 'unit', levelId, unitId }, 'forward'), [navigate]);
  const goToUnitBack = useCallback((levelId: string, unitId: string) => navigate({ type: 'unit', levelId, unitId }, 'back'), [navigate]);
  const goToModule = useCallback((levelId: string, unitId: string, moduleId: string) => navigate({ type: 'module', levelId, unitId, moduleId }, 'forward'), [navigate]);

  // Scroll to top on screen change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  // ─── Async level + exercise loading ─────────────────────────────────────────
  const [loadedLevel, setLoadedLevel] = useState<CurriculumLevel | null>(null);
  const [exercisesByModule, setExercisesByModule] = useState<Record<string, ExerciseDefinition[]>>({});
  const levelCacheRef = useRef<Map<string, CurriculumLevel>>(new Map());
  const exerciseCacheRef = useRef<Map<string, Record<string, ExerciseDefinition[]>>>(new Map());

  const activeLevelId = screen.type === 'levels' ? null : screen.levelId;

  useEffect(() => {
    if (!activeLevelId) {
      setLoadedLevel(null);
      setExercisesByModule({});
      return;
    }

    const cached = levelCacheRef.current.get(activeLevelId);
    if (cached) {
      setLoadedLevel(cached);
    } else {
      setLoadedLevel(null);
    }

    // Load exercises (may be empty for levels without authored exercises)
    const cachedEx = exerciseCacheRef.current.get(activeLevelId);
    if (cachedEx) {
      setExercisesByModule(cachedEx);
    } else {
      setExercisesByModule({});
    }

    let cancelled = false;

    // Load level data
    if (!cached) {
      loadLevel(activeLevelId).then((level) => {
        if (!cancelled && level) {
          levelCacheRef.current.set(activeLevelId, level);
          setLoadedLevel(level);
        }
      });
    }

    // Load exercise data
    if (!cachedEx) {
      loadExercises(activeLevelId).then((exercises) => {
        if (!cancelled) {
          exerciseCacheRef.current.set(activeLevelId, exercises);
          setExercisesByModule(exercises);
        }
      });
    }

    return () => { cancelled = true; };
  }, [activeLevelId]);

  const xOffset = direction === 'forward' ? 40 : -40;

  const loadingSpinner = (
    <div className="flex items-center justify-center py-24">
      <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--text-muted)' }} />
    </div>
  );

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto" role="region" aria-label="Learn music theory">
      <AnimatePresence mode="wait" initial={false}>
        {screen.type === 'levels' && (
          <m.div
            key="levels"
            initial={{ opacity: 0, x: -xOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: xOffset }}
            transition={SPRING}
          >
            <LevelsOverview
              progress={progress}
              onOpenLevel={goToLevel}
              onOpenModule={(moduleId, unitId, levelId) => goToModule(levelId, unitId, moduleId)}
            />
          </m.div>
        )}

        {screen.type === 'level' && (
          <m.div
            key={`level-${screen.levelId}`}
            initial={{ opacity: 0, x: xOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -xOffset }}
            transition={SPRING}
          >
            {!loadedLevel ? loadingSpinner : (
              <LevelDetail
                level={loadedLevel}
                progress={progress}
                isModuleCompleted={isModuleCompleted}
                getUnitCompletedModuleCount={getUnitCompletedModuleCount}
                onOpenUnit={(unitId) => goToUnit(screen.levelId, unitId)}
                onBack={goToLevels}
              />
            )}
          </m.div>
        )}

        {screen.type === 'unit' && (
          <m.div
            key={`unit-${screen.unitId}`}
            initial={{ opacity: 0, x: xOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -xOffset }}
            transition={SPRING}
          >
            {!loadedLevel ? loadingSpinner : (() => {
              const unitIndex = loadedLevel.units.findIndex((u) => u.id === screen.unitId);
              const unit = loadedLevel.units[unitIndex];
              if (!unit) return null;
              return (
                <UnitDetail
                  unit={unit}
                  unitIndex={unitIndex}
                  level={loadedLevel}
                  progress={progress}
                  isModuleCompleted={isModuleCompleted}
                  onOpenModule={(moduleId) => goToModule(screen.levelId, screen.unitId, moduleId)}
                  onBack={() => goToLevelBack(screen.levelId)}
                  onBackToLevels={goToLevels}
                />
              );
            })()}
          </m.div>
        )}

        {screen.type === 'module' && (
          <m.div
            key={`module-${screen.moduleId}`}
            initial={{ opacity: 0, x: xOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -xOffset }}
            transition={SPRING}
          >
            {!loadedLevel ? loadingSpinner : (() => {
              const unit = loadedLevel.units.find((u) => u.id === screen.unitId);
              if (!unit) return null;
              const moduleIndex = unit.modules.findIndex((m) => m.id === screen.moduleId);
              const mod = unit.modules[moduleIndex];
              if (!mod) return null;
              const unitIndex = loadedLevel.units.indexOf(unit);

              const modExercises = exercisesByModule[mod.id] ?? [];

              return (
                <ModuleView
                  module={mod}
                  unit={unit}
                  level={loadedLevel}
                  unitIndex={unitIndex}
                  moduleIndex={moduleIndex}
                  isModuleCompleted={isModuleCompleted(mod.id)}
                  isTaskCompleted={isTaskCompleted}
                  completedTaskCount={getModuleCompletedTaskCount(mod.id)}
                  exercises={modExercises}
                  exercisesPassed={isModuleExercisesPassed(mod.id, modExercises.length)}
                  onToggleTask={toggleTask}
                  onCompleteModule={completeModule}
                  onRecordExerciseResult={(exerciseId, score) => recordExerciseResult(mod.id, exerciseId, score)}
                  onExercisesComplete={(passed) => { if (passed) markExercisesPassed(mod.id); }}
                  onBack={() => goToUnitBack(screen.levelId, screen.unitId)}
                  onBackToLevels={goToLevels}
                  onNavigateModule={(moduleId) => goToModule(screen.levelId, screen.unitId, moduleId)}
                />
              );
            })()}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
