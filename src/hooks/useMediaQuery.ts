import { useCallback, useSyncExternalStore } from 'react';

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Below 640px (phone) */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 639px)');
}

/** Between 640px and 1023px (tablet) */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
}

/** Below 1024px (phone or tablet) */
export function useIsCompact(): boolean {
  return useMediaQuery('(max-width: 1023px)');
}
