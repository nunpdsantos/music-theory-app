import { useEffect } from 'react';
import type { ExerciseDefinition } from '../../../core/types/exercise';
import type { NaturalNote, Accidental } from '../../../core/types/music';
import { useAppStore } from '../../../state/store';
import { getPitchClass } from '../../../core/constants/notes';

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

  return (
    <p className="text-sm text-zinc-200 mb-4 leading-relaxed">
      {exercise.prompt}
    </p>
  );
}
