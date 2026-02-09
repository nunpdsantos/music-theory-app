import { motion } from 'framer-motion';
import type { CurriculumLevel, LevelState } from '../../core/types/curriculum';
import { getLevelModuleCount } from '../../core/constants/levelHelpers';
import { ProgressBar } from './ProgressBar';
import { DifficultyBadge } from './DifficultyBadge';

interface LevelCardProps {
  level: CurriculumLevel;
  state: LevelState;
  completedModuleCount: number;
  index: number;
  onClick: () => void;
}

export function LevelCard({ level, state, completedModuleCount, index, onClick }: LevelCardProps) {
  const accent = level.accentColor;
  const totalModules = getLevelModuleCount(level);
  const progressPercent = totalModules > 0 ? (completedModuleCount / totalModules) * 100 : 0;
  const isLocked = state === 'locked';
  const isComingSoon = state === 'coming-soon';
  const isClickable = !isLocked;
  const isActive = !isLocked && !isComingSoon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={`w-full text-left rounded-xl border overflow-hidden transition-all duration-200 ${
        isActive
          ? 'hover:scale-[1.01] cursor-pointer'
          : isComingSoon
            ? 'hover:scale-[1.005] cursor-pointer opacity-60'
            : 'cursor-not-allowed opacity-40'
      }`}
      style={{
        borderColor: `${accent}${isActive ? '20' : '10'}`,
        backgroundColor: `${accent}${isActive ? '06' : '03'}`,
      }}
      onMouseEnter={(e) => {
        if (isClickable) {
          e.currentTarget.style.borderColor = `${accent}${isActive ? '35' : '20'}`;
          e.currentTarget.style.backgroundColor = `${accent}${isActive ? '0a' : '06'}`;
        }
      }}
      onMouseLeave={(e) => {
        if (isClickable) {
          e.currentTarget.style.borderColor = `${accent}${isActive ? '20' : '10'}`;
          e.currentTarget.style.backgroundColor = `${accent}${isActive ? '06' : '03'}`;
        }
      }}
    >
      <div className="px-4 py-4">
        {/* Top row: number + badge */}
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: `${accent}20`, color: accent }}
          >
            {level.number}
          </div>
          <div className="flex items-center gap-2">
            {state === 'coming-soon' && (
              <span className="text-[10px] font-medium text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            )}
            {state === 'completed' && (
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                Complete
              </span>
            )}
            <DifficultyBadge difficulty={level.difficulty} label={level.difficultyLabel} />
          </div>
        </div>

        {/* Title + description */}
        <h3 className="text-sm font-semibold text-zinc-200 learn-serif mb-1">
          {level.title}
        </h3>
        <p className="text-xs text-zinc-500 line-clamp-2 mb-3">
          {level.description}
        </p>

        {/* Stats */}
        <div className="text-[10px] text-zinc-600 mb-3">
          {level.units.length > 0 ? (
            <span>
              {level.units.length} {level.units.length === 1 ? 'unit' : 'units'} &middot;{' '}
              {totalModules} modules
            </span>
          ) : (
            <span>Content in development</span>
          )}
        </div>

        {/* Progress bar (only for active levels) */}
        {isActive && totalModules > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar percent={progressPercent} color={accent} height={4} delay={index * 0.06} />
            </div>
            <span className="text-[10px] text-zinc-600 tabular-nums">
              {completedModuleCount}/{totalModules}
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
