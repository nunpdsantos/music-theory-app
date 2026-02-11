import { useTranslation } from 'react-i18next';
import type { Chord } from '../../core/types/music.ts';
import type { ScalePosition } from '../../core/constants/guitarScalePositions.ts';

interface FretboardPositionSelectorProps {
  // Chord positions
  selectedChord: Chord | null;
  chordShapeCount: number;
  positionLabels: string[];
  selectedShapeIdx: number;
  onSelectShape: (idx: number) => void;
  // Scale positions
  hasScalePositions: boolean;
  scalePositions: { position: ScalePosition; baseFret: number }[];
  guitarScalePosition: number | null;
  onSelectScalePosition: (idx: number | null) => void;
  mobile?: boolean;
}

const btnBase = 'text-[10px] px-2 py-0.5 rounded transition-colors';
const btnMobile = 'text-[10px] px-2 py-0.5 rounded transition-colors';

function selectorStyle(isActive: boolean) {
  return {
    backgroundColor: isActive ? '#60A5FA' : 'transparent',
    color: isActive ? '#000' : 'var(--text-dim)',
    border: isActive ? '1px solid #60A5FA' : '1px solid var(--border)',
  };
}

export function FretboardPositionSelector({
  selectedChord,
  chordShapeCount,
  positionLabels,
  selectedShapeIdx,
  onSelectShape,
  hasScalePositions,
  scalePositions,
  guitarScalePosition,
  onSelectScalePosition,
  mobile = false,
}: FretboardPositionSelectorProps) {
  const { t } = useTranslation();
  const btn = mobile ? btnMobile : btnBase;

  // Chord shape selector
  if (selectedChord && chordShapeCount > 0) {
    return (
      <div role="tablist" aria-label={t('fretboard.chordPosition')} className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t('fretboard.position')}</span>
        {Array.from({ length: chordShapeCount }, (_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={selectedShapeIdx === idx}
            onClick={() => onSelectShape(idx)}
            className={btn}
            style={selectorStyle(selectedShapeIdx === idx)}
          >
            {positionLabels[idx]}
          </button>
        ))}
      </div>
    );
  }

  // Scale CAGED position selector
  if (!selectedChord && hasScalePositions) {
    return (
      <div role="tablist" aria-label={t('fretboard.scalePosition')} className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t('fretboard.scalePos')}</span>
        <button
          role="tab"
          aria-selected={guitarScalePosition === null}
          onClick={() => onSelectScalePosition(null)}
          className={btn}
          style={selectorStyle(guitarScalePosition === null)}
        >
          {t('fretboard.all')}
        </button>
        {scalePositions.map((sp, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={guitarScalePosition === idx}
            onClick={() => onSelectScalePosition(idx)}
            className={btn}
            style={selectorStyle(guitarScalePosition === idx)}
          >
            {sp.position.shortName} ({sp.position.cagedShape})
          </button>
        ))}
      </div>
    );
  }

  return null;
}
