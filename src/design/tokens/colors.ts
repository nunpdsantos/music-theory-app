// Functional color system — scale degree determines color, not pitch class
export const DEGREE_COLORS = {
  1: '#60A5FA', // I (Tonic) — blue, stability
  2: '#A78BFA', // ii — violet
  3: '#F472B6', // iii — pink
  4: '#34D399', // IV — emerald
  5: '#FBBF24', // V (Dominant) — amber, tension
  6: '#FB923C', // vi — orange
  7: '#F87171', // vii (Leading tone) — red, strong tension
} as const;

export const DEGREE_COLORS_DIM = {
  1: 'rgba(96, 165, 250, 0.15)',
  2: 'rgba(167, 139, 250, 0.15)',
  3: 'rgba(244, 114, 182, 0.15)',
  4: 'rgba(52, 211, 153, 0.15)',
  5: 'rgba(251, 191, 36, 0.15)',
  6: 'rgba(251, 146, 60, 0.15)',
  7: 'rgba(248, 113, 113, 0.15)',
} as const;

export const SURFACE = {
  bg: '#09090b',
  card: '#18181b',
  cardHover: '#27272a',
  border: '#3f3f46',
  borderLight: '#52525b',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  textDim: '#71717a',
} as const;
