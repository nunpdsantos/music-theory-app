export const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 500, damping: 30 };
export const SPRING_GENTLE = { type: 'spring' as const, stiffness: 300, damping: 25 };

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
