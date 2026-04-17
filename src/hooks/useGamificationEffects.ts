/**
 * Consumes gamification events (streaks, achievements) and fires toasts + sounds.
 * Mount once in LearnView (or wherever gamification actions are triggered).
 */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGamificationStore } from '../state/gamificationStore';
import { toast } from '../state/toastStore';

export function useGamificationEffects() {
  const { t } = useTranslation();
  const pendingEvents = useGamificationStore((s) => s.pendingEvents);
  const consumeEvents = useGamificationStore((s) => s.consumeEvents);

  useEffect(() => {
    if (pendingEvents.length === 0) return;
    const events = consumeEvents();

    let hasAchievement = false;
    for (const event of events) {
      if (event.type === 'streak_milestone') {
        toast(t('gamification.streakMilestone', { days: event.streak }), 'success', 4000);
      } else if (event.type === 'achievement_unlocked') {
        toast(t(event.titleKey), 'success', 4000);
        hasAchievement = true;
      }
    }

    if (hasAchievement) {
      import('../utils/celebrationSound').then(({ playCelebrationSound }) => {
        playCelebrationSound();
      });
    }
  }, [pendingEvents, consumeEvents, t]);
}
