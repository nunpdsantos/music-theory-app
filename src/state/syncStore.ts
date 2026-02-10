/**
 * Sync UI state — not persisted. Tracks sync status for UI feedback.
 */
import { create } from 'zustand';

export type SyncStatus = 'idle' | 'syncing' | 'error' | 'offline';

interface SyncStore {
  status: SyncStatus;
  lastSyncedAt: number | null;
  error: string | null;
  setStatus: (status: SyncStatus) => void;
  setSynced: (at: number) => void;
  setError: (error: string) => void;
  clear: () => void;
}

export const useSyncStore = create<SyncStore>()((set) => ({
  status: 'idle',
  lastSyncedAt: null,
  error: null,
  setStatus: (status) => set({ status, error: status === 'syncing' ? null : undefined }),
  setSynced: (at) => set({ status: 'idle', lastSyncedAt: at, error: null }),
  setError: (error) => set({ status: 'error', error }),
  clear: () => set({ status: 'idle', lastSyncedAt: null, error: null }),
}));
