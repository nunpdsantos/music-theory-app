import { m } from 'framer-motion';
import { noteToString } from '../../core/types/music.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { useAppStore } from '../../state/store.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';

const QUALITY_LABELS: Record<string, string> = {
  major: '',
  minor: 'm',
  diminished: 'dim',
  augmented: 'aug',
  major7: 'maj7',
  minor7: 'm7',
  dominant7: '7',
  half_diminished7: 'ø7',
  diminished7: 'dim7',
  augmented_major7: 'aug(maj7)',
  minor_major7: 'm(maj7)',
};

const QUALITY_FULL: Record<string, string> = {
  major: 'Major',
  minor: 'Minor',
  diminished: 'Dim',
  augmented: 'Aug',
  major7: 'Maj 7',
  minor7: 'Min 7',
  dominant7: 'Dom 7',
  half_diminished7: 'Half-dim',
  diminished7: 'Dim 7',
};

export function ChordGrid() {
  const { diatonicChords } = useKeyContext();
  const setSelectedChord = useAppStore((s) => s.setSelectedChord);
  const selectedChord = useAppStore((s) => s.selectedChord);

  if (diatonicChords.length === 0) {
    return (
      <div
        className="text-xs px-4 py-8 text-center rounded-xl border"
        style={{
          color: 'var(--text-dim)',
          borderColor: 'color-mix(in srgb, var(--card-hover) 50%, transparent)',
          backgroundColor: 'color-mix(in srgb, var(--bg) 30%, transparent)',
        }}
      >
        No diatonic chords for this scale type
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2" role="group" aria-label="Diatonic chords">
      {diatonicChords.map(({ chord, numeral, degree }, i) => {
        const color = DEGREE_COLORS[degree as keyof typeof DEGREE_COLORS];
        const rootLabel = noteToString(chord.root);
        const qualityLabel = QUALITY_LABELS[chord.quality] ?? chord.quality;
        const qualityFull = QUALITY_FULL[chord.quality] ?? chord.quality;
        const isSelected =
          selectedChord !== null &&
          noteToString(selectedChord.root) === rootLabel &&
          selectedChord.quality === chord.quality;

        return (
          <m.button
            key={degree}
            onClick={() => setSelectedChord(isSelected ? null : chord)}
            className="relative flex flex-col items-center gap-1.5 p-3 max-sm:p-2 rounded-xl overflow-hidden group"
            style={{
              backgroundColor: isSelected ? `${color}18` : 'var(--card)',
              border: isSelected ? `1.5px solid ${color}60` : '1.5px solid var(--card-hover)',
              boxShadow: isSelected ? `0 0 20px ${color}10` : 'none',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            aria-pressed={isSelected}
            aria-label={`${rootLabel} ${chord.quality} chord, degree ${degree}`}
          >
            {/* Subtle top accent line */}
            <div
              className="absolute top-0 left-2 right-2 h-px opacity-40"
              style={{ backgroundColor: color }}
            />

            <span
              className="text-[11px] font-bold"
              style={{ color }}
            >
              {numeral}
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
              {rootLabel}
              <span className="font-normal" style={{ color: 'var(--text-dim)' }}>{qualityLabel}</span>
            </span>
            <span className="text-[9px] transition-colors" style={{ color: 'var(--text-dim)' }}>
              {qualityFull}
            </span>
          </m.button>
        );
      })}
    </div>
  );
}
