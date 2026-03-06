/**
 * Sync orchestration — push/pull/queue for Supabase cloud sync.
 *
 * Design:
 * - Pull runs once on login (merge remote into local)
 * - Push is debounced (2s) and coalesces changes per domain
 * - Offline queue persists to localStorage (max 3 entries, one per domain)
 * - supabase === null → all operations are no-ops
 * - Service is decoupled from UI stores via SyncCallbacks
 */

import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import {
  mergePreferences,
  mergeProgress,
  mergeGamification,
  mergeConceptTracking,
  type PreferencesSnapshot,
} from './syncMerge';
import type { CurriculumProgress } from '../core/types/curriculum';
import type { GamificationData } from '../core/types/gamification';
import type { ConceptRecord } from '../state/conceptStore';

type SyncDomain = 'preferences' | 'progress' | 'gamification' | 'concepts';
type TableName = keyof Database['public']['Tables'];

function typedFrom<T extends TableName>(table: T) {
  return supabase!.from(table);
}

export interface SyncCallbacks {
  onSyncing: () => void;
  onSynced: (timestamp: number) => void;
  onError: (message: string) => void;
}

const OFFLINE_QUEUE_KEY = 'music-theory-sync-queue';
const DEBOUNCE_MS = 2000;

// ─── Debounce timers ─────────────────────────────────────────────────────────

const timers: Record<SyncDomain, ReturnType<typeof setTimeout> | null> = {
  preferences: null,
  progress: null,
  gamification: null,
  concepts: null,
};

// ─── Push (local → remote) ───────────────────────────────────────────────────

export function schedulePush(
  domain: SyncDomain,
  getData: () => unknown,
  userId: string,
  callbacks: SyncCallbacks,
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
    await pushToRemote(domain, data, userId, callbacks);
  }, DEBOUNCE_MS);
}

async function pushToRemote(
  domain: SyncDomain,
  data: unknown,
  userId: string,
  callbacks: SyncCallbacks,
) {
  if (!supabase) return;
  callbacks.onSyncing();

  try {
    const now = new Date().toISOString();
    let error: { message: string } | null = null;

    switch (domain) {
      case 'preferences':
        ({ error } = await typedFrom('user_preferences').upsert({
          user_id: userId,
          data: data as PreferencesSnapshot,
          updated_at: now,
        }));
        break;
      case 'progress':
        ({ error } = await typedFrom('curriculum_progress').upsert({
          user_id: userId,
          data: data as CurriculumProgress,
          updated_at: now,
        }));
        break;
      case 'gamification':
        ({ error } = await typedFrom('gamification_data').upsert({
          user_id: userId,
          data: data as GamificationData,
          updated_at: now,
        }));
        break;
      case 'concepts':
        ({ error } = await typedFrom('concept_tracking').upsert({
          user_id: userId,
          data: data as Record<string, ConceptRecord>,
          updated_at: now,
        }));
        break;
    }

    if (error) throw error;
    callbacks.onSynced(Date.now());
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Sync push failed';
    callbacks.onError(msg);
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
    concepts: Record<string, ConceptRecord>;
  },
  callbacks: SyncCallbacks,
): Promise<{
  preferences: PreferencesSnapshot;
  progress: CurriculumProgress;
  gamification: GamificationData;
  concepts: Record<string, ConceptRecord>;
} | null> {
  if (!supabase) return null;
  callbacks.onSyncing();

  try {
    const [prefRes, progRes, gamRes, conRes] = await Promise.all([
      typedFrom('user_preferences').select('data').eq('user_id', userId).maybeSingle(),
      typedFrom('curriculum_progress').select('data').eq('user_id', userId).maybeSingle(),
      typedFrom('gamification_data').select('data').eq('user_id', userId).maybeSingle(),
      typedFrom('concept_tracking').select('data').eq('user_id', userId).maybeSingle(),
    ]);

    if (prefRes.error) throw prefRes.error;
    if (progRes.error) throw progRes.error;
    if (gamRes.error) throw gamRes.error;
    if (conRes.error) throw conRes.error;

    const remotePrefs = prefRes.data?.data as PreferencesSnapshot | undefined;
    const remoteProgress = progRes.data?.data as CurriculumProgress | undefined;
    const remoteGamification = gamRes.data?.data as GamificationData | undefined;
    const remoteConcepts = conRes.data?.data as Record<string, ConceptRecord> | undefined;

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
      concepts: remoteConcepts
        ? mergeConceptTracking(locals.concepts, remoteConcepts)
        : locals.concepts,
    };

    callbacks.onSynced(Date.now());
    return merged;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Sync pull failed';
    callbacks.onError(msg);
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
    // Replace existing entry for same domain (max 1 per domain = max 4 total)
    const filtered = queue.filter((e) => e.domain !== domain);
    filtered.push({ domain, data, timestamp: Date.now() });
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.warn('[Sync] Failed to queue offline data:', e);
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

export async function flushOfflineQueue(userId: string, callbacks: SyncCallbacks) {
  if (!supabase) return;
  const queue = loadOfflineQueue();
  if (queue.length === 0) return;

  // Clear immediately to prevent double-flush
  localStorage.removeItem(OFFLINE_QUEUE_KEY);

  for (const entry of queue) {
    await pushToRemote(entry.domain, entry.data, userId, callbacks);
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
