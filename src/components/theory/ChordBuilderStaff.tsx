import { Suspense, lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { PitchedNote, Note } from '../../core/types/music.ts';
import { getPitchClass } from '../../core/constants/notes.ts';
import { StaffNotationSkeleton } from '../notation/StaffNotationSkeleton.tsx';

const StaffNotation = lazy(() =>
  import('../notation/StaffNotation.tsx').then((m) => ({ default: m.StaffNotation }))
);

export interface ChordBuilderStaffProps {
  /** Selected notes in chord-root order (lowest first, R/m2/M2/...). */
  notes: Note[];
}

type Mode = 'chord' | 'arpeggio';

/**
 * Tiny staff renderer for whatever the user has built on the chromatic strip.
 * Toggles between a stacked chord (compact) and a horizontal arpeggio.
 * Lazy-loads VexFlow on first paint.
 */
export function ChordBuilderStaff({ notes }: ChordBuilderStaffProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>('chord');

  const pitched = pitchNotes(notes);

  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-2xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          {t('chordBuilder.staff')}
        </span>
        <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <button
            type="button"
            onClick={() => setMode('chord')}
            className="px-2 py-0.5 text-2xs font-medium transition-colors"
            aria-pressed={mode === 'chord'}
            style={{
              backgroundColor: mode === 'chord' ? 'var(--card-hover)' : 'transparent',
              color: mode === 'chord' ? 'var(--text)' : 'var(--text-dim)',
            }}
          >
            {t('chordBuilder.staffChord')}
          </button>
          <button
            type="button"
            onClick={() => setMode('arpeggio')}
            className="px-2 py-0.5 text-2xs font-medium transition-colors"
            aria-pressed={mode === 'arpeggio'}
            style={{
              backgroundColor: mode === 'arpeggio' ? 'var(--card-hover)' : 'transparent',
              color: mode === 'arpeggio' ? 'var(--text)' : 'var(--text-dim)',
            }}
          >
            {t('chordBuilder.staffArpeggio')}
          </button>
        </div>
      </div>
      <Suspense fallback={<StaffNotationSkeleton height={100} />}>
        <StaffNotation
          notes={pitched}
          height={100}
          duration={mode === 'chord' ? 'w' : 'q'}
          chord={mode === 'chord'}
        />
      </Suspense>
    </div>
  );
}

/**
 * Place each Note on a sensible octave so the chord/arpeggio sits comfortably
 * on the treble staff. Anchor the lowest note around C4 and stack upward by
 * pitch class so the order matches what the user clicked on the strip.
 */
function pitchNotes(notes: Note[]): PitchedNote[] {
  if (notes.length === 0) return [];
  const out: PitchedNote[] = [];
  let lastPc = -1;
  let octave = 4;
  for (const n of notes) {
    const pc = getPitchClass(n);
    if (lastPc !== -1 && pc <= lastPc) {
      // Wrapped around — bump octave so the sequence keeps ascending.
      octave += 1;
    }
    out.push({ ...n, octave });
    lastPc = pc;
  }
  return out;
}
