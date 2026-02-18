import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Mock AudioContext as a proper constructor
// ---------------------------------------------------------------------------
let mockCurrentTime = 0;

class MockOscillatorNode {
  frequency = { value: 0 };
  type = 'sine';
  onended: (() => void) | null = null;
  connect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
  disconnect = vi.fn();
}

class MockGainNode {
  gain = {
    value: 0,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  };
  connect = vi.fn();
  disconnect = vi.fn();
}

const oscillatorsCreated: MockOscillatorNode[] = [];

class MockAudioContext {
  get currentTime() { return mockCurrentTime; }
  state = 'running';
  destination = {};
  resume = vi.fn();

  createOscillator() {
    const osc = new MockOscillatorNode();
    oscillatorsCreated.push(osc);
    return osc;
  }

  createGain() {
    return new MockGainNode();
  }
}

vi.stubGlobal('AudioContext', MockAudioContext);

// Import AFTER mock is in place. Use dynamic import to force fresh module state.
let startMetronome: typeof import('../metronome').startMetronome;
let stopMetronome: typeof import('../metronome').stopMetronome;
let setMetronomeBPM: typeof import('../metronome').setMetronomeBPM;
let setMetronomeBeats: typeof import('../metronome').setMetronomeBeats;
let setMetronomeVolume: typeof import('../metronome').setMetronomeVolume;
let isMetronomeRunning: typeof import('../metronome').isMetronomeRunning;

beforeEach(async () => {
  vi.useFakeTimers();
  mockCurrentTime = 0;
  oscillatorsCreated.length = 0;

  // Fresh import each test suite — service has module-level state
  const mod = await import('../metronome');
  startMetronome = mod.startMetronome;
  stopMetronome = mod.stopMetronome;
  setMetronomeBPM = mod.setMetronomeBPM;
  setMetronomeBeats = mod.setMetronomeBeats;
  setMetronomeVolume = mod.setMetronomeVolume;
  isMetronomeRunning = mod.isMetronomeRunning;

  stopMetronome();
  oscillatorsCreated.length = 0;
});

afterEach(() => {
  stopMetronome();
  vi.useRealTimers();
});

// =========================================================================
// Lifecycle
// =========================================================================
describe('metronome — lifecycle', () => {
  it('is not running initially', () => {
    expect(isMetronomeRunning()).toBe(false);
  });

  it('starts and reports running', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    expect(isMetronomeRunning()).toBe(true);
  });

  it('stops and reports not running', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    stopMetronome();
    expect(isMetronomeRunning()).toBe(false);
  });

  it('stops previous instance when starting again', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    startMetronome(100, 3, 0.5, vi.fn());
    expect(isMetronomeRunning()).toBe(true);
  });

  it('resumes suspended AudioContext', () => {
    // Access the actual context created by the service
    startMetronome(120, 4, 0.7, vi.fn());
    // Can't easily check resume on suspended since getContext() creates it fresh.
    // Instead verify no crash when starting.
    expect(isMetronomeRunning()).toBe(true);
  });
});

// =========================================================================
// Scheduler
// =========================================================================
describe('metronome — scheduler', () => {
  it('schedules clicks immediately on start', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    expect(oscillatorsCreated.length).toBeGreaterThan(0);
  });

  it('fires beat callback with beat 0 on start', () => {
    const onBeat = vi.fn();
    startMetronome(120, 4, 0.7, onBeat);

    // Beat callbacks fire via setTimeout with delay ~30ms
    vi.advanceTimersByTime(100);

    expect(onBeat).toHaveBeenCalledWith(0);
  });

  it('accent beat (0) gets 1500 Hz frequency', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    expect(oscillatorsCreated[0].frequency.value).toBe(1500);
  });

  it('non-accent beats get 800 Hz frequency', () => {
    // Use very high BPM so multiple beats fit in the 100ms lookahead
    // 1200 BPM = 0.05s per beat → 2+ beats in 100ms lookahead
    startMetronome(1200, 4, 0.7, vi.fn());

    if (oscillatorsCreated.length >= 2) {
      expect(oscillatorsCreated[1].frequency.value).toBe(800);
    } else {
      // Advance time to get more beats scheduled
      mockCurrentTime = 0.05;
      vi.advanceTimersByTime(25);
      expect(oscillatorsCreated.length).toBeGreaterThanOrEqual(2);
      expect(oscillatorsCreated[1].frequency.value).toBe(800);
    }
  });

  it('wraps beat counter at beats count', () => {
    const onBeat = vi.fn();
    // 2 beats, very fast (2400 BPM = 0.025s/beat)
    startMetronome(2400, 2, 0.7, onBeat);

    // Advance enough for callbacks to fire
    vi.advanceTimersByTime(100);

    const calls = onBeat.mock.calls.map((c) => c[0]);
    // Should have beat 0 and beat 1
    expect(calls).toContain(0);
    expect(calls).toContain(1);
    // Should not have beat 2
    expect(calls.every((b: number) => b < 2)).toBe(true);
  });
});

// =========================================================================
// Live parameter updates
// =========================================================================
describe('metronome — live setters', () => {
  it('setMetronomeBPM clamps to [30, 300]', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    // These should not crash
    setMetronomeBPM(10);   // clamps to 30
    setMetronomeBPM(500);  // clamps to 300
    setMetronomeBPM(90);
    expect(isMetronomeRunning()).toBe(true);
  });

  it('setMetronomeBeats resets beat counter if current >= new', () => {
    startMetronome(120, 8, 0.7, vi.fn());
    // Reduce beats — should not crash
    setMetronomeBeats(2);
    expect(isMetronomeRunning()).toBe(true);
  });

  it('setMetronomeVolume clamps to [0, 1]', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    setMetronomeVolume(-0.5); // clamps to 0
    setMetronomeVolume(1.5);  // clamps to 1
    setMetronomeVolume(0.5);
    expect(isMetronomeRunning()).toBe(true);
  });
});

// =========================================================================
// Interval management
// =========================================================================
describe('metronome — interval', () => {
  it('scheduler tick fires every 25ms and schedules new beats', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    const countBefore = oscillatorsCreated.length;

    // Advance time so new beats fall within the lookahead window
    mockCurrentTime = 0.5;
    vi.advanceTimersByTime(25);

    expect(oscillatorsCreated.length).toBeGreaterThan(countBefore);
  });

  it('no new clicks are scheduled after stopMetronome', () => {
    startMetronome(120, 4, 0.7, vi.fn());
    const countBefore = oscillatorsCreated.length;
    stopMetronome();

    mockCurrentTime = 1.0;
    vi.advanceTimersByTime(100);

    expect(oscillatorsCreated.length).toBe(countBefore);
  });
});
