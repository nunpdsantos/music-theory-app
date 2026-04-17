import type { DifficultyTier } from '../../core/types/curriculum';
import { palette } from './palette';

/**
 * Level accents — each curriculum level owns a distinct hue so cards, progress
 * bars, and breadcrumbs can visually distinguish a learner's path.
 *
 * Entries that overlap semantic roles reference `palette` so a brand shift
 * carries through. The remaining 4 (teal/orange/pink/violet) are decorative
 * hues with no cross-app semantic role and stay as explicit values.
 */
export const LEVEL_ACCENTS: Record<string, string> = {
  l1: palette.accent,   // blue — Foundations (brand anchor)
  l2: palette.info,     // sky — Expanding Fundamentals
  l3: palette.success,  // emerald — Harmony Foundations
  l4: '#2DD4BF',        // teal — Diatonic Mastery (no semantic role)
  l5: palette.warning,  // amber — Chromaticism & Modulation
  l6: '#FB923C',        // orange — Chromatic Harmony (no semantic role)
  l7: '#F472B6',        // pink — Jazz, Pop, Modal (no semantic role)
  l8: '#A78BFA',        // violet — Advanced Analysis (no semantic role)
  l9: palette.danger,   // red — Ear Training (parallel track)
};

export const DIFFICULTY_CONFIG: Record<
  DifficultyTier,
  { labelKey: string; color: string; bg: string }
> = {
  beginner: {
    labelKey: 'difficulty.beginner',
    color: palette.accent,
    bg: `color-mix(in srgb, ${palette.accent} 12%, transparent)`,
  },
  intermediate: {
    labelKey: 'difficulty.intermediate',
    color: palette.warning,
    bg: `color-mix(in srgb, ${palette.warning} 12%, transparent)`,
  },
  advanced: {
    labelKey: 'difficulty.advanced',
    color: LEVEL_ACCENTS.l8, // violet
    bg: `color-mix(in srgb, ${LEVEL_ACCENTS.l8} 12%, transparent)`,
  },
};

export function getLevelAccent(levelId: string): string {
  return LEVEL_ACCENTS[levelId] ?? palette.accent;
}
