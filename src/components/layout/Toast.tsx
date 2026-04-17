import type { ReactNode } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useToastStore, type ToastType } from '../../state/toastStore.ts';
import { Card } from '../ui/Card';
import { SPRING_SNAPPY } from '../../design/tokens/motion';
import { palette } from '../../design/tokens/palette';

const TONE_COLORS: Record<ToastType, string> = {
  success: palette.success,
  info: palette.accent,   // info toast uses brand blue, not sky — longstanding choice
  warning: palette.warning,
  error: palette.danger,
};

const ICONS: Record<ToastType, ReactNode> = {
  success: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.success} strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.accent} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  warning: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.warning} strokeWidth="2.5" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.danger} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div
      className="fixed bottom-4 right-4 max-sm:right-0 max-sm:left-0 max-sm:bottom-0 max-sm:px-3 max-sm:pb-3 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <m.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={SPRING_SNAPPY}
            className="pointer-events-auto max-sm:w-full"
            style={{ minWidth: 220, maxWidth: 360 }}
          >
            <Card
              accentColor={TONE_COLORS[t.type]}
              accentEdge="left"
              padding="none"
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium shadow-lg"
              role="status"
            >
              <span className="shrink-0">{ICONS[t.type]}</span>
              <span className="flex-1">{t.message}</span>
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 rounded p-0.5 transition-colors hover:text-[color:var(--text)]"
                style={{ color: 'var(--text-dim)' }}
                aria-label="Dismiss"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </Card>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
