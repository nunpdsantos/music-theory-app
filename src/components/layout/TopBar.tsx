import { useRef, useLayoutEffect, useState } from 'react';
import { useAppStore, type ViewMode } from '../../state/store.ts';

const VIEWS: { id: ViewMode; label: string }[] = [
  { id: 'explore', label: 'Explore' },
  { id: 'play', label: 'Play' },
  { id: 'learn', label: 'Learn' },
];

export function TopBar() {
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const btn = nav.querySelector<HTMLElement>(`[data-tab="${view}"]`);
    if (!btn) return;
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [view]);

  return (
    <header className="flex items-center justify-between px-4 max-sm:px-2.5 h-12 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-tight text-zinc-100 max-sm:hidden">
          Music Theory
        </span>
      </div>

      <nav ref={navRef} className="flex items-center bg-zinc-800/60 rounded-lg p-0.5 relative" role="tablist" aria-label="App views">
        <div
          className="absolute bg-zinc-700 rounded-md"
          style={{
            left: indicator.left,
            width: indicator.width,
            top: 2,
            bottom: 2,
            transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        {VIEWS.map((v) => (
          <button
            key={v.id}
            data-tab={v.id}
            onClick={() => setView(v.id)}
            className={`relative px-3 max-sm:px-2 py-1 max-sm:py-0.5 text-xs font-medium rounded-md transition-colors z-10 ${
              view === v.id
                ? 'text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            role="tab"
            aria-selected={view === v.id}
            aria-controls={`${v.id}-panel`}
          >
            <span className="relative z-10">{v.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={() => useAppStore.getState().setQuickSearchOpen(true)}
        className="flex items-center gap-1.5 px-2.5 max-sm:px-2 py-1 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
        aria-label="Quick search, Command+K"
      >
        {/* Magnifying glass icon — always visible */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:hidden shrink-0">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="max-sm:hidden">Search</span>
        <kbd className="text-[10px] text-zinc-500 bg-zinc-900 px-1 py-0.5 rounded ml-1 max-sm:hidden" aria-hidden="true">
          &#8984;K
        </kbd>
      </button>
    </header>
  );
}
