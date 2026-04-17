import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { DEGREE_COLORS } from '../../design/tokens/colors';

type BadgeShape = 'pill' | 'square';
type BadgeSize = 'xs' | 'sm';
type DegreeNumber = keyof typeof DEGREE_COLORS;

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Accent color (hex or CSS color). Ignored when `degree` is set. */
  accentColor?: string;
  /** Convenience: looks up DEGREE_COLORS[N]. */
  degree?: DegreeNumber;
  /** `pill` = rounded-full (default), `square` = rounded-md (note chips). */
  shape?: BadgeShape;
  /** `xs` = 10px text, tight padding (default). `sm` = 12px text, roomier. */
  size?: BadgeSize;
  /** Monospace font (for formula labels). */
  mono?: boolean;
  /** Adds a tinted accent border. Default is borderless (matches pill chips). */
  outlined?: boolean;
  children: ReactNode;
}

function tint(color: string, alpha: number): string {
  const pct = Math.round(alpha * 100);
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
}

const SHAPE_CLASS: Record<BadgeShape, string> = {
  pill: 'rounded-full',
  square: 'rounded-md',
};

const SIZE_CLASS: Record<BadgeSize, string> = {
  xs: 'text-[10px] px-2 py-0.5',
  sm: 'text-xs px-2.5 py-1.5',
};

export function Badge({
  accentColor,
  degree,
  shape = 'pill',
  size = 'xs',
  mono,
  outlined,
  className,
  style,
  children,
  ...rest
}: BadgeProps) {
  const color = degree !== undefined ? DEGREE_COLORS[degree] : accentColor;
  const isAccented = !!color;

  const resolvedStyle: CSSProperties = isAccented
    ? {
        backgroundColor: tint(color!, 0.12),
        color: color!,
        ...(outlined && { border: `1px solid ${tint(color!, 0.3)}` }),
      }
    : {
        backgroundColor: 'var(--card-hover)',
        color: 'var(--text-dim)',
      };

  const classes = [
    'inline-flex items-center gap-1 font-semibold whitespace-nowrap',
    SHAPE_CLASS[shape],
    SIZE_CLASS[size],
    mono ? 'font-mono' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} style={{ ...resolvedStyle, ...style }} {...rest}>
      {children}
    </span>
  );
}
