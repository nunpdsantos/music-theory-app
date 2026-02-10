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
      className="flex items-center gap-0.5 rounded-md p-0.5"
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
            className="px-2 py-0.5 text-[10px] font-medium rounded transition-colors"
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
