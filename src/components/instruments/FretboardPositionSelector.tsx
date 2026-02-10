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
}

const btnBase = 'text-[10px] px-2 py-0.5 rounded transition-colors';

function selectorStyle(isActive: boolean) {
  return {
    backgroundColor: isActive ? '#60A5FA' : 'transparent',
    color: isActive ? '#000' : '#71717a',
    border: isActive ? '1px solid #60A5FA' : '1px solid #3f3f46',
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
}: FretboardPositionSelectorProps) {
  // Chord shape selector
  if (selectedChord && chordShapeCount > 0) {
    return (
      <div role="tablist" aria-label="Chord position" className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Position:</span>
        {Array.from({ length: chordShapeCount }, (_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={selectedShapeIdx === idx}
            onClick={() => onSelectShape(idx)}
            className={btnBase}
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
      <div role="tablist" aria-label="Scale position" className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Scale pos:</span>
        <button
          role="tab"
          aria-selected={guitarScalePosition === null}
          onClick={() => onSelectScalePosition(null)}
          className={btnBase}
          style={selectorStyle(guitarScalePosition === null)}
        >
          All
        </button>
        {scalePositions.map((sp, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={guitarScalePosition === idx}
            onClick={() => onSelectScalePosition(idx)}
            className={btnBase}
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
