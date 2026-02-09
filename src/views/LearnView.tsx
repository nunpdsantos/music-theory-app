import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getLevelById } from '../core/constants/levelHelpers';
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

  const xOffset = direction === 'forward' ? 40 : -40;

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto" role="region" aria-label="Learn music theory">
      <AnimatePresence mode="wait" initial={false}>
        {screen.type === 'levels' && (
          <motion.div
            key="levels"
            initial={{ opacity: 0, x: -xOffset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: xOffset }}
            transition={SPRING}
          >
            <LevelsOverview
              progress={progress}
              getLevelCompletedModuleCount={getLevelCompletedModuleCount}
              getLevelState={getLevelState}
              onOpenLevel={goToLevel}
              onOpenModule={(moduleId, unitId, levelId) => goToModule(levelId, unitId, moduleId)}
            />
          </motion.div>
        )}

        {screen.type === 'level' && (() => {
          const level = getLevelById(screen.levelId);
          if (!level) return null;
          return (
            <motion.div
              key={`level-${screen.levelId}`}
              initial={{ opacity: 0, x: xOffset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -xOffset }}
              transition={SPRING}
            >
              <LevelDetail
                level={level}
                progress={progress}
                isModuleCompleted={isModuleCompleted}
                getUnitCompletedModuleCount={getUnitCompletedModuleCount}
                onOpenUnit={(unitId) => goToUnit(screen.levelId, unitId)}
                onBack={goToLevels}
              />
            </motion.div>
          );
        })()}

        {screen.type === 'unit' && (() => {
          const level = getLevelById(screen.levelId);
          if (!level) return null;
          const unitIndex = level.units.findIndex((u) => u.id === screen.unitId);
          const unit = level.units[unitIndex];
          if (!unit) return null;
          return (
            <motion.div
              key={`unit-${screen.unitId}`}
              initial={{ opacity: 0, x: xOffset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -xOffset }}
              transition={SPRING}
            >
              <UnitDetail
                unit={unit}
                unitIndex={unitIndex}
                level={level}
                progress={progress}
                isModuleCompleted={isModuleCompleted}
                onOpenModule={(moduleId) => goToModule(screen.levelId, screen.unitId, moduleId)}
                onBack={() => goToLevelBack(screen.levelId)}
                onBackToLevels={goToLevels}
              />
            </motion.div>
          );
        })()}

        {screen.type === 'module' && (() => {
          const level = getLevelById(screen.levelId);
          if (!level) return null;
          const unit = level.units.find((u) => u.id === screen.unitId);
          if (!unit) return null;
          const moduleIndex = unit.modules.findIndex((m) => m.id === screen.moduleId);
          const mod = unit.modules[moduleIndex];
          if (!mod) return null;
          const unitIndex = level.units.indexOf(unit);

          return (
            <motion.div
              key={`module-${screen.moduleId}`}
              initial={{ opacity: 0, x: xOffset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -xOffset }}
              transition={SPRING}
            >
              <ModuleView
                module={mod}
                unit={unit}
                level={level}
                unitIndex={unitIndex}
                moduleIndex={moduleIndex}
                isModuleCompleted={isModuleCompleted(mod.id)}
                isTaskCompleted={isTaskCompleted}
                completedTaskCount={getModuleCompletedTaskCount(mod.id)}
                onToggleTask={toggleTask}
                onCompleteModule={completeModule}
                onBack={() => goToUnitBack(screen.levelId, screen.unitId)}
                onBackToLevels={goToLevels}
                onNavigateModule={(moduleId) => goToModule(screen.levelId, screen.unitId, moduleId)}
              />
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
