/**
 * Shared MIDIAccess singleton — avoids redundant requestMIDIAccess() calls
 * and onstatechange handler collisions between input and output services.
 */

let cached: MIDIAccess | null = null;
let pending: Promise<MIDIAccess | null> | null = null;
const stateChangeListeners = new Set<() => void>();

export async function getMidiAccess(): Promise<MIDIAccess | null> {
  if (cached) return cached;
  if (pending) return pending;

  if (!navigator.requestMIDIAccess) return null;

  pending = navigator.requestMIDIAccess()
    .then((access) => {
      cached = access;
      access.onstatechange = () => {
        for (const cb of stateChangeListeners) cb();
      };
      return access;
    })
    .catch((e) => {
      console.warn('[MIDI] Access denied:', e);
      return null;
    })
    .finally(() => { pending = null; });

  return pending;
}

export function getCachedMidiAccess(): MIDIAccess | null {
  return cached;
}

export function addStateChangeListener(callback: () => void): () => void {
  stateChangeListeners.add(callback);
  return () => { stateChangeListeners.delete(callback); };
}

/** Reset module state — for testing only */
export function _resetForTesting() {
  cached = null;
  pending = null;
  stateChangeListeners.clear();
}
