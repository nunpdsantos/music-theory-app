/**
 * MIDI Input service — enumerates input devices via shared MIDIAccess singleton.
 * Actual message handling stays in useMidi hook.
 */

import { getMidiAccess, getCachedMidiAccess } from './midiAccess.ts';
export { addStateChangeListener } from './midiAccess.ts';

export async function initMidiInput(): Promise<MIDIInput[]> {
  const access = await getMidiAccess();
  if (!access) return [];
  return getInputs();
}

export function getInputs(): MIDIInput[] {
  const access = getCachedMidiAccess();
  if (!access) return [];
  return [...access.inputs.values()];
}
