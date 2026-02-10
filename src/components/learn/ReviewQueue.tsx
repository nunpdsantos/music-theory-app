/**
 * ReviewQueue — amber-themed card list showing modules due for spaced repetition review.
 * Displayed in LevelsOverview between Continue banner and level grid.
 */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import type { CurriculumProgress } from '../../core/types/curriculum';
import { LEVEL_METADATA } from '../../data/curriculumLoader';
import { getDueReviewModuleIds } from '../../services/spacedRepetition';
import { formatNextReview, getIntervalLabel } from '../../services/spacedRepetition';

const AMBER = '#FBBF24';
const MAX_SHOWN = 5;

interface ReviewQueueProps {
  progress: CurriculumProgress;
  onStartReview: (moduleId: string) => void;
}

/** Resolve a module ID like 'l1u2m3' to level metadata for display */
function getModuleInfo(moduleId: string) {
  // Extract level ID from module ID prefix (e.g., 'l1u2m3' → 'l1')
  const levelId = moduleId.slice(0, 2);
  const meta = LEVEL_METADATA.find((m) => m.id === levelId);
  return meta;
}

export function ReviewQueue({ progress, onStartReview }: ReviewQueueProps) {
  const { t } = useTranslation();

  const dueModuleIds = useMemo(
    () => getDueReviewModuleIds(progress, Date.now()),
    [progress],
  );

  if (dueModuleIds.length === 0) return null;

  const shown = dueModuleIds.slice(0, MAX_SHOWN);
  const remaining = dueModuleIds.length - MAX_SHOWN;

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: AMBER }}>
          {t('review.title')}
        </h3>
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${AMBER}20`, color: AMBER }}
        >
          {dueModuleIds.length}
        </span>
      </div>

      <div className="space-y-2">
        {shown.map((moduleId) => {
          const schedule = (progress.reviewSchedules ?? {})[moduleId];
          const levelMeta = getModuleInfo(moduleId);
          const reviewStatus = schedule ? formatNextReview(schedule, Date.now()) : '';
          const interval = schedule ? getIntervalLabel(schedule.intervalLevel) : '';

          return (
            <button
              key={moduleId}
              onClick={() => onStartReview(moduleId)}
              className="w-full text-left px-4 py-3 rounded-xl transition-all duration-150 hover:scale-[1.01] group"
              style={{
                backgroundColor: `${AMBER}08`,
                border: `1px solid ${AMBER}15`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${AMBER}15`;
                e.currentTarget.style.borderColor = `${AMBER}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${AMBER}08`;
                e.currentTarget.style.borderColor = `${AMBER}15`;
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                    style={{ backgroundColor: `${AMBER}18`, color: AMBER }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                      {moduleId}
                    </p>
                    <p className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
                      {levelMeta?.title ?? ''} &middot; {t('review.interval', { interval })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${AMBER}20`, color: AMBER }}
                  >
                    {reviewStatus}
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:translate-x-0.5 transition-transform"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {remaining > 0 && (
        <p className="text-[10px] mt-2 text-center" style={{ color: 'var(--text-dim)' }}>
          {t('review.moreItems', { count: remaining })}
        </p>
      )}
    </m.div>
  );
}
