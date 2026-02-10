// Gamification domain types — separate from CurriculumProgress

export interface ActivityDay {
  date: string;         // YYYY-MM-DD (UTC)
  activities: number;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastActivityDate: string | null;  // YYYY-MM-DD (UTC)
  graceUsedDate: string | null;     // tracks 1-day grace period usage
}

export type XPEventType =
  | 'module_complete'
  | 'exercise_perfect'
  | 'exercise_accuracy'
  | 'review_on_time'
  | 'level_complete';

export interface XPEvent {
  type: XPEventType;
  xp: number;
  timestamp: number;
  ref?: string;           // e.g. module/exercise ID
}

export interface AchievementRecord {
  id: string;
  unlockedAt: number;
  notified: boolean;
}

export interface GamificationData {
  activityLog: ActivityDay[];             // rolling 90 days (pruned on load)
  streak: StreakData;
  totalXP: number;
  weeklyXP: number;
  weeklyXPWeek: string;                  // "2026-W07" for reset detection
  recentXPEvents: XPEvent[];             // last 50, for weekly summary detail
  achievements: AchievementRecord[];
  totalExercisesAttempted: number;
  totalPerfectExercises: number;
  totalModulesCompleted: number;
  totalReviewsCompleted: number;
  totalReviewsCompletedToday: number;    // for "5 reviews in a day" achievement
  totalReviewsTodayDate: string | null;  // YYYY-MM-DD for daily reset
}

export function getDefaultGamificationData(): GamificationData {
  return {
    activityLog: [],
    streak: {
      currentStreak: 0,
      bestStreak: 0,
      lastActivityDate: null,
      graceUsedDate: null,
    },
    totalXP: 0,
    weeklyXP: 0,
    weeklyXPWeek: '',
    recentXPEvents: [],
    achievements: [],
    totalExercisesAttempted: 0,
    totalPerfectExercises: 0,
    totalModulesCompleted: 0,
    totalReviewsCompleted: 0,
    totalReviewsCompletedToday: 0,
    totalReviewsTodayDate: null,
  };
}
