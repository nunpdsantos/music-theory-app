import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import type { CurriculumProgress } from '../../core/types/curriculum';
import { useGamificationStore } from '../../state/gamificationStore';
import { LEVEL_METADATA } from '../../data/curriculumLoader';
import { StatCard } from './StatCard';
import { StreakCalendar } from './StreakCalendar';
import { WeeklyChart } from './WeeklyChart';
import { AchievementGrid } from './AchievementGrid';
import { ConceptRadar } from './ConceptRadar';
import { useConceptStore } from '../../state/conceptStore';
import { CONCEPT_LABELS } from '../../services/conceptTagger';

interface ProgressDashboardProps {
  progress: CurriculumProgress;
  onBack: () => void;
}

export function ProgressDashboard({ progress, onBack }: ProgressDashboardProps) {
  const { t } = useTranslation();
  const totalXP = useGamificationStore((s) => s.totalXP);
  const currentStreak = useGamificationStore((s) => s.streak.currentStreak);
  const activityLog = useGamificationStore((s) => s.activityLog);
  const totalExercises = useGamificationStore((s) => s.totalExercisesAttempted);
  const totalPerfect = useGamificationStore((s) => s.totalPerfectExercises);
  const totalReviews = useGamificationStore((s) => s.totalReviewsCompleted);

  const totalModules = LEVEL_METADATA.reduce((s, l) => s + l.moduleCount, 0);
  const completedModules = progress.completedModules.length;
  const accuracy = totalExercises > 0
    ? Math.round((totalPerfect / totalExercises) * 100)
    : 0;

  const weakConcepts = useConceptStore((s) => s.getWeakConcepts)();
  const hasConceptData = Object.keys(useConceptStore((s) => s.concepts)).length > 0;

  return (
    <div className="max-w-2xl mx-auto px-5 max-sm:px-3 py-6 max-sm:py-4 pb-32">
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold learn-serif" style={{ color: 'var(--text)' }}>
            {t('gamification.dashboard.title')}
          </h1>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs transition-colors"
          style={{ color: 'var(--text-dim)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t('gamification.dashboard.back')}
        </button>
      </m.div>

      {/* Stat cards — 2 rows of 3 */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="grid grid-cols-3 gap-3 mb-8"
      >
        <StatCard value={totalXP.toLocaleString()} label={t('gamification.dashboard.xp')} accent="#60A5FA" />
        <StatCard value={`${completedModules}/${totalModules}`} label={t('gamification.dashboard.modules')} />
        <StatCard value={currentStreak > 0 ? `${currentStreak}d` : '—'} label={t('gamification.dashboard.streak')} accent="#F59E0B" />
        <StatCard value={totalExercises} label={t('gamification.dashboard.exercises')} />
        <StatCard value={totalExercises > 0 ? `${accuracy}%` : '—'} label={t('gamification.dashboard.accuracy')} />
        <StatCard value={totalReviews} label={t('gamification.dashboard.reviews')} />
      </m.div>

      {/* Concept mastery radar + weak concepts */}
      {hasConceptData && (
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <ConceptRadar />
          {weakConcepts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {t('concepts.needsWork')}:
              </span>
              {weakConcepts.slice(0, 5).map((id) => (
                <span
                  key={id}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--card-hover)',
                    color: 'var(--text-dim)',
                  }}
                >
                  {CONCEPT_LABELS[id] ?? id}
                </span>
              ))}
            </div>
          )}
        </m.div>
      )}

      {/* Activity heatmap */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: hasConceptData ? 0.15 : 0.1 }}
        className="mb-8"
      >
        <StreakCalendar activityLog={activityLog} />
      </m.div>

      {/* Weekly chart */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="mb-8"
      >
        <WeeklyChart activityLog={activityLog} />
      </m.div>

      {/* Achievements */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AchievementGrid />
      </m.div>
    </div>
  );
}
