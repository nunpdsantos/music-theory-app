/**
 * Sync hook — wires store subscriptions to push/pull sync.
 * Must be mounted once in App.tsx.
 *
 * When no Supabase env vars are present or user is not authenticated,
 * this hook does nothing.
 */
import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../state/store';
import { useProgressStore } from '../state/progressStore';
import { useGamificationStore } from '../state/gamificationStore';
import { useConceptStore } from '../state/conceptStore';
import { useSyncStore } from '../state/syncStore';
import { schedulePush, pullAll, flushOfflineQueue, cancelAllPendingPushes, type SyncCallbacks } from '../services/sync';
import type { PreferencesSnapshot } from '../services/syncMerge';
import type { User } from '@supabase/supabase-js';
import type { Note, ScaleType } from '../core/types/music';
import type { SynthPresetName } from '../core/types/visual';
import type { InstrumentType, ColorMode, ThemeMode } from '../state/store';

function getPreferencesSnapshot(): PreferencesSnapshot {
  const s = useAppStore.getState();
  return {
    selectedKey: s.selectedKey,
    selectedScale: s.selectedScale,
    instrument: s.instrument,
    guitarTuningId: s.guitarTuningId,
    baseOctave: s.baseOctave,
    colorMode: s.colorMode,
    scaleOctaves: s.scaleOctaves,
    volume: s.volume,
    themeMode: s.themeMode,
    synthPreset: s.synthPreset,
    midiOutputEnabled: s.midiOutputEnabled,
    midiOutputDeviceId: s.midiOutputDeviceId,
    midiInputEnabled: s.midiInputEnabled,
    midiInputDeviceId: s.midiInputDeviceId,
    metronomeBPM: s.metronomeBPM,
    metronomeBeats: s.metronomeBeats,
    metronomeVolume: s.metronomeVolume,
    language: s.language,
    updatedAt: s.preferencesUpdatedAt,
  };
}

function applyPreferencesSnapshot(snap: PreferencesSnapshot) {
  const store = useAppStore.getState();
  store.setKey(snap.selectedKey as Note);
  store.setScale(snap.selectedScale as ScaleType);
  store.setInstrument(snap.instrument as InstrumentType);
  store.setGuitarTuningId(snap.guitarTuningId);
  store.setBaseOctave(snap.baseOctave);
  store.setColorMode(snap.colorMode as ColorMode);
  store.setScaleOctaves(snap.scaleOctaves);
  store.setVolume(snap.volume);
  store.setThemeMode(snap.themeMode as ThemeMode);
  store.setSynthPreset(snap.synthPreset as SynthPresetName);
  store.setMidiOutputEnabled(snap.midiOutputEnabled);
  store.setMidiOutputDeviceId(snap.midiOutputDeviceId);
  store.setMidiInputEnabled(snap.midiInputEnabled);
  store.setMidiInputDeviceId(snap.midiInputDeviceId);
  store.setMetronomeBPM(snap.metronomeBPM);
  store.setMetronomeBeats(snap.metronomeBeats);
  store.setMetronomeVolume(snap.metronomeVolume);
  store.setLanguage(snap.language);
}

// Wire sync service events to the UI sync store
const syncCallbacks: SyncCallbacks = {
  onSyncing: () => useSyncStore.getState().setStatus('syncing'),
  onSynced: (ts) => useSyncStore.getState().setSynced(ts),
  onError: (msg) => useSyncStore.getState().setError(msg),
};

export function useSync(user: User | null) {
  const userId = user?.id ?? null;
  const pullDone = useRef(false);

  // Pull on login
  useEffect(() => {
    if (!supabase || !userId) {
      pullDone.current = false;
      return;
    }
    if (pullDone.current) return;
    pullDone.current = true;

    const doPull = async () => {
      // Flush any offline queue first
      await flushOfflineQueue(userId, syncCallbacks);

      const merged = await pullAll(userId, {
        preferences: getPreferencesSnapshot(),
        progress: useProgressStore.getState().progress,
        gamification: extractGamificationData(),
        concepts: useConceptStore.getState().concepts,
      }, syncCallbacks);

      if (merged) {
        applyPreferencesSnapshot(merged.preferences);
        useProgressStore.getState().replaceProgress(merged.progress);
        applyGamificationData(merged.gamification);
        useConceptStore.getState().replaceAll(merged.concepts);
      }
    };

    doPull();
  }, [userId]);

  // Subscribe to store changes → push
  useEffect(() => {
    if (!supabase || !userId) return;

    const unsubs: (() => void)[] = [];

    // Preferences push — track preferencesUpdatedAt
    let prevPrefsAt = useAppStore.getState().preferencesUpdatedAt;
    unsubs.push(
      useAppStore.subscribe((state) => {
        if (state.preferencesUpdatedAt !== prevPrefsAt) {
          prevPrefsAt = state.preferencesUpdatedAt;
          schedulePush('preferences', getPreferencesSnapshot, userId, syncCallbacks);
        }
      }),
    );

    // Progress push — track progress object reference
    let prevProgress = useProgressStore.getState().progress;
    unsubs.push(
      useProgressStore.subscribe((state) => {
        if (state.progress !== prevProgress) {
          prevProgress = state.progress;
          schedulePush('progress', () => useProgressStore.getState().progress, userId, syncCallbacks);
        }
      }),
    );

    // Gamification push — track totalXP as change indicator
    let prevXP = useGamificationStore.getState().totalXP;
    unsubs.push(
      useGamificationStore.subscribe((state) => {
        if (state.totalXP !== prevXP) {
          prevXP = state.totalXP;
          schedulePush('gamification', extractGamificationData, userId, syncCallbacks);
        }
      }),
    );

    // Concept tracking push — track concepts object reference
    let prevConcepts = useConceptStore.getState().concepts;
    unsubs.push(
      useConceptStore.subscribe((state) => {
        if (state.concepts !== prevConcepts) {
          prevConcepts = state.concepts;
          schedulePush('concepts', () => useConceptStore.getState().concepts, userId, syncCallbacks);
        }
      }),
    );

    // Online/offline events
    const handleOnline = () => {
      useSyncStore.getState().setStatus('idle');
      flushOfflineQueue(userId, syncCallbacks);
    };
    const handleOffline = () => {
      useSyncStore.getState().setStatus('offline');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      unsubs.forEach((u) => u());
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      cancelAllPendingPushes();
    };
  }, [userId]);
}

function extractGamificationData() {
  const s = useGamificationStore.getState();
  return {
    activityLog: s.activityLog,
    streak: s.streak,
    totalXP: s.totalXP,
    weeklyXP: s.weeklyXP,
    weeklyXPWeek: s.weeklyXPWeek,
    recentXPEvents: s.recentXPEvents,
    achievements: s.achievements,
    totalExercisesAttempted: s.totalExercisesAttempted,
    totalPerfectExercises: s.totalPerfectExercises,
    totalModulesCompleted: s.totalModulesCompleted,
    totalReviewsCompleted: s.totalReviewsCompleted,
    totalReviewsCompletedToday: s.totalReviewsCompletedToday,
    totalReviewsTodayDate: s.totalReviewsTodayDate,
  };
}

function applyGamificationData(data: ReturnType<typeof extractGamificationData>) {
  // Use setState directly to avoid firing individual actions
  useGamificationStore.setState(data);
}
