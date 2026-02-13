/**
 * Karplus-Strong Plucked String Synthesis
 *
 * Physical modeling synthesis: a noise burst excites a delay line whose length
 * determines pitch. A lossy averaging filter on each loop cycle simulates
 * energy dissipation in a vibrating string. Each pluck is acoustically unique
 * (random excitation) and decays naturally.
 *
 * Implementation: pre-computes a ~5 second Float32Array waveform per note,
 * played via AudioBufferSourceNode. No AudioWorklet, no dependencies.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface KSParams {
  /** 0–1: controls initial spectral brightness (low-pass cutoff on noise burst) */
  brightness: number;
  /** 0–1: per-sample energy retention (higher = longer sustain) */
  damping: number;
  /** 0–1: pick position along the string (0.5 = middle, 0 = bridge) */
  pickPosition: number;
  /** Duration of the pre-computed buffer in seconds */
  duration: number;
}

interface Voice {
  source: AudioBufferSourceNode;
  gain: GainNode;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_PARAMS: KSParams = {
  brightness: 0.8,
  damping: 0.996,
  pickPosition: 0.5,
  duration: 5,
};

const MAX_POLYPHONY = 16;
const FADE_OUT_MS = 50;

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
let compressor: DynamicsCompressorNode | null = null;
let dryGain: GainNode | null = null;
let wetGain: GainNode | null = null;
let reverb: ConvolverNode | null = null;

const voices = new Map<number, Voice>();
let voiceCounter = 0;
const voiceOrder = new Map<number, number>(); // midiNumber → creation order

// ---------------------------------------------------------------------------
// AudioContext + signal chain (lazy)
// ---------------------------------------------------------------------------

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
    setupChain(audioContext);
  }
  return audioContext;
}

function setupChain(ctx: AudioContext): void {
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.7;

  compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -12;
  compressor.knee.value = 6;
  compressor.ratio.value = 4;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.1;

  // Dry path
  dryGain = ctx.createGain();
  dryGain.gain.value = 0.85;

  // Wet path (reverb)
  wetGain = ctx.createGain();
  wetGain.gain.value = 0.15;

  reverb = ctx.createConvolver();
  reverb.buffer = createReverbImpulse(ctx, 1.2, 2);

  // Routing: masterGain → dry → compressor → destination
  //          masterGain → wet → reverb → compressor → destination
  masterGain.connect(dryGain);
  dryGain.connect(compressor);

  masterGain.connect(wetGain);
  wetGain.connect(reverb);
  reverb.connect(compressor);

  compressor.connect(ctx.destination);
}

/** Synthetic reverb impulse response matching core audio.ts */
function createReverbImpulse(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const impulse = ctx.createBuffer(2, length, sampleRate);

  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      const t = i / length;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay);
    }
  }
  return impulse;
}

// ---------------------------------------------------------------------------
// Karplus-Strong buffer generation
// ---------------------------------------------------------------------------

function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Generate a Karplus-Strong plucked string waveform.
 *
 * Algorithm:
 * 1. Create a circular delay line whose length = sampleRate / frequency
 * 2. Fill it with brightness-filtered noise (the "pluck" excitation)
 * 3. Apply a pick-position comb filter to remove the harmonic at the pick point
 * 4. Loop: read current sample, write back damping * 0.5 * (current + next)
 */
