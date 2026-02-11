import type { DifficultyTier } from '../../core/types/curriculum';

export const LEVEL_ACCENTS: Record<string, string> = {
  l1: '#60A5FA', // blue — Foundations
  l2: '#38BDF8', // sky — Expanding Fundamentals
  l3: '#34D399', // emerald — Harmony Foundations
  l4: '#2DD4BF', // teal — Diatonic Mastery
  l5: '#FBBF24', // amber — Chromaticism & Modulation
  l6: '#FB923C', // orange — Chromatic Harmony
  l7: '#F472B6', // pink — Jazz, Pop, Modal
  l8: '#A78BFA', // violet — Advanced Analysis
  l9: '#F87171', // red — Ear Training (parallel)
};

export const DIFFICULTY_CONFIG: Record<
  DifficultyTier,
  { labelKey: string; color: string; bg: string }
> = {
  beginner: { labelKey: 'difficulty.beginner', color: '#60A5FA', bg: 'rgba(96, 165, 250, 0.12)' },
  intermediate: { labelKey: 'difficulty.intermediate', color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.12)' },
  advanced: { labelKey: 'difficulty.advanced', color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.12)' },
};

export function getLevelAccent(levelId: string): string {
  return LEVEL_ACCENTS[levelId] ?? '#60A5FA';
}
