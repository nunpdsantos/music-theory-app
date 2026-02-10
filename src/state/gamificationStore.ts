/**
 * Gamification Store — standalone Zustand store with localStorage persistence.
 * Separate from CurriculumProgress to avoid migration risk.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GamificationData, XPEventType } from '../core/types/gamification';
import { getDefaultGamificationData } from '../core/types/gamification';
import type { CurriculumProgress } from '../core/types/curriculum';
import {
  recordActivity as _recordActivity,
  pruneActivityLog,
  isStreakMilestone,
  awardXP as _awardXP,
  resetWeeklyXPIfNeeded,
  checkAchievements,
  unlockAchievements,
  markAchievementsNotified,
  backfillFromProgress,
  incrementDailyReviews,
} from '../services/gamification';
import { ACHIEVEMENT_DEFINITIONS } from '../data/achievements';
import { toast } from './toastStore';

interface GamificationStore extends GamificationData {
  // Navigation signal (not persisted)
  dashboardRequested: boolean;
  requestDashboard: () => void;
  clearDashboardRequest: () => void;

  // Actions
  logActivity: (now?: number) => void;
  addXP: (type: XPEventType, xp: number, ref?: string, now?: number) => void;
  incrementModulesCompleted: () => void;
  incrementExerciseAttempt: (perfect: boolean) => void;
  incrementReviewsCompleted: (now?: number) => void;
  checkAchievementsFromProgress: (progress: CurriculumProgress) => void;
  backfillIfNeeded: (progress: CurriculumProgress) => void;
  pruneAndResetWeekly: (now?: number) => void;
}

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      ...getDefaultGamificationData(),

      dashboardRequested: false,
      requestDashboard: () => set({ dashboardRequested: true }),
      clearDashboardRequest: () => set({ dashboardRequested: false }),

      logActivity: (now = Date.now()) => {
        set((state) => {
          const asData = extractData(state);
          const updated = _recordActivity(asData, now);
          // Check for streak milestone
          if (
            updated.streak.currentStreak > asData.streak.currentStreak &&
            isStreakMilestone(updated.streak.currentStreak)
          ) {
            // Defer toast to avoid triggering during render
            queueMicrotask(() => {
              toast(`${updated.streak.currentStreak}-day streak!`, 'success', 4000);
            });
          }
          return spreadData(updated);
        });
      },

      addXP: (type, xp, ref, now = Date.now()) => {
        set((state) => spreadData(_awardXP(extractData(state), type, xp, now, ref)));
      },

      incrementModulesCompleted: () => {
        set((state) => ({ totalModulesCompleted: state.totalModulesCompleted + 1 }));
      },

      incrementExerciseAttempt: (perfect) => {
        set((state) => ({
          totalExercisesAttempted: state.totalExercisesAttempted + 1,
          totalPerfectExercises: state.totalPerfectExercises + (perfect ? 1 : 0),
        }));
      },

      incrementReviewsCompleted: (now = Date.now()) => {
        set((state) => {
          const asData = extractData(state);
          let updated = { ...asData, totalReviewsCompleted: asData.totalReviewsCompleted + 1 };
          updated = incrementDailyReviews(updated, now);
          return spreadData(updated);
        });
      },

      checkAchievementsFromProgress: (progress) => {
        const state = get();
        const asData = extractData(state);
        const newlyUnlocked = checkAchievements(asData, progress, ACHIEVEMENT_DEFINITIONS);
        if (newlyUnlocked.length > 0) {
          const now = Date.now();
          let updated = unlockAchievements(asData, newlyUnlocked, now);
          updated = markAchievementsNotified(updated, newlyUnlocked);
          set(spreadData(updated));

          // Fire toasts + sound for each new achievement
          queueMicrotask(() => {
            for (const id of newlyUnlocked) {
              const def = ACHIEVEMENT_DEFINITIONS.find((d) => d.id === id);
              if (def) {
                toast(def.titleKey, 'success', 4000);
              }
            }
            // Defer sound import to avoid circular deps
            import('../utils/celebrationSound').then(({ playCelebrationSound }) => {
              playCelebrationSound();
            });
          });
        }
      },

      backfillIfNeeded: (progress) => {
        const state = get();
        // Only backfill if we have default (empty) data and there's existing progress
        if (state.totalModulesCompleted === 0 && progress.completedModules.length > 0) {
          const backfilled = backfillFromProgress(progress, Date.now());
          set(spreadData(backfilled));
        }
      },

      pruneAndResetWeekly: (now = Date.now()) => {
        set((state) => {
          const asData = extractData(state);
          const pruned = { ...asData, activityLog: pruneActivityLog(asData.activityLog, now) };
          const reset = resetWeeklyXPIfNeeded(pruned, now);
          return spreadData(reset);
        });
      },
    }),
    {
      name: 'music-theory-gamification',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activityLog: state.activityLog,
        streak: state.streak,
        totalXP: state.totalXP,
        weeklyXP: state.weeklyXP,
        weeklyXPWeek: state.weeklyXPWeek,
        recentXPEvents: state.recentXPEvents,
        achievements: state.achievements,
        totalExercisesAttempted: state.totalExercisesAttempted,
        totalPerfectExercises: state.totalPerfectExercises,
        totalModulesCompleted: state.totalModulesCompleted,
        totalReviewsCompleted: state.totalReviewsCompleted,
        totalReviewsCompletedToday: state.totalReviewsCompletedToday,
        totalReviewsTodayDate: state.totalReviewsTodayDate,
      }),
    },
  ),
);

// ─── Helpers to convert between store shape and GamificationData ────────────

function extractData(state: GamificationStore): GamificationData {
  return {
    activityLog: state.activityLog,
    streak: state.streak,
    totalXP: state.totalXP,
    weeklyXP: state.weeklyXP,
    weeklyXPWeek: state.weeklyXPWeek,
    recentXPEvents: state.recentXPEvents,
    achievements: state.achievements,
    totalExercisesAttempted: state.totalExercisesAttempted,
    totalPerfectExercises: state.totalPerfectExercises,
    totalModulesCompleted: state.totalModulesCompleted,
    totalReviewsCompleted: state.totalReviewsCompleted,
    totalReviewsCompletedToday: state.totalReviewsCompletedToday,
    totalReviewsTodayDate: state.totalReviewsTodayDate,
  };
}

function spreadData(data: GamificationData): Partial<GamificationStore> {
  return {
    activityLog: data.activityLog,
    streak: data.streak,
    totalXP: data.totalXP,
    weeklyXP: data.weeklyXP,
    weeklyXPWeek: data.weeklyXPWeek,
    recentXPEvents: data.recentXPEvents,
    achievements: data.achievements,
    totalExercisesAttempted: data.totalExercisesAttempted,
    totalPerfectExercises: data.totalPerfectExercises,
    totalModulesCompleted: data.totalModulesCompleted,
    totalReviewsCompleted: data.totalReviewsCompleted,
    totalReviewsCompletedToday: data.totalReviewsCompletedToday,
    totalReviewsTodayDate: data.totalReviewsTodayDate,
  };
}
