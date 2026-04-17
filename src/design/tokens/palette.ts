/**
 * Semantic color palette for app-wide cross-cutting colors.
 *
 * Named by role, not by hue (per brand tweak policy). If the brand shifts
 * tonight, every consumer that reads from here keeps working.
 *
 * Scope: colors used for cross-app meaning (success, warning, etc.).
 * Color systems with music-theory meaning (DEGREE_COLORS) or curriculum
 * identity (LEVEL_ACCENTS) live in sibling modules and reference entries
 * here where the role happens to overlap.
 */

export const palette = {
  /** Brand anchor — also L1 curriculum + tonic degree. */
  accent: '#60A5FA',
  /** Secondary info tone — sky. Used for L2 curriculum + sync info. */
  info: '#38BDF8',
  /** Success / completion / emerald — L3 curriculum, mediant/subdominant, toast. */
  success: '#34D399',
  /** Warning / review / amber — L5 curriculum, dominant degree, toast, review queue. */
  warning: '#FBBF24',
  /** Danger / error / red — L9 curriculum, leading tone, toast error, recording. */
  danger: '#F87171',
} as const;

/**
 * Alt tones: distinct hues that appear in small UI chrome (sync dots,
 * achievement icon, etc.). Kept separate because they don't match the core
 * palette tones exactly and changing them would drift those affordances.
 */
export const paletteAlt = {
  /** Brighter red for UI signal dots (stands out against chrome). */
  dangerBright: '#EF4444',
  /** Brighter green for sync-ok dot. */
  successBright: '#22C55E',
  /** Deeper amber for achievement icon. */
  warningDeep: '#F59E0B',
} as const;
