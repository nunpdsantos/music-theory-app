import { useMemo, useCallback, useRef, useEffect } from 'react';
import {
  generateKeyboardKeys,
  type PianoKey,
} from '../../core/utils/pianoLayout.ts';
import { PianoKeyComponent } from './PianoKey.tsx';
import { useAudio } from '../../hooks/useAudio.ts';
import { useAppStore } from '../../state/store.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { useIsMobile, useIsCompact } from '../../hooks/useMediaQuery.ts';

const START_OCTAVE = 2;
const END_OCTAVE = 6;

// Computer keyboard → semitone offset from base octave C
// Bottom row = white keys, top row = black keys
// Layout: |W|E| |T|Y|U| |O|P|
//         |A|S|D|F|G|H|J|K|L|;|
const KEYBOARD_MAP: Record<string, number> = {
  'a': 0,   // C
  'w': 1,   // C#
  's': 2,   // D
  'e': 3,   // D#
  'd': 4,   // E
  'f': 5,   // F
  't': 6,   // F#
  'g': 7,   // G
  'y': 8,   // G#
  'h': 9,   // A
  'u': 10,  // A#
  'j': 11,  // B
  'k': 12,  // C (next octave)
  'o': 13,  // C#
  'l': 14,  // D
  'p': 15,  // D#
  ';': 16,  // E
};

// Responsive key widths
const KEY_WIDTH_DESKTOP = 46;
const KEY_WIDTH_TABLET = 36;
const KEY_WIDTH_MOBILE = 36; // height (130px) meets WCAG 44px touch target

// Responsive container/key heights
const CONTAINER_H_DESKTOP = 220;
const CONTAINER_H_TABLET = 170;
const CONTAINER_H_MOBILE = 140;

const WHITE_H_DESKTOP = 210;
const WHITE_H_TABLET = 160;
const WHITE_H_MOBILE = 130;

const BLACK_OFFSET_DESKTOP = 30;
const BLACK_OFFSET_TABLET = 22;
const BLACK_OFFSET_MOBILE = 22;

