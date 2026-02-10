import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../state/store.ts';
import { noteToString, type Note, type ScaleType } from '../../core/types/music.ts';
import { DEGREE_COLORS } from '../../design/tokens/colors.ts';

const ROOTS: Note[] = [
  { natural: 'C', accidental: '' },
  { natural: 'C', accidental: '#' },
  { natural: 'D', accidental: '' },
  { natural: 'E', accidental: 'b' },
  { natural: 'E', accidental: '' },
  { natural: 'F', accidental: '' },
  { natural: 'F', accidental: '#' },
  { natural: 'G', accidental: '' },
  { natural: 'A', accidental: 'b' },
  { natural: 'A', accidental: '' },
  { natural: 'B', accidental: 'b' },
  { natural: 'B', accidental: '' },
];

const SCALE_GROUPS: { label: string; options: { value: ScaleType; label: string }[] }[] = [
  {
    label: 'Core',
    options: [
      { value: 'major', label: 'Major' },
      { value: 'natural_minor', label: 'Minor' },
    ],
  },
  {
    label: 'Minor Variants',
    options: [
      { value: 'harmonic_minor', label: 'Harm. Minor' },
      { value: 'melodic_minor', label: 'Mel. Minor' },
    ],
  },
  {
    label: 'Modes',
    options: [
      { value: 'dorian', label: 'Dorian' },
      { value: 'phrygian', label: 'Phrygian' },
      { value: 'lydian', label: 'Lydian' },
      { value: 'mixolydian', label: 'Mixolydian' },
      { value: 'locrian', label: 'Locrian' },
    ],
  },
  {
    label: 'Pentatonic / Blues',
    options: [
      { value: 'pentatonic_major', label: 'Pent. Maj' },
      { value: 'pentatonic_minor', label: 'Pent. Min' },
      { value: 'blues', label: 'Blues' },
      { value: 'major_blues', label: 'Maj. Blues' },
    ],
  },
  {
    label: 'Symmetric',
    options: [
      { value: 'whole_tone', label: 'Whole Tone' },
      { value: 'diminished_whole_half', label: 'Dim W-H' },
      { value: 'diminished_half_whole', label: 'Dim H-W' },
      { value: 'chromatic', label: 'Chromatic' },
    ],
  },
  {
    label: 'Mel. Minor Modes',
    options: [
      { value: 'altered', label: 'Altered' },
      { value: 'lydian_dominant', label: 'Lydian Dom' },
      { value: 'phrygian_dominant', label: 'Phryg. Dom' },
      { value: 'locrian_natural2', label: 'Locr. ♮2' },
      { value: 'dorian_b2', label: 'Dorian ♭2' },
      { value: 'lydian_augmented', label: 'Lydian Aug' },
      { value: 'mixolydian_b6', label: 'Mixo. ♭6' },
    ],
  },
  {
    label: 'Bebop',
    options: [
      { value: 'bebop_dominant', label: 'Bebop Dom' },
      { value: 'bebop_major', label: 'Bebop Maj' },
      { value: 'bebop_dorian', label: 'Bebop Dor' },
    ],
  },
  {
    label: 'World',
    options: [
      { value: 'hungarian_minor', label: 'Hung. Min' },
      { value: 'hungarian_major', label: 'Hung. Maj' },
      { value: 'double_harmonic', label: 'Dbl Harm.' },
      { value: 'persian', label: 'Persian' },
      { value: 'neapolitan_minor', label: 'Neap. Min' },
      { value: 'neapolitan_major', label: 'Neap. Maj' },
      { value: 'hirajoshi', label: 'Hirajoshi' },
      { value: 'in_sen', label: 'In Sen' },
      { value: 'iwato', label: 'Iwato' },
      { value: 'egyptian', label: 'Egyptian' },
    ],
  },
];

const ALWAYS_VISIBLE_COUNT = 4; // first 4 groups always shown

const TONIC_COLOR = DEGREE_COLORS[1]; // #60A5FA

