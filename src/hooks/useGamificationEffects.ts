/**
 * Consumes gamification events (streaks, achievements) and fires toasts + sounds.
 * Mount once in LearnView (or wherever gamification actions are triggered).
 */
import { useEffect } from 'react';
import { useGamificationStore } from '../state/gamificationStore';
import { toast } from '../state/toastStore';

export function useGamificationEffects() {
  const pendingEvents = useGamificationStore((s) => s.pendingEvents);
  const consumeEvents = useGamificationStore((s) => s.consumeEvents);

  useEffect(() => {
    if (pendingEvents.length === 0) return;
    const events = consumeEvents();

    let hasAchievement = false;
    for (const event of events) {
      if (event.type === 'streak_milestone') {
        toast(`${event.streak}-day streak!`, 'success', 4000);
      } else if (event.type === 'achievement_unlocked') {
        toast(event.titleKey, 'success', 4000);
        hasAchievement = true;
      }
    }

    if (hasAchievement) {
      import('../utils/celebrationSound').then(({ playCelebrationSound }) => {
        playCelebrationSound();
      });
    }
  }, [pendingEvents, consumeEvents]);
}
