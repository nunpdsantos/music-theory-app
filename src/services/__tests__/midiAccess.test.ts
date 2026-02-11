import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMidiAccess, getCachedMidiAccess, addStateChangeListener, _resetForTesting } from '../midiAccess';

// Mock MIDIAccess
function makeMockMIDIAccess(): MIDIAccess {
  return {
    inputs: new Map() as MIDIInputMap,
    outputs: new Map() as MIDIOutputMap,
    onstatechange: null,
    sysexEnabled: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  };
}

beforeEach(() => {
  _resetForTesting();
  vi.restoreAllMocks();
});

describe('getMidiAccess', () => {
  it('returns MIDIAccess on success', async () => {
    const mock = makeMockMIDIAccess();
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockResolvedValue(mock) });

    const access = await getMidiAccess();
    expect(access).toBe(mock);
  });

  it('returns null when requestMIDIAccess is unavailable', async () => {
    vi.stubGlobal('navigator', {});

    const access = await getMidiAccess();
    expect(access).toBeNull();
  });

  it('returns null when requestMIDIAccess rejects', async () => {
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockRejectedValue(new Error('denied')) });

    const access = await getMidiAccess();
    expect(access).toBeNull();
  });

  it('caches the result on subsequent calls', async () => {
    const mock = makeMockMIDIAccess();
    const requestFn = vi.fn().mockResolvedValue(mock);
    vi.stubGlobal('navigator', { requestMIDIAccess: requestFn });

    await getMidiAccess();
    await getMidiAccess();
    expect(requestFn).toHaveBeenCalledTimes(1);
  });

  it('deduplicates concurrent calls', async () => {
    const mock = makeMockMIDIAccess();
    const requestFn = vi.fn().mockResolvedValue(mock);
    vi.stubGlobal('navigator', { requestMIDIAccess: requestFn });

    const [a, b] = await Promise.all([getMidiAccess(), getMidiAccess()]);
    expect(a).toBe(b);
    expect(requestFn).toHaveBeenCalledTimes(1);
  });
});

describe('getCachedMidiAccess', () => {
  it('returns null before initialization', () => {
    expect(getCachedMidiAccess()).toBeNull();
  });

  it('returns cached access after getMidiAccess', async () => {
    const mock = makeMockMIDIAccess();
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockResolvedValue(mock) });

    await getMidiAccess();
    expect(getCachedMidiAccess()).toBe(mock);
  });
});

describe('addStateChangeListener', () => {
  it('registers and fires listeners on onstatechange', async () => {
    const mock = makeMockMIDIAccess();
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockResolvedValue(mock) });

    const cb1 = vi.fn();
    const cb2 = vi.fn();
    addStateChangeListener(cb1);
    addStateChangeListener(cb2);

    await getMidiAccess();

    // Simulate state change
    mock.onstatechange?.(new Event('statechange') as MIDIConnectionEvent);
    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(1);
  });

  it('returns cleanup function that removes listener', async () => {
    const mock = makeMockMIDIAccess();
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockResolvedValue(mock) });

    const cb = vi.fn();
    const cleanup = addStateChangeListener(cb);

    await getMidiAccess();
    cleanup();

    mock.onstatechange?.(new Event('statechange') as MIDIConnectionEvent);
    expect(cb).not.toHaveBeenCalled();
  });
});
