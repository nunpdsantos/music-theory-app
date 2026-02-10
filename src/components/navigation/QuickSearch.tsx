import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useAppStore } from '../../state/store.ts';
import { noteToString, stringToNote, type Note, type ScaleType } from '../../core/types/music.ts';
import { buildChord, CHORD_QUALITY_NAMES, CHORD_SYMBOLS } from '../../core/constants/chords.ts';
import { getPitchClass } from '../../core/constants/notes.ts';
import { SCALE_TYPE_NAMES } from '../../core/constants/scales.ts';
import { parseChordSymbol, formatParsedChordName } from '../../core/utils/chordParser.ts';
import { parseScaleSymbol, formatParsedScaleName } from '../../core/utils/scaleParser.ts';

interface SearchResult {
  type: 'Scale' | 'Chord' | 'Key';
  label: string;
  action: () => void;
}

// Mode names that need mapping to ScaleType
const MODE_TO_SCALE: Record<string, ScaleType> = {
  ionian: 'major',
  aeolian: 'natural_minor',
};

function getResults(query: string): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  const results: SearchResult[] = [];
  const seen = new Set<string>();

  // Try scale parser first (handles all 46 types + modes + aliases)
  const parsedScale = parseScaleSymbol(q);
  if (parsedScale) {
    const label = formatParsedScaleName(parsedScale);
    // Map mode names to ScaleType
    const scaleType = (MODE_TO_SCALE[parsedScale.scaleType] ?? parsedScale.scaleType) as ScaleType;
    const key = `scale:${noteToString(parsedScale.root)}:${scaleType}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push({
        type: 'Scale',
        label,
        action: () => {
          useAppStore.getState().setKey(parsedScale.root);
          useAppStore.getState().setScale(scaleType);
        },
      });
    }
  }

  // Try chord parser (handles all 42+ qualities + slash chords + algorithmic)
  const parsedChord = parseChordSymbol(q);
  if (parsedChord) {
    const label = `${noteToString(parsedChord.root)} ${formatParsedChordName(parsedChord)}`;
    const key = `chord:${noteToString(parsedChord.root)}:${parsedChord.quality}`;
    if (!seen.has(key)) {
      seen.add(key);
      // Use algorithmically computed notes for complex chords (e.g., Cmaj7#9, G7b9#11)
      // that don't map cleanly to one of the 42 explicit qualities.
      // Fall back to buildChord for standard qualities.
      const chord = parsedChord.algorithmicNotes && parsedChord.algorithmicNotes.length > 0
        ? { root: parsedChord.root, quality: parsedChord.quality, notes: parsedChord.algorithmicNotes }
        : buildChord(parsedChord.root, parsedChord.quality);
      if (parsedChord.algorithmicDisplayName) {
        chord.algorithmicDisplayName = parsedChord.algorithmicDisplayName;
      }
      if (parsedChord.algorithmicIntervalLabels) {
        chord.algorithmicIntervalLabels = parsedChord.algorithmicIntervalLabels;
      }
      if (parsedChord.bassNote) {
        chord.bassNote = parsedChord.bassNote;
        // Prepend bass note to chord.notes if its pitch class isn't already present
        const bassPc = getPitchClass(parsedChord.bassNote);
        const alreadyPresent = chord.notes.some((n) => getPitchClass(n) === bassPc);
        if (!alreadyPresent) {
          chord.notes = [parsedChord.bassNote, ...chord.notes];
        }
      }
      results.push({
        type: 'Chord',
        label,
        action: () => {
          useAppStore.getState().setSelectedChord(chord);
        },
      });
    }
  }

  // Fuzzy fallback: substring match on scale type names
  if (results.length < 4) {
    const lower = q.toLowerCase();
    for (const [scaleType, name] of Object.entries(SCALE_TYPE_NAMES)) {
      if (results.length >= 8) break;
      const key = `scale:fuzzy:${scaleType}`;
      if (seen.has(key)) continue;
      if (name.toLowerCase().includes(lower)) {
        seen.add(key);
        results.push({
          type: 'Scale',
          label: name,
          action: () => {
            const currentKey = useAppStore.getState().selectedKey;
            useAppStore.getState().setScale(scaleType as ScaleType);
          },
        });
      }
    }
  }

  // Fuzzy fallback: substring match on chord quality names
  if (results.length < 4) {
    const lower = q.toLowerCase();
    for (const [quality, name] of Object.entries(CHORD_QUALITY_NAMES)) {
      if (results.length >= 8) break;
      const key = `chord:fuzzy:${quality}`;
      if (seen.has(key)) continue;
      if (name.toLowerCase().includes(lower)) {
        seen.add(key);
        const symbol = CHORD_SYMBOLS[quality as keyof typeof CHORD_SYMBOLS];
        results.push({
          type: 'Chord',
          label: `${name} (${symbol || quality})`,
          action: () => {
            const root = useAppStore.getState().selectedKey;
            const chord = buildChord(root, quality as any);
            useAppStore.getState().setSelectedChord(chord);
          },
        });
      }
    }
  }

  // Try just a root note → set key
  if (results.length === 0) {
    const noteMatch = q.match(/^([A-Ga-g][#b♯♭]?)$/);
    if (noteMatch) {
      const root = stringToNote(noteMatch[1]);
      results.push({
        type: 'Key',
        label: noteToString(root),
        action: () => {
          useAppStore.getState().setKey(root);
        },
      });
    }
  }

  return results.slice(0, 8);
}

export function QuickSearch() {
  const quickSearchOpen = useAppStore((s) => s.quickSearchOpen);
  const setQuickSearchOpen = useAppStore((s) => s.setQuickSearchOpen);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => getResults(query), [query]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIdx(0);
  }, [results.length, query]);

  const restoreFocus = useCallback(() => {
    requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    });
  }, []);

  const closeDialog = useCallback(() => {
    setQuickSearchOpen(false);
    setQuery('');
    restoreFocus();
  }, [setQuickSearchOpen, restoreFocus]);

  // Cmd+K to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickSearchOpen(!quickSearchOpen);
        setQuery('');
      }
      if (e.key === 'Escape' && quickSearchOpen) {
        closeDialog();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickSearchOpen, setQuickSearchOpen, closeDialog]);

  // Capture previous focus and auto-focus input when opened
  useEffect(() => {
    if (quickSearchOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [quickSearchOpen]);

  const executeResult = useCallback(
    (idx: number) => {
      const r = results[idx];
      if (r) {
        r.action();
        setQuickSearchOpen(false);
        setQuery('');
        restoreFocus();
      }
    },
    [results, setQuickSearchOpen, restoreFocus],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeResult(selectedIdx);
      }
    },
    [results.length, selectedIdx, executeResult],
  );

  return (
    <AnimatePresence>
      {quickSearchOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeDialog}
          />
          {/* Search dialog */}
          <m.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Quick search"
              onKeyDown={(e) => {
                if (e.key !== 'Tab') return;
                const container = dialogRef.current;
                if (!container) return;
                const focusable = container.querySelectorAll<HTMLElement>(
                  'input, button, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                  if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                  }
                } else {
                  if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                  }
                }
              }}
              className="rounded-xl shadow-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center px-4 py-3" style={{ borderBottom: '1px solid var(--card)' }}>
                <span className="mr-2 text-sm" style={{ color: 'var(--text-dim)' }}>&#128270;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Try "Cmaj7#11", "D harmonic minor", "lydian dominant"...'
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--text)' }}
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ color: 'var(--text-dim)', backgroundColor: 'var(--card)' }}>
                  ESC
                </kbd>
              </div>
              {results.length > 0 && (
                <div className="max-h-64 overflow-y-auto">
                  {results.map((r, i) => (
                    <button
                      key={`${r.type}-${r.label}-${i}`}
                      onClick={() => executeResult(i)}
                      className="w-full text-left px-4 py-2.5 transition-colors flex items-center justify-between"
                      style={{
                        backgroundColor: i === selectedIdx ? 'var(--card-hover)' : 'transparent',
                      }}
                      onMouseEnter={() => setSelectedIdx(i)}
                    >
                      <span className="text-sm" style={{ color: 'var(--text)' }}>{r.label}</span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                        style={{
                          backgroundColor:
                            r.type === 'Scale' ? '#60A5FA15' :
                            r.type === 'Chord' ? '#FBBF2415' :
                            '#34D39915',
                          color:
                            r.type === 'Scale' ? '#60A5FA' :
                            r.type === 'Chord' ? '#FBBF24' :
                            '#34D399',
                        }}
                      >
                        {r.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {query && results.length === 0 && (
                <div className="px-4 py-3 text-sm" style={{ color: 'var(--text-dim)' }}>
                  No match. Try a chord (Cmaj7#11), scale (D harmonic minor), or note (Ab).
                </div>
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
