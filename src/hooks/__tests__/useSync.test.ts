import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Mock supabase — same pattern as useAuth.test.ts
// ---------------------------------------------------------------------------
let mockSupabaseValue: object | null = null;

vi.mock('../../lib/supabase', () => ({
  get supabase() {
    return mockSupabaseValue;
  },
}));

// ---------------------------------------------------------------------------
// Mock sync service
// ---------------------------------------------------------------------------
const mockSchedulePush = vi.fn();
const mockPullAll = vi.fn();
const mockFlushOfflineQueue = vi.fn();
const mockCancelAllPendingPushes = vi.fn();

vi.mock('../../services/sync', () => ({
  schedulePush: (...args: unknown[]) => mockSchedulePush(...args),
  pullAll: (...args: unknown[]) => mockPullAll(...args),
  flushOfflineQueue: (...args: unknown[]) => mockFlushOfflineQueue(...args),
  cancelAllPendingPushes: () => mockCancelAllPendingPushes(),
}));

// Import after mocks
import { useSync } from '../useSync';
import { useAppStore } from '../../state/store';
import { useProgressStore } from '../../state/progressStore';
import { useGamificationStore } from '../../state/gamificationStore';
import { useConceptStore } from '../../state/conceptStore';
import { useSyncStore } from '../../state/syncStore';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const fakeUser = { id: 'u1', email: 'test@example.com' } as any;

// Capture initial states so we can reset
const initialAppState = useAppStore.getState();
const initialProgressState = useProgressStore.getState();
const initialGamificationState = useGamificationStore.getState();
const initialConceptState = useConceptStore.getState();

// ---------------------------------------------------------------------------
// Reset between tests
// ---------------------------------------------------------------------------
beforeEach(() => {
  vi.clearAllMocks();
  mockSupabaseValue = null;
  mockFlushOfflineQueue.mockResolvedValue(undefined);
  mockPullAll.mockResolvedValue(null);
  useSyncStore.setState({ status: 'idle', lastSyncedAt: null, error: null });
});

afterEach(() => {
  // Explicitly unmount all rendered hooks to clean up event listeners
  cleanup();
  // Restore store defaults
  useAppStore.setState(initialAppState);
  useProgressStore.setState(initialProgressState);
  useGamificationStore.setState(initialGamificationState);
  useConceptStore.setState(initialConceptState);
});

// =========================================================================
// Suite 1 — supabase null (no env vars)
// =========================================================================
describe('useSync — supabase null', () => {
  it('does not pull or subscribe when supabase is null', async () => {
    renderHook(() => useSync(fakeUser));
    await act(async () => {});

    expect(mockFlushOfflineQueue).not.toHaveBeenCalled();
    expect(mockPullAll).not.toHaveBeenCalled();
    expect(mockSchedulePush).not.toHaveBeenCalled();
  });
});

// =========================================================================
// Suite 2 — supabase present, user null
// =========================================================================
describe('useSync — user null', () => {
  beforeEach(() => {
    mockSupabaseValue = { from: vi.fn() };
  });

  it('does not pull when user is null', async () => {
    renderHook(() => useSync(null));
    await act(async () => {});

    expect(mockFlushOfflineQueue).not.toHaveBeenCalled();
    expect(mockPullAll).not.toHaveBeenCalled();
  });

  it('does not subscribe to stores when user is null', () => {
    renderHook(() => useSync(null));

    // Trigger a preference change
    act(() => {
      useAppStore.getState().setVolume(0.5);
    });

    expect(mockSchedulePush).not.toHaveBeenCalled();
  });
});

