/**
 * Level metadata resolver — eagerly translates the 9 LevelMeta entries.
 *
 * Unlike curriculum/exercise overlays (lazy per-level), level metadata is
 * always needed for LevelsOverview card rendering, so overlays are statically
 * imported and applied synchronously.
 */
import type { LevelMeta } from '../../data/curriculumLoader';
import type { ContentLanguage, LevelMetaOverlay } from './types';
import ptLevelMeta from './pt/levelMeta';
import esLevelMeta from './es/levelMeta';

const OVERLAYS: Record<string, Record<string, LevelMetaOverlay>> = {
  pt: ptLevelMeta,
  es: esLevelMeta,
};

/** Translate an array of LevelMeta for the given language. Returns original for 'en'. */
export function translateLevelMetadata(
  meta: readonly LevelMeta[],
  lang: ContentLanguage,
): LevelMeta[] {
  if (lang === 'en') return meta as LevelMeta[];

  const langOverlays = OVERLAYS[lang];
  if (!langOverlays) return meta as LevelMeta[];

  return meta.map((m) => {
    const ov = langOverlays[m.id];
    if (!ov) return m;
    return {
      ...m,
      title: ov.title,
      description: ov.description,
      difficultyLabel: ov.difficultyLabel,
    };
  });
}
