/**
 * Helper functions for generating exercise choices.
 */
import type { NaturalNote, Accidental } from '../../../core/types/music';
import { noteToString } from '../../../core/types/music';
import { PITCH_CLASS_SPELLINGS, getPitchClass } from '../../../core/constants/notes';
import { INTERVAL_LABELS } from '../../../core/constants/chords';

export interface ChoiceOption {
  label: string;
  value: string;
  correct: boolean;
}

/**
 * Generate 4 note-name choices: the correct note + 3 distractors.
 * Avoids enharmonic equivalents of the correct note as distractors.
 */
export function generateNoteChoices(
  correctNatural: string,
  correctAccidental: string,
): ChoiceOption[] {
  const correctNote = { natural: correctNatural as NaturalNote, accidental: (correctAccidental || '') as Accidental };
  const correctPC = getPitchClass(correctNote);
  const correctLabel = noteToString(correctNote);

  // Collect distractor notes from different pitch classes
  const distractors: ChoiceOption[] = [];
  const usedPCs = new Set<number>([correctPC]);

  // Prefer nearby pitch classes for plausible distractors
  const offsets = [1, -1, 2, -2, 3, -3, 5, 7];
  for (const offset of offsets) {
    if (distractors.length >= 3) break;
    const pc = ((correctPC + offset) % 12 + 12) % 12;
    if (usedPCs.has(pc)) continue;
    usedPCs.add(pc);
    // Use simplest spelling
    const spelling = PITCH_CLASS_SPELLINGS[pc][0];
    const label = noteToString(spelling);
    distractors.push({ label, value: label, correct: false });
  }

  const options: ChoiceOption[] = [
    { label: correctLabel, value: correctLabel, correct: true },
    ...distractors.slice(0, 3),
  ];

  return shuffle(options);
}

/**
 * Generate 4 interval-name choices: the correct interval + 3 distractors.
 */
export function generateIntervalChoices(correctSemitones: number): ChoiceOption[] {
  const correctLabel = INTERVAL_LABELS[correctSemitones] || `${correctSemitones} semitones`;

  const distractorPool: number[] = [];
  for (let offset = -3; offset <= 3; offset++) {
    if (offset === 0) continue;
    const candidate = correctSemitones + offset;
    if (candidate >= 1 && candidate <= 12) {
      distractorPool.push(candidate);
    }
  }
  // Expand if needed
  if (distractorPool.length < 3) {
    for (let s = 1; s <= 12; s++) {
      if (s !== correctSemitones && !distractorPool.includes(s)) {
        distractorPool.push(s);
      }
      if (distractorPool.length >= 6) break;
    }
  }

  const distractors = shuffle(distractorPool).slice(0, 3);
  const options: ChoiceOption[] = [
    { label: correctLabel, value: String(correctSemitones), correct: true },
    ...distractors.map((s) => ({
      label: INTERVAL_LABELS[s] || `${s} semitones`,
      value: String(s),
      correct: false,
    })),
  ];

  return shuffle(options);
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
