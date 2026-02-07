import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { KeySelector } from '../components/navigation/KeySelector.tsx';
import { ScaleDegreeBar } from '../components/theory/ScaleDegreeBar.tsx';
import { ChordGrid } from '../components/theory/ChordGrid.tsx';
import { CircleOfFifths } from '../components/theory/CircleOfFifths.tsx';
import { DetailPanel } from '../components/panels/DetailPanel.tsx';
import { useKeyContext } from '../hooks/useKeyContext.ts';
import { noteToString } from '../core/types/music.ts';
import { SCALE_TYPE_NAMES } from '../core/constants/scales.ts';
import { useAppStore } from '../state/store.ts';
import { DEGREE_COLORS } from '../design/tokens/colors.ts';
import {
  playScale,
  SYNTH_PRESETS,
  resumeAudio,
} from '../core/services/audio.ts';

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function ExploreView() {
  const { scale } = useKeyContext();
  const selectedScale = useAppStore((s) => s.selectedScale);
  const setDetailPanelOpen = useAppStore((s) => s.setDetailPanelOpen);
  const setSelectedChord = useAppStore((s) => s.setSelectedChord);
  const detailPanelOpen = useAppStore((s) => s.detailPanelOpen);
  const synthPreset = useAppStore((s) => s.synthPreset);
  const baseOctave = useAppStore((s) => s.baseOctave);

  const handleShowScale = () => {
    setSelectedChord(null);
    setDetailPanelOpen(true);
  };

  const handleQuickPlay = useCallback(async () => {
    await resumeAudio();
    const config = SYNTH_PRESETS[synthPreset] ?? {};
    playScale(scale.notes, baseOctave, true, false, 0.25, () => {}, () => {}, config);
  }, [scale, synthPreset, baseOctave]);

  const tonicColor = DEGREE_COLORS[1];

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto px-5 py-5 space-y-7"
        >
          {/* ─── Key / Scale Selector ──────────────────────────── */}
          <motion.div variants={fadeUp}>
            <KeySelector />
          </motion.div>

          {/* ─── Hero: Current Scale Context ───────────────────── */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl overflow-hidden"
            style={{
              backgroundColor: `${tonicColor}06`,
              border: `1px solid ${tonicColor}12`,
            }}
          >
            {/* Subtle gradient wash */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 20% 50%, ${tonicColor}08 0%, transparent 60%)`,
              }}
            />

            <div className="relative px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 learn-serif">
                  {noteToString(scale.root)}{' '}
                  <span className="text-zinc-400 font-normal">
                    {SCALE_TYPE_NAMES[selectedScale]}
                  </span>
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  {scale.notes.length} notes &middot;{' '}
                  {scale.notes.map((n) => noteToString(n)).join(' ')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickPlay}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 hover:scale-[1.03]"
                  style={{
                    backgroundColor: `${tonicColor}15`,
                    color: tonicColor,
                    border: `1px solid ${tonicColor}30`,
                  }}
                  aria-label="Play scale ascending"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Play
                </button>
                <button
                  onClick={handleShowScale}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-800/40 border border-zinc-700/40 hover:border-zinc-600/60 transition-all duration-150"
                >
                  Details
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* ─── Scale Degrees ──────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h3 className="text-[10px] font-bold text-zinc-600 mb-2.5 uppercase tracking-widest">
              Scale Degrees
            </h3>
            <ScaleDegreeBar />
          </motion.div>

          {/* ─── Chord Grid + Circle of Fifths ─────────────────── */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6"
          >
            <div>
              <h3 className="text-[10px] font-bold text-zinc-600 mb-2.5 uppercase tracking-widest">
                Diatonic Chords
              </h3>
              <ChordGrid />
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-zinc-600 mb-2.5 uppercase tracking-widest">
                Circle of Fifths
              </h3>
              <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-3">
                <CircleOfFifths />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Detail panel */}
      {detailPanelOpen && <DetailPanel />}
    </div>
  );
}
