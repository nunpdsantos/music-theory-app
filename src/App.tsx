import { lazy, Suspense } from 'react';
import { LazyMotion, domAnimation, AnimatePresence, m } from 'framer-motion';
import { AppShell } from './components/layout/AppShell.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { QuickSearch } from './components/navigation/QuickSearch.tsx';
import { useMidi } from './hooks/useMidi.ts';
import { useAppStore } from './state/store.ts';

function ViewLoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
    </div>
  );
}

function ViewErrorFallback(_error: Error, reset: () => void) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center p-8">
        <p className="text-zinc-400 text-sm mb-4">This view encountered an error.</p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

const ExploreView = lazy(() => import('./views/ExploreView.tsx').then((m) => ({ default: m.ExploreView })));
const PlayView = lazy(() => import('./views/PlayView.tsx').then((m) => ({ default: m.PlayView })));
const LearnView = lazy(() => import('./views/LearnView.tsx').then((m) => ({ default: m.LearnView })));

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
    <LazyMotion features={domAnimation}>
      <AppShell>
        <AnimatePresence mode="wait">
          <m.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="h-full flex flex-col min-h-0"
            id={`${view}-panel`}
            role="tabpanel"
            aria-label={`${view} view`}
          >
            <ErrorBoundary resetKey={view} fallback={ViewErrorFallback}>
              <Suspense fallback={<ViewLoadingFallback />}>
                <ViewComponent />
              </Suspense>
            </ErrorBoundary>
          </m.div>
        </AnimatePresence>
      </AppShell>
      <QuickSearch />
    </LazyMotion>
  );
}

export default App;
