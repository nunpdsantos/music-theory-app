import { useState, useCallback, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import type { ExerciseDefinition, ValidationResult } from '../../../core/types/exercise';
import { validateAnswer } from './validateExercise';
import { generateNoteChoices, generateIntervalChoices } from './exerciseHelpers';
import type { ChoiceOption } from './exerciseHelpers';
import { ExerciseProgress } from './ExerciseProgress';
import { ExercisePrompt } from './ExercisePrompt';
import { ExerciseFeedback } from './ExerciseFeedback';
import { ChoiceInput } from './inputs/ChoiceInput';
import { InstrumentInput } from './inputs/InstrumentInput';

type Phase = 'active' | 'submitted';

interface ExerciseRunnerProps {
  exercises: ExerciseDefinition[];
  accentColor: string;
  onRecordResult: (exerciseId: string, score: 0 | 0.5 | 1) => void;
  onComplete: (passed: boolean) => void;
}

export function ExerciseRunner({ exercises, accentColor, onRecordResult, onComplete }: ExerciseRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('active');
  const [attempt, setAttempt] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const exercise = exercises[currentIndex];

  // Generate choices for current exercise (memoized per exercise)
  const choices: ChoiceOption[] = useMemo(() => {
    if (!exercise) return [];
    const cfg = exercise.config;
    switch (cfg.type) {
      case 'note_id':
        return generateNoteChoices(cfg.note, cfg.accidental);
      case 'interval_id':
        return generateIntervalChoices(cfg.targetSemitones);
      case 'multiple_choice':
        return cfg.choices.map((c) => ({ label: c.label, value: c.label, correct: c.correct }));
      default:
        return [];
    }
  }, [exercise?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectChoice = useCallback((value: string) => {
    setSelected(value);
  }, []);

  const handleSubmitChoice = useCallback(() => {
    if (!exercise || selected === null) return;
    const result = validateAnswer(exercise.config, selected);
    setValidationResult(result);
    setPhase('submitted');

    if (result.correct) {
      const score: 0 | 0.5 | 1 = attempt === 1 ? 1 : 0.5;
      onRecordResult(exercise.id, score);
      setAccumulatedScore((prev) => prev + score);
    } else if (attempt >= 2) {
      onRecordResult(exercise.id, 0);
    }
  }, [exercise, selected, attempt, onRecordResult]);

  const handleSubmitInstrument = useCallback((pitchClasses: Set<number>) => {
    if (!exercise) return;
    const result = validateAnswer(exercise.config, pitchClasses);
    setValidationResult(result);
    setPhase('submitted');

    if (result.correct) {
      const score: 0 | 0.5 | 1 = attempt === 1 ? 1 : 0.5;
      onRecordResult(exercise.id, score);
      setAccumulatedScore((prev) => prev + score);
    } else if (attempt >= 2) {
      onRecordResult(exercise.id, 0);
    }
  }, [exercise, attempt, onRecordResult]);

  const handleTryAgain = useCallback(() => {
    setAttempt(2);
    setPhase('active');
    setSelected(null);
    setValidationResult(null);
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= exercises.length) {
      // All exercises done
      const passed = accumulatedScore >= exercises.length * 0.8;
      setFinished(true);
      onComplete(passed);
    } else {
      setCurrentIndex(nextIndex);
      setPhase('active');
      setAttempt(1);
      setSelected(null);
      setValidationResult(null);
    }
  }, [currentIndex, exercises.length, accumulatedScore, onComplete]);

  if (!exercise || finished) {
    // Completion summary
    const passed = accumulatedScore >= exercises.length * 0.8;
    return (
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-zinc-800 p-5"
      >
        <div className="text-center">
          <span className={`text-3xl mb-3 block ${passed ? '' : ''}`}>
            {passed ? (
              <svg className="mx-auto" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg className="mx-auto" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
          </span>
          <h3 className="text-base font-semibold text-zinc-200 mb-1">
            {passed ? 'Exercises Complete!' : 'Keep Practicing'}
          </h3>
          <p className="text-xs text-zinc-500 mb-3">
            Score: {accumulatedScore % 1 === 0 ? accumulatedScore : accumulatedScore.toFixed(1)}/{exercises.length}
            {passed
              ? ' — You passed!'
              : ` — Need ${Math.ceil(exercises.length * 0.8)} to pass`}
          </p>
        </div>
      </m.div>
    );
  }

  const isChoiceBased = exercise.config.type === 'note_id' || exercise.config.type === 'interval_id' || exercise.config.type === 'multiple_choice';
  const isInstrumentBased = exercise.config.type === 'scale_build' || exercise.config.type === 'chord_build';

  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
          Exercises
        </h2>
        <ExerciseProgress
          current={currentIndex}
          total={exercises.length}
          score={accumulatedScore}
          accentColor={accentColor}
        />
      </div>

      {/* Exercise body */}
      <div className="px-4 py-4">
        <AnimatePresence mode="wait">
          <m.div
            key={exercise.id + '-' + attempt}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            <ExercisePrompt exercise={exercise} />

            {/* Input */}
            {isChoiceBased && (
              <>
                <ChoiceInput
                  options={choices}
                  selected={selected}
                  submitted={phase === 'submitted'}
                  onSelect={handleSelectChoice}
                  accentColor={accentColor}
                />
                {phase === 'active' && selected !== null && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 flex justify-end"
                  >
                    <button
                      onClick={handleSubmitChoice}
                      className="px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      Submit
                    </button>
                  </m.div>
                )}
              </>
            )}

            {isInstrumentBased && (
              <InstrumentInput
                expectedCount={
                  exercise.config.type === 'scale_build'
                    ? exercise.config.noteCount
                    : exercise.config.type === 'chord_build'
                      ? exercise.config.noteCount
                      : 0
                }
                submitted={phase === 'submitted'}
                onSubmit={handleSubmitInstrument}
                accentColor={accentColor}
              />
            )}

            {/* Feedback */}
            {phase === 'submitted' && validationResult && (
              <ExerciseFeedback
                result={validationResult}
                attempt={attempt}
                hint={exercise.hint}
                onTryAgain={handleTryAgain}
                onNext={handleNext}
                accentColor={accentColor}
              />
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
