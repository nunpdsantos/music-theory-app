import { useAppStore, type InstrumentType } from '../../state/store.ts';

const INSTRUMENTS: { id: InstrumentType; label: string }[] = [
  { id: 'piano', label: 'Piano' },
  { id: 'guitar', label: 'Guitar' },
];

export function InstrumentSelector() {
  const instrument = useAppStore((s) => s.instrument);
  const setInstrument = useAppStore((s) => s.setInstrument);

  return (
    <div role="tablist" aria-label="Instrument" className="flex items-center gap-0.5 bg-zinc-800/60 rounded-md p-0.5">
      {INSTRUMENTS.map((inst) => (
        <button
          key={inst.id}
          role="tab"
          aria-selected={instrument === inst.id}
          onClick={() => setInstrument(inst.id)}
          className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
            instrument === inst.id
              ? 'bg-zinc-700 text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {inst.label}
        </button>
      ))}
    </div>
  );
}
