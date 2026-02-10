import { useTranslation } from 'react-i18next';

interface StreakBadgeProps {
  streak: number;
  onClick?: () => void;
}

export function StreakBadge({ streak, onClick }: StreakBadgeProps) {
  const { t } = useTranslation();

  if (streak < 1) return null;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors"
      style={{
        color: 'var(--text-dim)',
        border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = '#F59E0B'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; }}
      aria-label={t('gamification.streakLabel', { days: streak })}
      title={t('gamification.streakLabel', { days: streak })}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c-4-3-8-6-8-11a8 8 0 0 1 16 0c0 5-4 8-8 11z" />
      </svg>
      <span className="max-sm:hidden tabular-nums">{streak}</span>
    </button>
  );
}
