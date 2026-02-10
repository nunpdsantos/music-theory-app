import { useMemo, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import type { CurriculumLevel, CurriculumProgress } from '../../core/types/curriculum';
import {
  LEVEL_METADATA,
  computeLevelStateMeta,
  getLevelCompletedCountMeta,
  loadAllLevels,
  findNextIncompleteModule,
} from '../../data/curriculumLoader';
import type { LevelMeta } from '../../data/curriculumLoader';
import { ContinueBanner } from './ContinueBanner';
import { ReviewQueue } from './ReviewQueue';
import { LevelCard } from './LevelCard';
import { ProgressBar } from './ProgressBar';

interface LevelsOverviewProps {
  progress: CurriculumProgress;
  onOpenLevel: (levelId: string) => void;
  onOpenModule: (moduleId: string, unitId: string, levelId: string) => void;
  onStartReview?: (moduleId: string) => void;
}

export function LevelsOverview({
  progress,
  onOpenLevel,
  onOpenModule,
  onStartReview,
}: LevelsOverviewProps) {
  const { t } = useTranslation();
  // Async-load full levels for continue banner
  const [allLevels, setAllLevels] = useState<CurriculumLevel[] | null>(null);
  useEffect(() => {
    loadAllLevels().then(setAllLevels);
  }, []);

  const nextUp = useMemo(() => {
    if (!allLevels) return undefined;
    return findNextIncompleteModule(progress, allLevels);
  }, [progress, allLevels]);

  const totalModules = LEVEL_METADATA.reduce((s, l) => s + l.moduleCount, 0);
  const totalCompleted = progress.completedModules.length;

  // Split levels: main track (l1-l8) and parallel (l9)
  const mainLevels = LEVEL_METADATA.filter((l) => !l.parallel);
  const parallelLevels = LEVEL_METADATA.filter((l) => l.parallel);

  const getLevelState = useCallback(
    (meta: LevelMeta) => computeLevelStateMeta(meta, LEVEL_METADATA, progress.completedModules),
    [progress.completedModules],
  );

  const getCompletedCount = useCallback(
    (meta: LevelMeta) => getLevelCompletedCountMeta(meta.id, progress.completedModules),
    [progress.completedModules],
  );

  return (
    <div className="max-w-3xl mx-auto px-5 max-sm:px-3 py-6 max-sm:py-4 pb-24">
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold learn-serif mb-1.5" style={{ color: 'var(--text)' }}>
          {t('learn.title')}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
          {t('learn.subtitle')}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <ProgressBar
              percent={totalModules > 0 ? (totalCompleted / totalModules) * 100 : 0}
              color="#60A5FA"
              height={6}
            />
          </div>
          <span className="text-xs tabular-nums shrink-0" style={{ color: 'var(--text-dim)' }}>
            {totalCompleted}/{totalModules}
          </span>
        </div>
      </m.div>

      {/* Continue banner */}
      {nextUp && (
        <ContinueBanner
          module={nextUp.module}
          unit={nextUp.unit}
          level={nextUp.level}
          onClick={() => onOpenModule(nextUp.module.id, nextUp.unit.id, nextUp.level.id)}
        />
      )}

      {/* Review Queue */}
      {onStartReview && (
        <ReviewQueue progress={progress} onStartReview={onStartReview} />
      )}

      {/* Level cards grid */}
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-8">
        {mainLevels.map((level, i) => (
          <LevelCard
            key={level.id}
            level={level}
            state={getLevelState(level)}
            completedModuleCount={getCompletedCount(level)}
            index={i}
            onClick={() => onOpenLevel(level.id)}
          />
        ))}
      </div>

      {/* Parallel track divider */}
      {parallelLevels.length > 0 && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--card-hover)' }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
              {t('learn.parallelTrack')}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--card-hover)' }} />
          </m.div>

          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {parallelLevels.map((level, i) => (
              <LevelCard
                key={level.id}
                level={level}
                state={getLevelState(level)}
                completedModuleCount={getCompletedCount(level)}
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
