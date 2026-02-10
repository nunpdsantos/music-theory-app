import { useState, useCallback, useRef, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, m } from 'framer-motion';
import type { CurriculumLevel } from '../core/types/curriculum';
import type { ExerciseDefinition } from '../core/types/exercise';
import { loadLevel, getLevelModuleCount } from '../data/curriculumLoader';
import { loadExercises } from '../data/exerciseLoader';
import { useLearnProgress } from '../hooks/useLearnProgress';
import { useGamificationStore } from '../state/gamificationStore';
import { computeModuleXP } from '../services/gamification';
import { toast } from '../state/toastStore';
import { LevelsOverview } from '../components/learn/LevelsOverview';
import { LevelDetail } from '../components/learn/LevelDetail';
import { UnitDetail } from '../components/learn/UnitDetail';
import { ModuleView } from '../components/learn/ModuleView';
import { LevelAchievement } from '../components/learn/LevelAchievement';

const ProgressDashboard = lazy(() => import('../components/gamification/ProgressDashboard').then((m) => ({ default: m.ProgressDashboard })));

// ─── Screen state machine ───────────────────────────────────────────────────

type LearnScreen =
  | { type: 'levels' }
  | { type: 'level'; levelId: string }
  | { type: 'unit'; levelId: string; unitId: string }
  | { type: 'module'; levelId: string; unitId: string; moduleId: string }
  | { type: 'review'; levelId: string; unitId: string; moduleId: string }
  | { type: 'dashboard' };

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 35 };

interface LevelCelebration {
  levelNumber: number;
  accentColor: string;
  moduleCount: number;
}

