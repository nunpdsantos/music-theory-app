import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'accent' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const VARIANT_CLASS: Record<Variant, string> = {
  accent: 'btn-accent',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    loading = false,
    disabled,
    startIcon,
    endIcon,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const classes = [
    VARIANT_CLASS[variant],
    size === 'sm' ? 'btn-sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isInert = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isInert}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      className={classes}
      {...rest}
    >
      {loading ? <Spinner /> : startIcon}
      {children}
      {!loading && endIcon}
    </button>
  );
});

function Spinner() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="animate-spin shrink-0"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M12 2 A 10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
