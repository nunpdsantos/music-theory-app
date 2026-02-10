import { useMemo, useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { TUNING_STANDARD, getTuningPitchClasses } from '../../core/constants/guitarTunings.ts';
import { midiToNote } from '../../core/utils/pianoLayout.ts';
import { getChordShapesWithFallback } from '../../core/constants/guitarChordShapes.ts';
import { getScalePositions, hasScalePositions } from '../../core/constants/guitarScalePositions.ts';
import { getPitchClass } from '../../core/constants/notes.ts';
import { noteToString } from '../../core/types/music.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { useAudio } from '../../hooks/useAudio.ts';
import { useAppStore } from '../../state/store.ts';
import { useIsMobile } from '../../hooks/useMediaQuery.ts';
import { FULL_FRETS, CHORD_FRET_WINDOW, FRET_MARKERS, DOUBLE_MARKERS } from './fretboardConstants.ts';
import type { FretNote } from './fretboardConstants.ts';
import { FretboardPositionSelector } from './FretboardPositionSelector.tsx';
import { FretboardString } from './FretboardString.tsx';

export function Fretboard() {
  const { getNoteColor } = useKeyContext();
  const { noteOn, noteOff } = useAudio();
  const activeNotes = useAppStore((s) => s.activeNotes);
  const selectedChord = useAppStore((s) => s.selectedChord);
  const selectedKey = useAppStore((s) => s.selectedKey);
  const selectedScale = useAppStore((s) => s.selectedScale);
  const guitarScalePosition = useAppStore((s) => s.guitarScalePosition);
  const setGuitarScalePosition = useAppStore((s) => s.setGuitarScalePosition);
  const quickSearchOpen = useAppStore((s) => s.quickSearchOpen);
  const [selectedShapeIdx, setSelectedShapeIdx] = useState(0);
  const mobile = useIsMobile();

  const tuningPitchClasses = useMemo(() => getTuningPitchClasses(TUNING_STANDARD), []);

  // ─── Chord shapes ─────────────────────────────────────
  const chordShapes = useMemo(() => {
    if (!selectedChord) return [];
    return getChordShapesWithFallback(selectedChord);
  }, [selectedChord]);

  useEffect(() => {
    setSelectedShapeIdx(0);
  }, [selectedChord]);

  const currentShape = chordShapes[selectedShapeIdx] ?? null;

  // Root pitch class for highlighting root notes
  const rootPitchClass = useMemo(() => {
    if (selectedChord) return getPitchClass(selectedChord.root);
    return getPitchClass(selectedKey);
  }, [selectedChord, selectedKey]);

  // ─── Scale positions (CAGED) ──────────────────────────
  const scalePositions = useMemo(() => {
    if (selectedChord) return [];
    if (!hasScalePositions(selectedScale)) return [];
    return getScalePositions(selectedKey, selectedScale);
  }, [selectedKey, selectedScale, selectedChord]);

  const hasPositions = scalePositions.length > 0;

  const currentScalePos = useMemo(() => {
    if (guitarScalePosition === null || !hasPositions) return null;
    return scalePositions[guitarScalePosition] ?? null;
  }, [guitarScalePosition, scalePositions, hasPositions]);

  // Build lookup: stringIndex (0-5) → { absoluteFret, degree, finger, isRoot }[]
  const scalePositionLookup = useMemo(() => {
    const map = new Map<number, { fret: number; degree: string; finger?: number; isRoot?: boolean }[]>();
    if (!currentScalePos) return map;

    const { position, baseFret } = currentScalePos;
    for (const note of position.notes) {
      const stringIdx = 6 - note.string;
      const absoluteFret = baseFret + note.fret;
      const existing = map.get(stringIdx) ?? [];
      existing.push({
        fret: absoluteFret,
        degree: note.degree,
        finger: note.finger,
        isRoot: note.isRoot,
      });
      map.set(stringIdx, existing);
    }
    return map;
  }, [currentScalePos]);

  // ─── Voicing lookup (chords) ──────────────────────────
  const voicingLookup = useMemo(() => {
    const map = new Map<number, { fret: number; finger: import('../../core/constants/guitarChordShapes.ts').FingerNumber | undefined } | null>();
    if (!currentShape) return map;

    const { shape, baseFret } = currentShape;
    shape.strings.forEach((pos, stringIndex) => {
      if (pos.fret === null) {
        map.set(stringIndex, null);
      } else {
        const absoluteFret = baseFret + (pos.fret as number);
        map.set(stringIndex, { fret: absoluteFret, finger: pos.finger });
      }
    });
    return map;
  }, [currentShape]);

  // ─── Dynamic fret range ───────────────────────────────
  const { visibleFrets, isChordView } = useMemo(() => {
    if (currentScalePos) {
      const { position, baseFret } = currentScalePos;
      const start = Math.max(1, baseFret);
      const end = Math.min(FULL_FRETS, baseFret + position.fretSpan + 1);
      const frets: number[] = [];
      for (let f = end; f >= start; f--) frets.push(f);
      return { visibleFrets: frets, isChordView: true };
    }

    if (!currentShape) {
      const frets: number[] = [];
      for (let f = FULL_FRETS; f >= 1; f--) frets.push(f);
      return { visibleFrets: frets, isChordView: false };
    }

    const { shape, baseFret } = currentShape;
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
      minUsed = 1;
      maxUsed = 3;
    }

    const start = Math.max(1, minUsed - 1);
    const end = Math.min(FULL_FRETS, Math.max(start + CHORD_FRET_WINDOW - 1, maxUsed + 1));

    const frets: number[] = [];
    for (let f = end; f >= start; f--) frets.push(f);
    return { visibleFrets: frets, isChordView: true };
  }, [currentShape, currentScalePos]);

  // Generate all notes on the fretboard as a Map for O(1) lookup
  const fretNoteMap = useMemo(() => {
    const map = new Map<number, FretNote>();
    for (let s = 0; s < 6; s++) {
      const openPc = tuningPitchClasses[s];
      const openOctave = TUNING_STANDARD.strings[s].octave;
      for (let f = 0; f <= FULL_FRETS; f++) {
        const pc = (openPc + f) % 12;
        const midi = 12 + openOctave * 12 + openPc + f;
        map.set(s * 100 + f, { stringIndex: s, fret: f, pitchClass: pc, midiNumber: midi });
      }
    }
    return map;
  }, [tuningPitchClasses]);

  const getFretNote = useCallback(
    (stringIndex: number, fret: number) => {
      return fretNoteMap.get(stringIndex * 100 + fret)!;
    },
    [fretNoteMap]
  );

  const activeTimeouts = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    return () => { activeTimeouts.current.forEach(clearTimeout); };
  }, []);

  const handleFretClick = useCallback(
    (fn: FretNote) => {
      const pitched = midiToNote(fn.midiNumber);
      noteOn(pitched, pitched.octave).then(
        (midi) => {
          const t = setTimeout(() => {
            noteOff(midi);
            activeTimeouts.current.delete(t);
          }, 800);
          activeTimeouts.current.add(t);
        },
        (e) => { console.warn('[Fretboard] noteOn failed:', e); }
      );
    },
    [noteOn, noteOff]
  );

  // Position labels for chord shapes
  const positionLabels = useMemo(() => {
    const baseLabels = chordShapes.map(({ shape, baseFret }) => {
      if (shape.shortName) return shape.shortName;
      return baseFret === 0 ? 'Open' : `Fret ${baseFret}`;
    });
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

  // ─── Drag-to-scroll ───────────────────────────────────
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ startX: 0, startScroll: 0, dragged: false });

  const onDragMove = useCallback((e: PointerEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 5) {
      dragState.current.dragged = true;
      el.scrollLeft = dragState.current.startScroll - dx;
    }
  }, []);

  const onDragEnd = useCallback(() => {
    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', onDragEnd);
  }, [onDragMove]);

  const handleFretboardPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (e.button !== 0) return;
    e.preventDefault();
    dragState.current.dragged = false;
    dragState.current.startX = e.clientX;
    dragState.current.startScroll = scrollContainerRef.current?.scrollLeft ?? 0;
    document.addEventListener('pointermove', onDragMove);
    document.addEventListener('pointerup', onDragEnd);
  }, [onDragMove, onDragEnd]);

  const handleFretboardClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragState.current.dragged) {
      e.stopPropagation();
      e.preventDefault();
      dragState.current.dragged = false;
    }
  }, []);

  // ─── Barre bar measurement ────────────────────────────
  const fretboardRef = useRef<HTMLDivElement>(null);
  const [barreStyle, setBarreStyle] = useState<React.CSSProperties | null>(null);

  useLayoutEffect(() => {
    if (!fretboardRef.current || !currentShape?.shape.barreInfo) {
      setBarreStyle(null);
      return;
    }

    const { barreInfo } = currentShape.shape;
    const barreFret = currentShape.baseFret + barreInfo.fret;

    const fromRow = 6 - barreInfo.fromString;
    const toRow = 6 - barreInfo.toString;
    const topRow = Math.min(fromRow, toRow);
    const bottomRow = Math.max(fromRow, toRow);

    const container = fretboardRef.current;
    const containerRect = container.getBoundingClientRect();

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

  // ─── Keyboard navigation (roving tabindex on 2D grid) ─
  const [focusedCell, setFocusedCell] = useState<{ stringIdx: number; fret: number } | null>(null);
  const [announcedNote, setAnnouncedNote] = useState('');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (quickSearchOpen) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const { key } = e;
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape'].includes(key)) return;

      e.preventDefault();

      if (key === 'Escape') {
        setFocusedCell(null);
        scrollContainerRef.current?.focus();
        return;
      }

      setFocusedCell((prev) => {
        // Initialize focus at first visible cell if none selected
        if (!prev) {
          const initFret = visibleFrets[visibleFrets.length - 1] ?? 1;
          return { stringIdx: 0, fret: initFret };
        }

        if (key === 'Enter' || key === ' ') {
          const fn = getFretNote(prev.stringIdx, prev.fret);
          handleFretClick(fn);
          return prev;
        }

        let { stringIdx, fret } = prev;
        const minFret = visibleFrets[visibleFrets.length - 1] ?? 0;
        const maxFret = visibleFrets[0] ?? FULL_FRETS;

        if (key === 'ArrowRight') fret = Math.min(fret + 1, maxFret);
        if (key === 'ArrowLeft') fret = Math.max(fret - 1, minFret);
        if (key === 'ArrowUp') stringIdx = Math.max(stringIdx - 1, 0);
        if (key === 'ArrowDown') stringIdx = Math.min(stringIdx + 1, 5);

        return { stringIdx, fret };
      });
    },
    [quickSearchOpen, visibleFrets, getFretNote, handleFretClick]
  );

  // Announce focused note for screen readers
  useEffect(() => {
    if (!focusedCell) {
      setAnnouncedNote('');
      return;
    }
    const fn = getFretNote(focusedCell.stringIdx, focusedCell.fret);
    const pitched = midiToNote(fn.midiNumber);
    const name = noteToString(pitched);
    setAnnouncedNote(`String ${6 - focusedCell.stringIdx}, fret ${focusedCell.fret}, ${name}`);
  }, [focusedCell, getFretNote]);

  // ─── Display state ────────────────────────────────────
  const isOpenPosition = currentShape !== null && currentShape.baseFret === 0;
  const isScalePosView = currentScalePos !== null;
  const lowestVisibleFret = (isChordView || isScalePosView) ? visibleFrets[visibleFrets.length - 1] : null;

  const fretMinWidth = isChordView
    ? (mobile ? 44 : 56)
    : (mobile ? 34 : 44);

  return (
    <div
      ref={scrollContainerRef}
      role="grid"
      aria-label="Guitar fretboard"
      tabIndex={0}
      className="w-full overflow-x-auto bg-zinc-900 border-t border-zinc-800 fretboard-scroll focus:outline-none"
      style={{ cursor: 'grab', scrollbarWidth: 'none', userSelect: 'none' }}
      onPointerDown={handleFretboardPointerDown}
      onClickCapture={handleFretboardClickCapture}
      onKeyDown={handleKeyDown}
    >
      {/* Screen reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcedNote}
      </div>

      <div className="px-4 py-2" style={{ minWidth: isChordView ? 0 : (mobile ? 500 : 800) }}>
        {/* Position selector */}
        <FretboardPositionSelector
          selectedChord={selectedChord}
          chordShapeCount={chordShapes.length}
          positionLabels={positionLabels}
          selectedShapeIdx={selectedShapeIdx}
          onSelectShape={setSelectedShapeIdx}
          hasScalePositions={hasPositions}
          scalePositions={scalePositions}
          guitarScalePosition={guitarScalePosition}
          onSelectScalePosition={setGuitarScalePosition}
        />

        {/* Fret markers row */}
        <div className="flex mb-1">
          <div style={{ width: 32 }} />
          <div className="flex flex-1">
            {visibleFrets.map((f) => (
              <div
                key={f}
                className="flex-1 text-center text-[9px] text-zinc-500"
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
          {/* Continuous fret lines overlay */}
          <div className="absolute inset-0 flex pointer-events-none" style={{ zIndex: 1, left: 32, right: 46 }}>
            {visibleFrets.map((f) => (
              <div
                key={f}
                className="flex-1"
                style={{ minWidth: fretMinWidth, borderRight: '1px solid #3f3f46' }}
              />
            ))}
          </div>

          {/* Barre bar overlay */}
          {barreStyle && <div style={barreStyle} />}

          {/* Strings: 6th (low E) at top → 1st (high E) at bottom */}
          {[0, 1, 2, 3, 4, 5].map((stringIdx) => (
            <FretboardString
              key={stringIdx}
              stringIdx={stringIdx}
              visibleFrets={visibleFrets}
              fretMinWidth={fretMinWidth}
              mobile={mobile}
              isChordView={isChordView}
              isOpenPosition={isOpenPosition}
              tuningPitchClasses={tuningPitchClasses}
              activeNotes={activeNotes}
              rootPitchClass={rootPitchClass}
              getNoteColor={getNoteColor}
              getFretNote={getFretNote}
              handleFretClick={handleFretClick}
              currentShape={currentShape}
              voicingLookup={voicingLookup}
              currentScalePos={currentScalePos}
              scalePositionLookup={scalePositionLookup}
              focusedFret={focusedCell?.stringIdx === stringIdx ? focusedCell.fret : null}
            />
          ))}
        </div>

        {/* Fret numbers row */}
        <div className="flex mt-1">
          <div style={{ width: 32 }} />
          <div className="flex flex-1">
            {visibleFrets.map((f) => (
              <div
                key={f}
                className="flex-1 text-center text-[9px] text-zinc-500"
                style={{ minWidth: fretMinWidth }}
              >
                {f}
              </div>
            ))}
          </div>
          <div style={{ width: isChordView && !isOpenPosition ? 2 : 6 }} />
          <div style={{ width: 40 }} className="flex items-center justify-center">
            {(isChordView || isScalePosView) && !isOpenPosition ? (
              <span className="text-[9px] text-zinc-500 font-mono">{lowestVisibleFret}fr</span>
            ) : (
              <span className="text-[9px] text-zinc-500">0</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
