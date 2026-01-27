/* =========================================================
   SoulVerse — Conversation Templates (Step 3.1)
   Purpose: Human-like, calm, non-judgmental responses
   ========================================================= */

/* ---------------- LANGUAGE DETECTION ---------------- */

export type Language = "hi" | "en" | "hinglish";

export function detectLanguage(text: string): Language {
  const hindiRegex = /[अ-ह]/;

  if (hindiRegex.test(text)) return "hi";

  const englishHints = [
    "the",
    "is",
    "are",
    "feel",
    "relationship",
    "confused",
    "problem",
    "distance",
  ];

  const hitCount = englishHints.filter((w) =>
    text.toLowerCase().includes(w)
  ).length;

  if (hitCount >= 2) return "en";

  return "hinglish";
}

/* ---------------- EMOTION DETECTION ---------------- */

export type Emotion =
  | "confusion"
  | "distance"
  | "hurt"
  | "anger"
  | "fear"
  | "silence"
  | "neutral";

export function detectEmotion(text: string): Emotion {
  const t = text.toLowerCase().trim();

  if (
    t === "" ||
    ["idk", "nothing", "leave it", "fine", "no idea"].includes(t)
  ) {
    return "silence";
  }

  if (t.includes("gussa") || t.includes("angry")) return "anger";
  if (t.includes("hurt") || t.includes("pain") || t.includes("dard"))
    return "hurt";
  if (
    t.includes("afraid") ||
    t.includes("dar") ||
    t.includes("lose") ||
    t.includes("losing")
  )
    return "fear";
  if (t.includes("door") || t.includes("distance")) return "distance";
  if (t.includes("confused") || t.includes("samajh")) return "confusion";

  return "neutral";
}

/* ---------------- RESPONSE GENERATOR ---------------- */

type GenerateInput = {
  text: string;
};

export function generateResponse({ text }: GenerateInput): string {
  const lang = detectLanguage(text);
  const emotion = detectEmotion(text);

  /* ---------- SILENCE / VERY SHORT ---------- */
  if (emotion === "silence") {
    if (lang === "hi") {
      return (
        "Theek hai.\n" +
        "Kabhi kabhi sab kuch words me lana mushkil hota hai.\n" +
        "Jab mann ho, bas itna bata dena ki tum kis feeling ke saath ho."
      );
    }

    if (lang === "en") {
      return (
        "That’s okay.\n" +
        "Sometimes it’s hard to put things into words.\n" +
        "When you feel like it, you can share what you’re feeling."
      );
    }

    return (
      "Theek hai.\n" +
      "Kabhi-kabhi words milna mushkil hota hai.\n" +
      "Jab ready ho, bas apni feeling share kar dena."
    );
  }

  /* ---------- HIGH EMOTION ---------- */
  if (emotion === "hurt" || emotion === "anger" || emotion === "fear") {
    if (lang === "hi") {
      return (
        "Ye jo tum feel kar rahe ho, kaafi heavy lagta hai.\n" +
        "Jab care hoti hai aur clarity nahi milti, to hurt hona natural hai.\n" +
        "Abhi hum kisi decision par nahi jaayenge.\n" +
        "Is moment me sabse zyada kya impact kar raha hai?"
      );
    }

    if (lang === "en") {
      return (
        "What you’re feeling sounds heavy.\n" +
        "When there’s care but no clarity, it’s natural to feel hurt.\n" +
        "We don’t need to decide anything right now.\n" +
        "What’s affecting you the most in this moment?"
      );
    }

    return (
      "Jo tum feel kar rahe ho, kaafi heavy lag raha hai.\n" +
      "Jab care ho aur clarity na mile, to hurt hona normal hai.\n" +
      "Abhi decision nahi — bas samajhne ki koshish karte hain.\n" +
      "Is moment me sabse zyada kya hit kar raha hai?"
    );
  }

  /* ---------- NORMAL / CONFUSION FLOW ---------- */
  if (lang === "hi") {
    return (
      "Jo tum bata rahe ho, usme thodi confusion aur weight mehsoos hota hai.\n" +
      "Aise moments me log aksar solution nahi, bas clarity chahte hain.\n" +
      "Ye feeling tum kab se notice kar rahe ho?"
    );
  }

  if (lang === "en") {
    return (
      "From what you’re sharing, it sounds like there’s some confusion sitting there.\n" +
      "In moments like this, people often don’t need answers — just clarity.\n" +
      "Has this been building for a while, or did it start recently?"
    );
  }

  return (
    "Jo tum keh rahe ho, usme thodi confusion feel ho rahi hai.\n" +
    "Aise time pe log solution nahi, bas clarity chahte hain.\n" +
    "Ye feeling recently aayi hai ya kaafi time se chal rahi hai?"
  );
}

/* ---------------- FIXED CLOSING MESSAGE ---------------- */

export function getFinalClosingMessage(lang: "hi" | "en" | "hinglish"): string {
  if (lang === "hi") {
    return (
      "Future fixed nahi hota,\n" +
      "lekin is moment me tumhara agla step\n" +
      "relationship ko better ya worse bana sakta hai.\n" +
      "Best of luck."
    );
  }

  if (lang === "en") {
    return (
      "The future isn’t fixed.\n" +
      "But the step you take in this moment\n" +
      "can move the relationship in a better or worse direction.\n" +
      "Take care."
    );
  }

  // hinglish (default)
  return (
    "Future fixed nahi hota,\n" +
    "lekin is moment me jo step tum loge,\n" +
    "wo relationship ko better ya worse bana sakta hai.\n" +
    "Take care."
  );
}
