import { useTranslation } from 'react-i18next';
import type { DifficultyTier } from '../../core/types/curriculum';
import { DIFFICULTY_CONFIG } from '../../design/tokens/learnColors';

interface DifficultyBadgeProps {
  difficulty: DifficultyTier;
  label?: string;
}

export function DifficultyBadge({ difficulty, label }: DifficultyBadgeProps) {
  const { t } = useTranslation();
  const config = DIFFICULTY_CONFIG[difficulty];
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      {label ?? t(config.labelKey)}
    </span>
  );
}