export function KeySelector() {
  const { t } = useTranslation();
  const selectedKey = useAppStore((s) => s.selectedKey);
  const selectedScale = useAppStore((s) => s.selectedScale);
  const setKey = useAppStore((s) => s.setKey);
  const setScale = useAppStore((s) => s.setScale);
  const [expanded, setExpanded] = useState(false);

  // Auto-expand if selected scale is in a hidden group
  const isSelectedInHiddenGroup = useMemo(() => {
    const hiddenGroups = SCALE_GROUPS.slice(ALWAYS_VISIBLE_COUNT);
    return hiddenGroups.some((g) => g.options.some((o) => o.value === selectedScale));
  }, [selectedScale]);

  const showAll = expanded || isSelectedInHiddenGroup;
  const visibleGroups = showAll ? SCALE_GROUPS : SCALE_GROUPS.slice(0, ALWAYS_VISIBLE_COUNT);

  // CSS indicator for root note
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const [rootIndicator, setRootIndicator] = useState({ left: 0, width: 0, height: 0 });
  const rootLabel = noteToString(selectedKey);

  useLayoutEffect(() => {
    const container = rootContainerRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLElement>(`[data-root="${rootLabel}"]`);
    if (!btn) return;
    setRootIndicator({ left: btn.offsetLeft, width: btn.offsetWidth, height: btn.offsetHeight });
  }, [rootLabel]);

  // CSS indicator for scale type
  const scaleContainerRef = useRef<HTMLDivElement>(null);
  const [scaleIndicator, setScaleIndicator] = useState({ left: 0, top: 0, width: 0, height: 0 });

  useLayoutEffect(() => {
    const container = scaleContainerRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLElement>(`[data-scale="${selectedScale}"]`);
    if (!btn) return;
    setScaleIndicator({
      left: btn.offsetLeft,
      top: btn.offsetTop,
      width: btn.offsetWidth,
      height: btn.offsetHeight,
    });
  }, [selectedScale, showAll]);

  return (
    <div className="space-y-3" role="group" aria-label={t('keySelector.label')}>
      {/* ─── Root note chromatic strip ──────────────────────── */}
      <div>
        <span className="type-section block mb-1.5">
          {t('keySelector.root')}
        </span>
        <div ref={rootContainerRef} className="relative inline-flex items-center rounded-xl p-1 gap-0.5 max-sm:max-w-full max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-raised) 80%, transparent)', border: '1px solid color-mix(in srgb, var(--border) 60%, transparent)' }}>
          <div
            className="absolute rounded-lg pointer-events-none"
            style={{
              left: rootIndicator.left,
              width: rootIndicator.width,
              height: rootIndicator.height,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: `${TONIC_COLOR}25`,
              border: `1px solid ${TONIC_COLOR}50`,
              boxShadow: `0 0 12px ${TONIC_COLOR}15`,
              transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {ROOTS.map((root) => {
            const label = noteToString(root);
            const isSelected =
              root.natural === selectedKey.natural &&
              root.accidental === selectedKey.accidental;
            const hasAccidental = root.accidental !== '';

            return (
              <button
                key={label}
                data-root={label}
                onClick={() => setKey(root)}
                className={`relative px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
                  hasAccidental ? 'min-w-[30px]' : 'min-w-[26px]'
                } ${
                  isSelected
                    ? 'shadow-lg'
                    : 'hover:bg-white/[0.04]'
                }`}
                style={{ color: isSelected ? 'var(--text)' : 'var(--text-muted)' }}
              >
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Scale type pills (grouped) ─────────────────────── */}
      <div>
        <span className="type-section block mb-1.5">
          {t('keySelector.scale')}
        </span>
        <div ref={scaleContainerRef} className="relative flex flex-wrap items-center gap-x-3 gap-y-1.5 max-sm:gap-x-1.5 max-sm:gap-y-1">
          <div
            className="absolute rounded-lg pointer-events-none"
            style={{
              left: scaleIndicator.left,
              top: scaleIndicator.top,
              width: scaleIndicator.width,
              height: scaleIndicator.height,
              backgroundColor: 'var(--card-hover)',
              border: '1px solid var(--border)',
              transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1), top 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {visibleGroups.map((group, gi) => (
            <div key={group.label} className="flex items-center gap-1">
              {group.options.map((opt) => {
                const isActive = selectedScale === opt.value;
                return (
                  <button
                    key={opt.value}
                    data-scale={opt.value}
                    onClick={() => setScale(opt.value)}
                    className={`relative px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all duration-150 ${
                      isActive
                        ? ''
                        : 'hover:bg-white/[0.03]'
                    }`}
                    style={{ color: isActive ? 'var(--text)' : 'var(--text-dim)' }}
                    aria-pressed={isActive}
                  >
                    <span className="relative z-10">{opt.label}</span>
                  </button>
                );
              })}
              {gi < visibleGroups.length - 1 && (
                <div className="w-px h-3 ml-1.5" style={{ backgroundColor: 'var(--border)' }} />
              )}
            </div>
          ))}
          {!isSelectedInHiddenGroup && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] font-medium px-2 py-1 rounded-lg hover:bg-white/[0.03] transition-colors"
              style={{ color: 'var(--text-dim)' }}
            >
              {showAll ? t('keySelector.less') : t('keySelector.moreScales')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
