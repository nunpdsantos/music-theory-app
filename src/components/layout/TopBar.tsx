import { motion } from 'framer-motion';
import { useAppStore, type ViewMode } from '../../state/store.ts';

const VIEWS: { id: ViewMode; label: string }[] = [
  { id: 'explore', label: 'Explore' },
  { id: 'play', label: 'Play' },
  { id: 'learn', label: 'Learn' },
];

export function TopBar() {
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);

  return (
    <header className="flex items-center justify-between px-4 h-12 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-tight text-zinc-100">
          Music Theory
        </span>
      </div>

      <nav className="flex items-center bg-zinc-800/60 rounded-lg p-0.5 relative" role="tablist" aria-label="App views">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`relative px-3 py-1 text-xs font-medium rounded-md transition-colors z-10 ${
              view === v.id
                ? 'text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            role="tab"
            aria-selected={view === v.id}
            aria-controls={`${v.id}-panel`}
          >
            {view === v.id && (
              <motion.div
                layoutId="activeViewTab"
                className="absolute inset-0 bg-zinc-700 rounded-md"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{v.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={() => useAppStore.getState().setQuickSearchOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
        aria-label="Quick search, Command+K"
      >
        Search
        <kbd className="text-[10px] text-zinc-600 bg-zinc-900 px-1 py-0.5 rounded ml-1" aria-hidden="true">
          &#8984;K
        </kbd>
      </button>
    </header>
  );
}
