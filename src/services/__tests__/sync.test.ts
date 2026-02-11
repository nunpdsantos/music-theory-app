import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import type { PreferencesSnapshot } from '../syncMerge';
import type { CurriculumProgress } from '../../core/types/curriculum';
import type { GamificationData } from '../../core/types/gamification';
import { getDefaultGamificationData } from '../../core/types/gamification';

// ─── Supabase mock ──────────────────────────────────────────────────────────

const mockUpsert = vi.fn();
const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({ maybeSingle: mockMaybeSingle }));
const mockSelect = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn(() => ({ upsert: mockUpsert, select: mockSelect }));

let supabaseMockValue: unknown = { from: mockFrom };

vi.mock('../../lib/supabase', () => ({
  get supabase() {
    return supabaseMockValue;
  },
}));

// Mock syncMerge — we test merge functions separately in syncMerge.test.ts.
// Here we verify sync.ts calls them correctly and returns their output.
const mockMergePreferences = vi.fn((local: PreferencesSnapshot, _remote: PreferencesSnapshot) => local);
const mockMergeProgress = vi.fn((local: CurriculumProgress, _remote: CurriculumProgress) => local);
const mockMergeGamification = vi.fn((local: GamificationData, _remote: GamificationData) => local);
const mockMergeConceptTracking = vi.fn((local: Record<string, unknown>, _remote: Record<string, unknown>) => local);

vi.mock('../syncMerge', () => ({
  mergePreferences: (...args: unknown[]) => mockMergePreferences(...args as [PreferencesSnapshot, PreferencesSnapshot]),
  mergeProgress: (...args: unknown[]) => mockMergeProgress(...args as [CurriculumProgress, CurriculumProgress]),
  mergeGamification: (...args: unknown[]) => mockMergeGamification(...args as [GamificationData, GamificationData]),
  mergeConceptTracking: (...args: unknown[]) => mockMergeConceptTracking(...args as [Record<string, unknown>, Record<string, unknown>]),
}));

// ─── Import under test (after mocks registered) ────────────────────────────

import {
  schedulePush,
  pullAll,
  flushOfflineQueue,
  cancelAllPendingPushes,
} from '../sync';

// ─── Fixtures ───────────────────────────────────────────────────────────────

const OFFLINE_QUEUE_KEY = 'music-theory-sync-queue';

function makePrefs(overrides?: Partial<PreferencesSnapshot>): PreferencesSnapshot {
  return {
    selectedKey: { natural: 'C', accidental: '' },
    selectedScale: 'major',
    instrument: 'piano',
    guitarTuningId: 'standard',
    baseOctave: 4,
    colorMode: 'degree',
    scaleOctaves: 1,
    volume: 0.8,
    themeMode: 'dark',
    synthPreset: 'piano',
    midiOutputEnabled: false,
    midiOutputDeviceId: null,
    midiInputEnabled: true,
    midiInputDeviceId: null,
    metronomeBPM: 120,
    metronomeBeats: 4,
    metronomeVolume: 0.5,
    language: 'en',
    updatedAt: 1000,
    ...overrides,
  };
}

function makeProgress(overrides?: Partial<CurriculumProgress>): CurriculumProgress {
  return {
    completedModules: [],
    moduleProgress: {},
    ...overrides,
  };
}

function makeCallbacks() {
  return {
    onSyncing: vi.fn(),
    onSynced: vi.fn(),
    onError: vi.fn(),
  };
}

function makeLocals() {
  return {
    preferences: makePrefs(),
    progress: makeProgress(),
    gamification: getDefaultGamificationData(),
    concepts: {} as Record<string, import('../../state/conceptStore').ConceptRecord>,
  };
}

