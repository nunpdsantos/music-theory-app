import { motion } from 'framer-motion';
import { noteToString } from '../../core/types/music.ts';
import { SCALE_DEGREE_NAMES } from '../../core/constants/scales.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { useAppStore } from '../../state/store.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';

const ROMAN = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

const FUNCTION_LABELS: Record<number, string> = {
  1: 'Tonic',
  2: 'Super.',
  3: 'Mediant',
  4: 'Subdom.',
  5: 'Dominant',
  6: 'Submed.',
  7: 'Leading',
};

export function ScaleDegreeBar() {
  const { scale } = useKeyContext();
  const selectedDegree = useAppStore((s) => s.selectedDegree);
  const setSelectedDegree = useAppStore((s) => s.setSelectedDegree);

  if (scale.notes.length !== 7) return null;

  return (
    <div className="flex items-stretch gap-1.5" role="group" aria-label="Scale degrees">
      {scale.notes.map((note, i) => {
        const degree = i + 1;
        const isSelected = selectedDegree === degree;
        const color = DEGREE_COLORS[degree as keyof typeof DEGREE_COLORS];

        return (
          <motion.button
            key={`${noteToString(note)}-${i}`}
            onClick={() => setSelectedDegree(isSelected ? null : degree)}
            className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl flex-1 min-w-0 group transition-colors"
            style={{
              backgroundColor: isSelected ? `${color}18` : 'transparent',
              border: isSelected ? `1px solid ${color}40` : '1px solid transparent',
            }}
            whileTap={{ scale: 0.94 }}
            animate={isSelected ? { scale: 1.04 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            title={SCALE_DEGREE_NAMES[i]}
            aria-pressed={isSelected}
            aria-label={`Degree ${degree}, ${ROMAN[i]}, ${noteToString(note)}`}
          >
            <span
              className="text-sm font-bold leading-none"
              style={{ color }}
            >
              {ROMAN[i]}
            </span>
            <span className="text-xs font-medium text-zinc-300 leading-none">
              {noteToString(note)}
            </span>
            <span
              className={`text-[9px] leading-none transition-colors ${
                isSelected ? 'text-zinc-400' : 'text-zinc-600 group-hover:text-zinc-500'
              }`}
            >
              {FUNCTION_LABELS[degree]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