export function LearnView() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<LearnScreen>({ type: 'levels' });
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [levelCelebration, setLevelCelebration] = useState<LevelCelebration | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Gamification store selectors (effects below, after progress/navigate are declared)
  const logActivity = useGamificationStore((s) => s.logActivity);
  const addXP = useGamificationStore((s) => s.addXP);
  const incrementModulesCompleted = useGamificationStore((s) => s.incrementModulesCompleted);
  const incrementReviewsCompleted = useGamificationStore((s) => s.incrementReviewsCompleted);
  const checkAchievementsFromProgress = useGamificationStore((s) => s.checkAchievementsFromProgress);
  const backfillIfNeeded = useGamificationStore((s) => s.backfillIfNeeded);
  const pruneAndResetWeekly = useGamificationStore((s) => s.pruneAndResetWeekly);
  const dashboardRequested = useGamificationStore((s) => s.dashboardRequested);
  const clearDashboardRequest = useGamificationStore((s) => s.clearDashboardRequest);

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
    scheduleModuleReview,
    recordReviewResult,
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
  const goToReview = useCallback((levelId: string, unitId: string, moduleId: string) => navigate({ type: 'review', levelId, unitId, moduleId }, 'forward'), [navigate]);
  const goToDashboard = useCallback(() => navigate({ type: 'dashboard' }, 'forward'), [navigate]);

  // Gamification effects
  const gamBackfillDone = useRef(false);
  useEffect(() => {
    if (gamBackfillDone.current) return;
    gamBackfillDone.current = true;
    backfillIfNeeded(progress);
    pruneAndResetWeekly();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkAchievementsFromProgress(progress);
  }, [progress, checkAchievementsFromProgress]);

  useEffect(() => {
    if (dashboardRequested) {
      clearDashboardRequest();
      navigate({ type: 'dashboard' }, 'forward');
    }
  }, [dashboardRequested, clearDashboardRequest, navigate]);

  // Scroll to top on screen change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  // ─── Async level + exercise loading ─────────────────────────────────────────
  const [loadedLevel, setLoadedLevel] = useState<CurriculumLevel | null>(null);
  const [exercisesByModule, setExercisesByModule] = useState<Record<string, ExerciseDefinition[]>>({});
  const levelCacheRef = useRef<Map<string, CurriculumLevel>>(new Map());
  const exerciseCacheRef = useRef<Map<string, Record<string, ExerciseDefinition[]>>>(new Map());

  const activeLevelId = (screen.type === 'levels' || screen.type === 'dashboard') ? null : screen.levelId;

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
              onStartReview={(moduleId) => {
                // Resolve levelId/unitId from module ID prefix
                const levelId = moduleId.slice(0, 2);
                // Extract unit number from pattern l{n}u{n}m{n}
                const unitMatch = moduleId.match(/^(l\d+)(u\d+)/);
                const unitId = unitMatch ? unitMatch[1] + unitMatch[2] : '';
                goToReview(levelId, unitId, moduleId);
              }}
              onOpenDashboard={goToDashboard}
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
                  levelCompletedModuleCount={getLevelCompletedModuleCount(loadedLevel)}
                  onToggleTask={toggleTask}
                  onCompleteModule={(moduleId) => {
                    completeModule(moduleId);
                    logActivity();
                    incrementModulesCompleted();
                    addXP('module_complete', computeModuleXP(moduleId), moduleId);
                    // Check if level is now complete
                    const levelNum = parseInt(moduleId.slice(1), 10);
                    const LEVEL_MODULE_COUNTS: Record<number, number> = { 1: 10, 2: 12, 3: 13, 4: 15, 5: 14, 6: 12, 7: 16, 8: 11, 9: 15 };
                    if (getLevelCompletedModuleCount(loadedLevel!) + 1 >= (LEVEL_MODULE_COUNTS[levelNum] ?? 0)) {
                      addXP('level_complete', 50, `l${levelNum}`);
                    }
                  }}
                  onRecordExerciseResult={(exerciseId, score) => recordExerciseResult(mod.id, exerciseId, score)}
                  onExercisesComplete={(passed) => { if (passed) markExercisesPassed(mod.id); }}
                  onBack={() => goToUnitBack(screen.levelId, screen.unitId)}
                  onBackToLevels={goToLevels}
                  onNavigateModule={(moduleId) => goToModule(screen.levelId, screen.unitId, moduleId)}
                  onLevelComplete={() => {
                    setLevelCelebration({
                      levelNumber: loadedLevel.number,
                      accentColor: loadedLevel.accentColor,
                      moduleCount: getLevelModuleCount(loadedLevel),
                    });
                  }}
                />
              );
            })()}
          </m.div>
        )}
        {screen.type === 'review' && (
          <m.div
            key={`review-${screen.moduleId}`}
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
                  exercisesPassed={false}
                  isReviewMode
                  levelCompletedModuleCount={getLevelCompletedModuleCount(loadedLevel)}
                  onToggleTask={toggleTask}
                  onCompleteModule={completeModule}
                  onRecordExerciseResult={(exerciseId, score) => recordExerciseResult(mod.id, exerciseId, score)}
                  onExercisesComplete={(passed) => {
                    recordReviewResult(mod.id, passed);
                    logActivity();
                    incrementReviewsCompleted();
                    addXP('review_on_time', 5, mod.id);
                    toast(
                      passed
                        ? t('toast.reviewPassed', { title: mod.title })
                        : t('toast.reviewFailed', { title: mod.title }),
                      passed ? 'success' : 'info',
                    );
                  }}
                  onBack={() => goToLevels()}
                  onBackToLevels={goToLevels}
                  onNavigateModule={(moduleId) => goToModule(screen.levelId, screen.unitId, moduleId)}
                />
              );
            })()}
          </m.div>
        )}
        {screen.type === 'dashboard' && (
          <m.div
            key="dashboard"
            initial={{ opacity: 0, x: xOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -xOffset }}
            transition={SPRING}
          >
            <Suspense fallback={loadingSpinner}>
              <ProgressDashboard
                progress={progress}
                onBack={goToLevels}
              />
            </Suspense>
          </m.div>
        )}
      </AnimatePresence>

      {levelCelebration && (
        <LevelAchievement
          levelNumber={levelCelebration.levelNumber}
          accentColor={levelCelebration.accentColor}
          moduleCount={levelCelebration.moduleCount}
          onDismiss={() => {
            setLevelCelebration(null);
            goToLevels();
          }}
        />
      )}
    </div>
  );
}
