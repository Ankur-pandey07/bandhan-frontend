"use client";

import { useEffect, useState } from "react";

/* ---------------- Types ---------------- */

type Message = {
  from: "user" | "guide";
  text: string;
};

type GuideState = "idle" | "present" | "steppingBack";

/* ---------------- Component ---------------- */

export default function SoulVerseChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [calling, setCalling] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasRespondedOnce, setHasRespondedOnce] = useState(false);
  const [guideState, setGuideState] = useState<GuideState>("idle");
  const [voiceOnly, setVoiceOnly] = useState(false);
  const [showSafetyExit, setShowSafetyExit] = useState(false);
  const [showReturnHint, setShowReturnHint] = useState(false);
  const [lastTone, setLastTone] = useState<"heavy" | "confused" | null>(null);
  const [relationshipEnding, setRelationshipEnding] = useState(false);
  const [longVoiceHint, setLongVoiceHint] = useState(false);
const [autoStep, setAutoStep] = useState(0);
const [hasUserStarted, setHasUserStarted] = useState(false);
const [sessionId] = useState(() => {
  if (typeof window !== "undefined") {
    let id = sessionStorage.getItem("soulverse-session");
    if (!id) {
      id = "SV-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      sessionStorage.setItem("soulverse-session", id);
    }
    return id;
  }
  return "";
});
const [profile, setProfile] = useState<any>(null);
const guideAvatar = "/avatars/guide.png"; // ek simple neutral icon

useEffect(() => {
  const stored = localStorage.getItem("relationship_profile");
  if (stored) {
    setProfile(JSON.parse(stored));
  }
}, []);
const userAvatar =
  profile?.userGender === "female"
    ? "/avatars/female.png"
    : "/avatars/male.png";

const partnerText =
  profile?.partnerGender === "female"
    ? "Talking about your female partner"
    : "Talking about your male partner";

  /* ---------------- Fade In ---------------- */
useEffect(() => {
  if (!sessionId) return;

  const interval = setInterval(async () => {
    try {
      const res = await fetch(
        `/api/soulverse/poll?session=${sessionId}`
      );

      if (!res.ok) return;

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        return; // HTML response, ignore
      }

      if (data?.message) {
        setMessages((prev) => [
          ...prev,
          { from: "guide", text: data.message }
        ]);
      }
    } catch (e) {
      console.error("Polling error", e);
    }
  }, 3000);

  return () => clearInterval(interval);
}, [sessionId]);


useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await fetch(
        `/api/soulverse/assignment?sessionId=${sessionId}`
      );

      if (!res.ok) return;

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        return;
      }

      if (data.assigned) {
        setMessages((prev) => [
          ...prev,
          {
            from: "guide",
            text: `${capitalize(data.assignee)} is here to listen. You can continue when ready.`,
          },
        ]);

        clearInterval(interval);
      }
    } catch {}
  }, 3000);

  return () => clearInterval(interval);
}, [sessionId]);


