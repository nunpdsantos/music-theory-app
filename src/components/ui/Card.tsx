import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react';

type Variant = 'surface' | 'raised' | 'interactive';
type AccentEdge = 'none' | 'left' | 'all';
type AccentStrength = 'subtle' | 'strong';
type Padding = 'none' | 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  accentColor?: string;
  accentEdge?: AccentEdge;
  /** Controls how opaque the accent tint is.
   *  'subtle' (default) ≈ existing LevelCard/UnitCard look.
   *  'strong' ≈ existing ContinueBanner/ReviewQueue look. */
  accentStrength?: AccentStrength;
  padding?: Padding;
  tappable?: boolean;
  children?: ReactNode;
}

const ACCENT_ALPHAS: Record<AccentStrength, {
  bg: number; border: number; bgHover: number; borderHover: number;
}> = {
  subtle: { bg: 0.03, border: 0.10, bgHover: 0.05, borderHover: 0.20 },
  strong: { bg: 0.06, border: 0.15, bgHover: 0.09, borderHover: 0.28 },
};

type CardDivProps = CommonProps & Omit<HTMLAttributes<HTMLDivElement>, 'color'>;
type CardButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    variant: 'interactive';
  };

export type CardProps = CardDivProps | CardButtonProps;

const PADDING_CLASS: Record<Padding, string> = {
  none: '',
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-5',
};

/** Internal only — centralizes the ${color}XX hex-concat pattern via color-mix.
 * Accepts hex or any CSS color (including var(--x)). */
function tint(color: string, alpha: number): string {
  const pct = Math.round(alpha * 100);
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
}

export const Card = forwardRef<HTMLDivElement | HTMLButtonElement, CardProps>(
  function Card(props, ref) {
    const {
      variant = 'surface',
      accentColor,
      accentEdge = 'none',
      accentStrength = 'subtle',
      padding = 'md',
      tappable,
      className,
      style,
      children,
      ...rest
    } = props;

    const isInteractive = variant === 'interactive';

    const baseClass = 'card-base';
    const variantClass = `card-${variant}`;
    const tappableClass = tappable ? 'card-tappable' : '';
    const classes = [baseClass, variantClass, PADDING_CLASS[padding], tappableClass, className]
      .filter(Boolean)
      .join(' ');

    // Accent tinting. When accentColor is set:
    //  - accentEdge='all' → border uses accent tint (12% border, 4% bg)
    //  - accentEdge='left' → 3px left accent border, neutral surface otherwise
    //  - accentEdge='none' → accent only drives hover on interactive variant
    const hasAccent = !!accentColor;
    const accentStyle: CSSProperties & Record<`--${string}`, string> = {};
    if (hasAccent) {
      const a = ACCENT_ALPHAS[accentStrength];
      accentStyle['--card-accent'] = accentColor;
      accentStyle['--card-accent-bg'] = tint(accentColor, a.bg);
      accentStyle['--card-accent-border'] = tint(accentColor, a.border);
      accentStyle['--card-accent-bg-hover'] = tint(accentColor, a.bgHover);
      accentStyle['--card-accent-border-hover'] = tint(accentColor, a.borderHover);

      if (accentEdge === 'all') {
        accentStyle.backgroundColor = tint(accentColor, a.bg);
        accentStyle.borderColor = tint(accentColor, a.border);
      } else if (accentEdge === 'left') {
        accentStyle.borderLeftColor = accentColor;
        accentStyle.borderLeftWidth = '3px';
      }
    }

    const mergedStyle: CSSProperties = { ...(accentStyle as CSSProperties), ...style };

    if (isInteractive) {
      const { type, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={type ?? 'button'}
          className={classes}
          style={mergedStyle}
          data-accent-edge={accentEdge}
          {...buttonRest}
        >
          {children}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={classes}
        style={mergedStyle}
        data-accent-edge={accentEdge}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  },
);
