import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { findModulesByQuery } from '../../data/moduleIndex.ts';
import { useAppStore } from '../../state/store.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';

interface LearnMoreButtonProps {
  /** Text to search the module index with, e.g. "Dorian", "Major Seventh" */
  query: string;
}

/**
 * Deep-links from Explore detail panels into the matching Learn module, if
 * the curriculum has one. Renders nothing when no lesson covers the query.
 */
export function LearnMoreButton({ query }: LearnMoreButtonProps) {
  const { t } = useTranslation();
  const match = useMemo(() => findModulesByQuery(query, 1)[0] ?? null, [query]);
  if (!match) return null;

  const color = DEGREE_COLORS[2];

  return (
    <button
      type="button"
      onClick={() => {
        useAppStore.setState({
          view: 'learn',
          pendingLearnTarget: {
            levelId: match.level,
            unitId: match.unitId,
            moduleId: match.id,
          },
        });
      }}
      className="mt-3 ml-2 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full transition-colors"
      style={{ color, backgroundColor: `${color}14`, border: `1px solid ${color}33` }}
      title={match.title}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
      {t('panel.learnMore', { defaultValue: 'Learn about this' })}
    </button>
  );
}
