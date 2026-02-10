import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, m } from 'framer-motion';
import { useAppStore } from '../../state/store.ts';

const STORAGE_KEY = 'music-theory-onboarding-complete';

interface TourStep {
  selector: string;
  placement: 'above' | 'below';
  titleKey: string;
  bodyKey: string;
  interactive: boolean;
}

const STEPS: TourStep[] = [
  { selector: '[data-tour="instrument"]', placement: 'above', titleKey: 'tour.step1Title', bodyKey: 'tour.step1Body', interactive: false },
  { selector: '[data-tour="key-scale"]', placement: 'below', titleKey: 'tour.step2Title', bodyKey: 'tour.step2Body', interactive: false },
  { selector: '[data-tour="play-note"]', placement: 'above', titleKey: 'tour.step3Title', bodyKey: 'tour.step3Body', interactive: true },
  { selector: '[data-tab="learn"]', placement: 'below', titleKey: 'tour.step4Title', bodyKey: 'tour.step4Body', interactive: false },
];

function useTargetRect(selector: string | null) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!selector) { setRect(null); return; }

    const measure = () => {
      const el = document.querySelector<HTMLElement>(selector);
      if (el) setRect(el.getBoundingClientRect());
    };

    measure();

    const ro = new ResizeObserver(measure);
    const el = document.querySelector<HTMLElement>(selector);
    if (el) ro.observe(el);

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [selector]);

  return rect;
}

export function GuidedTour() {
  const { t } = useTranslation();
  const quickSearchOpen = useAppStore((s) => s.quickSearchOpen);
  const activeNotes = useAppStore((s) => s.activeNotes);

  const [step, setStep] = useState<number | null>(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return null;
    } catch { /* private browsing */ }
    return 0;
  });

  const currentStep = step !== null ? STEPS[step] : null;
  const rect = useTargetRect(currentStep?.selector ?? null);

  // Auto-dismiss when QuickSearch opens
  useEffect(() => {
    if (quickSearchOpen && step !== null) complete();
  }, [quickSearchOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Step 2 auto-advance: watch activeNotes
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    if (step !== 2) return;
    if (activeNotes.size === 0) return;

    debounceRef.current = setTimeout(() => {
      setStep(3);
    }, 600);

    return () => clearTimeout(debounceRef.current);
  }, [step, activeNotes.size]);

  const complete = useCallback(() => {
    setStep(null);
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* noop */ }
  }, []);

  const next = useCallback(() => {
    setStep((s) => {
      if (s === null) return null;
      if (s >= STEPS.length - 1) { complete(); return null; }
      return s + 1;
    });
  }, [complete]);

  // Escape to skip
  useEffect(() => {
    if (step === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') complete();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, complete]);

  if (step === null || !rect) return null;

  const pad = 8;
  const spotlightStyle: React.CSSProperties = {
    position: 'fixed',
    left: rect.left - pad,
    top: rect.top - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
    borderRadius: 12,
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
    zIndex: 45,
    pointerEvents: currentStep!.interactive ? 'none' : 'auto',
  };

  // Tooltip positioning
  const tooltipWidth = 280;
  const gap = 12;
  let tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
  let tooltipTop: number;

  if (currentStep!.placement === 'above') {
    tooltipTop = rect.top - pad - gap;
  } else {
    tooltipTop = rect.bottom + pad + gap;
  }

  // Clamp horizontal
  const margin = 12;
  if (tooltipLeft < margin) tooltipLeft = margin;
  if (tooltipLeft + tooltipWidth > window.innerWidth - margin) {
    tooltipLeft = window.innerWidth - margin - tooltipWidth;
  }

  const isLast = step === STEPS.length - 1;

  return (
    <>
      {/* Spotlight cutout */}
      <div style={spotlightStyle} aria-hidden="true" />

      {/* Clickable backdrop outside spotlight for non-interactive steps */}
      {!currentStep!.interactive && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 45, background: 'transparent' }}
          onClick={(e) => e.stopPropagation()}
          aria-hidden="true"
        />
      )}

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <m.div
          key={step}
          role="dialog"
          aria-label={t(currentStep!.titleKey)}
          initial={{ opacity: 0, y: currentStep!.placement === 'above' ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: currentStep!.placement === 'above' ? 8 : -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl p-4 shadow-xl"
          style={{
            position: 'fixed',
            left: tooltipLeft,
            top: currentStep!.placement === 'above' ? undefined : tooltipTop,
            bottom: currentStep!.placement === 'above' ? window.innerHeight - tooltipTop : undefined,
            width: tooltipWidth,
            zIndex: 46,
            backgroundColor: 'var(--bg-raised)',
            border: '1px solid var(--border)',
          }}
        >
          <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>
            {t(currentStep!.titleKey)}
          </h3>
          <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t(currentStep!.bodyKey)}
          </p>

          {/* Step dots */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-colors"
                  style={{ backgroundColor: i === step ? 'var(--accent)' : 'var(--border)' }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!isLast && (
                <button
                  onClick={complete}
                  className="px-3 py-1.5 text-xs rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {t('tour.skip')}
                </button>
              )}
              <button
                onClick={next}
                className="px-4 py-1.5 text-xs font-medium rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--text-on-accent, #fff)' }}
              >
                {isLast ? t('tour.finish') : t('tour.next')}
              </button>
            </div>
          </div>
        </m.div>
      </AnimatePresence>
    </>
  );
}
