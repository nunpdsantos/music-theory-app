import { AnimatePresence, m } from 'framer-motion';
import { useAppStore } from '../../state/store.ts';
import { ChordDetail } from './ChordDetail.tsx';
import { ScaleDetail } from './ScaleDetail.tsx';
import { useIsCompact } from '../../hooks/useMediaQuery.ts';

export function DetailPanel() {
  const detailPanelOpen = useAppStore((s) => s.detailPanelOpen);
  const selectedChord = useAppStore((s) => s.selectedChord);
  const setDetailPanelOpen = useAppStore((s) => s.setDetailPanelOpen);
  const setSelectedChord = useAppStore((s) => s.setSelectedChord);
  const compact = useIsCompact();

  const handleClose = () => {
    setDetailPanelOpen(false);
    setSelectedChord(null);
    // Restore focus to chord grid
    requestAnimationFrame(() => {
      const btn = document.querySelector<HTMLElement>('[aria-label="Diatonic chords"] button');
      btn?.focus();
    });
  };

  // Mobile/tablet: inline panel at top of scroll area (not a fixed overlay)
  // so the fretboard with the chord shape stays visible at the bottom
  if (compact) {
    return (
      <AnimatePresence>
        {detailPanelOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="overflow-hidden backdrop-blur-md"
            style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'color-mix(in srgb, var(--bg-raised) 95%, transparent)' }}
          >
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-b from-[var(--accent-bg)] to-transparent" />

            {/* Close button */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <span className="type-section">
                Details
              </span>
              <button
                onClick={handleClose}
                className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-[var(--card-hover)] transition-colors"
                aria-label="Close panel"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-4 pb-4 relative z-10">
              {selectedChord ? (
                <ChordDetail chord={selectedChord} />
              ) : (
                <ScaleDetail />
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: sidebar sliding in from right
  return (
    <AnimatePresence>
      {detailPanelOpen && (
        <m.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="w-80 shrink-0 backdrop-blur-md overflow-y-auto relative"
          style={{ backgroundColor: 'color-mix(in srgb, var(--bg-raised) 95%, transparent)', borderLeft: '1px solid var(--border-subtle)' }}
        >
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-b from-[var(--accent-bg)] to-transparent" />

          {/* Close button */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 pt-3 pb-2">
            <span className="type-section">
              Details
            </span>
            <button
              onClick={handleClose}
              className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-[var(--card-hover)] transition-colors"
              aria-label="Close panel"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 pb-6 relative z-10">
            {selectedChord ? (
              <ChordDetail chord={selectedChord} />
            ) : (
              <ScaleDetail />
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
