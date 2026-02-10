import { useEffect, Suspense, lazy } from 'react';
import type { ExerciseDefinition } from '../../../core/types/exercise';
import type { NaturalNote, Accidental, PitchedNote } from '../../../core/types/music';
import { useAppStore } from '../../../state/store';
import { getPitchClass } from '../../../core/constants/notes';
import { StaffNotationSkeleton } from '../../notation/StaffNotationSkeleton';

const StaffNotation = lazy(() =>
  import('../../notation/StaffNotation').then((m) => ({ default: m.StaffNotation }))
);

interface ExercisePromptProps {
  exercise: ExerciseDefinition;
}

export function ExercisePrompt({ exercise }: ExercisePromptProps) {
  const setHighlightedNotes = useAppStore((s) => s.setHighlightedNotes);

  useEffect(() => {
    // For note_id exercises, highlight the target note on the instrument
    if (exercise.config.type === 'note_id') {
      const { note, accidental, octave } = exercise.config;
      setHighlightedNotes([
        { natural: note as NaturalNote, accidental: (accidental || '') as Accidental, octave },
      ]);
    }

    return () => {
      setHighlightedNotes([]);
    };
  }, [exercise.id, exercise.config, setHighlightedNotes]);

  // Build staff notes for note_id / interval_id
  const staffNotes: PitchedNote[] | null = (() => {
    const cfg = exercise.config;
    if (cfg.type === 'note_id') {
      return [{
        natural: cfg.note as NaturalNote,
        accidental: (cfg.accidental || '') as Accidental,
        octave: cfg.octave,
      }];
    }
    if (cfg.type === 'interval_id') {
      const rootNote: PitchedNote = {
        natural: cfg.root as NaturalNote,
        accidental: (cfg.rootAccidental || '') as Accidental,
        octave: cfg.rootOctave,
      };
      // Compute second note from semitones
      const NATURALS: NaturalNote[] = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];
      const ACCIDENTALS: Accidental[] = ['', '#', '', '#', '', '', '#', '', '#', '', '#', ''];
      const rootPCs: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
      let rootPC = rootPCs[cfg.root] ?? 0;
      if (cfg.rootAccidental === '#') rootPC += 1;
      if (cfg.rootAccidental === 'b') rootPC -= 1;
      const semitones = cfg.direction === 'descending' ? -cfg.targetSemitones : cfg.targetSemitones;
      const targetPC = ((rootPC + semitones) % 12 + 12) % 12;
      const targetOct = cfg.rootOctave + (rootPC + semitones >= 12 ? 1 : rootPC + semitones < 0 ? -1 : 0);
      const targetNote: PitchedNote = {
        natural: NATURALS[targetPC],
        accidental: ACCIDENTALS[targetPC],
        octave: targetOct,
      };
      return [rootNote, targetNote];
    }
    return null;
  })();

  const clef = staffNotes && staffNotes.some((n) => n.octave < 4) ? 'bass' as const : 'treble' as const;

  return (
    <div className="mb-4">
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>
        {exercise.prompt}
      </p>
      {staffNotes && (
        <Suspense fallback={<StaffNotationSkeleton height={100} />}>
          <StaffNotation
            notes={staffNotes}
            clef={clef}
            height={100}
            duration={staffNotes.length === 1 ? 'w' : 'h'}
          />
        </Suspense>
      )}
    </div>
  );
}