// ─── Setup / Teardown ───────────────────────────────────────────────────────

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  supabaseMockValue = { from: mockFrom };
  mockFrom.mockClear();
  mockUpsert.mockClear().mockResolvedValue({ error: null });
  mockSelect.mockClear();
  mockEq.mockClear();
  mockMaybeSingle.mockClear();
  mockMergePreferences.mockClear().mockImplementation((local) => local);
  mockMergeProgress.mockClear().mockImplementation((local) => local);
  mockMergeGamification.mockClear().mockImplementation((local) => local);
  // Default: online
  Object.defineProperty(navigator, 'onLine', { value: true, writable: true, configurable: true });
});

afterEach(() => {
  cancelAllPendingPushes();
  vi.useRealTimers();
  localStorage.clear();
});

// ─── schedulePush ───────────────────────────────────────────────────────────

describe('schedulePush', () => {
  it('is a no-op when supabase is null', () => {
    supabaseMockValue = null;
    const cb = makeCallbacks();
    const getData = vi.fn(() => ({ foo: 1 }));

    schedulePush('preferences', getData, 'user-1', cb);
    vi.advanceTimersByTime(3000);

    expect(getData).not.toHaveBeenCalled();
    expect(mockFrom).not.toHaveBeenCalled();
    expect(cb.onSyncing).not.toHaveBeenCalled();
  });

  it('debounces: multiple calls within 2s result in a single push', async () => {
    const cb = makeCallbacks();
    let counter = 0;
    const getData = vi.fn(() => ({ v: ++counter }));

    schedulePush('preferences', getData, 'user-1', cb);
    vi.advanceTimersByTime(500);
    schedulePush('preferences', getData, 'user-1', cb);
    vi.advanceTimersByTime(500);
    schedulePush('preferences', getData, 'user-1', cb);

    // Advance past debounce window
    await vi.advanceTimersByTimeAsync(2000);

    // getData called exactly once (the last scheduled one)
    expect(getData).toHaveBeenCalledTimes(1);
    expect(mockFrom).toHaveBeenCalledTimes(1);
    expect(mockFrom).toHaveBeenCalledWith('user_preferences');
  });

  it('calls pushToRemote after debounce timer fires', async () => {
    const cb = makeCallbacks();
    const data = { selectedKey: { natural: 'D', accidental: '#' } };
    const getData = vi.fn(() => data);

    schedulePush('preferences', getData, 'user-1', cb);

    // Before debounce: nothing happened
    expect(getData).not.toHaveBeenCalled();
    expect(cb.onSyncing).not.toHaveBeenCalled();

    // Fire debounce
    await vi.advanceTimersByTimeAsync(2000);

    expect(getData).toHaveBeenCalledTimes(1);
    expect(cb.onSyncing).toHaveBeenCalledTimes(1);
    expect(mockFrom).toHaveBeenCalledWith('user_preferences');
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user-1',
        data,
      }),
    );
    expect(cb.onSynced).toHaveBeenCalledTimes(1);
  });

  it('enqueues to localStorage when offline', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    const cb = makeCallbacks();
    const data = { theme: 'light' };

    schedulePush('preferences', () => data, 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    // Should NOT have called supabase
    expect(mockUpsert).not.toHaveBeenCalled();
    expect(cb.onSyncing).not.toHaveBeenCalled();

    // Should have enqueued to localStorage
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)!);
    expect(queue).toHaveLength(1);
    expect(queue[0].domain).toBe('preferences');
    expect(queue[0].data).toEqual(data);
  });

  it('maps domain "progress" to table "curriculum_progress"', async () => {
    const cb = makeCallbacks();
    schedulePush('progress', () => ({}), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    expect(mockFrom).toHaveBeenCalledWith('curriculum_progress');
  });

  it('maps domain "gamification" to table "gamification_data"', async () => {
    const cb = makeCallbacks();
    schedulePush('gamification', () => ({}), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    expect(mockFrom).toHaveBeenCalledWith('gamification_data');
  });
});

// ─── pushToRemote (tested indirectly through schedulePush) ──────────────────

