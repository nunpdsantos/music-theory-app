import { m } from 'framer-motion';
import type { ChoiceOption } from '../exerciseHelpers';

interface ChoiceInputProps {
  options: ChoiceOption[];
  selected: string | null;
  submitted: boolean;
  onSelect: (value: string) => void;
  accentColor: string;
}

export function ChoiceInput({ options, selected, submitted, onSelect, accentColor }: ChoiceInputProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        const showCorrect = submitted && opt.correct;
        const showIncorrect = submitted && isSelected && !opt.correct;

        let bg = 'bg-zinc-800/60 hover:bg-zinc-800';
        let border = 'border-zinc-700/50';
        let textColor = '';

        if (isSelected && !submitted) {
          bg = '';
          border = '';
          textColor = '';
        }
        if (showCorrect) {
          bg = 'bg-emerald-500/15';
          border = 'border-emerald-500/40';
          textColor = 'text-emerald-300';
        }
        if (showIncorrect) {
          bg = 'bg-red-500/15';
          border = 'border-red-500/40';
          textColor = 'text-red-300';
        }

        return (
          <m.button
            key={opt.value}
            whileTap={!submitted ? { scale: 0.97 } : undefined}
            onClick={() => !submitted && onSelect(opt.value)}
            disabled={submitted}
            className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${bg} ${border} ${textColor} ${
              submitted ? 'cursor-default' : 'cursor-pointer'
            }`}
            style={
              isSelected && !submitted
                ? {
                    backgroundColor: `${accentColor}20`,
                    borderColor: `${accentColor}50`,
                    color: accentColor,
                  }
                : !showCorrect && !showIncorrect
                  ? { color: 'var(--text-muted)' }
                  : undefined
            }
          >
            {opt.label}
          </m.button>
        );
      })}
    </div>
  );
}
