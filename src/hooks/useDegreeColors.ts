import { useAppStore } from '../state/store.ts';

/**
 * Whether scale-degree functional colours (tonic=blue, dominant=amber, etc.)
 * should be rendered in the current UI context.
 *
 * Policy:
 *   - Under dark/light/system themes → always on (current behaviour preserved)
 *   - Under fermata theme → on in Learn view (pedagogy), off in Explore/Play
 *     (aesthetic coherence). Fermata uses a unified warm palette; surfacing
 *     seven functional hues in the sandbox breaks its feel, but the colours
 *     are genuinely useful while working through the curriculum.
 *
 * Consumed by: ScaleDegreeBar, ChordGrid, CircleOfFifths, PianoKey, FretCell,
 * DetailPanel, ExerciseRunner — anywhere DEGREE_COLORS is currently read.
 */
export function useDegreeColorsEnabled(): boolean {
  const themeMode = useAppStore((s) => s.themeMode);
  const view = useAppStore((s) => s.view);

  if (themeMode !== 'fermata') return true;
  return view === 'learn';
}
