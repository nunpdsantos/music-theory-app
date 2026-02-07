import { useState } from 'react';
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
  const [instrumentCollapsed, setInstrumentCollapsed] = useState(false);

  return (
    <div className="h-screen supports-[height:100dvh]:h-dvh flex flex-col bg-zinc-950 text-zinc-100">
      <TopBar />
      <main className="flex-1 overflow-hidden flex flex-col min-h-0">
        {children}
      </main>
      {/* Instrument bar */}
      <div className="flex items-center justify-between px-3 max-sm:px-2 py-1 bg-zinc-900 border-t border-zinc-800">
        <InstrumentSelector />
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-600 max-sm:hidden" aria-hidden="true">
            Click keys to play
          </span>
          {/* Collapse toggle — visible on tablet and below */}
          <button
            onClick={() => setInstrumentCollapsed((c) => !c)}
            className="hidden max-lg:flex items-center justify-center w-6 h-6 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
            aria-label={instrumentCollapsed ? 'Show instrument' : 'Hide instrument'}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${instrumentCollapsed ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
      {!instrumentCollapsed && (
        <div
          role="region"
          aria-label={`${instrument} instrument`}
          className="h-[260px] max-md:h-[200px] max-sm:h-[160px] overflow-y-auto overflow-x-hidden bg-zinc-900"
        >
          {instrument === 'piano' ? <Piano /> : <Fretboard />}
        </div>
      )}
    </div>
  );
}
