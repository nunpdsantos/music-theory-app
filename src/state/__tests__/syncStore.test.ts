import { describe, it, expect, beforeEach } from 'vitest';
import { useSyncStore } from '../syncStore';

beforeEach(() => {
  useSyncStore.setState({ status: 'idle', lastSyncedAt: null, error: null });
});

describe('syncStore', () => {
  it('starts with idle status', () => {
    expect(useSyncStore.getState().status).toBe('idle');
    expect(useSyncStore.getState().lastSyncedAt).toBeNull();
    expect(useSyncStore.getState().error).toBeNull();
  });

  it('setStatus changes status', () => {
    useSyncStore.getState().setStatus('syncing');
    expect(useSyncStore.getState().status).toBe('syncing');
  });

  it('setSynced updates status and timestamp', () => {
    const now = Date.now();
    useSyncStore.getState().setSynced(now);
    expect(useSyncStore.getState().status).toBe('idle');
    expect(useSyncStore.getState().lastSyncedAt).toBe(now);
    expect(useSyncStore.getState().error).toBeNull();
  });

  it('setError sets error status and message', () => {
    useSyncStore.getState().setError('Network failed');
    expect(useSyncStore.getState().status).toBe('error');
    expect(useSyncStore.getState().error).toBe('Network failed');
  });

  it('clear resets all state', () => {
    useSyncStore.getState().setSynced(Date.now());
    useSyncStore.getState().clear();
    expect(useSyncStore.getState().status).toBe('idle');
    expect(useSyncStore.getState().lastSyncedAt).toBeNull();
    expect(useSyncStore.getState().error).toBeNull();
  });
});
