type Session = {
  sessionId: string;
  assignedTo: "Ekanshia" | "Advik" | null;
};

const sessions = new Map<string, Session>();

export function createSession(sessionId: string) {
  sessions.set(sessionId, {
    sessionId,
    assignedTo: null,
  });
}

export function assignSession(
  sessionId: string,
  guide: "Ekanshia" | "Advik"
) {
  const session = sessions.get(sessionId);
  if (!session) return false;

  session.assignedTo = guide;
  sessions.set(sessionId, session);
  return true;
}

export function getSession(sessionId: string) {
  return sessions.get(sessionId);
}
