import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../state/store.ts';
import type { ScaleType, Note } from '../../core/types/music.ts';
import { noteToString } from '../../core/types/music.ts';
import { buildScale, SCALE_TYPE_NAMES, SCALE_FORMULAS } from '../../core/constants/scales.ts';
import { INTERVAL_SHORT_LABELS } from '../../core/constants/chords.ts';
import { getPitchClass } from '../../core/constants/notes.ts';
import { useKeyContext } from '../../hooks/useKeyContext.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';

const CHROMATIC_LABELS = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];

const SCALE_OPTIONS = Object.entries(SCALE_TYPE_NAMES) as [ScaleType, string][];

export function ScaleComparison() {
  const { t } = useTranslation();
  const selectedKey = useAppStore((s) => s.selectedKey);
  const selectedScale = useAppStore((s) => s.selectedScale);
  const comparisonScale = useAppStore((s) => s.comparisonScale);
  const setComparisonScale = useAppStore((s) => s.setComparisonScale);
  const { scale: scaleA } = useKeyContext();

  const scaleB = useMemo(
    () => comparisonScale ? buildScale(selectedKey, comparisonScale) : null,
    [selectedKey, comparisonScale],
  );

  // Compute pitch class sets for both scales
  const pcA = useMemo(() => {
    const s = new Set<number>();
    for (const n of scaleA.notes) s.add(getPitchClass(n));
    return s;
  }, [scaleA]);

  const pcB = useMemo(() => {
    if (!scaleB) return new Set<number>();
    const s = new Set<number>();
    for (const n of scaleB.notes) s.add(getPitchClass(n));
    return s;
  }, [scaleB]);

  // Degree color map for each scale (pitch class → degree color)
  const degreeColorA = useMemo(() => {
    const m = new Map<number, string>();
    scaleA.notes.forEach((n, i) => {
      const key = scaleA.notes.length <= 7
        ? (i + 1) as keyof typeof DEGREE_COLORS
        : (((i % 7) + 1) as keyof typeof DEGREE_COLORS);
      m.set(getPitchClass(n), DEGREE_COLORS[key] ?? 'var(--text-muted)');
    });
    return m;
  }, [scaleA]);

  const degreeColorB = useMemo(() => {
    if (!scaleB) return new Map<number, string>();
    const m = new Map<number, string>();
    scaleB.notes.forEach((n, i) => {
      const key = scaleB.notes.length <= 7
        ? (i + 1) as keyof typeof DEGREE_COLORS
        : (((i % 7) + 1) as keyof typeof DEGREE_COLORS);
      m.set(getPitchClass(n), DEGREE_COLORS[key] ?? 'var(--text-muted)');
    });
    return m;
  }, [scaleB]);

  // Note name map for display (pitch class → note name in each scale)
  const noteNameA = useMemo(() => {
    const m = new Map<number, string>();
    for (const n of scaleA.notes) m.set(getPitchClass(n), noteToString(n));
    return m;
  }, [scaleA]);

  const noteNameB = useMemo(() => {
    if (!scaleB) return new Map<number, string>();
    const m = new Map<number, string>();
    for (const n of scaleB.notes) m.set(getPitchClass(n), noteToString(n));
    return m;
  }, [scaleB]);

  const rootPC = getPitchClass(selectedKey);

  // Build the 12-slot chromatic comparison
  const slots = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const pc = (rootPC + i) % 12;
      const inA = pcA.has(pc);
      const inB = pcB.has(pc);
      return {
        pc,
        semitones: i,
        label: CHROMATIC_LABELS[i],
        inA,
        inB,
        shared: inA && inB,
        onlyA: inA && !inB,
        onlyB: !inA && inB,
        neither: !inA && !inB,
        noteA: noteNameA.get(pc),
        noteB: noteNameB.get(pc),
        colorA: degreeColorA.get(pc),
        colorB: degreeColorB.get(pc),
      };
    });
  }, [rootPC, pcA, pcB, noteNameA, noteNameB, degreeColorA, degreeColorB]);

  if (!comparisonScale) {
    return (
      <div className="flex items-center gap-3">
        <h3 className="type-section">
          {t('explore.compareScales')}
        </h3>
        <select
          value=""
          onChange={(e) => setComparisonScale(e.target.value as ScaleType)}
          className="px-2 py-1 rounded-lg text-xs"
          style={{
            backgroundColor: 'var(--card)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
          }}
          aria-label={t('explore.selectScaleToCompare')}
        >
          <option value="" disabled>{t('explore.chooseScale')}</option>
          {SCALE_OPTIONS.filter(([id]) => id !== selectedScale).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>
    );
  }

  const sharedCount = slots.filter((s) => s.shared).length;
  const onlyACount = slots.filter((s) => s.onlyA).length;
  const onlyBCount = slots.filter((s) => s.onlyB).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="type-section">
          {t('explore.scaleComparison')}
        </h3>
        <button
          onClick={() => setComparisonScale(null)}
          className="p-1 rounded transition-colors"
          style={{ color: 'var(--text-dim)' }}
          aria-label={t('explore.closeComparison')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Scale labels + selector */}
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <div className="flex items-center gap-4 text-xs">
          <span style={{ color: DEGREE_COLORS[1] }} className="font-semibold">
            {SCALE_TYPE_NAMES[selectedScale]}
          </span>
          <span style={{ color: 'var(--text-dim)' }}>{t('explore.vs')}</span>
          <select
            value={comparisonScale}
            onChange={(e) => setComparisonScale(e.target.value as ScaleType)}
            className="px-2 py-1 rounded-lg text-xs"
            style={{
              backgroundColor: 'var(--card)',
              color: DEGREE_COLORS[5],
              border: `1px solid ${DEGREE_COLORS[5]}30`,
            }}
            aria-label={t('explore.changeComparisonScale')}
          >
            {SCALE_OPTIONS.filter(([id]) => id !== selectedScale).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <div className="text-[10px] flex gap-3" style={{ color: 'var(--text-dim)' }}>
          <span>{sharedCount} {t('explore.shared')}</span>
          <span>{onlyACount} {t('explore.uniqueToA')}</span>
          <span>{onlyBCount} {t('explore.uniqueToB')}</span>
        </div>
      </div>

      {/* Chromatic comparison grid */}
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }} role="group" aria-label={t('explore.chromaticComparison')}>
        {/* Row A: current scale */}
        {slots.map((slot) => (
          <div
            key={`a-${slot.semitones}`}
            className="flex flex-col items-center gap-0.5 py-2 max-sm:py-1.5 rounded-lg text-center transition-colors"
            style={{
              backgroundColor: slot.inA
                ? `${slot.colorA}18`
                : 'transparent',
              border: slot.inA
                ? `1px solid ${slot.colorA}30`
                : '1px solid transparent',
            }}
          >
            <span className="text-[10px] font-bold" style={{ color: slot.inA ? slot.colorA : 'var(--text-dim)' }}>
              {slot.noteA ?? ''}
            </span>
            <span className="text-[8px] max-sm:hidden" style={{ color: slot.inA ? `${slot.colorA}99` : 'transparent' }}>
              {slot.label}
            </span>
          </div>
        ))}

        {/* Diff indicators */}
        {slots.map((slot) => (
          <div
            key={`d-${slot.semitones}`}
            className="flex items-center justify-center h-4"
          >
            {slot.shared && (
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#34D399' }} title={t('explore.sharedLegend')} />
            )}
            {slot.onlyA && (
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEGREE_COLORS[1] }} title={t('explore.onlyLegend', { name: SCALE_TYPE_NAMES[selectedScale] })} />
            )}
            {slot.onlyB && (
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEGREE_COLORS[5] }} title={t('explore.onlyLegend', { name: SCALE_TYPE_NAMES[comparisonScale] })} />
            )}
          </div>
        ))}

        {/* Row B: comparison scale */}
        {slots.map((slot) => (
          <div
            key={`b-${slot.semitones}`}
            className="flex flex-col items-center gap-0.5 py-2 max-sm:py-1.5 rounded-lg text-center transition-colors"
            style={{
              backgroundColor: slot.inB
                ? `${slot.colorB}18`
                : 'transparent',
              border: slot.inB
                ? `1px solid ${slot.colorB}30`
                : '1px solid transparent',
            }}
          >
            <span className="text-[10px] font-bold" style={{ color: slot.inB ? slot.colorB : 'var(--text-dim)' }}>
              {slot.noteB ?? ''}
            </span>
            <span className="text-[8px] max-sm:hidden" style={{ color: slot.inB ? `${slot.colorB}99` : 'transparent' }}>
              {slot.label}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 text-[9px]" style={{ color: 'var(--text-dim)' }}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#34D399' }} />
          {t('explore.sharedLegend')}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: DEGREE_COLORS[1] }} />
          {t('explore.onlyLegend', { name: SCALE_TYPE_NAMES[selectedScale] })}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: DEGREE_COLORS[5] }} />
          {t('explore.onlyLegend', { name: SCALE_TYPE_NAMES[comparisonScale] })}
        </span>
      </div>
    </div>
  );
}