export function generateKSBuffer(
  sampleRate: number,
  frequency: number,
  params: KSParams = DEFAULT_PARAMS,
): Float32Array {
  const totalSamples = Math.floor(sampleRate * params.duration);
  const output = new Float32Array(totalSamples);

  // Delay line length determines the fundamental frequency
  const delayLength = Math.round(sampleRate / frequency);
  if (delayLength < 2) return output;

  const delayLine = new Float32Array(delayLength);

  // 1. Fill delay line with brightness-filtered noise
  // Simple one-pole low-pass: y[n] = brightness * x[n] + (1 - brightness) * y[n-1]
  let prev = 0;
  for (let i = 0; i < delayLength; i++) {
    const noise = Math.random() * 2 - 1;
    const filtered = params.brightness * noise + (1 - params.brightness) * prev;
    prev = filtered;
    delayLine[i] = filtered;
  }

  // 2. Pick-position comb filter: subtract a delayed copy to null the harmonic
  //    at the pick point. Delay = pickPosition * delayLength samples.
  if (params.pickPosition > 0 && params.pickPosition < 1) {
    const pickDelay = Math.max(1, Math.round(params.pickPosition * delayLength));
    const copy = new Float32Array(delayLine);
    for (let i = 0; i < delayLength; i++) {
      const delayed = i >= pickDelay ? copy[i - pickDelay] : copy[delayLength + i - pickDelay];
      delayLine[i] = copy[i] - delayed;
    }
    // Normalize after comb filter to prevent amplitude drop
    let peak = 0;
    for (let i = 0; i < delayLength; i++) {
      const abs = Math.abs(delayLine[i]);
      if (abs > peak) peak = abs;
    }
    if (peak > 0) {
      const scale = 1 / peak;
      for (let i = 0; i < delayLength; i++) {
        delayLine[i] *= scale;
      }
    }
  }

  // 3. KS loop: read from delay line, write averaged + damped sample back
  let readIndex = 0;
  for (let i = 0; i < totalSamples; i++) {
    const current = delayLine[readIndex];
    const nextIndex = (readIndex + 1) % delayLength;
    const next = delayLine[nextIndex];

    output[i] = current;

    // Lossy averaging filter (the heart of KS)
    delayLine[readIndex] = params.damping * 0.5 * (current + next);

    readIndex = nextIndex;
  }

  return output;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function startNote(midiNumber: number, params: Partial<KSParams> = {}): void {
  const ctx = getContext();

  // Already playing — skip
  if (voices.has(midiNumber)) return;

  // Voice stealing: evict oldest if at polyphony limit
  if (voices.size >= MAX_POLYPHONY) {
    let oldestMidi = -1;
    let oldestOrder = Infinity;
    for (const [midi, order] of voiceOrder) {
      if (order < oldestOrder) {
        oldestOrder = order;
        oldestMidi = midi;
      }
    }
    if (oldestMidi !== -1) {
      stopNote(oldestMidi);
    }
  }

  const frequency = midiToFrequency(midiNumber);
  const mergedParams = { ...DEFAULT_PARAMS, ...params };
  const samples = generateKSBuffer(ctx.sampleRate, frequency, mergedParams);

  const buffer = ctx.createBuffer(1, samples.length, ctx.sampleRate);
  buffer.getChannelData(0).set(samples);

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gain = ctx.createGain();
  gain.gain.value = 1;

  source.connect(gain);
  gain.connect(masterGain!);

  source.start();
  voices.set(midiNumber, { source, gain });
  voiceOrder.set(midiNumber, voiceCounter++);

  // Auto-cleanup when buffer finishes playing
  source.onended = () => {
    voices.delete(midiNumber);
    voiceOrder.delete(midiNumber);
  };
}

export function stopNote(midiNumber: number): void {
  const voice = voices.get(midiNumber);
  if (!voice) return;

  const ctx = getContext();
  const now = ctx.currentTime;

  // Quick fade-out to avoid click
  voice.gain.gain.cancelScheduledValues(now);
  voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
  voice.gain.gain.linearRampToValueAtTime(0, now + FADE_OUT_MS / 1000);

  voice.source.stop(now + FADE_OUT_MS / 1000 + 0.01);
  voices.delete(midiNumber);
  voiceOrder.delete(midiNumber);
}

export function stopAll(): void {
  for (const midi of [...voices.keys()]) {
    stopNote(midi);
  }
}

export function setVolume(vol: number): void {
  if (masterGain) {
    masterGain.gain.value = vol;
  }
}

export async function resumeContext(): Promise<void> {
  const ctx = getContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
}

// ---------------------------------------------------------------------------
// Test helper
// ---------------------------------------------------------------------------

export function _resetForTesting(): void {
  voices.clear();
  voiceOrder.clear();
  voiceCounter = 0;
  audioContext = null;
  masterGain = null;
  compressor = null;
  dryGain = null;
  wetGain = null;
  reverb = null;
}
