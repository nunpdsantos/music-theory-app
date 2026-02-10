/**
 * Sync orchestration — push/pull/queue for Supabase cloud sync.
 *
 * Design:
 * - Pull runs once on login (merge remote into local)
 * - Push is debounced (2s) and coalesces changes per domain
 * - Offline queue persists to localStorage (max 3 entries, one per domain)
 * - supabase === null → all operations are no-ops
 */

import { supabase } from '../lib/supabase';
import { useSyncStore } from '../state/syncStore';
import {
  mergePreferences,
  mergeProgress,
  mergeGamification,
  type PreferencesSnapshot,
} from './syncMerge';
import type { CurriculumProgress } from '../core/types/curriculum';
import type { GamificationData } from '../core/types/gamification';

type SyncDomain = 'preferences' | 'progress' | 'gamification';

const OFFLINE_QUEUE_KEY = 'music-theory-sync-queue';
const DEBOUNCE_MS = 2000;

// ─── Debounce timers ─────────────────────────────────────────────────────────

const timers: Record<SyncDomain, ReturnType<typeof setTimeout> | null> = {
  preferences: null,
  progress: null,
  gamification: null,
};

// ─── Push (local → remote) ───────────────────────────────────────────────────

export function schedulePush(
  domain: SyncDomain,
  getData: () => unknown,
  userId: string,
) {
  if (!supabase) return;

  if (timers[domain]) clearTimeout(timers[domain]);
  timers[domain] = setTimeout(async () => {
    timers[domain] = null;
    const data = getData();
    if (!navigator.onLine) {
      enqueueOffline(domain, data);
      return;
    }
    await pushToRemote(domain, data, userId);
  }, DEBOUNCE_MS);
}

async function pushToRemote(domain: SyncDomain, data: unknown, userId: string) {
  if (!supabase) return;
  const syncStore = useSyncStore.getState();
  syncStore.setStatus('syncing');

  try {
    const table = domainToTable(domain);
    const payload = {
      user_id: userId,
      data: data as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    };
    // Use type assertion to work with dynamic table names
    const { error } = await (supabase.from(table) as any).upsert(payload);
    if (error) throw error;
    syncStore.setSynced(Date.now());
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Sync push failed';
    syncStore.setError(msg);
    enqueueOffline(domain, data);
  }
}

// ─── Pull (remote → local) ──────────────────────────────────────────────────

export async function pullAll(
  userId: string,
  locals: {
    preferences: PreferencesSnapshot;
    progress: CurriculumProgress;
    gamification: GamificationData;
  },
): Promise<{
  preferences: PreferencesSnapshot;
  progress: CurriculumProgress;
  gamification: GamificationData;
} | null> {
  if (!supabase) return null;
  const syncStore = useSyncStore.getState();
  syncStore.setStatus('syncing');

  try {
    const [prefRes, progRes, gamRes] = await Promise.all([
      (supabase.from('user_preferences') as any).select('data').eq('user_id', userId).maybeSingle(),
      (supabase.from('curriculum_progress') as any).select('data').eq('user_id', userId).maybeSingle(),
      (supabase.from('gamification_data') as any).select('data').eq('user_id', userId).maybeSingle(),
    ]);

    if (prefRes.error) throw prefRes.error;
    if (progRes.error) throw progRes.error;
    if (gamRes.error) throw gamRes.error;

    const remotePrefs = prefRes.data?.data as PreferencesSnapshot | undefined;
    const remoteProgress = progRes.data?.data as CurriculumProgress | undefined;
    const remoteGamification = gamRes.data?.data as GamificationData | undefined;

    const merged = {
      preferences: remotePrefs
        ? mergePreferences(locals.preferences, remotePrefs)
        : locals.preferences,
      progress: remoteProgress
        ? mergeProgress(locals.progress, remoteProgress)
        : locals.progress,
      gamification: remoteGamification
        ? mergeGamification(locals.gamification, remoteGamification)
        : locals.gamification,
    };

    syncStore.setSynced(Date.now());
    return merged;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Sync pull failed';
    syncStore.setError(msg);
    return null;
  }
}

// ─── Offline queue ───────────────────────────────────────────────────────────

interface OfflineEntry {
  domain: SyncDomain;
  data: unknown;
  timestamp: number;
}

function enqueueOffline(domain: SyncDomain, data: unknown) {
  try {
    const queue = loadOfflineQueue();
    // Replace existing entry for same domain (max 1 per domain = max 3 total)
    const filtered = queue.filter((e) => e.domain !== domain);
    filtered.push({ domain, data, timestamp: Date.now() });
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(filtered));
  } catch {
    // localStorage full or unavailable — silently discard
  }
}

function loadOfflineQueue(): OfflineEntry[] {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function flushOfflineQueue(userId: string) {
  if (!supabase) return;
  const queue = loadOfflineQueue();
  if (queue.length === 0) return;

  // Clear immediately to prevent double-flush
  localStorage.removeItem(OFFLINE_QUEUE_KEY);

  for (const entry of queue) {
    await pushToRemote(entry.domain, entry.data, userId);
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function domainToTable(domain: SyncDomain): string {
  switch (domain) {
    case 'preferences': return 'user_preferences';
    case 'progress': return 'curriculum_progress';
    case 'gamification': return 'gamification_data';
  }
}

export function cancelAllPendingPushes() {
  for (const domain of Object.keys(timers) as SyncDomain[]) {
    if (timers[domain]) {
      clearTimeout(timers[domain]);
      timers[domain] = null;
    }
  }
}
