import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Mock useAudio
// ---------------------------------------------------------------------------
const mockNoteOn = vi.fn().mockResolvedValue(60);
const mockNoteOff = vi.fn();

vi.mock('../useAudio.ts', () => ({
  useAudio: () => ({ noteOn: mockNoteOn, noteOff: mockNoteOff }),
}));

// ---------------------------------------------------------------------------
// Mock MIDI services
// ---------------------------------------------------------------------------
const mockInputs: any[] = [];
const mockInitMidiInput = vi.fn().mockResolvedValue(undefined);
const mockGetInputs = vi.fn(() => mockInputs);

vi.mock('../../services/midiInput.ts', () => ({
  initMidiInput: () => mockInitMidiInput(),
  getInputs: () => mockGetInputs(),
}));

let stateChangeCallback: (() => void) | null = null;
const mockRemoveStateChangeListener = vi.fn();
const mockAddStateChangeListener = vi.fn((cb: () => void) => {
  stateChangeCallback = cb;
  return mockRemoveStateChangeListener;
});

vi.mock('../../services/midiAccess.ts', () => ({
  addStateChangeListener: (cb: () => void) => mockAddStateChangeListener(cb),
}));

// ---------------------------------------------------------------------------
// Mock pianoLayout
// ---------------------------------------------------------------------------
vi.mock('../../core/utils/pianoLayout.ts', () => ({
  generateKeyboardKeys: () => [],
  midiToNote: (midi: number) => ({
    note: { natural: 'C', accidental: '' },
    octave: Math.floor(midi / 12) - 1,
    midiNumber: midi,
    isBlack: false,
  }),
}));

import { useMidi } from '../useMidi';
import { useAppStore } from '../../state/store';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockInput(id: string): any {
  return { id, name: `Input ${id}`, onmidimessage: null };
}

function fireMidiMessage(input: any, data: number[]) {
  const handler = input.onmidimessage;
  if (handler) handler({ data: new Uint8Array(data) });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockInputs.length = 0;
  stateChangeCallback = null;
  useAppStore.setState({
    instrument: 'piano',
    midiInputEnabled: false,
    midiInputDeviceId: null,
  });
});

afterEach(() => {
  cleanup();
});

// =========================================================================
// Disabled
// =========================================================================
describe('useMidi — disabled', () => {
  it('does not init MIDI input when disabled', async () => {
    renderHook(() => useMidi());
    // Allow any pending promises to resolve
    await vi.waitFor(() => {
      expect(mockInitMidiInput).not.toHaveBeenCalled();
    });
  });
});

// =========================================================================
// Enabled
// =========================================================================
describe('useMidi — enabled', () => {
  beforeEach(() => {
    useAppStore.setState({ midiInputEnabled: true });
    mockInputs.push(makeMockInput('in-1'), makeMockInput('in-2'));
  });

  it('initializes MIDI input on mount', async () => {
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInitMidiInput).toHaveBeenCalledOnce();
    });
  });

  it('attaches listener to all inputs when no device selected', async () => {
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInputs[0].onmidimessage).toBeTruthy();
      expect(mockInputs[1].onmidimessage).toBeTruthy();
    });
  });

  it('attaches listener only to selected device', async () => {
    useAppStore.setState({ midiInputDeviceId: 'in-1' });
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInputs[0].onmidimessage).toBeTruthy();
      expect(mockInputs[1].onmidimessage).toBeNull();
    });
  });

  it('registers state-change listener for hot-plug', async () => {
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockAddStateChangeListener).toHaveBeenCalledOnce();
    });
  });

  // -----------------------------------------------------------------------
  // Note-on / note-off
  // -----------------------------------------------------------------------
  it('handles note-on (0x90) with velocity > 0', async () => {
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInputs[0].onmidimessage).toBeTruthy();
    });

    fireMidiMessage(mockInputs[0], [0x90, 60, 100]);

    await vi.waitFor(() => {
      expect(mockNoteOn).toHaveBeenCalled();
    });
  });

  it('handles note-off (0x80)', async () => {
    mockNoteOn.mockResolvedValue(60);
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInputs[0].onmidimessage).toBeTruthy();
    });

    // Note-on first to populate activeMidiMap
    fireMidiMessage(mockInputs[0], [0x90, 60, 100]);
    await vi.waitFor(() => {
      expect(mockNoteOn).toHaveBeenCalled();
    });

    // Then note-off
    fireMidiMessage(mockInputs[0], [0x80, 60, 0]);
    expect(mockNoteOff).toHaveBeenCalledWith(60);
  });

  it('handles note-off via 0x90 with velocity 0', async () => {
    mockNoteOn.mockResolvedValue(60);
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInputs[0].onmidimessage).toBeTruthy();
    });

    fireMidiMessage(mockInputs[0], [0x90, 60, 100]);
    await vi.waitFor(() => {
      expect(mockNoteOn).toHaveBeenCalled();
    });

    fireMidiMessage(mockInputs[0], [0x90, 60, 0]);
    expect(mockNoteOff).toHaveBeenCalledWith(60);
  });

  it('ignores messages with fewer than 3 bytes', async () => {
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInputs[0].onmidimessage).toBeTruthy();
    });

    fireMidiMessage(mockInputs[0], [0x90, 60]);
    expect(mockNoteOn).not.toHaveBeenCalled();
  });

  it('ignores note-off for notes not in activeMidiMap', async () => {
    renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInputs[0].onmidimessage).toBeTruthy();
    });

    // Note-off without prior note-on — should not call noteOff
    fireMidiMessage(mockInputs[0], [0x80, 60, 0]);
    expect(mockNoteOff).not.toHaveBeenCalled();
  });

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------
  it('removes listeners and state-change callback on unmount', async () => {
    const { unmount } = renderHook(() => useMidi());
    await vi.waitFor(() => {
      expect(mockInputs[0].onmidimessage).toBeTruthy();
    });

    unmount();

    expect(mockInputs[0].onmidimessage).toBeNull();
    expect(mockInputs[1].onmidimessage).toBeNull();
    expect(mockRemoveStateChangeListener).toHaveBeenCalled();
  });
});
