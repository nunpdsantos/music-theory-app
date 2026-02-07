import { motion } from 'framer-motion';
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
    label: 'Common',
    options: [
      { value: 'major', label: 'Major' },
      { value: 'natural_minor', label: 'Minor' },
    ],
  },
  {
    label: 'Modes',
    options: [
      { value: 'dorian', label: 'Dorian' },
      { value: 'mixolydian', label: 'Mixolydian' },
      { value: 'lydian', label: 'Lydian' },
      { value: 'phrygian', label: 'Phrygian' },
    ],
  },
  {
    label: 'Extended',
    options: [
      { value: 'harmonic_minor', label: 'Harm. Minor' },
      { value: 'melodic_minor', label: 'Mel. Minor' },
    ],
  },
  {
    label: 'Other',
    options: [
      { value: 'pentatonic_major', label: 'Pent. Maj' },
      { value: 'pentatonic_minor', label: 'Pent. Min' },
      { value: 'blues', label: 'Blues' },
    ],
  },
];

const TONIC_COLOR = DEGREE_COLORS[1]; // #60A5FA

export function KeySelector() {
  const selectedKey = useAppStore((s) => s.selectedKey);
  const selectedScale = useAppStore((s) => s.selectedScale);
  const setKey = useAppStore((s) => s.setKey);
  const setScale = useAppStore((s) => s.setScale);

  return (
    <div className="space-y-3" role="group" aria-label="Key and scale selector">
      {/* ─── Root note chromatic strip ──────────────────────── */}
      <div>
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5">
          Root
        </span>
        <div className="inline-flex items-center rounded-xl bg-zinc-900/80 border border-zinc-800/60 p-1 gap-0.5 max-sm:max-w-full max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory">
          {ROOTS.map((root) => {
            const label = noteToString(root);
            const isSelected =
              root.natural === selectedKey.natural &&
              root.accidental === selectedKey.accidental;
            const hasAccidental = root.accidental !== '';

            return (
              <button
                key={label}
                onClick={() => setKey(root)}
                className={`relative px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
                  hasAccidental ? 'min-w-[30px]' : 'min-w-[26px]'
                } ${
                  isSelected
                    ? 'text-white shadow-lg'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="selectedRoot"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundColor: `${TONIC_COLOR}25`,
                      border: `1px solid ${TONIC_COLOR}50`,
                      boxShadow: `0 0 12px ${TONIC_COLOR}15`,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Scale type pills (grouped) ─────────────────────── */}
      <div>
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5">
          Scale
        </span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 max-sm:gap-x-1.5 max-sm:gap-y-1">
          {SCALE_GROUPS.map((group) => (
            <div key={group.label} className="flex items-center gap-1">
              {group.options.map((opt) => {
                const isActive = selectedScale === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setScale(opt.value)}
                    className={`relative px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                    }`}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="selectedScale"
                        className="absolute inset-0 rounded-lg bg-zinc-700/60 border border-zinc-600/50"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{opt.label}</span>
                  </button>
                );
              })}
              {group !== SCALE_GROUPS[SCALE_GROUPS.length - 1] && (
                <div className="w-px h-3 bg-zinc-800 ml-1.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
