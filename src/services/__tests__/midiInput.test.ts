import { describe, it, expect, beforeEach, vi } from 'vitest';
import { _resetForTesting } from '../midiAccess';

// Must reset before importing midiInput since it imports midiAccess
beforeEach(() => {
  _resetForTesting();
  vi.restoreAllMocks();
});

// Dynamic import so mocks apply
async function getModule() {
  const mod = await import('../midiInput');
  return mod;
}

function makeMockInput(id: string, name: string): MIDIInput {
  return {
    id,
    name,
    manufacturer: '',
    version: '',
    type: 'input',
    state: 'connected',
    connection: 'open',
    onmidimessage: null,
    onstatechange: null,
    open: vi.fn().mockResolvedValue(undefined as unknown),
    close: vi.fn().mockResolvedValue(undefined as unknown),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  } as unknown as MIDIInput;
}

function makeMockMIDIAccess(inputs: MIDIInput[]): MIDIAccess {
  const inputMap = new Map(inputs.map((i) => [i.id, i])) as MIDIInputMap;
  return {
    inputs: inputMap,
    outputs: new Map() as MIDIOutputMap,
    onstatechange: null,
    sysexEnabled: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  };
}

describe('initMidiInput', () => {
  it('returns inputs from MIDIAccess', async () => {
    const input1 = makeMockInput('in1', 'Keyboard 1');
    const input2 = makeMockInput('in2', 'Keyboard 2');
    const mock = makeMockMIDIAccess([input1, input2]);
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockResolvedValue(mock) });

    const { initMidiInput } = await getModule();
    const result = await initMidiInput();
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('in1');
    expect(result[1].id).toBe('in2');
  });

  it('returns empty array when MIDI unavailable', async () => {
    vi.stubGlobal('navigator', {});

    const { initMidiInput } = await getModule();
    const result = await initMidiInput();
    expect(result).toEqual([]);
  });

  it('returns empty array when access denied', async () => {
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockRejectedValue(new Error('denied')) });

    const { initMidiInput } = await getModule();
    const result = await initMidiInput();
    expect(result).toEqual([]);
  });
});

describe('getInputs', () => {
  it('returns empty before init', async () => {
    const { getInputs } = await getModule();
    expect(getInputs()).toEqual([]);
  });

  it('returns inputs after init', async () => {
    const input = makeMockInput('in1', 'Controller');
    const mock = makeMockMIDIAccess([input]);
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockResolvedValue(mock) });

    const { initMidiInput, getInputs } = await getModule();
    await initMidiInput();
    expect(getInputs()).toHaveLength(1);
    expect(getInputs()[0].name).toBe('Controller');
  });
});
