import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import type { LevelState } from '../../core/types/curriculum';
import type { LevelMeta } from '../../data/curriculumLoader';
import { ProgressBar } from './ProgressBar';
import { DifficultyBadge } from './DifficultyBadge';

interface LevelCardProps {
  level: LevelMeta;
  state: LevelState;
  completedModuleCount: number;
  index: number;
  onClick: () => void;
}

export function LevelCard({ level, state, completedModuleCount, index, onClick }: LevelCardProps) {
  const { t } = useTranslation();
  const accent = level.accentColor;
  const totalModules = level.moduleCount;
  const progressPercent = totalModules > 0 ? (completedModuleCount / totalModules) * 100 : 0;
  const isLocked = state === 'locked';
  const isComingSoon = state === 'coming-soon';
  const isClickable = true; // Always browsable — locking only gates completion
  const isActive = !isLocked && !isComingSoon;

  return (
    <m.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={`w-full text-left rounded-xl border overflow-hidden transition-all duration-200 ${
        isActive
          ? 'hover:scale-[1.01] cursor-pointer'
          : 'hover:scale-[1.005] cursor-pointer opacity-60'
      }`}
      style={{
        borderColor: `${accent}${isActive ? '20' : '10'}`,
        backgroundColor: `${accent}${isActive ? '06' : '03'}`,
        boxShadow: 'var(--shadow-sm)',
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
            {state === 'locked' && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1" style={{ color: 'var(--text-dim)', backgroundColor: 'var(--card-hover)' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                {t('learn.level', { n: level.prerequisites?.[0]?.replace('l', '') ?? '' })}
              </span>
            )}
            {state === 'coming-soon' && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ color: 'var(--text-dim)', backgroundColor: 'var(--card-hover)' }}>
                {t('status.comingSoon')}
              </span>
            )}
            {state === 'completed' && (
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                {t('status.complete')}
              </span>
            )}
            <DifficultyBadge difficulty={level.difficulty} label={level.difficultyLabel} />
          </div>
        </div>

        {/* Title + description */}
        <h3 className="text-sm font-semibold learn-serif mb-1" style={{ color: 'var(--text)' }}>
          {level.title}
        </h3>
        <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--text-dim)' }}>
          {level.description}
        </p>

        {/* Stats */}
        <div className="text-[10px] mb-3" style={{ color: 'var(--text-dim)' }}>
          {level.unitCount > 0 ? (
            <span>
              {t('learn.unitsModules', { units: level.unitCount, unitLabel: level.unitCount === 1 ? t('learn.unitSingular') : t('learn.unitPlural'), modules: totalModules })}
            </span>
          ) : (
            <span>{t('status.contentInDevelopment')}</span>
          )}
        </div>

        {/* Progress bar (only for active levels) */}
        {isActive && totalModules > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar percent={progressPercent} color={accent} height={4} delay={index * 0.06} />
            </div>
            <span className="text-[10px] tabular-nums" style={{ color: 'var(--text-dim)' }}>
              {completedModuleCount}/{totalModules}
            </span>
          </div>
        )}
      </div>
    </m.button>
  );
}
