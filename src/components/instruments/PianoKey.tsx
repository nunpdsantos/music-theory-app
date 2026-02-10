import { useCallback, useRef } from 'react';
import type { PianoKey as PianoKeyData } from '../../core/utils/pianoLayout.ts';
import { noteToString } from '../../core/types/music.ts';

type SizeMode = 'mobile' | 'tablet' | 'desktop';

const DIMS: Record<SizeMode, { white: [number, number]; black: [number, number]; labelSize: string }> = {
  desktop: { white: [44, 210], black: [28, 130], labelSize: '10px' },
  tablet:  { white: [36, 160], black: [22, 100], labelSize: '9px' },
  mobile:  { white: [46, 150], black: [28, 92],  labelSize: '9px' },
};

interface PianoKeyProps {
  keyData: PianoKeyData;
  isHighlighted: boolean;
  highlightColor?: string;
  isActive: boolean;
  isChordTone: boolean;
  isVoicingNote: boolean;
  isDimmed: boolean;
  onNoteOn: (keyData: PianoKeyData) => void;
  onNoteOff: (keyData: PianoKeyData) => void;
  showLabel: boolean;
  sizeMode?: SizeMode;
}

export function PianoKeyComponent({
  keyData,
  isHighlighted,
  highlightColor,
  isActive,
  isChordTone,
  isVoicingNote,
  isDimmed,
  onNoteOn,
  onNoteOff,
  showLabel,
  sizeMode = 'desktop',
}: PianoKeyProps) {
  const isPressed = useRef(false);
  const dims = DIMS[sizeMode];

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      isPressed.current = true;
      onNoteOn(keyData);
    },
    [keyData, onNoteOn]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      if (isPressed.current) {
        isPressed.current = false;
        onNoteOff(keyData);
      }
    },
    [keyData, onNoteOff]
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      if (isPressed.current) {
        isPressed.current = false;
        onNoteOff(keyData);
      }
    },
    [keyData, onNoteOff]
  );

  const label = noteToString(keyData.note);
  const isC = keyData.note.natural === 'C' && keyData.note.accidental === '';
  const color = highlightColor ?? 'var(--accent)';

  if (keyData.isBlack) {
    const [bw, bh] = dims.black;
    let bg: string;
    let opacity = 1;
    let border = '1px solid var(--piano-border)';
    let shadow = 'var(--piano-black-shadow)';
    let transform = 'none';
    let labelColor = 'var(--piano-label)';

    if (isActive) {
      bg = color;
      shadow = `inset 0 -2px 4px rgba(0,0,0,0.3), 0 0 8px ${color}66`;
      transform = 'translateY(1px)';
      labelColor = '#000';
    } else if (isVoicingNote) {
      bg = color;
      border = `2px solid #fff`;
      shadow = `0 0 16px ${color}, 0 0 6px ${color}88`;
      transform = 'translateY(2px)';
      labelColor = '#000';
    } else if (isChordTone) {
      bg = `${color}88`;
      border = `1.5px solid ${color}`;
      labelColor = '#fff';
    } else if (isDimmed) {
      bg = 'var(--piano-black)';
    } else if (isHighlighted) {
      bg = color;
      opacity = 0.8;
      labelColor = '#000';
    } else {
      bg = 'var(--piano-black)';
    }

    // On mobile, add invisible padding around black keys for larger touch area
    const touchPad = sizeMode === 'mobile' ? 4 : 0;

    return (
      <div
        role="button"
        aria-label={`${label}${keyData.octave}`}
        className="absolute z-10 cursor-pointer select-none touch-none"
        style={{
          width: bw + touchPad * 2,
          height: bh + touchPad,
          padding: touchPad ? `0 ${touchPad}px ${touchPad}px` : undefined,
          left: -touchPad,
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerUp}
      >
        <div
          style={{
            width: bw,
            height: bh,
            backgroundColor: bg,
            opacity,
            borderRadius: '0 0 4px 4px',
            border,
            boxShadow: shadow,
            transform,
            transition: 'transform 0.05s, background-color 0.08s, opacity 0.15s, box-shadow 0.15s, border 0.1s',
            position: 'relative',
          }}
        >
          {showLabel && (isHighlighted || isChordTone || isVoicingNote) && (
            <span
              className="absolute bottom-1 left-1/2 -translate-x-1/2 font-bold"
              style={{ color: labelColor, fontSize: dims.labelSize }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    );
  }

  // White key
  const [ww, wh] = dims.white;
  let bg: string;
  let opacity = 1;
  let border = '1px solid var(--piano-border)';
  let shadow = 'var(--piano-white-shadow)';
  let transform = 'none';
  let labelColor = 'var(--piano-label)';

  if (isActive) {
    bg = color;
    shadow = `inset 0 -2px 6px rgba(0,0,0,0.15), 0 0 10px ${color}66`;
    transform = 'translateY(1px)';
    labelColor = '#000';
  } else if (isVoicingNote) {
    bg = color;
    border = `3px solid #fff`;
    shadow = `0 0 20px ${color}, 0 0 8px ${color}88`;
    transform = 'translateY(2px)';
    labelColor = '#000';
  } else if (isChordTone) {
    bg = `${color}33`;
    border = `2px solid ${color}88`;
    labelColor = color;
  } else if (isDimmed) {
    bg = 'var(--piano-white)';
  } else if (isHighlighted) {
    bg = color;
    opacity = 0.7;
    labelColor = '#000';
  } else {
    bg = 'var(--piano-white)';
  }

  return (
    <div
      role="button"
      aria-label={`${label}${keyData.octave}`}
      className="relative shrink-0 cursor-pointer select-none touch-none"
      style={{
        width: ww,
        height: wh,
        backgroundColor: bg,
        opacity,
        borderRadius: '0 0 6px 6px',
        border,
        borderTop: 'none',
        boxShadow: shadow,
        transform,
        transition: 'transform 0.05s, background-color 0.08s, opacity 0.15s, box-shadow 0.15s, border 0.1s',
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerUp}
    >
      <span
        className="absolute bottom-2 left-1/2 -translate-x-1/2 font-bold"
        style={{ color: labelColor, fontSize: dims.labelSize }}
      >
        {showLabel && (isC ? `C${keyData.octave}` : (isHighlighted || isChordTone || isVoicingNote) ? label : '')}
      </span>
    </div>
  );
}
