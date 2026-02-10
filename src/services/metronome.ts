/**
 * Metronome Engine — Web Audio API scheduler
 *
 * Uses the "look-ahead" scheduling pattern for sample-accurate timing:
 * A setInterval fires every 25ms, scheduling any clicks that fall within
 * the next 100ms using AudioContext time. Visual callbacks fire via
 * setTimeout with 20ms lookahead compensation.
 *
 * Owns its own AudioContext (separate from the synth engine in core/services/audio)
 * to avoid modifying the read-only core/ directory.
 */

type BeatCallback = (beat: number) => void;

let audioCtx: AudioContext | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;
let nextBeatTime = 0;
let currentBeat = 0;
let running = false;

// Mutable params — updated without restart via setters
let _bpm = 120;
let _beats = 4;
let _volume = 0.7;
let _onBeat: BeatCallback = () => {};

// Scheduling constants
const SCHEDULE_AHEAD = 0.1; // seconds to look ahead
const SCHEDULER_INTERVAL = 25; // ms between scheduler ticks

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function scheduleClick(time: number, accent: boolean): void {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Accent (beat 1) = higher pitch + full volume
  osc.frequency.value = accent ? 1500 : 800;
  osc.type = 'sine';

  const vol = _volume * (accent ? 1.0 : 0.6);
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

  osc.start(time);
  osc.stop(time + 0.06);

  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

function scheduler(): void {
  const ctx = getContext();
  const secondsPerBeat = 60 / _bpm;

  while (nextBeatTime < ctx.currentTime + SCHEDULE_AHEAD) {
    const accent = currentBeat === 0;
    scheduleClick(nextBeatTime, accent);

    // Fire visual callback slightly early for perceived sync
    const beatSnapshot = currentBeat;
    const delay = Math.max(0, (nextBeatTime - ctx.currentTime) * 1000 - 20);
    setTimeout(() => _onBeat(beatSnapshot), delay);

    nextBeatTime += secondsPerBeat;
    currentBeat = (currentBeat + 1) % _beats;
  }
}

export function startMetronome(
  bpm: number,
  beats: number,
  volume: number,
  onBeat: BeatCallback,
): void {
  if (running) stopMetronome();

  _bpm = bpm;
  _beats = beats;
  _volume = volume;
  _onBeat = onBeat;

  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();

  running = true;
  currentBeat = 0;
  nextBeatTime = ctx.currentTime + 0.05; // Small buffer before first click

  intervalId = setInterval(scheduler, SCHEDULER_INTERVAL);
  scheduler(); // Run immediately to schedule first beats
}

export function stopMetronome(): void {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  running = false;
  currentBeat = 0;
}

// Live-update params without restart — takes effect on next beat
export function setMetronomeBPM(bpm: number): void {
  _bpm = Math.max(30, Math.min(300, bpm));
}

export function setMetronomeBeats(beats: number): void {
  _beats = beats;
  if (currentBeat >= beats) currentBeat = 0;
}

export function setMetronomeVolume(volume: number): void {
  _volume = Math.max(0, Math.min(1, volume));
}

export function isMetronomeRunning(): boolean {
  return running;
}
