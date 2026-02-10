/**
 * Note event recorder — captures note-on/off events with timestamps
 * for playback through the existing audio system.
 */

export interface NoteEvent {
  type: 'on' | 'off';
  midi: number;
  time: number; // ms from recording start
  velocity?: number;
}

export interface Recording {
  events: NoteEvent[];
  duration: number; // ms
  createdAt: number;
}

let recording = false;
let events: NoteEvent[] = [];
let startTime = 0;

export function startRecording() {
  recording = true;
  events = [];
  startTime = performance.now();
}

export function stopRecording(): Recording {
  recording = false;
  const duration = performance.now() - startTime;
  const result: Recording = {
    events: [...events],
    duration,
    createdAt: Date.now(),
  };
  events = [];
  return result;
}

export function isRecording(): boolean {
  return recording;
}

export function recordNoteOn(midi: number, velocity = 100) {
  if (!recording) return;
  events.push({ type: 'on', midi, time: performance.now() - startTime, velocity });
}

export function recordNoteOff(midi: number) {
  if (!recording) return;
  events.push({ type: 'off', midi, time: performance.now() - startTime });
}
