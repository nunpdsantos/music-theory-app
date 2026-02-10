import { useState, useMemo } from 'react';
import { noteToString, type ChordQuality } from '../../core/types/music.ts';
import { buildChord, CHORD_QUALITY_NAMES, CHORD_SYMBOLS } from '../../core/constants/chords.ts';
import { useAppStore } from '../../state/store.ts';

const CHORD_QUALITY_GROUPS: { label: string; qualities: ChordQuality[] }[] = [
  {
    label: 'Triads',
    qualities: ['major', 'minor', 'diminished', 'augmented'],
  },
  {
    label: '6ths',
    qualities: ['major6', 'minor6', 'six_nine', 'minor_six_nine'],
  },
  {
    label: '7ths',
    qualities: [
      'major7', 'minor7', 'dominant7', 'diminished7',
      'half_diminished7', 'augmented7', 'minor_major7',
      'augmented_major7', 'major7flat5', 'diminished_major7',
    ],
  },
  {
    label: 'Sus',
    qualities: ['sus2', 'sus4', 'dominant7sus4', 'dominant9sus4', 'sus2sus4'],
  },
  {
    label: 'Power',
    qualities: ['power'],
  },
  {
    label: '9ths',
    qualities: ['major9', 'minor9', 'dominant9', 'add9'],
  },
  {
    label: 'Alt. Dom',
    qualities: [
      'dominant7flat9', 'dominant7sharp9', 'dominant7flat5', 'dominant7sharp5',
      'dominant7alt', 'dominant7sharp5flat9', 'dominant7flat5flat9',
      'dominant7sharp5sharp9', 'dominant7flat5sharp9',
    ],
  },
  {
    label: '11ths',
    qualities: ['dominant11', 'major11', 'minor11', 'dominant9sharp11', 'add11', 'major7sharp11'],
  },
  {
    label: '13ths',
    qualities: ['dominant13', 'major13', 'minor13', 'dominant13flat9'],
  },
];

export function ChordBrowser() {
  const selectedKey = useAppStore((s) => s.selectedKey);
  const setSelectedChord = useAppStore((s) => s.setSelectedChord);
  const selectedChord = useAppStore((s) => s.selectedChord);
  const [activeCategory, setActiveCategory] = useState(0);

  const rootLabel = noteToString(selectedKey);
  const group = CHORD_QUALITY_GROUPS[activeCategory];

  return (
    <div className="space-y-3">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1">
        {CHORD_QUALITY_GROUPS.map((g, i) => {
          const isActive = activeCategory === i;
          return (
            <button
              key={g.label}
              onClick={() => setActiveCategory(i)}
              className="px-2 py-1 text-[10px] font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: isActive ? 'var(--border)' : 'transparent',
                color: isActive ? 'var(--text)' : 'var(--text-dim)',
                border: isActive ? '1px solid var(--border-light)' : '1px solid transparent',
              }}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Chord pills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {group.qualities.map((quality) => {
          const symbol = CHORD_SYMBOLS[quality];
          const name = CHORD_QUALITY_NAMES[quality];
          const isActive =
            selectedChord?.quality === quality &&
            selectedChord?.root.natural === selectedKey.natural &&
            selectedChord?.root.accidental === selectedKey.accidental;

          return (
            <button
              key={quality}
              onClick={() => {
                const chord = buildChord(selectedKey, quality);
                setSelectedChord(chord);
              }}
              className="flex flex-col items-start px-2.5 py-2 rounded-xl transition-all text-left"
              style={{
                backgroundColor: isActive ? '#60A5FA15' : 'var(--card)',
                border: isActive ? '1px solid #60A5FA40' : '1px solid var(--card-hover)',
              }}
            >
              <span
                className="text-sm font-bold"
                style={{ color: isActive ? '#60A5FA' : '#e4e4e7' }}
              >
                {rootLabel}{symbol}
              </span>
              <span className="text-[9px] leading-tight mt-0.5" style={{ color: 'var(--text-dim)' }}>
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