describe('pushToRemote (via schedulePush)', () => {
  it('calls onSyncing before the push', async () => {
    // Make upsert hang so we can check ordering
    let resolveUpsert!: (v: { error: null }) => void;
    mockUpsert.mockReturnValue(new Promise((r) => { resolveUpsert = r; }));

    const cb = makeCallbacks();
    schedulePush('preferences', () => ({}), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    expect(cb.onSyncing).toHaveBeenCalledTimes(1);
    expect(cb.onSynced).not.toHaveBeenCalled();

    // Now resolve the upsert
    resolveUpsert({ error: null });
    await vi.advanceTimersByTimeAsync(0);

    expect(cb.onSynced).toHaveBeenCalledTimes(1);
  });

  it('calls onSynced with a timestamp on success', async () => {
    const cb = makeCallbacks();
    const before = Date.now();

    schedulePush('preferences', () => ({}), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    expect(cb.onSynced).toHaveBeenCalledTimes(1);
    const ts = cb.onSynced.mock.calls[0][0];
    expect(ts).toBeGreaterThanOrEqual(before);
  });

  it('calls onError on Supabase error and enqueues offline', async () => {
    mockUpsert.mockResolvedValue({ error: { message: 'RLS violation' } });
    const cb = makeCallbacks();

    schedulePush('progress', () => ({ modules: [] }), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    expect(cb.onError).toHaveBeenCalledTimes(1);
    // The error is thrown as an object, not an Error instance, so it hits the fallback message
    expect(cb.onError).toHaveBeenCalledWith('Sync push failed');

    // Also enqueued offline as fallback
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)!);
    expect(queue).toHaveLength(1);
    expect(queue[0].domain).toBe('progress');
  });

  it('includes updated_at in the upsert payload', async () => {
    const cb = makeCallbacks();
    schedulePush('preferences', () => ({ x: 1 }), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    const payload = mockUpsert.mock.calls[0][0];
    expect(payload).toHaveProperty('updated_at');
    expect(typeof payload.updated_at).toBe('string');
    // Should be a valid ISO string
    expect(new Date(payload.updated_at).toISOString()).toBe(payload.updated_at);
  });
});

// ─── pullAll ────────────────────────────────────────────────────────────────

describe('pullAll', () => {
  function setupMaybeSingle(prefData: unknown, progData: unknown, gamData: unknown, conData: unknown = null) {
    // pullAll calls from() 4 times via Promise.all.
    // Each chain: from(table).select('data').eq('user_id', userId).maybeSingle()
    let callIdx = 0;
    mockMaybeSingle.mockImplementation(() => {
      const results = [
        { data: prefData ? { data: prefData } : null, error: null },
        { data: progData ? { data: progData } : null, error: null },
        { data: gamData ? { data: gamData } : null, error: null },
        { data: conData ? { data: conData } : null, error: null },
      ];
      return Promise.resolve(results[callIdx++]);
    });
  }

  it('returns null when supabase is null', async () => {
    supabaseMockValue = null;
    const cb = makeCallbacks();
    const result = await pullAll('user-1', makeLocals(), cb);

    expect(result).toBeNull();
    expect(cb.onSyncing).not.toHaveBeenCalled();
  });

  it('calls onSyncing before fetching', async () => {
    setupMaybeSingle(null, null, null);
    const cb = makeCallbacks();

    await pullAll('user-1', makeLocals(), cb);

    expect(cb.onSyncing).toHaveBeenCalledTimes(1);
  });

  it('returns merged data on success and calls onSynced', async () => {
    const remotePrefs = makePrefs({ updatedAt: 2000, themeMode: 'light' });
    const remoteProgress = makeProgress({ completedModules: ['m1'] });
    const remoteGam = getDefaultGamificationData();
    remoteGam.totalXP = 500;

    setupMaybeSingle(remotePrefs, remoteProgress, remoteGam);

    // Make merge functions return something identifiable
    const mergedPrefs = makePrefs({ updatedAt: 2000 });
    const mergedProgress = makeProgress({ completedModules: ['m1'] });
    const mergedGam = { ...getDefaultGamificationData(), totalXP: 500 };
    mockMergePreferences.mockReturnValue(mergedPrefs);
    mockMergeProgress.mockReturnValue(mergedProgress);
    mockMergeGamification.mockReturnValue(mergedGam);

    const cb = makeCallbacks();
    const locals = makeLocals();
    const result = await pullAll('user-1', locals, cb);

    expect(result).not.toBeNull();
    expect(result!.preferences).toBe(mergedPrefs);
    expect(result!.progress).toBe(mergedProgress);
    expect(result!.gamification).toBe(mergedGam);

    expect(mockMergePreferences).toHaveBeenCalledWith(locals.preferences, remotePrefs);
    expect(mockMergeProgress).toHaveBeenCalledWith(locals.progress, remoteProgress);
    expect(mockMergeGamification).toHaveBeenCalledWith(locals.gamification, remoteGam);

    expect(cb.onSynced).toHaveBeenCalledTimes(1);
  });

  it('returns null on error and calls onError', async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: new Error('Network timeout') });
    const cb = makeCallbacks();

    const result = await pullAll('user-1', makeLocals(), cb);

    expect(result).toBeNull();
    expect(cb.onError).toHaveBeenCalledWith('Network timeout');
  });

  it('uses local data when remote is null (no remote data yet)', async () => {
    setupMaybeSingle(null, null, null);

    const cb = makeCallbacks();
    const locals = makeLocals();
    const result = await pullAll('user-1', locals, cb);

    expect(result).not.toBeNull();
    // When remote is null, merge functions should NOT be called
    expect(mockMergePreferences).not.toHaveBeenCalled();
    expect(mockMergeProgress).not.toHaveBeenCalled();
    expect(mockMergeGamification).not.toHaveBeenCalled();

    // Should return local data as-is
    expect(result!.preferences).toBe(locals.preferences);
    expect(result!.progress).toBe(locals.progress);
    expect(result!.gamification).toBe(locals.gamification);
  });

  it('fetches from all 4 tables in parallel', async () => {
    setupMaybeSingle(null, null, null);
    const cb = makeCallbacks();

    await pullAll('user-1', makeLocals(), cb);

    // from() should have been called 4 times
    expect(mockFrom).toHaveBeenCalledTimes(4);
    expect(mockFrom).toHaveBeenCalledWith('user_preferences');
    expect(mockFrom).toHaveBeenCalledWith('curriculum_progress');
    expect(mockFrom).toHaveBeenCalledWith('gamification_data');
    expect(mockFrom).toHaveBeenCalledWith('concept_tracking');

    // All select calls should pass 'data'
    expect(mockSelect).toHaveBeenCalledTimes(4);
    expect(mockSelect).toHaveBeenCalledWith('data');

    // All eq calls should filter by user_id
    expect(mockEq).toHaveBeenCalledTimes(4);
    expect(mockEq).toHaveBeenCalledWith('user_id', 'user-1');
  });
});

