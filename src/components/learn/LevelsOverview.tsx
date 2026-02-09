import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CurriculumLevel, CurriculumProgress, LevelState } from '../../core/types/curriculum';
import { CURRICULUM_LEVELS } from '../../core/constants/levels';
import { getNextIncompleteModule } from '../../core/constants/curriculum';
import { getLevelModuleCount } from '../../core/constants/levelHelpers';
import { ContinueBanner } from './ContinueBanner';
import { LevelCard } from './LevelCard';
import { ProgressBar } from './ProgressBar';

interface LevelsOverviewProps {
  progress: CurriculumProgress;
  getLevelCompletedModuleCount: (level: CurriculumLevel) => number;
  getLevelState: (level: CurriculumLevel) => LevelState;
  onOpenLevel: (levelId: string) => void;
  onOpenModule: (moduleId: string, unitId: string, levelId: string) => void;
}

export function LevelsOverview({
  progress,
  getLevelCompletedModuleCount,
  getLevelState,
  onOpenLevel,
  onOpenModule,
}: LevelsOverviewProps) {
  const nextUp = useMemo(() => getNextIncompleteModule(progress, CURRICULUM_LEVELS), [progress]);

  const totalModules = CURRICULUM_LEVELS.reduce((s, l) => s + getLevelModuleCount(l), 0);
  const totalCompleted = progress.completedModules.length;

  // Split levels: main track (l1-l8) and parallel (l9)
  const mainLevels = CURRICULUM_LEVELS.filter((l) => !l.parallel);
  const parallelLevels = CURRICULUM_LEVELS.filter((l) => l.parallel);

  return (
    <div className="max-w-3xl mx-auto px-5 max-sm:px-3 py-6 max-sm:py-4 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-zinc-100 learn-serif mb-1.5">
          Learn Music Theory
        </h1>
        <p className="text-sm text-zinc-500">
          A structured path from the basics to advanced harmony
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <ProgressBar
              percent={totalModules > 0 ? (totalCompleted / totalModules) * 100 : 0}
              color="#60A5FA"
              height={6}
            />
          </div>
          <span className="text-xs text-zinc-500 tabular-nums shrink-0">
            {totalCompleted}/{totalModules}
          </span>
        </div>
      </motion.div>

      {/* Continue banner */}
      {nextUp && (
        <ContinueBanner
          module={nextUp.module}
          unit={nextUp.unit}
          level={nextUp.level}
          onClick={() => onOpenModule(nextUp.module.id, nextUp.unit.id, nextUp.level.id)}
        />
      )}

      {/* Level cards grid */}
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-8">
        {mainLevels.map((level, i) => (
          <LevelCard
            key={level.id}
            level={level}
            state={getLevelState(level)}
            completedModuleCount={getLevelCompletedModuleCount(level)}
            index={i}
            onClick={() => onOpenLevel(level.id)}
          />
        ))}
      </div>

      {/* Parallel track divider */}
      {parallelLevels.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              Parallel Track
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </motion.div>

          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {parallelLevels.map((level, i) => (
              <LevelCard
                key={level.id}
                level={level}
                state={getLevelState(level)}
                completedModuleCount={getLevelCompletedModuleCount(level)}
                index={mainLevels.length + i}
                onClick={() => onOpenLevel(level.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