useEffect(() => {
  if (!sessionId) return;

  fetch("/api/soulverse/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  }).catch(() => {});
}, []); // ✅ dependency array SAME rahega


  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
  // Message 1 – Welcome (immediate)
  setMessages([
    {
      from: "guide",
      text: "Welcome to SoulVerse.\nThis is a calm space for honest conversation."
    }
  ]);

  // Message 2 – Permission (after 4.5s)
  const t1 = setTimeout(() => {
    setMessages(prev => [
      ...prev,
      {
        from: "guide",
        text: "You can take your time here.\nThere’s no right way to begin."
      }
    ]);
  }, 4500);

  // Message 3 – Mode clarity (after 7.5s)
  const t2 = setTimeout(() => {
    setMessages(prev => [
      ...prev,
      {
        from: "guide",
        text: "You can type, or use voice — whatever feels easier right now."
      }
    ]);
  }, 7500);
  

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, []);

  /* ---------------- Return After 24h ---------------- */

  useEffect(() => {
    const lastSeen = localStorage.getItem("soulverse-last-seen");

    if (lastSeen) {
      const diff = Date.now() - Number(lastSeen);
      if (diff > 1000 * 60 * 60 * 20) {
        setShowReturnHint(true);
      }
    }

    localStorage.setItem("soulverse-last-seen", Date.now().toString());
  }, []);

  /* ---------------- Voice Long Session Hint ---------------- */

  useEffect(() => {
    if (!voiceOnly) return;

    const timer = setTimeout(() => {
      setLongVoiceHint(true);
    }, 1000 * 60 * 10);

    return () => clearTimeout(timer);
  }, [voiceOnly]);

  /* ---------------- Initial Soft Message ---------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          from: "guide",
          text: "I’m here. You can start wherever you feel comfortable.",
        },
      ]);
      setIsReady(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  /* ---------------- Idle Silence ---------------- */

  useEffect(() => {
    if (messages.length === 0) return;

    const timer = setTimeout(() => {
      setGuideState("idle");
    }, 15000);

    return () => clearTimeout(timer);
  }, [messages]);

  /* ---------------- Relationship Ending ---------------- */

  useEffect(() => {
    if (messages.length > 12 && guideState === "steppingBack") {
      const timer = setTimeout(() => {
        setRelationshipEnding(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [messages, guideState]);

  /* ---------------- Helpers ---------------- */
const capitalize = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

  const isOverwhelmed = (text: string) => {
    const t = text.toLowerCase();
    return (
      t.includes("too much") ||
      t.includes("cant") ||
      t.includes("can’t") ||
      t.includes("stop")
    );
  };

  const getGuideResponse = (userText: string) => {
    const text = userText.toLowerCase();

    if (text.includes("tired") || text.includes("broken")) {
      setLastTone("heavy");
      return "That sounds heavy. We don’t need to unpack everything right now.";
    }

    if (text.includes("confused")) {
      setLastTone("confused");
      return "It’s okay to not have clarity yet. We can sit with that for a bit.";
    }

    if (userText.trim().length <= 3) {
      return "You don’t have to say much. Even a little is enough to begin.";
    }

    return "I hear you. You can take this one piece at a time.";
  };

  /* ---------------- Guide Response ---------------- */

  const respondAsGuide = (userText: string) => {
    if (hasRespondedOnce) return;

    setHasRespondedOnce(true);
    setGuideState("present");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        { from: "guide", text: getGuideResponse(userText) },
      ]);

      setTimeout(() => {
        setGuideState("steppingBack");
      }, 6000);
    }, 2000);
  };

  /* ---------------- Send Message ---------------- */

  const sendMessage = () => {
  if (!input.trim()) return;

  const userText = input.trim();

  // User message
  setMessages(prev => [
    ...prev,
    { from: "user", text: userText }
  ]);
fetch("/api/soulverse/notify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    sessionId,
    message: userText,
  }),
});

  setInput("");

  // First time user starts
  if (!hasUserStarted) {
    setHasUserStarted(true);

    // Message 4 – Thank you (after 2s)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          from: "guide",
          text: "Thank you for sharing."
        }
      ]);
    }, 2000);

    // Message 5 – Open invitation (after 5s)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          from: "guide",
          text: "If you’d like, what feels most important for you to talk about today?"
        }
      ]);
    }, 5000);

    return;
  }

  // Message 6 – Short / unclear response handling
  if (userText.length <= 3) {
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          from: "guide",
          text:
            "Some people talk about misunderstandings, distance, or feeling unheard —\nbut you can choose your own words."
        }
      ]);
    }, 4000);
  }
};

  /* ---------------- Render ---------------- */

  return (
    <div
      className={`flex h-screen flex-col bg-neutral-950 text-white transition-all duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header */}
      
      <div className="border-b border-white/10 px-4 py-3 flex items-center gap-3">
  {/* Avatar */}
  {profile && (
    <img
      src={userAvatar}
      alt="User avatar"
      className="w-10 h-10 rounded-full bg-white/10"
    />
  )}

  {/* Text */}
  <div>
    <h1 className="text-sm font-medium">
      {profile?.userName || "SoulVerse"}
    </h1>
    <p className="text-xs text-white/60">
      {profile ? partnerText : "A one-on-one conversation"}
    </p>
  </div>
</div>

      {/* Voice Only */}
      {voiceOnly && (
        <div className="flex flex-col items-center justify-center h-full px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse mb-6" />
          <p className="text-white/60">You can speak when you’re ready.</p>
          {longVoiceHint && (
            <p className="text-xs text-white/40 mt-6">
              We can pause whenever you want.
            </p>
          )}
          <button
            onClick={() => setVoiceOnly(false)}
            className="mt-10 text-xs underline text-white/40"
          >
            Pause here
          </button>
        </div>
      )}

      {/* Chat */}
      {!voiceOnly && (
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
          {showReturnHint && (
            <p className="text-xs text-white/40 mb-4">
              You can continue from wherever you left off.
            </p>
          )}

          {!isReady && (
            <p className="text-sm text-white/50">Taking a moment…</p>
          )}
console.log("Rendering message", msg.from);


{messages.map((msg, i) => (
  <div
    key={i}
    className={`flex items-end gap-2 ${
      msg.from === "user" ? "justify-end" : "justify-start"
    }`}
  >
    {msg.from === "guide" && (
      <img
        src="/avatars/guide.png"
        className="w-7 h-7 rounded-full border border-black"
      />
    )}

    <div
      className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
        msg.from === "user"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      {msg.text}
    </div>

    {msg.from === "user" && (
      <img
        src="/avatars/male.png"
        className="w-7 h-7 rounded-full border border-red-500"
      />
    )}
  </div>
))}

          {isTyping && (
            <div className="mr-auto text-xs text-white/40">
              Someone is here.
            </div>
          )}

          {showSafetyExit && (
            <div className="mr-auto bg-white/10 rounded-xl p-3 text-xs text-white/70">
              <p className="mb-2">We can slow this down.</p>
              <div className="flex gap-4 underline">
                <button onClick={() => setShowSafetyExit(false)}>
                  Pause here
                </button>
                <button
                  onClick={() => {
                    setShowSafetyExit(false);
                    setGuideState("steppingBack");
                  }}
                >
                  Step away for now
                </button>
              </div>
            </div>
          )}

          {guideState === "steppingBack" && (
            <p className="text-xs text-white/40 mt-4">
              I’ll step back for now. You can return whenever it feels right.
            </p>
          )}

          {relationshipEnding && (
            <p className="text-xs text-white/40 mt-6">
              I’ll leave this space open for you. You don’t need to continue
              unless it feels right.
            </p>
          )}
        </div>
      )}

      {/* Input */}
      {!voiceOnly && (
        <div className="border-t border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Say what’s on your mind…"
              className="flex-1 rounded-xl bg-white/10 px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm"
            >
              Send
            </button>
            <button
              onClick={() => {
                setVoiceOnly(true);
                setGuideState("present");
              }}
              className="rounded-xl border border-white/20 px-3 py-2 text-sm"
            >
              🎙️ Talk instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
