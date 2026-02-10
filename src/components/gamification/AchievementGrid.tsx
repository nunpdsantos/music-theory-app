import { useTranslation } from 'react-i18next';
import { useGamificationStore } from '../../state/gamificationStore';
import { ACHIEVEMENT_DEFINITIONS } from '../../data/achievements';
import { AchievementCard } from './AchievementCard';

export function AchievementGrid() {
  const { t } = useTranslation();
  const achievements = useGamificationStore((s) => s.achievements);
  const unlockedMap = new Map(achievements.map((a) => [a.id, a]));
  const unlockedCount = achievements.length;

  return (
    <div>
      <h2 className="type-section mb-3">
        {t('gamification.dashboard.achievements')} ({unlockedCount}/{ACHIEVEMENT_DEFINITIONS.length})
      </h2>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
        {ACHIEVEMENT_DEFINITIONS.map((def) => (
          <AchievementCard
            key={def.id}
            definition={def}
            record={unlockedMap.get(def.id)}
          />
        ))}
      </div>
    </div>
  );
}
