import { VOICE_TOTAL_SECONDS, VOICE_STORAGE_KEY } from "./constants";

export type VoiceSessionData = {
  startedAt: number;     // when active counting started
  pausedAt?: number;    // when paused
  totalPausedMs?: number; // accumulated paused time
};

function read(): VoiceSessionData | null {
  const raw = localStorage.getItem(VOICE_STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

function write(data: VoiceSessionData) {
  localStorage.setItem(VOICE_STORAGE_KEY, JSON.stringify(data));
}

export function startVoiceSession() {
  const data: VoiceSessionData = {
    startedAt: Date.now(),
    totalPausedMs: 0,
  };
  write(data);
}

export function pauseVoiceSession() {
  const data = read();
  if (!data || data.pausedAt) return;
  write({ ...data, pausedAt: Date.now() });
}

export function resumeVoiceSession() {
  const data = read();
  if (!data || !data.pausedAt) return;

  const pausedDuration = Date.now() - data.pausedAt;
  write({
    ...data,
    pausedAt: undefined,
    totalPausedMs: (data.totalPausedMs || 0) + pausedDuration,
  });
}

export function clearVoiceSession() {
  localStorage.removeItem(VOICE_STORAGE_KEY);
}

export function getRemainingSeconds(): number {
  const data = read();
  if (!data) return 0;

  const now = Date.now();
  const pausedMs = data.totalPausedMs || 0;

  const effectiveNow = data.pausedAt ? data.pausedAt : now;
  const elapsedMs = effectiveNow - data.startedAt - pausedMs;

  const remaining =
    VOICE_TOTAL_SECONDS - Math.floor(elapsedMs / 1000);

  return Math.max(remaining, 0);
}

export function isPaused(): boolean {
  const data = read();
  return Boolean(data?.pausedAt);
}
