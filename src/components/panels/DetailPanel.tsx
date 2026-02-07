import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../state/store.ts';
import { ChordDetail } from './ChordDetail.tsx';
import { ScaleDetail } from './ScaleDetail.tsx';

export function DetailPanel() {
  const detailPanelOpen = useAppStore((s) => s.detailPanelOpen);
  const selectedChord = useAppStore((s) => s.selectedChord);
  const setDetailPanelOpen = useAppStore((s) => s.setDetailPanelOpen);
  const setSelectedChord = useAppStore((s) => s.setSelectedChord);

  const handleClose = () => {
    setDetailPanelOpen(false);
    setSelectedChord(null);
  };

  return (
    <AnimatePresence>
      {detailPanelOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="w-80 shrink-0 bg-zinc-900/95 backdrop-blur-sm border-l border-zinc-800 overflow-y-auto relative"
        >
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-b from-blue-500/[0.04] to-transparent" />

          {/* Close button */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 pt-3 pb-2">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              Details
            </span>
            <button
              onClick={handleClose}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
