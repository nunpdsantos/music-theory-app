import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppStore } from '../../state/store';

vi.mock('../../services/metronome.ts', () => ({
  startMetronome: vi.fn(),
  stopMetronome: vi.fn(),
  setMetronomeBPM: vi.fn(),
  setMetronomeBeats: vi.fn(),
  setMetronomeVolume: vi.fn(),
}));

import { useMetronome } from '../useMetronome';
import {
  startMetronome,
  stopMetronome,
  setMetronomeBPM as engineSetBPM,
  setMetronomeBeats as engineSetBeats,
  setMetronomeVolume as engineSetVolume,
} from '../../services/metronome';

beforeEach(() => {
  vi.clearAllMocks();
  useAppStore.setState({
    metronomeBPM: 120,
    metronomeBeats: 4,
    metronomeVolume: 0.7,
  });
});

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------
describe('useMetronome — initial state', () => {
  it('active is false', () => {
    const { result } = renderHook(() => useMetronome());
    expect(result.current.active).toBe(false);
  });

  it('currentBeat is -1', () => {
    const { result } = renderHook(() => useMetronome());
    expect(result.current.currentBeat).toBe(-1);
  });

  it('bpm/beats/volume reflect store defaults', () => {
    const { result } = renderHook(() => useMetronome());
    expect(result.current.bpm).toBe(120);
    expect(result.current.beats).toBe(4);
    expect(result.current.metronomeVolume).toBe(0.7);
  });
});

// ---------------------------------------------------------------------------
// toggle()
// ---------------------------------------------------------------------------
describe('useMetronome — toggle', () => {
  it('starts metronome when inactive', () => {
    const { result } = renderHook(() => useMetronome());

    act(() => { result.current.toggle(); });

    expect(startMetronome).toHaveBeenCalledOnce();
    expect(startMetronome).toHaveBeenCalledWith(120, 4, 0.7, expect.any(Function));
    expect(result.current.active).toBe(true);
  });

  it('stops metronome when active', () => {
    const { result } = renderHook(() => useMetronome());

    act(() => { result.current.toggle(); }); // start
    act(() => { result.current.toggle(); }); // stop

    expect(stopMetronome).toHaveBeenCalled();
    expect(result.current.active).toBe(false);
    expect(result.current.currentBeat).toBe(-1);
  });

  it('beat callback updates currentBeat', () => {
    const { result } = renderHook(() => useMetronome());

    act(() => { result.current.toggle(); });

    // Grab the callback passed to startMetronome and invoke it
    const beatCallback = vi.mocked(startMetronome).mock.calls[0][3];
    act(() => { beatCallback(2); });

    expect(result.current.currentBeat).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Engine sync effects
// ---------------------------------------------------------------------------
describe('useMetronome — engine sync', () => {
  it('syncs BPM to engine on mount and when store changes', () => {
    renderHook(() => useMetronome());
    // Initial mount triggers the effect with default BPM
    expect(engineSetBPM).toHaveBeenCalledWith(120);

    act(() => { useAppStore.getState().setMetronomeBPM(90); });
    expect(engineSetBPM).toHaveBeenCalledWith(90);
  });

  it('syncs beats to engine when store changes', () => {
    renderHook(() => useMetronome());
    expect(engineSetBeats).toHaveBeenCalledWith(4);

    act(() => { useAppStore.getState().setMetronomeBeats(3); });
    expect(engineSetBeats).toHaveBeenCalledWith(3);
  });

  it('syncs volume to engine when store changes', () => {
    renderHook(() => useMetronome());
    expect(engineSetVolume).toHaveBeenCalledWith(0.7);

    act(() => { useAppStore.getState().setMetronomeVolume(0.5); });
    expect(engineSetVolume).toHaveBeenCalledWith(0.5);
  });
});

// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------
describe('useMetronome — cleanup', () => {
  it('calls stopMetronome on unmount', () => {
    const { unmount } = renderHook(() => useMetronome());
    unmount();
    expect(stopMetronome).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Store setters exposed
// ---------------------------------------------------------------------------
describe('useMetronome — store setters', () => {
  it('setBPM updates store value', () => {
    const { result } = renderHook(() => useMetronome());
    act(() => { result.current.setBPM(140); });
    expect(result.current.bpm).toBe(140);
  });

  it('setBeats updates store value', () => {
    const { result } = renderHook(() => useMetronome());
    act(() => { result.current.setBeats(6); });
    expect(result.current.beats).toBe(6);
  });

  it('setMetronomeVolume updates store value', () => {
    const { result } = renderHook(() => useMetronome());
    act(() => { result.current.setMetronomeVolume(0.3); });
    expect(result.current.metronomeVolume).toBe(0.3);
  });
});