// ─── Offline queue ──────────────────────────────────────────────────────────

describe('offline queue', () => {
  it('enqueueOffline stores entry in localStorage (via schedulePush while offline)', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    const cb = makeCallbacks();
    const data = { instrument: 'guitar' };

    schedulePush('preferences', () => data, 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)!);
    expect(queue).toHaveLength(1);
    expect(queue[0]).toEqual(
      expect.objectContaining({ domain: 'preferences', data }),
    );
    expect(typeof queue[0].timestamp).toBe('number');
  });

  it('replaces existing entry for same domain (max 1 per domain)', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    const cb = makeCallbacks();

    // First push for preferences
    schedulePush('preferences', () => ({ v: 1 }), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    // Second push for preferences (should replace, not append)
    schedulePush('preferences', () => ({ v: 2 }), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)!);
    expect(queue).toHaveLength(1);
    expect(queue[0].data).toEqual({ v: 2 });
  });

  it('stores multiple domains independently', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    const cb = makeCallbacks();

    schedulePush('preferences', () => ({ p: 1 }), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);
    schedulePush('progress', () => ({ pr: 1 }), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);
    schedulePush('gamification', () => ({ g: 1 }), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)!);
    expect(queue).toHaveLength(3);
    const domains = queue.map((e: { domain: string }) => e.domain);
    expect(domains).toContain('preferences');
    expect(domains).toContain('progress');
    expect(domains).toContain('gamification');
  });

  it('handles localStorage quota exceeded gracefully (logs warning)', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Force Storage.prototype.setItem to throw (jsdom localStorage isn't directly spyable)
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new DOMException('QuotaExceededError', 'QuotaExceededError');
    };

    const cb = makeCallbacks();
    schedulePush('preferences', () => ({ large: 'data' }), 'user-1', cb);
    await vi.advanceTimersByTimeAsync(2000);

    expect(warnSpy).toHaveBeenCalledWith(
      '[Sync] Failed to queue offline data:',
      expect.any(DOMException),
    );

    Storage.prototype.setItem = originalSetItem;
    warnSpy.mockRestore();
  });
});