// =========================================================================
// Suite 3 — supabase present, user authenticated
// =========================================================================
describe('useSync — authenticated', () => {
  beforeEach(() => {
    mockSupabaseValue = { from: vi.fn() };
  });

  // -----------------------------------------------------------------------
  // Pull on login
  // -----------------------------------------------------------------------
  it('flushes offline queue then pulls on login', async () => {
    renderHook(() => useSync(fakeUser));
    await act(async () => {});

    expect(mockFlushOfflineQueue).toHaveBeenCalledWith('u1', expect.any(Object));
    expect(mockPullAll).toHaveBeenCalledWith(
      'u1',
      expect.objectContaining({
        preferences: expect.any(Object),
        progress: expect.any(Object),
        gamification: expect.any(Object),
        concepts: expect.any(Object),
      }),
      expect.any(Object),
    );
  });

  it('flushes before pulling (order matters)', async () => {
    const callOrder: string[] = [];
    mockFlushOfflineQueue.mockImplementation(async () => {
      callOrder.push('flush');
    });
    mockPullAll.mockImplementation(async () => {
      callOrder.push('pull');
      return null;
    });

    renderHook(() => useSync(fakeUser));
    await act(async () => {});

    expect(callOrder).toEqual(['flush', 'pull']);
  });

  it('applies merged data from pullAll to stores', async () => {
    const mergedPrefs = {
      ...useAppStore.getState(),
      volume: 0.42,
      selectedKey: { natural: 'D', accidental: '' },
      selectedScale: 'minor' as const,
      instrument: 'guitar' as const,
      guitarTuningId: 'standard',
      baseOctave: 3,
      colorMode: 'degree' as const,
      scaleOctaves: 2,
      themeMode: 'dark' as const,
      synthPreset: 'piano' as const,
      midiOutputEnabled: false,
      midiOutputDeviceId: null,
      midiInputEnabled: true,
      midiInputDeviceId: null,
      metronomeBPM: 100,
      metronomeBeats: 3,
      metronomeVolume: 0.5,
      language: 'pt',
      updatedAt: Date.now(),
    };
    const mergedProgress = { completedModules: ['m1'], moduleProgress: {}, exerciseResults: {} };
    const mergedGamification = {
      ...useGamificationStore.getState(),
      totalXP: 999,
    };
    const mergedConcepts = { 'interval_P5': { correct: 5, total: 8, history: [] } };

    mockPullAll.mockResolvedValue({
      preferences: mergedPrefs,
      progress: mergedProgress,
      gamification: mergedGamification,
      concepts: mergedConcepts,
    });

    renderHook(() => useSync(fakeUser));
    await act(async () => {});

    // Verify stores were updated
    expect(useAppStore.getState().volume).toBe(0.42);
    expect(useProgressStore.getState().progress.completedModules).toEqual(['m1']);
    expect(useGamificationStore.getState().totalXP).toBe(999);
    expect(useConceptStore.getState().concepts).toEqual(mergedConcepts);
  });

  it('does not apply store changes when pullAll returns null', async () => {
    mockPullAll.mockResolvedValue(null);
    const prevVolume = useAppStore.getState().volume;

    renderHook(() => useSync(fakeUser));
    await act(async () => {});

    expect(useAppStore.getState().volume).toBe(prevVolume);
  });

  it('pulls only once even if userId stays the same across re-renders', async () => {
    const { rerender } = renderHook(({ user }) => useSync(user), {
      initialProps: { user: fakeUser },
    });

    await act(async () => {});
    expect(mockPullAll).toHaveBeenCalledTimes(1);

    rerender({ user: fakeUser });
    await act(async () => {});
    expect(mockPullAll).toHaveBeenCalledTimes(1);
  });

  // -----------------------------------------------------------------------
  // Store subscriptions → schedulePush
  // -----------------------------------------------------------------------
  it('pushes preferences when preferencesUpdatedAt changes', async () => {
    renderHook(() => useSync(fakeUser));
    await act(async () => {});
    mockSchedulePush.mockClear();

    act(() => {
      useAppStore.getState().setVolume(0.33);
    });

    expect(mockSchedulePush).toHaveBeenCalledWith(
      'preferences',
      expect.any(Function),
      'u1',
      expect.any(Object),
    );
  });

  it('pushes progress when progress reference changes', async () => {
    renderHook(() => useSync(fakeUser));
    await act(async () => {});
    mockSchedulePush.mockClear();

    act(() => {
      useProgressStore.getState().toggleTask('m1', 't1');
    });

    expect(mockSchedulePush).toHaveBeenCalledWith(
      'progress',
      expect.any(Function),
      'u1',
      expect.any(Object),
    );
  });

  it('pushes gamification when totalXP changes', async () => {
    renderHook(() => useSync(fakeUser));
    await act(async () => {});
    mockSchedulePush.mockClear();

    act(() => {
      useGamificationStore.setState({ totalXP: 50 });
    });

    expect(mockSchedulePush).toHaveBeenCalledWith(
      'gamification',
      expect.any(Function),
      'u1',
      expect.any(Object),
    );
  });

  it('pushes concepts when concepts reference changes', async () => {
    renderHook(() => useSync(fakeUser));
    await act(async () => {});
    mockSchedulePush.mockClear();

    act(() => {
      useConceptStore.getState().replaceAll({ 'scale_major': { correct: 1, total: 1, history: [] } });
    });

    expect(mockSchedulePush).toHaveBeenCalledWith(
      'concepts',
      expect.any(Function),
      'u1',
      expect.any(Object),
    );
  });

  // -----------------------------------------------------------------------
  // Online/offline events
  // -----------------------------------------------------------------------
  it('flushes offline queue on window online event', async () => {
    renderHook(() => useSync(fakeUser));
    await act(async () => {});
    mockFlushOfflineQueue.mockClear();

    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(mockFlushOfflineQueue).toHaveBeenCalledWith('u1', expect.any(Object));
  });

  it('sets sync status to offline on window offline event', async () => {
    renderHook(() => useSync(fakeUser));
    await act(async () => {});

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(useSyncStore.getState().status).toBe('offline');
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------
  it('unsubscribes from stores and removes event listeners on unmount', async () => {
    const { unmount } = renderHook(() => useSync(fakeUser));
    await act(async () => {});
    mockSchedulePush.mockClear();

    unmount();

    // Verify cancelAllPendingPushes called
    expect(mockCancelAllPendingPushes).toHaveBeenCalled();

    // Store changes after unmount should NOT trigger schedulePush
    act(() => {
      useAppStore.getState().setVolume(0.1);
    });
    expect(mockSchedulePush).not.toHaveBeenCalled();
  });

  it('removes online/offline listeners on unmount', async () => {
    const { unmount } = renderHook(() => useSync(fakeUser));
    await act(async () => {});
    mockFlushOfflineQueue.mockClear();

    unmount();

    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    // Should NOT flush after unmount
    expect(mockFlushOfflineQueue).not.toHaveBeenCalled();
  });
});
