import type { AchievementDefinition } from '../services/gamification';

// Module counts per level for completeness checks
const LEVEL_MODULE_COUNTS: Record<string, number> = {
  l1: 10, l2: 12, l3: 13, l4: 15, l5: 14, l6: 12, l7: 16, l8: 11, l9: 15,
};

function countLevelCompleted(completedModules: string[], levelId: string): number {
  return completedModules.filter((id) => id.startsWith(levelId)).length;
}

function isLevelComplete(completedModules: string[], levelId: string): boolean {
  return countLevelCompleted(completedModules, levelId) >= (LEVEL_MODULE_COUNTS[levelId] ?? Infinity);
}

// SVG path data for achievement icons
const ICONS = {
  // Footsteps
  firstSteps: 'M13 5.5A3.5 3.5 0 0 0 9.5 9h5A3.5 3.5 0 0 0 13 5.5zM6 18.5A3.5 3.5 0 0 0 2.5 22h5A3.5 3.5 0 0 0 6 18.5z',
  // Trophy
  trophy: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M9 22h6m-3-5v5M6 2h12v7a6 6 0 0 1-12 0V2z',
  // Star
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  // Half circle (halfway)
  halfway: 'M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20zm0 0v20',
  // Book / scholar
  scholar: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z',
  // Parallel paths
  parallel: 'M8 3v18M16 3v18',
  // Crown
  crown: 'M2 20h20L18 8l-4 6-2-8-2 8-4-6z',
  // Flame
  flame: 'M12 22c-4-3-8-6-8-11a8 8 0 0 1 16 0c0 5-4 8-8 11z',
  // Calendar
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  // Target
  target: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  // Headphones (ear training)
  ear: 'M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
  // Check circle
  check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3',
  // 100
  hundred: 'M4 8v8M8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 0v8M15 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 0v8M20 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 0v8',
  // Medal
  medal: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0 0v5m-4 2h8',
  // Zap (lightning)
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  // Refresh circle
  refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
  // Activity pulse
  activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
  // Gold badge
  goldBadge: 'M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14 2 9.2h7.6L12 2z',
};

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  // ─── Curriculum (6) ─────────────────────────────────────────────────
  {
    id: 'first_steps',
    category: 'curriculum',
    titleKey: 'gamification.ach.firstStepsTitle',
    descriptionKey: 'gamification.ach.firstStepsDesc',
    icon: ICONS.firstSteps,
    check: (data) => data.totalModulesCompleted >= 1,
  },
  {
    id: 'level_1_complete',
    category: 'curriculum',
    titleKey: 'gamification.ach.level1CompleteTitle',
    descriptionKey: 'gamification.ach.level1CompleteDesc',
    icon: ICONS.trophy,
    check: (_, progress) => isLevelComplete(progress.completedModules, 'l1'),
  },
  {
    id: 'halfway_there',
    category: 'curriculum',
    titleKey: 'gamification.ach.halfwayThereTitle',
    descriptionKey: 'gamification.ach.halfwayThereDesc',
    icon: ICONS.halfway,
    check: (_, progress) => progress.completedModules.length >= 59,
  },
  {
    id: 'theory_scholar',
    category: 'curriculum',
    titleKey: 'gamification.ach.theoryScholarTitle',
    descriptionKey: 'gamification.ach.theoryScholarDesc',
    icon: ICONS.scholar,
    check: (_, progress) => {
      for (let i = 1; i <= 8; i++) {
        if (!isLevelComplete(progress.completedModules, `l${i}`)) return false;
      }
      return true;
    },
  },
  {
    id: 'parallel_path',
    category: 'curriculum',
    titleKey: 'gamification.ach.parallelPathTitle',
    descriptionKey: 'gamification.ach.parallelPathDesc',
    icon: ICONS.parallel,
    check: (_, progress) => isLevelComplete(progress.completedModules, 'l9'),
  },
  {
    id: 'completionist',
    category: 'curriculum',
    titleKey: 'gamification.ach.completionistTitle',
    descriptionKey: 'gamification.ach.completionistDesc',
    icon: ICONS.crown,
    check: (_, progress) => progress.completedModules.length >= 118,
  },

  // ─── Streaks (4) ────────────────────────────────────────────────────
  {
    id: 'week_warrior',
    category: 'streak',
    titleKey: 'gamification.ach.weekWarriorTitle',
    descriptionKey: 'gamification.ach.weekWarriorDesc',
    icon: ICONS.flame,
    check: (data) => data.streak.bestStreak >= 7,
  },
  {
    id: 'fortnight_focus',
    category: 'streak',
    titleKey: 'gamification.ach.fortnightFocusTitle',
    descriptionKey: 'gamification.ach.fortnightFocusDesc',
    icon: ICONS.flame,
    check: (data) => data.streak.bestStreak >= 14,
  },
  {
    id: 'monthly_momentum',
    category: 'streak',
    titleKey: 'gamification.ach.monthlyMomentumTitle',
    descriptionKey: 'gamification.ach.monthlyMomentumDesc',
    icon: ICONS.calendar,
    check: (data) => data.streak.bestStreak >= 30,
  },
  {
    id: 'century_streak',
    category: 'streak',
    titleKey: 'gamification.ach.centuryStreakTitle',
    descriptionKey: 'gamification.ach.centuryStreakDesc',
    icon: ICONS.flame,
    check: (data) => data.streak.bestStreak >= 100,
  },

  // ─── Exercise Performance (6) ──────────────────────────────────────
  {
    id: 'first_perfect',
    category: 'exercise',
    titleKey: 'gamification.ach.firstPerfectTitle',
    descriptionKey: 'gamification.ach.firstPerfectDesc',
    icon: ICONS.star,
    check: (data) => data.totalPerfectExercises >= 1,
  },
  {
    id: 'sharp_ear',
    category: 'exercise',
    titleKey: 'gamification.ach.sharpEarTitle',
    descriptionKey: 'gamification.ach.sharpEarDesc',
    icon: ICONS.ear,
    // This requires external tracking — approximated by having ear training perfect scores
    // The hook should set a flag when an ear training module is passed with all 1.0 scores
    check: (data) => data.totalPerfectExercises >= 5 && data.totalExercisesAttempted >= 10,
  },
  {
    id: 'perfect_module',
    category: 'exercise',
    titleKey: 'gamification.ach.perfectModuleTitle',
    descriptionKey: 'gamification.ach.perfectModuleDesc',
    icon: ICONS.check,
    // Check if any module has all perfect scores
    check: (_, progress) => {
      const results = progress.exerciseResults ?? {};
      for (const result of Object.values(results)) {
        const scores = Object.values(result.scores);
        if (scores.length >= 3 && scores.every((s) => s === 1)) return true;
      }
      return false;
    },
  },
  {
    id: 'century_club',
    category: 'exercise',
    titleKey: 'gamification.ach.centuryClubTitle',
    descriptionKey: 'gamification.ach.centuryClubDesc',
    icon: ICONS.hundred,
    check: (data) => data.totalExercisesAttempted >= 100,
  },
  {
    id: 'exercise_veteran',
    category: 'exercise',
    titleKey: 'gamification.ach.exerciseVeteranTitle',
    descriptionKey: 'gamification.ach.exerciseVeteranDesc',
    icon: ICONS.medal,
    check: (data) => data.totalExercisesAttempted >= 500,
  },
  {
    id: 'golden_fifty',
    category: 'exercise',
    titleKey: 'gamification.ach.goldenFiftyTitle',
    descriptionKey: 'gamification.ach.goldenFiftyDesc',
    icon: ICONS.goldBadge,
    check: (data) => data.totalPerfectExercises >= 50,
  },

  // ─── Engagement (4) ────────────────────────────────────────────────
  {
    id: 'dedicated_learner',
    category: 'engagement',
    titleKey: 'gamification.ach.dedicatedLearnerTitle',
    descriptionKey: 'gamification.ach.dedicatedLearnerDesc',
    icon: ICONS.activity,
    // 5 different days in a single week — checked by activity log
    check: (data) => {
      // Group activity days by ISO week and check if any week has 5+ days
      const weekCounts = new Map<string, number>();
      for (const day of data.activityLog) {
        const d = new Date(day.date + 'T00:00:00Z');
        const dow = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dow);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
        const weekKey = `${d.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`;
        weekCounts.set(weekKey, (weekCounts.get(weekKey) ?? 0) + 1);
      }
      for (const count of weekCounts.values()) {
        if (count >= 5) return true;
      }
      return false;
    },
  },
  {
    id: 'reviewer',
    category: 'engagement',
    titleKey: 'gamification.ach.reviewerTitle',
    descriptionKey: 'gamification.ach.reviewerDesc',
    icon: ICONS.refresh,
    check: (data) => data.totalReviewsCompleted >= 10,
  },
  {
    id: 'review_blitz',
    category: 'engagement',
    titleKey: 'gamification.ach.reviewBlitzTitle',
    descriptionKey: 'gamification.ach.reviewBlitzDesc',
    icon: ICONS.zap,
    check: (data) => data.totalReviewsCompletedToday >= 5,
  },
  {
    id: 'review_master',
    category: 'engagement',
    titleKey: 'gamification.ach.reviewMasterTitle',
    descriptionKey: 'gamification.ach.reviewMasterDesc',
    icon: ICONS.target,
    check: (data) => data.totalReviewsCompleted >= 50,
  },
];