// ─── flushOfflineQueue ──────────────────────────────────────────────────────

describe('flushOfflineQueue', () => {
  it('pushes all queued entries and clears queue', async () => {
    // Pre-populate the queue with 2 entries
    const queue = [
      { domain: 'preferences', data: { theme: 'dark' }, timestamp: 1000 },
      { domain: 'progress', data: { modules: ['m1'] }, timestamp: 1001 },
    ];
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));

    const cb = makeCallbacks();
    await flushOfflineQueue('user-1', cb);

    // Should have pushed both entries
    expect(mockFrom).toHaveBeenCalledTimes(2);
    expect(mockFrom).toHaveBeenCalledWith('user_preferences');
    expect(mockFrom).toHaveBeenCalledWith('curriculum_progress');
    expect(cb.onSyncing).toHaveBeenCalledTimes(2);
    expect(cb.onSynced).toHaveBeenCalledTimes(2);

    // Queue should be cleared
    expect(localStorage.getItem(OFFLINE_QUEUE_KEY)).toBeNull();
  });

  it('is a no-op when queue is empty', async () => {
    const cb = makeCallbacks();
    await flushOfflineQueue('user-1', cb);

    expect(mockFrom).not.toHaveBeenCalled();
    expect(cb.onSyncing).not.toHaveBeenCalled();
  });

  it('is a no-op when supabase is null', async () => {
    supabaseMockValue = null;
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify([
      { domain: 'preferences', data: {}, timestamp: 1000 },
    ]));

    const cb = makeCallbacks();
    await flushOfflineQueue('user-1', cb);

    expect(cb.onSyncing).not.toHaveBeenCalled();
    // Queue should remain (not cleared since we never processed it)
    expect(localStorage.getItem(OFFLINE_QUEUE_KEY)).not.toBeNull();
  });
});

// ─── cancelAllPendingPushes ─────────────────────────────────────────────────

describe('cancelAllPendingPushes', () => {
  it('clears all pending timers so pushes never fire', async () => {
    const cb = makeCallbacks();

    schedulePush('preferences', () => ({ a: 1 }), 'user-1', cb);
    schedulePush('progress', () => ({ b: 2 }), 'user-1', cb);
    schedulePush('gamification', () => ({ c: 3 }), 'user-1', cb);

    cancelAllPendingPushes();

    // Advance well past debounce
    await vi.advanceTimersByTimeAsync(5000);

    expect(mockFrom).not.toHaveBeenCalled();
    expect(cb.onSyncing).not.toHaveBeenCalled();
  });

  it('is safe to call when no timers are pending', () => {
    // Should not throw
    expect(() => cancelAllPendingPushes()).not.toThrow();
  });
});
