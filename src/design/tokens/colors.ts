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

// Surface tokens — resolve to CSS custom properties for theme support
// Usage: style={{ backgroundColor: SURFACE.card }}
export const SURFACE = {
  bg: 'var(--bg)',
  bgRaised: 'var(--bg-raised)',
  card: 'var(--card)',
  cardHover: 'var(--card-hover)',
  cardActive: 'var(--card-active)',
  border: 'var(--border)',
  borderLight: 'var(--border-light)',
  borderSubtle: 'var(--border-subtle)',
  text: 'var(--text)',
  textMuted: 'var(--text-muted)',
  textDim: 'var(--text-dim)',
  inputBg: 'var(--input-bg)',
  accent: 'var(--accent)',
  accentHover: 'var(--accent-hover)',
  accentDim: 'var(--accent-dim)',
  accentBg: 'var(--accent-bg)',
  focusRing: 'var(--focus-ring)',
  shadowSm: 'var(--shadow-sm)',
  shadowMd: 'var(--shadow-md)',
  shadowLg: 'var(--shadow-lg)',
  shadowGlow: 'var(--shadow-glow)',
  pianoWhite: 'var(--piano-white)',
  pianoBlack: 'var(--piano-black)',
  pianoBorder: 'var(--piano-border)',
  pianoLabel: 'var(--piano-label)',
} as const;
