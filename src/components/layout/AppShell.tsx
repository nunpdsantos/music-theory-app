import { TopBar } from './TopBar.tsx';
import { Piano } from '../instruments/Piano.tsx';
import { Fretboard } from '../instruments/Fretboard.tsx';
import { InstrumentSelector } from '../instruments/InstrumentSelector.tsx';
import { useAppStore } from '../../state/store.ts';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const instrument = useAppStore((s) => s.instrument);

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <TopBar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      {/* Instrument bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-zinc-900 border-t border-zinc-800">
        <InstrumentSelector />
        <span className="text-[10px] text-zinc-600" aria-hidden="true">
          Click keys to play
        </span>
      </div>
      <div
        role="region"
        aria-label={`${instrument} instrument`}
        className="h-[260px] overflow-y-auto overflow-x-hidden bg-zinc-900"
      >
        {instrument === 'piano' ? <Piano /> : <Fretboard />}
      </div>
    </div>
  );
}
