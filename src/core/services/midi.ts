/**
 * MIDI Service — Web MIDI API integration
 *
 * Provides zero-dependency MIDI input support using the browser's built-in
 * Web MIDI API. Handles device discovery, connection management, and real-time
 * note event parsing (Note On / Note Off messages).
 *
 * Architecture: module-level state (MIDIAccess, connected input, listeners)
 * mirrors the audio service pattern. Consumers register callbacks via
 * {@link onNoteEvent} and {@link onDeviceChange}; the service handles
 * MIDI message parsing, channel stripping, and automatic device reconnection.
 *
 * Only MIDI input is supported (keyboard → app). Control Change, pitch bend,
 * and aftertouch messages are currently ignored.
 */

import { PitchedNote } from '../types/music';
import { midiToNote } from '../utils/pianoLayout';

// ============================================================================
// Types
// ============================================================================

export interface MidiNoteEvent {
  type: 'noteOn' | 'noteOff';
  midiNumber: number;
  velocity: number; // 0-127
  note: PitchedNote;
}

export interface MidiDeviceInfo {
  id: string;
  name: string;
  manufacturer: string;
}

type NoteEventCallback = (event: MidiNoteEvent) => void;
type DeviceChangeCallback = (devices: MidiDeviceInfo[]) => void;

// ============================================================================
// Module-level state (matches audio.ts pattern)
// ============================================================================

let midiAccess: MIDIAccess | null = null;
let connectedInput: MIDIInput | null = null;
let connectedDeviceId: string | null = null;
let activeChannel: number | null = null; // 0-15, null = all channels

const noteEventListeners = new Set<NoteEventCallback>();
const deviceChangeListeners = new Set<DeviceChangeCallback>();

// ============================================================================
// Support detection
// ============================================================================

export function isMidiSupported(): boolean {
  return typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator;
}

// ============================================================================
// Access and device management
// ============================================================================

export async function requestMidiAccess(): Promise<boolean> {
  if (!isMidiSupported()) return false;

  try {
    midiAccess = await navigator.requestMIDIAccess();
    midiAccess.onstatechange = handleStateChange;
    return true;
  } catch {
    midiAccess = null;
    return false;
  }
}

export function getInputDevices(): MidiDeviceInfo[] {
  if (!midiAccess) return [];

  const devices: MidiDeviceInfo[] = [];
  midiAccess.inputs.forEach((input) => {
    devices.push({
      id: input.id,
      name: input.name || 'Unknown Device',
      manufacturer: input.manufacturer || 'Unknown',
    });
  });
  return devices;
}

export function getConnectedDeviceId(): string | null {
  return connectedDeviceId;
}

export function connectToDevice(deviceId: string): boolean {
  if (!midiAccess) return false;

  // Disconnect current device if any
  disconnectDevice();

  const input = midiAccess.inputs.get(deviceId);
  if (!input) return false;

  input.onmidimessage = handleMidiMessage;
  connectedInput = input;
  connectedDeviceId = deviceId;
  return true;
}

export function disconnectDevice(): void {
  if (connectedInput) {
    connectedInput.onmidimessage = null;
    connectedInput = null;
    connectedDeviceId = null;
  }
}

// ============================================================================
// Event listeners
// ============================================================================

export function onNoteEvent(callback: NoteEventCallback): () => void {
  noteEventListeners.add(callback);
  return () => {
    noteEventListeners.delete(callback);
  };
}

export function onDeviceChange(callback: DeviceChangeCallback): () => void {
  deviceChangeListeners.add(callback);
  return () => {
    deviceChangeListeners.delete(callback);
  };
}

// ============================================================================
// Channel filter
// ============================================================================

/** Set the MIDI channel filter. 0-15 for a specific channel, null for all. */
export function setChannelFilter(channel: number | null): void {
  activeChannel = channel;
}

export function getChannelFilter(): number | null {
  return activeChannel;
}

// ============================================================================
// Cleanup
// ============================================================================

export function cleanup(): void {
  disconnectDevice();
  noteEventListeners.clear();
  deviceChangeListeners.clear();

  if (midiAccess) {
    midiAccess.onstatechange = null;
    midiAccess = null;
  }
}

// ============================================================================
// Internal handlers
// ============================================================================

function handleMidiMessage(event: MIDIMessageEvent): void {
  const data = event.data;
  if (!data || data.length < 3) return;

  // Filter by channel if one is set
  const messageChannel = data[0] & 0x0f;
  if (activeChannel !== null && messageChannel !== activeChannel) return;

  const status = data[0] & 0xf0; // Strip channel
  const midiNumber = data[1];
  const velocity = data[2];

  let noteEvent: MidiNoteEvent | null = null;

  if (status === 0x90 && velocity > 0) {
    // Note On
    noteEvent = {
      type: 'noteOn',
      midiNumber,
      velocity,
      note: midiToNote(midiNumber),
    };
  } else if (status === 0x80 || (status === 0x90 && velocity === 0)) {
    // Note Off (0x80 or noteOn with velocity 0)
    noteEvent = {
      type: 'noteOff',
      midiNumber,
      velocity: 0,
      note: midiToNote(midiNumber),
    };
  }
  // Ignore CC, pitch bend, aftertouch, etc.

  if (noteEvent) {
    noteEventListeners.forEach((cb) => cb(noteEvent));
  }
}

function handleStateChange(): void {
  const devices = getInputDevices();
  deviceChangeListeners.forEach((cb) => cb(devices));

  // If connected device was disconnected, clear state
  if (connectedDeviceId && connectedInput) {
    const stillExists = midiAccess?.inputs.get(connectedDeviceId);
    if (!stillExists || stillExists.state === 'disconnected') {
      connectedInput.onmidimessage = null;
      connectedInput = null;
      connectedDeviceId = null;
    }
  }
}
