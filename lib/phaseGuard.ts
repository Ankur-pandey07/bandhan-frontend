// lib/phaseGuard.ts

import { ChatPhase, PHASE } from "./phase";

export function assertAIAllowed(phase: ChatPhase) {
  if (phase !== PHASE.ONBOARDING) {
    throw new Error("AI_RESPONSE_BLOCKED_AFTER_PHASE_1");
  }
}
