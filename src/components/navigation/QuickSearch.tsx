import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../state/store.ts';
import { noteToString, stringToNote, type Note } from '../../core/types/music.ts';
import { buildChord } from '../../core/constants/chords.ts';
import { buildScale } from '../../core/constants/scales.ts';
import type { ChordQuality, ScaleType } from '../../core/types/music.ts';

// Quick parse: try chord first, then scale, then key
function tryParse(query: string): { type: string; label: string; action: () => void } | null {
  const q = query.trim();
  if (!q) return null;

  // Try to match "X major", "X minor", "X dorian" etc (scale)
  const scaleMatch = q.match(/^([A-Ga-g][#b]?)\s*(major|minor|dorian|mixolydian|lydian|phrygian|blues|pentatonic)/i);
  if (scaleMatch) {
    const root = stringToNote(scaleMatch[1]);
    const scaleMap: Record<string, ScaleType> = {
      major: 'major', minor: 'natural_minor', dorian: 'dorian',
      mixolydian: 'mixolydian', lydian: 'lydian', phrygian: 'phrygian',
      blues: 'blues', pentatonic: 'pentatonic_major',
    };
    const scaleType = scaleMap[scaleMatch[2].toLowerCase()] ?? 'major';
    const scale = buildScale(root, scaleType);
    return {
      type: 'Scale',
      label: `${noteToString(root)} ${scaleMatch[2]}`,
      action: () => {
        useAppStore.getState().setKey(root);
        useAppStore.getState().setScale(scaleType);
      },
    };
  }

  // Try chord: "Cmaj7", "Am", "Bb7", etc
  const chordMatch = q.match(/^([A-Ga-g][#b]?)(maj7|m7|7|dim|aug|m|maj|sus2|sus4|add9|6|9)?$/i);
  if (chordMatch) {
    const root = stringToNote(chordMatch[1]);
    const qualityMap: Record<string, ChordQuality> = {
      '': 'major', 'm': 'minor', 'maj': 'major', 'maj7': 'major7',
      'm7': 'minor7', '7': 'dominant7', 'dim': 'diminished', 'aug': 'augmented',
      'sus2': 'sus2', 'sus4': 'sus4', 'add9': 'add9', '6': 'major6', '9': 'dominant9',
    };
    const suffix = chordMatch[2] ?? '';
    const quality = qualityMap[suffix.toLowerCase()] ?? 'major';
    const chord = buildChord(root, quality);
    return {
      type: 'Chord',
      label: `${noteToString(root)}${suffix}`,
      action: () => {
        useAppStore.getState().setSelectedChord(chord);
      },
    };
  }

  // Try just a root note → set key
  const noteMatch = q.match(/^([A-Ga-g][#b]?)$/);
  if (noteMatch) {
    const root = stringToNote(noteMatch[1]);
    return {
      type: 'Key',
      label: noteToString(root),
      action: () => {
        useAppStore.getState().setKey(root);
      },
    };
  }

  return null;
}

export function QuickSearch() {
  const quickSearchOpen = useAppStore((s) => s.quickSearchOpen);
  const setQuickSearchOpen = useAppStore((s) => s.setQuickSearchOpen);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const result = tryParse(query);

  // Cmd+K to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickSearchOpen(!quickSearchOpen);
        setQuery('');
      }
      if (e.key === 'Escape' && quickSearchOpen) {
        setQuickSearchOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickSearchOpen, setQuickSearchOpen]);

  // Focus input when opened
  useEffect(() => {
    if (quickSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [quickSearchOpen]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (result) {
        result.action();
        setQuickSearchOpen(false);
        setQuery('');
      }
    },
    [result, setQuickSearchOpen]
  );

  return (
    <AnimatePresence>
      {quickSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => {
              setQuickSearchOpen(false);
              setQuery('');
            }}
          />
          {/* Search dialog */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-md z-50"
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center px-4 py-3 border-b border-zinc-800">
                  <span className="text-zinc-500 mr-2 text-sm">&#128270;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Try "Cmaj7", "D dorian", "Ab"...'
                    className="flex-1 bg-transparent text-zinc-100 text-sm outline-none placeholder:text-zinc-600"
                  />
                  <kbd className="text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">
                    ESC
                  </kbd>
                </div>
                {result && (
                  <button
                    type="submit"
                    className="w-full text-left px-4 py-3 hover:bg-zinc-800 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm text-zinc-200">{result.label}</span>
                    <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                      {result.type}
                    </span>
                  </button>
                )}
                {query && !result && (
                  <div className="px-4 py-3 text-sm text-zinc-500">
                    No match. Try a chord (Cmaj7), scale (D dorian), or note (Ab).
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
