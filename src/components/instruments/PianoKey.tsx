import { useCallback, useRef } from 'react';
import type { PianoKey as PianoKeyData } from '../../core/utils/pianoLayout.ts';
import { noteToString } from '../../core/types/music.ts';

interface PianoKeyProps {
  keyData: PianoKeyData;
  isHighlighted: boolean;
  highlightColor?: string;
  isActive: boolean;
  isChordTone: boolean;
  isVoicingNote: boolean; // exact MIDI match for current inversion
  isDimmed: boolean;
  onNoteOn: (keyData: PianoKeyData) => void;
  onNoteOff: (keyData: PianoKeyData) => void;
  showLabel: boolean;
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
}: PianoKeyProps) {
  const isPressed = useRef(false);

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
  const color = highlightColor ?? '#60A5FA';

  // Visual priority:
  // 1. isActive (user pressing) — full color
  // 2. isVoicingNote (exact MIDI in chord voicing) — full vivid color + strong glow + depression
  // 3. isChordTone (pitch class match, not exact voicing) — subtle tint
  // 4. isHighlighted + !isDimmed (scale note, no chord selected) — normal scale color
  // 5. isDimmed (scale note, chord selected, not chord tone) — revert to default
  // 6. default — white/black key

  if (keyData.isBlack) {
    let bg: string;
    let opacity = 1;
    let border = '1px solid #000';
    let shadow = '0 2px 4px rgba(0,0,0,0.5)';
    let transform = 'none';
    let labelColor = '#666';

    if (isActive) {
      bg = color;
      shadow = 'inset 0 -2px 4px rgba(0,0,0,0.3)';
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
      bg = '#1c1c1e';
    } else if (isHighlighted) {
      bg = color;
      opacity = 0.8;
      labelColor = '#000';
    } else {
      bg = '#1c1c1e';
    }

    return (
      <div
        role="button"
        aria-label={`${label}${keyData.octave}`}
        className="absolute z-10 cursor-pointer select-none touch-none"
        style={{
          width: 28,
          height: 130,
          backgroundColor: bg,
          opacity,
          borderRadius: '0 0 4px 4px',
          border,
          boxShadow: shadow,
          transform,
          transition: 'transform 0.05s, background-color 0.08s, opacity 0.15s, box-shadow 0.15s, border 0.1s',
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerUp}
      >
        {showLabel && (isHighlighted || isChordTone || isVoicingNote) && (
          <span
            className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold"
            style={{ color: labelColor }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }

  // White key
  let bg: string;
  let opacity = 1;
  let border = '1px solid #bbb';
  let shadow = '0 2px 4px rgba(0,0,0,0.15)';
  let transform = 'none';
  let labelColor = '#999';

  if (isActive) {
    bg = color;
    shadow = 'inset 0 -2px 6px rgba(0,0,0,0.15)';
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
    bg = '#e8e8e8';
  } else if (isHighlighted) {
    bg = color;
    opacity = 0.7;
    labelColor = '#000';
  } else {
    bg = '#e8e8e8';
  }

  return (
    <div
      role="button"
      aria-label={`${label}${keyData.octave}`}
      className="relative shrink-0 cursor-pointer select-none touch-none"
      style={{
        width: 44,
        height: 210,
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
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold"
        style={{ color: labelColor }}
      >
        {showLabel && (isC ? `C${keyData.octave}` : (isHighlighted || isChordTone || isVoicingNote) ? label : '')}
      </span>
    </div>
  );
}
