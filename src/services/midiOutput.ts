/**
 * MIDI Output service — sends note messages to external MIDI devices.
 */

import { getMidiAccess, getCachedMidiAccess, addStateChangeListener } from './midiAccess.ts';

let selectedOutputId: string | null = null;

export async function initMidiOutput(): Promise<MIDIOutput[]> {
  const access = await getMidiAccess();
  if (!access) return [];
  return getOutputs();
}

export function getOutputs(): MIDIOutput[] {
  const access = getCachedMidiAccess();
  if (!access) return [];
  return [...access.outputs.values()];
}

export function selectOutput(deviceId: string | null) {
  selectedOutputId = deviceId;
}

function getSelectedOutput(): MIDIOutput | null {
  const access = getCachedMidiAccess();
  if (!access || !selectedOutputId) return null;
  return access.outputs.get(selectedOutputId) ?? null;
}

export function sendNoteOn(midiNumber: number, velocity = 100, channel = 0) {
  const output = getSelectedOutput();
  if (!output) return;
  output.send([0x90 | channel, midiNumber, velocity]);
}

export function sendNoteOff(midiNumber: number, channel = 0) {
  const output = getSelectedOutput();
  if (!output) return;
  output.send([0x80 | channel, midiNumber, 0]);
}

export function sendAllNotesOff(channel = 0) {
  const output = getSelectedOutput();
  if (!output) return;
  // CC 123 = All Notes Off
  output.send([0xb0 | channel, 123, 0]);
}

export function onStateChange(callback: () => void): () => void {
  return addStateChangeListener(callback);
}
