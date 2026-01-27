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
  silenceCount: number; // 👈 NEW
};

/* ================= DETECTION ================= */
function silenceReply(level: SilenceLevel) {
  if (level === "short") {
    return "Main yahin hoon. Jab ready ho, continue kar sakte ho.";
  }

  return (
    "Kabhi-kabhi chup rehna bhi baat ka hissa hota hai.\n" +
    "Agar shabd nahi aa rahe, hum bas yahin ruk sakte hain."
  );
}

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


function detectTheme(text: string): Theme {
  const t = text.toLowerCase();

  if (t.includes("fight") || t.includes("ladai")) return "conflict";
  if (t.includes("trust") || t.includes("bharosa")) return "trust";
  if (t.includes("busy") || t.includes("distance") || t.includes("door"))
    return "distance";
  if (t.includes("sad") || t.includes("hurt") || t.includes("alone"))
    return "emotion";
  if (t.includes("talk") || t.includes("baat") || t.includes("samajh"))
    return "communication";

  return "unknown";
}

function detectIntensity(text: string): EmotionalIntensity {
  const t = text.toLowerCase();

  if (
    t.includes("bahut") ||
    t.includes("zyada") ||
    t.includes("broken") ||
    t.includes("hurt")
  )
    return "high";

  if (t.includes("confused") || t.includes("samajh"))
    return "medium";

  return "low";
}

/* ================= STAGE LOGIC ================= */

function decideStage(
  memory: Memory,
  repeated: number,
  cleaned: string
): Stage {
  if (
    cleaned.length <= 6 ||
    ["hi", "hello", "hey", "hii"].includes(cleaned)
  ) {
    return "greeting";
  }

  if (repeated === 0) return "listening";
  if (repeated === 1) return "reflecting";
  return "guiding";
}

/* ================= THERAPIST RESPONSES ================= */

function listeningReply(intensity: EmotionalIntensity) {
  return intensity === "high"
    ? "Lagta hai ye thoda heavy feel ho raha hai. Aaram se, jab ready ho, batao."
    : "Hmm… batao, kya chal raha hai?";
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
        "to hum ek chhota sa sentence try kar sakte hain:\n\n" +
        "“Mujhe bas thoda clearly samjha jaana hai.”"
      );

    case "emotion":
      return (
        "Comfort ek emotional need hoti hai.\n" +
        "Shayad pehla step ye samajhna ho ki aap yahan unsafe kyun feel kar rahe ho."
      );

    case "distance":
      return (
        "Aap directly pooch sakte ho — bina blame ke:\n" +
        "“Kya hum thoda intentional time nikal sakte hain?”"
      );

    default:
      return (
        "Lagta hai koi need baar-baar unmet reh rahi hai.\n" +
        "Agar chaaho, hum use words me frame kar sakte hain."
      );
  }
}

/* ================= MAIN AI ================= */

export function buildAIReply(
  userText: string,
  memory: Memory
): { reply: string; nextMemory: Memory } {
  const cleaned = userText.trim().toLowerCase();
  const theme = detectTheme(cleaned);
  const intensity = detectIntensity(cleaned);

  const repeated =
    memory.lastTheme === theme ? memory.repeatedThemeCount + 1 : 0;

  const stage = decideStage(memory, repeated, cleaned);

  let reply = "";

if (stage === "greeting") {
  reply = "Hi 🙂 aap jo bhi share karna chaaho, main sun raha hoon.";
}

else if (stage === "listening") {
  reply = listeningReply(intensity);
}

else if (stage === "reflecting") {
  reply =
    reflectingReply(theme) +
    "\n\n" +
    followUpQuestion(theme); // 👈 SMART FOLLOW-UP
}

else {
  reply = guidingReply(theme);
}

const silenceCount =
  cleaned.length === 0
    ? memory.silenceCount + 1
    : 0;


 const nextMemory: Memory = {
  lastTheme: theme,
  repeatedThemeCount: repeated,
  stage,
  emotionalIntensity: intensity,
  longTermNotes:
    repeated >= 2 && theme !== "unknown"
      ? Array.from(new Set([...memory.longTermNotes, theme]))
      : memory.longTermNotes,
  silenceCount,
};


  return { reply, nextMemory };
}
