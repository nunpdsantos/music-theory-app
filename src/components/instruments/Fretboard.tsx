import { useMemo, useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { TUNING_STANDARD, getTuningPitchClasses } from '../../core/constants/guitarTunings.ts';
import { noteToString } from '../../core/types/music.ts';
import { midiToNote } from '../../core/utils/pianoLayout.ts';
import { getChordShapesWithFallback } from '../../core/constants/guitarChordShapes.ts';
import type { ChordShape, FingerNumber } from '../../core/constants/guitarChordShapes.ts';
import { getPitchClass } from '../../core/constants/notes.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { useAudio } from '../../hooks/useAudio.ts';
import { useAppStore } from '../../state/store.ts';
import { useIsMobile } from '../../hooks/useMediaQuery.ts';

const FULL_FRETS = 15;
const CHORD_FRET_WINDOW = 5;
const FRET_MARKERS = [3, 5, 7, 9, 12, 15];
const DOUBLE_MARKERS = [12];

interface FretNote {
  stringIndex: number; // 0 = 6th (low E), 5 = 1st (high E)
  fret: number;
  pitchClass: number;
  midiNumber: number;
}

/** Finger label for display. 0 = open/muted (no label), 'bar' = index finger (1). */
function fingerLabel(f: FingerNumber | undefined): string {
  if (f === undefined || f === 0) return '';
  if (f === 'bar') return '1';
  return String(f);
}

export function Fretboard() {
  const { getNoteColor } = useKeyContext();
  const { noteOn, noteOff } = useAudio();
  const activeNotes = useAppStore((s) => s.activeNotes);
  const selectedChord = useAppStore((s) => s.selectedChord);
  const [selectedShapeIdx, setSelectedShapeIdx] = useState(0);
  const mobile = useIsMobile();

  const tuningPitchClasses = useMemo(() => getTuningPitchClasses(TUNING_STANDARD), []);

  // Get pre-defined chord shapes (with algorithmic fallback for exotic chords)
  const chordShapes = useMemo(() => {
    if (!selectedChord) return [];
    return getChordShapesWithFallback(selectedChord);
  }, [selectedChord]);

  // Reset to first shape when chord changes
  useEffect(() => {
    setSelectedShapeIdx(0);
  }, [selectedChord]);

  const currentShape: { shape: ChordShape; baseFret: number } | null =
    chordShapes[selectedShapeIdx] ?? null;

  // Root pitch class for highlighting root notes
  const rootPitchClass = useMemo(() => {
    if (!selectedChord) return null;
    return getPitchClass(selectedChord.root);
  }, [selectedChord]);

  // Build voicing lookup: stringIndex → { absoluteFret, finger } or null (muted)
  const voicingLookup = useMemo(() => {
    const map = new Map<number, { fret: number; finger: FingerNumber | undefined } | null>();
    if (!currentShape) return map;

    const { shape, baseFret } = currentShape;
    shape.strings.forEach((pos, stringIndex) => {
      if (pos.fret === null) {
        map.set(stringIndex, null); // muted
      } else {
        const absoluteFret = baseFret + (pos.fret as number);
        map.set(stringIndex, { fret: absoluteFret, finger: pos.finger });
      }
    });
    return map;
  }, [currentShape]);

  // Dynamic fret range: focused when chord selected, full when scale-only
  const { visibleFrets, isChordView } = useMemo(() => {
    if (!currentShape) {
      const frets: number[] = [];
      for (let f = FULL_FRETS; f >= 1; f--) frets.push(f);
      return { visibleFrets: frets, isChordView: false };
    }

    const { shape, baseFret } = currentShape;
    // Find absolute fret bounds (excluding open strings)
    let minUsed = Infinity;
    let maxUsed = -Infinity;
    shape.strings.forEach((pos) => {
      if (pos.fret !== null) {
        const abs = baseFret + (pos.fret as number);
        if (abs > 0) {
          minUsed = Math.min(minUsed, abs);
          maxUsed = Math.max(maxUsed, abs);
        }
      }
    });

    if (minUsed === Infinity) {
      // Pure open chord — show first few frets
      minUsed = 1;
      maxUsed = 3;
    }

    const start = Math.max(1, minUsed - 1);
    const end = Math.min(FULL_FRETS, Math.max(start + CHORD_FRET_WINDOW - 1, maxUsed + 1));

    const frets: number[] = [];
    for (let f = end; f >= start; f--) frets.push(f);
    return { visibleFrets: frets, isChordView: true };
  }, [currentShape]);

  // Generate all notes on the fretboard
  const fretNotes = useMemo(() => {
    const notes: FretNote[] = [];
    for (let s = 0; s < 6; s++) {
      const openPc = tuningPitchClasses[s];
      const openOctave = TUNING_STANDARD.strings[s].octave;
      for (let f = 0; f <= FULL_FRETS; f++) {
        const pc = (openPc + f) % 12;
        const midi = 12 + openOctave * 12 + openPc + f;
        notes.push({ stringIndex: s, fret: f, pitchClass: pc, midiNumber: midi });
      }
    }
    return notes;
  }, [tuningPitchClasses]);

  const getFretNote = useCallback(
    (stringIndex: number, fret: number) => {
      return fretNotes.find((n) => n.stringIndex === stringIndex && n.fret === fret)!;
    },
    [fretNotes]
  );

  const handleFretClick = useCallback(
    (fn: FretNote) => {
      const pitched = midiToNote(fn.midiNumber);
      noteOn(pitched, pitched.octave).then((midi) => {
        setTimeout(() => noteOff(midi), 800);
      });
    },
    [noteOn, noteOff]
  );

  // Position labels: use shortName from pre-defined shapes, fallback to "Fret N" with dedup
  const positionLabels = useMemo(() => {
    const baseLabels = chordShapes.map(({ shape, baseFret }) => {
      if (shape.shortName) return shape.shortName;
      return baseFret === 0 ? 'Open' : `Fret ${baseFret}`;
    });
    // Deduplicate
    const counts = new Map<string, number>();
    for (const l of baseLabels) counts.set(l, (counts.get(l) ?? 0) + 1);
    const indexTracker = new Map<string, number>();
    return baseLabels.map((l) => {
      const total = counts.get(l) ?? 1;
      if (total === 1) return l;
      const idx = (indexTracker.get(l) ?? 0) + 1;
      indexTracker.set(l, idx);
      return `${l} #${idx}`;
    });
  }, [chordShapes]);

  // Barre bar measurement
  const fretboardRef = useRef<HTMLDivElement>(null);
  const [barreStyle, setBarreStyle] = useState<React.CSSProperties | null>(null);

  useLayoutEffect(() => {
    if (!fretboardRef.current || !currentShape?.shape.barreInfo) {
      setBarreStyle(null);
      return;
    }

    const { barreInfo } = currentShape.shape;
    const barreFret = currentShape.baseFret + barreInfo.fret;

    // Convert string numbers (6=low E → 1=high E) to row indices (0=low E → 5=high E)
    const fromRow = 6 - barreInfo.fromString;
    const toRow = 6 - barreInfo.toString;
    const topRow = Math.min(fromRow, toRow);
    const bottomRow = Math.max(fromRow, toRow);

    const container = fretboardRef.current;
    const containerRect = container.getBoundingClientRect();

    // Find the target fret cell for the top and bottom rows
    const topCell = container.querySelector(`[data-string-row="${topRow}"][data-fret="${barreFret}"]`);
    const bottomCell = container.querySelector(`[data-string-row="${bottomRow}"][data-fret="${barreFret}"]`);

    if (!topCell || !bottomCell) {
      setBarreStyle(null);
      return;
    }

    const topRect = topCell.getBoundingClientRect();
    const bottomRect = bottomCell.getBoundingClientRect();

    setBarreStyle({
      position: 'absolute',
      left: topRect.left - containerRect.left + topRect.width / 2 - 12,
      top: topRect.top - containerRect.top + topRect.height / 2 - 12,
      width: 24,
      height: bottomRect.top - topRect.top + 24,
      borderRadius: 12,
      backgroundColor: '#ffffff30',
      border: '3px solid #ffffffaa',
      pointerEvents: 'none',
      zIndex: 5,
    });
  }, [currentShape, visibleFrets]);

  // Whether this is an open-position chord (show thick nut) vs. barre/higher position
  const isOpenPosition = currentShape !== null && currentShape.baseFret === 0;

  // Lowest visible fret number for fret indicator
  const lowestVisibleFret = isChordView ? visibleFrets[visibleFrets.length - 1] : null;

  // Min fret width depends on view mode and screen size
  const fretMinWidth = isChordView
    ? (mobile ? 44 : 56)
    : (mobile ? 34 : 44);

  return (
    <div className="w-full overflow-x-auto bg-zinc-900 border-t border-zinc-800">
      <div className="px-4 py-2" style={{ minWidth: isChordView ? 0 : (mobile ? 500 : 800) }}>
        {/* Position selector when chord is selected */}
        {selectedChord && chordShapes.length > 0 && (
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Position:</span>
            {chordShapes.map((_entry, idx) => {
              const isActive = selectedShapeIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedShapeIdx(idx)}
                  className="text-[10px] px-2 py-0.5 rounded transition-colors"
                  style={{
                    backgroundColor: isActive ? '#60A5FA' : 'transparent',
                    color: isActive ? '#000' : '#71717a',
                    border: isActive ? '1px solid #60A5FA' : '1px solid #3f3f46',
                  }}
                >
                  {positionLabels[idx]}
                </button>
              );
            })}
          </div>
        )}

        {/* Fret markers row */}
        <div className="flex mb-1">
          <div style={{ width: 32 }} />
          <div className="flex flex-1">
            {visibleFrets.map((f) => (
              <div
                key={f}
                className="flex-1 text-center text-[9px] text-zinc-600"
                style={{ minWidth: fretMinWidth }}
              >
                {FRET_MARKERS.includes(f) ? (
                  <span>{DOUBLE_MARKERS.includes(f) ? '••' : '•'}</span>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
          <div style={{ width: 6 }} />
          <div style={{ width: 40 }} />
        </div>

        {/* Fretboard grid with barre overlay */}
        <div ref={fretboardRef} className="relative">
          {/* Continuous fret lines overlay — spans full height, no sub-pixel gaps */}
          <div className="absolute inset-0 flex pointer-events-none" style={{ zIndex: 1, left: 32 , right: 46 }}>
            {visibleFrets.map((f) => (
              <div
                key={f}
                className="flex-1"
                style={{
                  minWidth: fretMinWidth,
                  borderRight: '1px solid #3f3f46',
                }}
              />
            ))}
          </div>

          {/* Barre bar overlay */}
          {barreStyle && <div style={barreStyle} />}

          {/* Strings: 6th (low E) at top → 1st (high E) at bottom */}
          {[0, 1, 2, 3, 4, 5].map((stringIdx) => {
            const openLabel = noteToString(TUNING_STANDARD.strings[stringIdx]);
            const openFretNote = getFretNote(stringIdx, 0);
            const openPitched = midiToNote(openFretNote.midiNumber);
            const openColor = getNoteColor(openPitched);
            const isOpenActive = activeNotes.has(openFretNote.midiNumber);
            const openPc = (tuningPitchClasses[stringIdx]) % 12;
            const isOpenRoot = rootPitchClass !== null && openPc === rootPitchClass;

            // Voicing info for this string
            const voicingInfo = voicingLookup.get(stringIdx);
            const isMuted = currentShape !== null && voicingInfo === null;
            const isOpenVoicing =
              currentShape !== null &&
              voicingInfo !== undefined &&
              voicingInfo !== null &&
              voicingInfo.fret === 0;

            return (
              <div key={stringIdx} className="flex items-center" style={{ height: mobile ? 24 : (isChordView ? 30 : 28) }}>
                {/* String label */}
                <div
                  className="text-right pr-2 text-[10px] font-mono"
                  style={{
                    width: 32,
                    color: isMuted ? '#52525b' : '#71717a',
                  }}
                >
                  {openLabel}
                </div>

                {/* Fretboard area */}
                <div className="flex flex-1 self-stretch items-stretch">
                  {visibleFrets.map((fret) => {
                    const fn = getFretNote(stringIdx, fret);
                    const pitched = midiToNote(fn.midiNumber);
                    const color = getNoteColor(pitched);
                    const isActive = activeNotes.has(fn.midiNumber);
                    const isInScale = color !== undefined;

                    // Is this the chord voicing position for this string?
                    const isVoicingPosition =
                      voicingInfo !== undefined && voicingInfo !== null && voicingInfo.fret === fret;
                    const finger = isVoicingPosition ? voicingInfo.finger : undefined;

                    // What to show
                    const showVoicing = isVoicingPosition;
                    const showScaleDot = !currentShape && isInScale;

                    const dotColor = color ?? '#60A5FA';

                    // Root note detection
                    const isRoot = rootPitchClass !== null && fn.pitchClass === rootPitchClass;

                    return (
                      <div
                        key={fret}
                        data-fret={fret}
                        data-string-row={stringIdx}
                        className="flex-1 flex items-center justify-center relative cursor-pointer"
                        style={{
                          minWidth: fretMinWidth,
                        }}
                        onClick={() => handleFretClick(fn)}
                      >
                        {/* String line — always visible, dimmer when muted */}
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
                        {/* Scale dot (no chord selected) */}
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
                  })}
                </div>

                {/* Nut — thick for open position, thin border for barre/higher positions */}
                <div
                  style={{
                    width: !isChordView || isOpenPosition ? 6 : 2,
                    backgroundColor:
                      !isChordView || isOpenPosition
                        ? '#a1a1aa'
                        : '#3f3f46',
                    height: '100%',
                  }}
                />

                {/* Open string / muted indicator area */}
                <div
                  className="flex items-center justify-center cursor-pointer"
                  style={{ width: 40 }}
                  onClick={() => !isMuted && handleFretClick(openFretNote)}
                >
                  {isMuted ? (
                    <span
                      className="font-bold"
                      style={{ fontSize: 14, color: '#ef4444aa' }}
                    >
                      ✕
                    </span>
                  ) : isOpenVoicing ? (
                    <div
                      className="rounded-full flex items-center justify-center font-bold"
                      style={{
                        width: isChordView ? 22 : 20,
                        height: isChordView ? 22 : 20,
                        fontSize: 9,
                        backgroundColor: openColor ?? '#60A5FA',
                        color: '#000',
                        boxShadow: isOpenRoot
                          ? `0 0 16px ${(openColor ?? '#60A5FA')}aa, 0 0 6px ${(openColor ?? '#60A5FA')}88`
                          : `0 0 10px ${(openColor ?? '#60A5FA')}88`,
                        border: isOpenRoot
                          ? '3px solid #ffffff'
                          : `2px solid ${openColor ?? '#60A5FA'}`,
                      }}
                    >
                      {openLabel}
                    </div>
                  ) : openColor && !currentShape ? (
                    <div
                      className="rounded-full flex items-center justify-center font-bold"
                      style={{
                        width: 20,
                        height: 20,
                        fontSize: 8,
                        backgroundColor: isOpenActive ? openColor : `${openColor}cc`,
                        color: '#000',
                        transform: isOpenActive ? 'scale(1.15)' : 'scale(1)',
                        boxShadow: isOpenActive ? `0 0 8px ${openColor}` : 'none',
                      }}
                    >
                      {openLabel}
                    </div>
                  ) : (
                    <span className="text-[9px] text-zinc-600">{openLabel}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fret numbers row */}
        <div className="flex mt-1">
          <div style={{ width: 32 }} />
          <div className="flex flex-1">
            {visibleFrets.map((f) => (
              <div
                key={f}
                className="flex-1 text-center text-[9px] text-zinc-600"
                style={{ minWidth: fretMinWidth }}
              >
                {f}
              </div>
            ))}
          </div>
          <div style={{ width: isChordView && !isOpenPosition ? 2 : 6 }} />
          <div style={{ width: 40 }} className="flex items-center justify-center">
            {isChordView && !isOpenPosition ? (
              <span className="text-[9px] text-zinc-500 font-mono">{lowestVisibleFret}fr</span>
            ) : (
              <span className="text-[9px] text-zinc-600">0</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
