// lib/phase.ts

export type ChatPhase = 1 | 2;

export const PHASE = {
  ONBOARDING: 1 as ChatPhase, // AI allowed
  HUMAN_TAKEOVER: 2 as ChatPhase, // AI strictly disabled
};
