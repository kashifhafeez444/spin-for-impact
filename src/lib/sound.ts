/**
 * Modular sound layer.
 *
 * Sounds are currently synthesised with the Web Audio API so the prototype has
 * zero asset dependencies. To use branded audio files later, set
 * `SOUND_SOURCES[name] = "/audio/whatever.mp3"` and the player will prefer the
 * file over the synth fallback.
 */
export type SoundName =
  | "ambient"
  | "start"
  | "click"
  | "tick"
  | "stop"
  | "correct"
  | "incorrect"
  | "reward";

export const SOUND_SOURCES: Partial<Record<SoundName, string>> = {
  // e.g. start: "/audio/start.mp3",
};

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = true;
let ambientNodes: { osc: OscillatorNode[]; gain: GainNode } | null = null;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  ac();
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  if (master) master.gain.value = value ? 0.5 : 0;
  if (!value) stopAmbient();
}

export function isSoundEnabled() {
  return enabled;
}

type ToneOptions = {
  freq: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  at?: number;
  sweepTo?: number;
};

function tone({ freq, duration, type = "sine", gain = 0.25, at = 0, sweepTo }: ToneOptions) {
  const context = ac();
  if (!context || !master || !enabled) return;
  const t0 = context.currentTime + at;
  const osc = context.createOscillator();
  const g = context.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, t0 + duration);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(master);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

function playFile(name: SoundName) {
  const src = SOUND_SOURCES[name];
  if (!src || !enabled) return false;
  const audio = new Audio(src);
  audio.volume = 0.6;
  void audio.play().catch(() => undefined);
  return true;
}

export function playSound(name: SoundName) {
  if (!enabled) return;
  if (playFile(name)) return;
  switch (name) {
    case "start":
      tone({ freq: 320, duration: 0.18, type: "triangle", sweepTo: 720, gain: 0.28 });
      tone({ freq: 640, duration: 0.22, type: "sine", at: 0.08, gain: 0.16 });
      break;
    case "click":
      tone({ freq: 520, duration: 0.08, type: "triangle", gain: 0.18 });
      break;
    case "tick":
      tone({ freq: 1400, duration: 0.035, type: "square", gain: 0.07 });
      break;
    case "stop":
      tone({ freq: 180, duration: 0.5, type: "sawtooth", sweepTo: 90, gain: 0.18 });
      tone({ freq: 660, duration: 0.35, type: "sine", at: 0.06, gain: 0.2 });
      break;
    case "correct":
      [523, 659, 784, 1046].forEach((f, i) =>
        tone({ freq: f, duration: 0.24, type: "sine", at: i * 0.075, gain: 0.22 }),
      );
      break;
    case "incorrect":
      tone({ freq: 240, duration: 0.22, type: "sine", sweepTo: 160, gain: 0.16 });
      tone({ freq: 180, duration: 0.24, type: "sine", at: 0.12, gain: 0.12 });
      break;
    case "reward":
      [523, 659, 784, 1046, 1318].forEach((f, i) =>
        tone({ freq: f, duration: 0.5, type: "triangle", at: i * 0.1, gain: 0.2 }),
      );
      break;
    default:
      break;
  }
}

export function startAmbient() {
  const context = ac();
  if (!context || !master || !enabled || ambientNodes) return;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.05, context.currentTime + 2.5);
  gain.connect(master);
  const osc = [110, 164.8, 220].map((f, i) => {
    const o = context.createOscillator();
    o.type = i === 2 ? "triangle" : "sine";
    o.frequency.value = f;
    const detune = context.createGain();
    detune.gain.value = i === 2 ? 0.3 : 1;
    o.connect(detune).connect(gain);
    o.start();
    return o;
  });
  ambientNodes = { osc, gain };
}

export function stopAmbient() {
  if (!ambientNodes || !ctx) return;
  const { osc, gain } = ambientNodes;
  ambientNodes = null;
  try {
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    osc.forEach((o) => o.stop(ctx!.currentTime + 0.7));
  } catch {
    /* noop */
  }
}
