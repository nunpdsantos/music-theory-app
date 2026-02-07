import { AnimatePresence, motion } from 'framer-motion';
import { AppShell } from './components/layout/AppShell.tsx';
import { ExploreView } from './views/ExploreView.tsx';
import { PlayView } from './views/PlayView.tsx';
import { LearnView } from './views/LearnView.tsx';
import { QuickSearch } from './components/navigation/QuickSearch.tsx';
import { useMidi } from './hooks/useMidi.ts';
import { useAppStore } from './state/store.ts';

const VIEW_COMPONENTS = {
  explore: ExploreView,
  play: PlayView,
  learn: LearnView,
} as const;

function App() {
  const view = useAppStore((s) => s.view);
  const ViewComponent = VIEW_COMPONENTS[view];

  // Wire MIDI input globally
  useMidi();

  return (
    <>
      <AppShell>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="h-full"
            id={`${view}-panel`}
            role="tabpanel"
            aria-label={`${view} view`}
          >
            <ViewComponent />
          </motion.div>
        </AnimatePresence>
      </AppShell>
      <QuickSearch />
    </>
  );
}

export default App;
