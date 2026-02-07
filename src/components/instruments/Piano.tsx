import { useMemo, useCallback, useRef, useEffect } from 'react';
import {
  generateKeyboardKeys,
  type PianoKey,
} from '../../core/utils/pianoLayout.ts';
import { PianoKeyComponent } from './PianoKey.tsx';
import { useAudio } from '../../hooks/useAudio.ts';
import { useAppStore } from '../../state/store.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';

const START_OCTAVE = 2;
const END_OCTAVE = 6;
const KEY_WIDTH = 46;

export function Piano() {
  const { noteOn, noteOff } = useAudio();
  const activeNotes = useAppStore((s) => s.activeNotes);
  const baseOctave = useAppStore((s) => s.baseOctave);
  const setBaseOctave = useAppStore((s) => s.setBaseOctave);
  const { scaleMidiNumbers, getNoteColor, chordVoicingMidi, hasSelectedChord } = useKeyContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeMidiMap = useRef<Map<number, number>>(new Map());

  // Drag-to-scroll state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const keys = useMemo(() => generateKeyboardKeys(START_OCTAVE, END_OCTAVE), []);

  const isInScale = useCallback(
    (key: PianoKey) => scaleMidiNumbers.has(key.midiNumber),
    [scaleMidiNumbers]
  );

  const isVoicingNote = useCallback(
    (key: PianoKey) => chordVoicingMidi.has(key.midiNumber),
    [chordVoicingMidi]
  );

  // When a chord is selected, scale notes that aren't part of the voicing get dimmed
  const isDimmed = useCallback(
    (key: PianoKey) =>
      hasSelectedChord &&
      scaleMidiNumbers.has(key.midiNumber) &&
      !chordVoicingMidi.has(key.midiNumber),
    [hasSelectedChord, scaleMidiNumbers, chordVoicingMidi]
  );

  const getKeyColor = useCallback(
    (key: PianoKey) => getNoteColor(key.note),
    [getNoteColor]
  );

  const handleNoteOn = useCallback(
    (key: PianoKey) => {
      noteOn(key.note, key.octave).then((midi) => {
        activeMidiMap.current.set(key.midiNumber, midi);
      });
    },
    [noteOn]
  );

  const handleNoteOff = useCallback(
    (key: PianoKey) => {
      const midi = activeMidiMap.current.get(key.midiNumber);
      if (midi !== undefined) {
        noteOff(midi);
        activeMidiMap.current.delete(key.midiNumber);
      }
    },
    [noteOff]
  );

  const whiteKeys = useMemo(() => keys.filter((k) => !k.isBlack), [keys]);
  const blackKeys = useMemo(() => keys.filter((k) => k.isBlack), [keys]);

  // Build a map: MIDI number → white key index (for positioning)
  const midiToWhiteKeyIndex = useMemo(() => {
    const m = new Map<number, number>();
    whiteKeys.forEach((wk, idx) => {
      m.set(wk.midiNumber, idx);
    });
    // Also map black keys to the index of their preceding white key
    blackKeys.forEach((bk) => {
      const bkIdx = keys.indexOf(bk);
      for (let i = bkIdx - 1; i >= 0; i--) {
        if (!keys[i].isBlack) {
          const wkIdx = whiteKeys.indexOf(keys[i]);
          if (wkIdx >= 0) m.set(bk.midiNumber, wkIdx);
          break;
        }
      }
    });
    return m;
  }, [whiteKeys, blackKeys, keys]);

  // Scroll to center a set of MIDI numbers in view
  const scrollToMidiRange = useCallback(
    (midiSet: Set<number>) => {
      if (!containerRef.current || midiSet.size === 0) return;

      const midiArr = Array.from(midiSet).sort((a, b) => a - b);
      const minMidi = midiArr[0];
      const maxMidi = midiArr[midiArr.length - 1];

      // Find closest white key indices
      const minIdx = midiToWhiteKeyIndex.get(minMidi);
      const maxIdx = midiToWhiteKeyIndex.get(maxMidi);
      if (minIdx === undefined || maxIdx === undefined) return;

      const centerIdx = (minIdx + maxIdx) / 2;
      const scrollTo = centerIdx * KEY_WIDTH - containerRef.current.clientWidth / 2 + KEY_WIDTH / 2;
      containerRef.current.scrollTo({ left: Math.max(0, scrollTo), behavior: 'smooth' });
    },
    [midiToWhiteKeyIndex]
  );

  // Auto-scroll when highlighted notes change — center on the actual notes
  useEffect(() => {
    // Chord voicing takes priority over scale
    if (chordVoicingMidi.size > 0) {
      scrollToMidiRange(chordVoicingMidi);
    } else if (scaleMidiNumbers.size > 0) {
      scrollToMidiRange(scaleMidiNumbers);
    }
  }, [scaleMidiNumbers, chordVoicingMidi, scrollToMidiRange]);

  // Also scroll when baseOctave changes (the MIDI sets will update via useKeyContext,
  // but we need a fallback for the initial mount)
  useEffect(() => {
    // Small delay to let the MIDI sets recompute first
    const t = setTimeout(() => {
      if (chordVoicingMidi.size > 0) {
        scrollToMidiRange(chordVoicingMidi);
      } else if (scaleMidiNumbers.size > 0) {
        scrollToMidiRange(scaleMidiNumbers);
      }
    }, 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseOctave]);

  // Drag-to-scroll handlers (on the container, not on keys)
  const handleContainerPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[role="button"]')) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = containerRef.current?.scrollLeft ?? 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handleContainerPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const dx = e.clientX - dragStartX.current;
    containerRef.current.scrollLeft = dragScrollLeft.current - dx;
  }, []);

  const handleContainerPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const blackKeyPositions = useMemo(() => {
    return blackKeys.map((bk) => {
      const bkIdx = keys.indexOf(bk);
      let precedingWhiteIdx = 0;
      for (let i = bkIdx - 1; i >= 0; i--) {
        if (!keys[i].isBlack) {
          precedingWhiteIdx = keys[i].whiteKeyIndex ?? 0;
          break;
        }
      }
      return { key: bk, left: precedingWhiteIdx * KEY_WIDTH + 30 };
    });
  }, [blackKeys, keys]);

  return (
    <div className="w-full bg-zinc-900 border-t border-zinc-800">
      {/* Octave selector strip */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-zinc-800">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider mr-1">Octave</span>
        {[2, 3, 4, 5, 6].map((oct) => {
          const isActive = baseOctave === oct;
          return (
            <button
              key={oct}
              onClick={() => setBaseOctave(oct)}
              className="px-2 py-0.5 rounded text-[10px] font-medium transition-colors"
              style={{
                backgroundColor: isActive ? '#60A5FA' : 'transparent',
                color: isActive ? '#000' : '#71717a',
              }}
            >
              C{oct}
            </button>
          );
        })}
      </div>

      {/* Piano keyboard with drag-to-scroll */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden relative piano-scroll"
        style={{
          height: 220,
          cursor: 'grab',
          scrollbarWidth: 'none',
        }}
        onPointerDown={handleContainerPointerDown}
        onPointerMove={handleContainerPointerMove}
        onPointerUp={handleContainerPointerUp}
        onPointerCancel={handleContainerPointerUp}
      >
        <div
          className="relative flex"
          style={{ width: whiteKeys.length * KEY_WIDTH, height: 210 }}
        >
          {whiteKeys.map((wk) => (
            <PianoKeyComponent
              key={wk.midiNumber}
              keyData={wk}
              isHighlighted={isInScale(wk)}
              highlightColor={getKeyColor(wk)}
              isActive={activeNotes.has(wk.midiNumber)}
              isChordTone={false}
              isVoicingNote={isVoicingNote(wk)}
              isDimmed={isDimmed(wk)}
              onNoteOn={handleNoteOn}
              onNoteOff={handleNoteOff}
              showLabel={true}
            />
          ))}

          {blackKeyPositions.map(({ key: bk, left }) => (
            <div
              key={bk.midiNumber}
              className="absolute top-0"
              style={{ left }}
            >
              <PianoKeyComponent
                keyData={bk}
                isHighlighted={isInScale(bk)}
                highlightColor={getKeyColor(bk)}
                isActive={activeNotes.has(bk.midiNumber)}
                isChordTone={false}
                isVoicingNote={isVoicingNote(bk)}
                isDimmed={isDimmed(bk)}
                onNoteOn={handleNoteOn}
                onNoteOff={handleNoteOff}
                showLabel={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
