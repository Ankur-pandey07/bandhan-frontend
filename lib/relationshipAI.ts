/* ================= TYPES ================= */

export type Theme =
  | "communication"
  | "trust"
  | "distance"
  | "conflict"
  | "emotion"
  | "unknown";

export type Stage =
  | "greeting"
  | "listening"
  | "reflecting"
  | "guiding";

export type EmotionalIntensity = "low" | "medium" | "high";
export type SilenceLevel = "short" | "long";

export type Memory = {
  lastTheme: Theme | null;
  repeatedThemeCount: number;
  stage: Stage;
  emotionalIntensity: EmotionalIntensity;
  longTermNotes: Theme[];
  silenceCount: number;
};

/* ================= HELPERS ================= */

function isMinimalResponse(text: string) {
  return ["haan", "hmm", "ok", "okay", "yes", "acha"].includes(text);
}

/* ================= SILENCE ================= */

function silenceReply(level: SilenceLevel) {
  if (level === "short") {
    return "Main yahin hoon. Jab ready ho, continue kar sakte ho.";
  }
  return (
    "Kabhi-kabhi chup rehna bhi baat ka hissa hota hai.\n" +
    "Agar shabd nahi aa rahe, hum bas yahin ruk sakte hain."
  );
}

/* ================= FOLLOW-UP ================= */

function followUpQuestion(theme: Theme) {
  switch (theme) {
    case "communication":
      return "Jab aap bolte ho, aap kya expect kar rahe hote ho saamne wale se?";
    case "emotion":
      return "Is feeling me sabse zyada kya heavy lag raha hai?";
    case "distance":
      return "Aapke liye closeness ka matlab kya hota hai?";
    case "trust":
      return "Bharosa tootne ka moment kab start hua, agar yaad ho?";
    default:
      return "Is situation ka kaunsa hissa aapke liye sabse mushkil hai?";
  }
}

/* ================= DETECTION ================= */

function detectTheme(text: string): Theme {
  if (text.includes("fight") || text.includes("ladai")) return "conflict";
  if (text.includes("trust") || text.includes("bharosa")) return "trust";
  if (text.includes("busy") || text.includes("distance") || text.includes("door"))
    return "distance";
  if (text.includes("sad") || text.includes("hurt") || text.includes("alone"))
    return "emotion";
  if (text.includes("talk") || text.includes("baat") || text.includes("samajh"))
    return "communication";
  return "unknown";
}

function detectIntensity(text: string): EmotionalIntensity {
  if (
    text.includes("bahut") ||
    text.includes("zyada") ||
    text.includes("broken") ||
    text.includes("hurt")
  )
    return "high";

  if (text.includes("confused") || text.includes("samajh"))
    return "medium";

  return "low";
}

/* ================= STAGE ================= */

function decideStage(
  memory: Memory,
  repeated: number,
  cleaned: string
): Stage {
  // greeting only once
  if (
    memory.stage === "greeting" &&
    cleaned.length <= 6 &&
    ["hi", "hello", "hey", "hii"].includes(cleaned)
  ) {
    return "greeting";
  }

  // stage locking 🔒
  if (memory.stage === "guiding") return "guiding";

  if (repeated === 0) return "listening";
  if (repeated === 1) return "reflecting";
  return "guiding";
}

/* ================= THERAPIST VOICE ================= */

function listeningReply(intensity: EmotionalIntensity) {
  return intensity === "high"
    ? "Lagta hai ye thoda heavy feel ho raha hai. Aaram se, jab ready ho, batao."
    : "Hmm… main sun raha hoon.";
}

function reflectingReply(theme: Theme) {
  switch (theme) {
    case "communication":
      return "Aap samjha jaana chahte ho, lekin response waisa nahi mil raha.";
    case "emotion":
      return "Relationship me hote hue bhi akela feel karna kaafi painful hota hai.";
    case "distance":
      return "Distance sirf time ka nahi, priority ka bhi feel ho sakta hai.";
    case "trust":
      return "Bharosa jab hilta hai, to uncertainty aa hi jaati hai.";
    default:
      return "Ye baat aapke liye important lag rahi hai.";
  }
}

function guidingReply(theme: Theme) {
  switch (theme) {
    case "communication":
      return (
        "Agar aap comfortable ho,\n" +
        "to ek chhota sa sentence try kar sakte ho:\n\n" +
        "“Mujhe bas thoda clearly samjha jaana hai.”"
      );

    case "emotion":
      return (
        "Comfort aur safety emotional needs hoti hain.\n" +
        "Pehla step ye samajhna ho sakta hai ki aap yahan unsafe kyun feel kar rahe ho."
      );

    case "distance":
      return (
        "Distance kabhi-kabhi time se nahi, priority se feel hota hai.\n" +
        "Aap pooch sakte ho:\n“Hum thoda intentional time nikal sakte hain?”"
      );

    default:
      return (
        "Lagta hai koi need baar-baar unmet reh rahi hai.\n" +
        "Agar chaaho, hum use shabdon me frame kar sakte hain."
      );
  }
}

/* ================= MAIN AI ================= */

export function buildAIReply(
  userText: string,
  memory: Memory
): { reply: string; nextMemory: Memory; typingDelay: number } {

  const cleaned = userText.trim().toLowerCase();

  /* 🧠 minimal response handling */
  if (isMinimalResponse(cleaned)) {
    return {
      reply: followUpQuestion(memory.lastTheme ?? "unknown"),
      nextMemory: { ...memory },
      typingDelay: 600,
    };
  }

  /* 🤫 silence handling */
  if (!cleaned) {
    const level: SilenceLevel =
      memory.silenceCount >= 1 ? "long" : "short";

    return {
      reply: silenceReply(level),
      nextMemory: {
        ...memory,
        silenceCount: memory.silenceCount + 1,
      },
      typingDelay: 1200,
    };
  }

  const theme = detectTheme(cleaned);
  const intensity = detectIntensity(cleaned);

  const repeated =
    memory.lastTheme === theme
      ? memory.repeatedThemeCount + 1
      : 0;

  let stage = decideStage(memory, repeated, cleaned);

  const nextMemory: Memory = {
    lastTheme: theme,
    repeatedThemeCount: repeated,
    stage,
    emotionalIntensity: intensity,
    silenceCount: 0,
    longTermNotes:
      repeated >= 2 && theme !== "unknown"
        ? Array.from(new Set([...memory.longTermNotes, theme]))
        : memory.longTermNotes,
  };

  let reply = "";

  if (stage === "greeting") {
    reply = "Hi 🙂 aap jo bhi share karna chaho, main sun raha hoon.";
  } else if (stage === "listening") {
    reply = listeningReply(intensity);
  } else if (stage === "reflecting") {
    reply =
      reflectingReply(theme) +
      "\n\n" +
      followUpQuestion(theme);
  } else {
    reply = guidingReply(theme);
  }

  /* 🧘 emotion-based typing delay */
  const typingDelay =
    intensity === "high" ? 1800 : intensity === "medium" ? 1200 : 700;

  return { reply, nextMemory, typingDelay };
}
