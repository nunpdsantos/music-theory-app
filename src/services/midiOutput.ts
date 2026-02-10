/**
 * MIDI Output service — sends note messages to external MIDI devices.
 */

let midiAccess: MIDIAccess | null = null;
let selectedOutputId: string | null = null;

export async function initMidiOutput(): Promise<MIDIOutput[]> {
  if (!navigator.requestMIDIAccess) return [];
  try {
    midiAccess = await navigator.requestMIDIAccess();
    return getOutputs();
  } catch (e) {
    console.warn('[MIDI Output] Access denied:', e);
    return [];
  }
}

export function getOutputs(): MIDIOutput[] {
  if (!midiAccess) return [];
  return [...midiAccess.outputs.values()];
}

export function selectOutput(deviceId: string | null) {
  selectedOutputId = deviceId;
}

function getSelectedOutput(): MIDIOutput | null {
  if (!midiAccess || !selectedOutputId) return null;
  return midiAccess.outputs.get(selectedOutputId) ?? null;
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
  if (!midiAccess) return () => {};
  midiAccess.onstatechange = callback;
  return () => { if (midiAccess) midiAccess.onstatechange = null; };
}
