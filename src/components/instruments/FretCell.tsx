import { memo } from 'react';
import { noteToString } from '../../core/types/music.ts';
import type { PitchedNote } from '../../core/types/music.ts';
import type { FingerNumber } from '../../core/constants/guitarChordShapes.ts';
import { fingerLabel } from './fretboardConstants.ts';

interface FretCellProps {
  fret: number;
  stringIdx: number;
  pitched: PitchedNote;
  color: string | undefined;
  dotColor: string;
  isActive: boolean;
  isRoot: boolean;
  isMuted: boolean;
  fretMinWidth: number;
  isChordView: boolean;
  // Voicing
  showVoicing: boolean;
  finger: FingerNumber | undefined;
  // Scale position
  showScalePos: boolean;
  scalePosIsRoot: boolean | undefined;
  scalePosDegree: string | undefined;
  // Scale dot (full fretboard)
  showScaleDot: boolean;
  // Keyboard navigation
  isFocused: boolean;
  onClick: () => void;
}

export const FretCell = memo(function FretCell({
  fret,
  stringIdx,
  pitched,
  color,
  dotColor,
  isActive,
  isRoot,
  isMuted,
  fretMinWidth,
  isChordView,
  showVoicing,
  finger,
  showScalePos,
  scalePosIsRoot,
  scalePosDegree,
  showScaleDot,
  isFocused,
  onClick,
}: FretCellProps) {
  const noteLabel = noteToString(pitched);

  return (
    <div
      data-fret={fret}
      data-string-row={stringIdx}
      role="button"
      aria-label={`${noteLabel}, fret ${fret}, string ${6 - stringIdx}`}
      aria-pressed={isActive}
      className="flex-1 flex items-center justify-center relative cursor-pointer"
      style={{
        minWidth: fretMinWidth,
        ...(isFocused ? {
          outline: '2px solid rgba(96, 165, 250, 0.6)',
          outlineOffset: -2,
          borderRadius: 4,
        } : undefined),
      }}
      onClick={onClick}
    >
      {/* String line */}
      <div
        className="absolute w-full"
        style={{
          height: 1 + (5 - stringIdx) * 0.3,
          backgroundColor: isMuted ? '#3f3f46' : '#71717a',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
      {/* Chord voicing dot */}
      {showVoicing && (
        <div
          className="relative z-10 rounded-full flex items-center justify-center font-bold"
          style={{
            width: isChordView ? 26 : 22,
            height: isChordView ? 26 : 22,
            fontSize: finger && fingerLabel(finger) ? (isChordView ? 12 : 10) : 9,
            backgroundColor: dotColor,
            color: '#000',
            boxShadow: isRoot
              ? `0 0 16px ${dotColor}aa, 0 0 6px ${dotColor}88`
              : `0 0 12px ${dotColor}88, 0 0 4px ${dotColor}66`,
            border: isRoot
              ? '3px solid #ffffff'
              : `2px solid ${dotColor}`,
          }}
        >
          {fingerLabel(finger) || noteToString(pitched)}
        </div>
      )}
      {/* Scale position dot */}
      {showScalePos && (
        <div
          className="relative z-10 rounded-full flex items-center justify-center font-bold"
          style={{
            width: 24,
            height: 24,
            fontSize: 9,
            backgroundColor: dotColor,
            color: '#000',
            boxShadow: scalePosIsRoot
              ? `0 0 16px ${dotColor}aa, 0 0 6px ${dotColor}88`
              : `0 0 10px ${dotColor}88`,
            border: scalePosIsRoot
              ? '3px solid #ffffff'
              : `2px solid ${dotColor}`,
          }}
        >
          {scalePosDegree ?? noteToString(pitched)}
        </div>
      )}
      {/* Scale dot (no chord, no position selected) */}
      {showScaleDot && (
        <div
          className="relative z-10 rounded-full flex items-center justify-center font-bold transition-all"
          style={{
            width: 20,
            height: 20,
            fontSize: 8,
            backgroundColor: isActive ? color : `${color}cc`,
            color: '#000',
            transform: isActive ? 'scale(1.2)' : 'scale(1)',
            boxShadow: isActive ? `0 0 8px ${color}` : 'none',
          }}
        >
          {noteToString(pitched)}
        </div>
      )}
    </div>
  );
});
