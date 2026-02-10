/**
 * Pure validation functions for curriculum exercises.
 * Converts serializable config to core types at validation time.
 */
import type {
  ExerciseConfig,
  NoteIdConfig,
  IntervalIdConfig,
  ScaleBuildConfig,
  ChordBuildConfig,
  MultipleChoiceConfig,
  ValidationResult,
} from '../../../core/types/exercise';
import type { Note, NaturalNote, Accidental, ScaleType, ChordQuality } from '../../../core/types/music';
import { noteToString } from '../../../core/types/music';
import { getPitchClass, areEnharmonic } from '../../../core/constants/notes';
import { buildScale } from '../../../core/constants/scales';
import { buildChord, INTERVAL_LABELS } from '../../../core/constants/chords';

function toNote(natural: string, accidental: string): Note {
  return { natural: natural as NaturalNote, accidental: accidental as Accidental };
}

function validateNoteId(config: NoteIdConfig, answer: string): ValidationResult {
  const correctNote = toNote(config.note, config.accidental);
  const correctStr = noteToString(correctNote);

  // Parse user answer as note string (e.g. "C#", "Db")
  const userNatural = answer[0]?.toUpperCase() ?? '';
  const userAcc = answer.slice(1);
  const userNote: Note = { natural: userNatural as NaturalNote, accidental: (userAcc || '') as Accidental };

  const acceptEnharmonic = config.acceptEnharmonic !== false;

  if (acceptEnharmonic) {
    if (areEnharmonic(correctNote, userNote)) {
      return { correct: true, explanation: `Correct! ${noteToString(userNote)} is the right note.`, expected: correctStr };
    }
  } else {
    if (userNote.natural === correctNote.natural && userNote.accidental === correctNote.accidental) {
      return { correct: true, explanation: `Correct! ${correctStr} is the right answer.`, expected: correctStr };
    }
  }

  return {
    correct: false,
    explanation: `The correct note is ${correctStr}.`,
    expected: correctStr,
  };
}

function validateIntervalId(config: IntervalIdConfig, answer: string): ValidationResult {
  const correctSemitones = config.targetSemitones;
  const userSemitones = parseInt(answer, 10);
  const correctLabel = INTERVAL_LABELS[correctSemitones] || `${correctSemitones} semitones`;

  if (userSemitones === correctSemitones) {
    return { correct: true, explanation: `Correct! That's a ${correctLabel}.`, expected: correctLabel };
  }

  const userLabel = INTERVAL_LABELS[userSemitones] || `${userSemitones} semitones`;
  return {
    correct: false,
    explanation: `That was a ${correctLabel}, not a ${userLabel}.`,
    expected: correctLabel,
  };
}

function validateScaleBuild(config: ScaleBuildConfig, answer: Set<number>): ValidationResult {
  const root = toNote(config.root, config.rootAccidental);
  const scale = buildScale(root, config.scaleType as ScaleType);
  const expectedPCs: Set<number> = new Set(scale.notes.map((n) => getPitchClass(n) as number));
  const scaleName = `${noteToString(root)} ${config.scaleType.replace(/_/g, ' ')}`;

  if (setsEqual(expectedPCs, answer)) {
    return { correct: true, explanation: `Correct! You built the ${scaleName} scale.`, expected: scaleName };
  }

  const missing = [...expectedPCs].filter((pc) => !answer.has(pc));
  const extra = [...answer].filter((pc) => !expectedPCs.has(pc));
  const parts: string[] = [];
  if (missing.length > 0) parts.push(`missing ${missing.length} note${missing.length > 1 ? 's' : ''}`);
  if (extra.length > 0) parts.push(`${extra.length} extra note${extra.length > 1 ? 's' : ''}`);

  return {
    correct: false,
    explanation: `Not quite — ${parts.join(', ')}. The ${scaleName} scale has ${expectedPCs.size} notes.`,
    expected: scaleName,
  };
}

function validateChordBuild(config: ChordBuildConfig, answer: Set<number>): ValidationResult {
  const root = toNote(config.root, config.rootAccidental);
  const chord = buildChord(root, config.quality as ChordQuality);
  const expectedPCs: Set<number> = new Set(chord.notes.map((n) => getPitchClass(n) as number));
  const chordName = `${noteToString(root)} ${config.quality.replace(/_/g, ' ')}`;

  if (setsEqual(expectedPCs, answer)) {
    return { correct: true, explanation: `Correct! You built the ${chordName} chord.`, expected: chordName };
  }

  const missing = [...expectedPCs].filter((pc) => !answer.has(pc));
  const extra = [...answer].filter((pc) => !expectedPCs.has(pc));
  const parts: string[] = [];
  if (missing.length > 0) parts.push(`missing ${missing.length} note${missing.length > 1 ? 's' : ''}`);
  if (extra.length > 0) parts.push(`${extra.length} extra note${extra.length > 1 ? 's' : ''}`);

  return {
    correct: false,
    explanation: `Not quite — ${parts.join(', ')}. The ${chordName} chord has ${expectedPCs.size} notes.`,
    expected: chordName,
  };
}

function validateMultipleChoice(config: MultipleChoiceConfig, answer: string): ValidationResult {
  const correctChoice = config.choices.find((c) => c.correct);
  if (!correctChoice) {
    return { correct: false, explanation: 'No correct answer defined.', expected: '' };
  }

  if (answer === correctChoice.label) {
    return { correct: true, explanation: `Correct! "${correctChoice.label}" is right.`, expected: correctChoice.label };
  }

  return {
    correct: false,
    explanation: `The correct answer is "${correctChoice.label}".`,
    expected: correctChoice.label,
  };
}

/**
 * Main validation dispatcher.
 * @param config Exercise config (discriminated by `type`)
 * @param answer For choice-based: string value. For build exercises: Set<number> of pitch classes.
 */
export function validateAnswer(
  config: ExerciseConfig,
  answer: string | Set<number>,
): ValidationResult {
  switch (config.type) {
    case 'note_id':
      return validateNoteId(config, answer as string);
    case 'interval_id':
      return validateIntervalId(config, answer as string);
    case 'scale_build':
      return validateScaleBuild(config, answer as Set<number>);
    case 'chord_build':
      return validateChordBuild(config, answer as Set<number>);
    case 'multiple_choice':
      return validateMultipleChoice(config, answer as string);
  }
}

function setsEqual(a: Set<number>, b: Set<number>): boolean {
  if (a.size !== b.size) return false;
  for (const v of a) {
    if (!b.has(v)) return false;
  }
  return true;
}
