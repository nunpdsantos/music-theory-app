import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '../../../../state/store';
import type { NaturalNote, Accidental, PitchedNote } from '../../../../core/types/music';
import { getPitchClass, PITCH_CLASS_SPELLINGS } from '../../../../core/constants/notes';

interface InstrumentInputProps {
  expectedCount: number;
  submitted: boolean;
  onSubmit: (pitchClasses: Set<number>) => void;
  accentColor: string;
}

export function InstrumentInput({ expectedCount, submitted, onSubmit, accentColor }: InstrumentInputProps) {
  const [toggledPCs, setToggledPCs] = useState<Set<number>>(new Set());
  const activeNotes = useAppStore((s) => s.activeNotes);
  const setHighlightedNotes = useAppStore((s) => s.setHighlightedNotes);

  // When a note is played on the instrument, toggle its pitch class
  useEffect(() => {
    if (submitted) return;
    if (activeNotes.size === 0) return;

    // Get pitch classes of all currently active notes
    // activeNotes is Set<number> of MIDI note numbers
    const newPCs = new Set(toggledPCs);
    for (const midi of activeNotes) {
      const pc = midi % 12;
      if (newPCs.has(pc)) {
        newPCs.delete(pc);
      } else {
        newPCs.add(pc);
      }
    }
    setToggledPCs(newPCs);
  }, [activeNotes]); // Intentionally only depends on activeNotes

  // Update highlighted notes on instrument whenever toggled set changes
  useEffect(() => {
    if (submitted) return;
    const highlighted: PitchedNote[] = [];
    for (const pc of toggledPCs) {
      const spelling = PITCH_CLASS_SPELLINGS[pc]?.[0];
      if (spelling) {
        highlighted.push({ ...spelling, octave: 4 });
      }
    }
    setHighlightedNotes(highlighted);

    return () => {
      setHighlightedNotes([]);
    };
  }, [toggledPCs, submitted, setHighlightedNotes]);

  const handleClear = useCallback(() => {
    setToggledPCs(new Set());
  }, []);

  const handleCheck = useCallback(() => {
    onSubmit(toggledPCs);
  }, [toggledPCs, onSubmit]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
          Selected {toggledPCs.size} of {expectedCount} notes
        </span>
        <span className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
          Play notes on the instrument to toggle
        </span>
      </div>

      {/* Toggled notes display */}
      {toggledPCs.size > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {[...toggledPCs].sort((a, b) => a - b).map((pc) => {
            const spelling = PITCH_CLASS_SPELLINGS[pc]?.[0];
            const label = spelling ? `${spelling.natural}${spelling.accidental}` : `${pc}`;
            return (
              <span
                key={pc}
                className="px-2 py-0.5 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      )}

      {!submitted && (
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg text-xs transition-colors"
            style={{ color: 'var(--text-dim)', border: '1px solid color-mix(in srgb, var(--border) 50%, transparent)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--card-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
          >
            Clear
          </button>
          <button
            onClick={handleCheck}
            disabled={toggledPCs.size === 0}
            className="px-4 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
}
