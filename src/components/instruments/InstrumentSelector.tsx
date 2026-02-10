import { useAppStore, type InstrumentType } from '../../state/store.ts';

const INSTRUMENTS: { id: InstrumentType; label: string }[] = [
  { id: 'piano', label: 'Piano' },
  { id: 'guitar', label: 'Guitar' },
];

export function InstrumentSelector() {
  const instrument = useAppStore((s) => s.instrument);
  const setInstrument = useAppStore((s) => s.setInstrument);

  return (
    <div
      role="tablist"
      aria-label="Instrument"
      data-tour="instrument"
      className="flex items-center gap-0.5 rounded-md p-0.5 max-sm:p-1 max-sm:rounded-lg"
      style={{ backgroundColor: 'color-mix(in srgb, var(--card-hover) 60%, transparent)' }}
    >
      {INSTRUMENTS.map((inst) => {
        const isActive = instrument === inst.id;
        return (
          <button
            key={inst.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => setInstrument(inst.id)}
            className="px-2 py-0.5 text-2xs font-medium rounded transition-colors max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
            style={{
              backgroundColor: isActive ? 'var(--border)' : 'transparent',
              color: isActive ? 'var(--text)' : 'var(--text-dim)',
            }}
          >
            {inst.label}
          </button>
        );
      })}
    </div>
  );
}
