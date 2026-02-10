import { useTranslation } from 'react-i18next';

interface XPDisplayProps {
  weeklyXP: number;
  totalXP: number;
}

export function XPDisplay({ weeklyXP, totalXP }: XPDisplayProps) {
  const { t } = useTranslation();

  return (
    <div
      className="flex items-center gap-1.5 text-xs tabular-nums mt-1.5"
      style={{ color: 'var(--text-dim)' }}
    >
      <span>{t('gamification.xpThisWeek', { xp: weeklyXP })}</span>
      <span style={{ opacity: 0.4 }}>&middot;</span>
      <span>{t('gamification.xpTotal', { xp: totalXP.toLocaleString() })}</span>
    </div>
  );
}
