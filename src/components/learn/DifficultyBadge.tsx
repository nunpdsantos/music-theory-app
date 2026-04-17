import { useTranslation } from 'react-i18next';
import type { DifficultyTier } from '../../core/types/curriculum';
import { DIFFICULTY_CONFIG } from '../../design/tokens/learnColors';
import { Badge } from '../ui/Badge';

interface DifficultyBadgeProps {
  difficulty: DifficultyTier;
  label?: string;
}

export function DifficultyBadge({ difficulty, label }: DifficultyBadgeProps) {
  const { t } = useTranslation();
  const config = DIFFICULTY_CONFIG[difficulty];
  return (
    <Badge accentColor={config.color} shape="pill" size="xs">
      {label ?? t(config.labelKey)}
    </Badge>
  );
}
