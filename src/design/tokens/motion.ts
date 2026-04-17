export const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 500, damping: 30 };
export const SPRING_GENTLE = { type: 'spring' as const, stiffness: 300, damping: 25 };
export const SPRING_MICRO = { type: 'spring' as const, stiffness: 600, damping: 35 };
/** Drawers / side panels sliding in. Slower + damper than SNAPPY so there's
 *  weight to the motion. */
export const SPRING_PANEL = { type: 'spring' as const, stiffness: 350, damping: 30 };
/** Chip / checkmark reveal — same stiffness as SNAPPY but less damped so
 *  it bounces once on entry. */
export const SPRING_BOUNCY = { type: 'spring' as const, stiffness: 500, damping: 25 };
/** Navigation transitions between learn-view steps (level → unit → module).
 *  Medium stiffness, high damping — no bounce, just a crisp slide. */
export const SPRING_NAV = { type: 'spring' as const, stiffness: 400, damping: 35 };

export const PANEL_SLIDE = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: SPRING_GENTLE,
};

export const CHIP_POP = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: SPRING_SNAPPY,
};
