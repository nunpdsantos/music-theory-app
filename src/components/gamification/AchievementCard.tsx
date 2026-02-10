import { useTranslation } from 'react-i18next';
import type { AchievementRecord } from '../../core/types/gamification';
import type { AchievementDefinition } from '../../services/gamification';

interface AchievementCardProps {
  definition: AchievementDefinition;
  record?: AchievementRecord;
}

export function AchievementCard({ definition, record }: AchievementCardProps) {
  const { t } = useTranslation();
  const unlocked = !!record;

  return (
    <div
      className="rounded-xl p-3 transition-colors"
      style={{
        backgroundColor: unlocked ? 'var(--bg-raised)' : 'color-mix(in srgb, var(--bg-raised) 40%, transparent)',
        border: `1px solid ${unlocked ? 'var(--border)' : 'color-mix(in srgb, var(--border) 30%, transparent)'}`,
        opacity: unlocked ? 1 : 0.5,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: unlocked ? '#F59E0B18' : 'color-mix(in srgb, var(--card-hover) 60%, transparent)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={unlocked ? '#F59E0B' : 'var(--text-dim)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={definition.icon} />
          </svg>
        </div>
        <div className="min-w-0">
          <h3
            className="text-xs font-semibold truncate"
            style={{ color: unlocked ? 'var(--text)' : 'var(--text-dim)' }}
          >
            {t(definition.titleKey)}
          </h3>
          <p
            className="text-2xs mt-0.5 leading-relaxed"
            style={{ color: 'var(--text-dim)' }}
          >
            {t(definition.descriptionKey)}
          </p>
          {record && (
            <p className="text-2xs mt-1" style={{ color: 'var(--text-dim)', opacity: 0.6 }}>
              {new Date(record.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
