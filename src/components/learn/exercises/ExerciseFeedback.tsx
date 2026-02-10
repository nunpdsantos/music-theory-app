import { m } from 'framer-motion';
import type { ValidationResult } from '../../../core/types/exercise';

interface ExerciseFeedbackProps {
  result: ValidationResult;
  attempt: number;
  hint?: string;
  onTryAgain: () => void;
  onNext: () => void;
  accentColor: string;
}

export function ExerciseFeedback({
  result,
  attempt,
  hint,
  onTryAgain,
  onNext,
  accentColor,
}: ExerciseFeedbackProps) {
  const isCorrect = result.correct;
  const canRetry = !isCorrect && attempt === 1;

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-4 mt-4 border ${
        isCorrect
          ? 'bg-emerald-500/10 border-emerald-500/25'
          : 'bg-red-500/10 border-red-500/25'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span className={`mt-0.5 shrink-0 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
          {isCorrect ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </span>

        <div className="flex-1 min-w-0">
          {/* Status line */}
          <p className={`text-sm font-medium mb-1 ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
            {isCorrect
              ? attempt === 1
                ? 'Correct!'
                : 'Correct — partial credit'
              : canRetry
                ? 'Not quite'
                : 'Incorrect'}
          </p>

          {/* Explanation */}
          <p className="text-xs text-zinc-400 leading-relaxed">
            {result.explanation}
          </p>

          {/* Hint on first wrong attempt */}
          {canRetry && hint && (
            <p className="text-xs text-amber-400/80 mt-2 leading-relaxed">
              Hint: {hint}
            </p>
          )}
        </div>
      </div>

      {/* Action button */}
      <div className="mt-3 flex justify-end">
        {canRetry ? (
          <button
            onClick={onTryAgain}
            className="text-xs font-medium px-4 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            Try Again
          </button>
        ) : (
          <button
            onClick={onNext}
            className="text-xs font-medium px-4 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {isCorrect ? 'Continue' : 'Next'}
          </button>
        )}
      </div>
    </m.div>
  );
}