export function Piano() {
  const { noteOn, noteOff } = useAudio();
  const activeNotes = useAppStore((s) => s.activeNotes);
  const baseOctave = useAppStore((s) => s.baseOctave);
  const setBaseOctave = useAppStore((s) => s.setBaseOctave);
  const { scaleMidiNumbers, getNoteColor, chordVoicingMidi, hasSelectedChord } = useKeyContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeMidiMap = useRef<Map<number, number>>(new Map());

  const mobile = useIsMobile();
  const compact = useIsCompact();

  const keyWidth = mobile ? KEY_WIDTH_MOBILE : compact ? KEY_WIDTH_TABLET : KEY_WIDTH_DESKTOP;
  const containerHeight = mobile ? CONTAINER_H_MOBILE : compact ? CONTAINER_H_TABLET : CONTAINER_H_DESKTOP;
  const whiteKeyHeight = mobile ? WHITE_H_MOBILE : compact ? WHITE_H_TABLET : WHITE_H_DESKTOP;
  const blackKeyOffset = mobile ? BLACK_OFFSET_MOBILE : compact ? BLACK_OFFSET_TABLET : BLACK_OFFSET_DESKTOP;

  // Sizing mode passed to PianoKey
  const sizeMode: 'mobile' | 'tablet' | 'desktop' = mobile ? 'mobile' : compact ? 'tablet' : 'desktop';

  // Drag-to-scroll state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const allKeys = useMemo(() => generateKeyboardKeys(START_OCTAVE, END_OCTAVE), []);

  // On mobile, show only 2 octaves centered on baseOctave for larger touch targets
  const keys = useMemo(() => {
    if (!mobile) return allKeys;
    const lo = Math.max(START_OCTAVE, baseOctave - 1);
    const hi = Math.min(END_OCTAVE, lo + 1);
    return allKeys.filter((k) => k.octave >= lo && k.octave <= hi);
  }, [mobile, allKeys, baseOctave]);

  const isInScale = useCallback(
    (key: PianoKey) => scaleMidiNumbers.has(key.midiNumber),
    [scaleMidiNumbers]
  );

  const isVoicingNote = useCallback(
    (key: PianoKey) => chordVoicingMidi.has(key.midiNumber),
    [chordVoicingMidi]
  );

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
      noteOn(key.note, key.octave).then(
        (midi) => { activeMidiMap.current.set(key.midiNumber, midi); },
        (e) => { console.warn('[Piano] noteOn failed:', e); }
      );
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

  const midiToWhiteKeyIndex = useMemo(() => {
    const m = new Map<number, number>();
    whiteKeys.forEach((wk, idx) => {
      m.set(wk.midiNumber, idx);
    });
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

  const scrollToMidiRange = useCallback(
    (midiSet: Set<number>) => {
      if (!containerRef.current || midiSet.size === 0) return;

      const midiArr = Array.from(midiSet).sort((a, b) => a - b);
      const minMidi = midiArr[0];
      const maxMidi = midiArr[midiArr.length - 1];

      const minIdx = midiToWhiteKeyIndex.get(minMidi);
      const maxIdx = midiToWhiteKeyIndex.get(maxMidi);
      if (minIdx === undefined || maxIdx === undefined) return;

      const centerIdx = (minIdx + maxIdx) / 2;
      const scrollTo = centerIdx * keyWidth - containerRef.current.clientWidth / 2 + keyWidth / 2;
      containerRef.current.scrollTo({ left: Math.max(0, scrollTo), behavior: 'smooth' });
    },
    [midiToWhiteKeyIndex, keyWidth]
  );

  useEffect(() => {
    if (chordVoicingMidi.size > 0) {
      scrollToMidiRange(chordVoicingMidi);
    } else if (scaleMidiNumbers.size > 0) {
      scrollToMidiRange(scaleMidiNumbers);
    }
  }, [scaleMidiNumbers, chordVoicingMidi, scrollToMidiRange]);

  useEffect(() => {
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

  // Computer keyboard → piano key mapping (uses all keys, not filtered)
  const midiLookup = useMemo(() => {
    const m = new Map<number, PianoKey>();
    for (const k of allKeys) m.set(k.midiNumber, k);
    return m;
  }, [allKeys]);

  const keyboardHeldKeys = useRef(new Set<string>());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      // Don't intercept when typing in search or input fields
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (useAppStore.getState().quickSearchOpen) return;

      const semitone = KEYBOARD_MAP[e.key.toLowerCase()];
      if (semitone === undefined) return;
      if (keyboardHeldKeys.current.has(e.key)) return;

      const oct = useAppStore.getState().baseOctave;
      const midi = 12 + oct * 12 + semitone; // C4 = MIDI 60 when oct=4
      const pk = midiLookup.get(midi);
      if (!pk) return;

      e.preventDefault();
      keyboardHeldKeys.current.add(e.key);
      handleNoteOn(pk);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const semitone = KEYBOARD_MAP[e.key.toLowerCase()];
      if (semitone === undefined) return;
      if (!keyboardHeldKeys.current.has(e.key)) return;

      const oct = useAppStore.getState().baseOctave;
      const midi = 12 + oct * 12 + semitone;
      const pk = midiLookup.get(midi);
      if (!pk) return;

      keyboardHeldKeys.current.delete(e.key);
      handleNoteOff(pk);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [midiLookup, handleNoteOn, handleNoteOff]);

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
      return { key: bk, left: precedingWhiteIdx * keyWidth + blackKeyOffset };
    });
  }, [blackKeys, keys, keyWidth, blackKeyOffset]);

  return (
    <div role="group" aria-label="Piano keyboard" className="w-full" style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border-subtle)' }}>
      {/* Octave selector strip */}
      <div role="tablist" aria-label="Base octave" className="flex items-center gap-1 max-sm:gap-0.5 px-3 max-sm:px-2 py-1.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <span className="text-[10px] uppercase tracking-wider mr-1" style={{ color: 'var(--text-dim)' }}>Octave</span>
        {[2, 3, 4, 5, 6].map((oct) => {
          const isActive = baseOctave === oct;
          return (
            <button
              key={oct}
              role="tab"
              aria-selected={isActive}
              onClick={() => setBaseOctave(oct)}
              className="px-2 py-0.5 rounded text-[10px] font-medium transition-colors"
              style={{
                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? '#000' : 'var(--text-dim)',
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
          height: containerHeight,
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
          style={{ width: whiteKeys.length * keyWidth, height: whiteKeyHeight }}
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
              showLabel={!mobile || isInScale(wk) || activeNotes.has(wk.midiNumber) || (wk.note.natural === 'C' && wk.note.accidental === '')}
              sizeMode={sizeMode}
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
                showLabel={!mobile || isInScale(bk) || activeNotes.has(bk.midiNumber)}
                sizeMode={sizeMode}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
