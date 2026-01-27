import { NextResponse } from "next/server";

const store = globalThis as any;
store.sessions = store.sessions || {};
store.messages = store.messages || {};
store.privateChatMap = store.privateChatMap || {};

export async function POST(req: Request) {
  console.log("📥 TELEGRAM CALLBACK HIT");
  const body = await req.json();

  /* ===============================
     1️⃣ ASSIGN BUTTON CLICK
  =============================== */
  if (body.callback_query) {
    const callback = body.callback_query;
    const data: string = callback.data;

    if (data.startsWith("assign:")) {
      const [, assignee, sessionId] = data.split(":");

      // ✅ Save assignment
      store.sessions[sessionId] = {
        assignee,
        telegramUserId: callback.from.id,
      };

      // ✅ Map assignee → session
      store.privateChatMap[callback.from.id] = sessionId;

      // ✅ SEND GROUP MESSAGE WITH PRIVATE CHAT LINK
      await fetch(
  `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: callback.message.chat.id,
      text:
        `✅ Session ${sessionId} assigned to ${capitalize(assignee)}\n\n` +
        `👉 ${capitalize(assignee)}, click below to reply privately:\n` +
        `https://t.me/Bandhan_soulverse_bot?start=${sessionId}`,
    }),
  }
);


      // ✅ Stop spinner on button
      await fetch(
        `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/answerCallbackQuery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: callback.id,
          }),
        }
      );
    }

    return NextResponse.json({ ok: true });
  }

  /* ===============================
     2️⃣ PRIVATE TELEGRAM MESSAGE
     (THIS PART WAS ALREADY CORRECT)
  =============================== */
  if (body.message && body.message.chat?.type === "private") {
    const telegramUserId = body.message.from.id;
    const text = body.message.text;

    const sessionId = store.privateChatMap[telegramUserId];
    if (!sessionId) return NextResponse.json({ ok: true });

    store.messages[sessionId] = {
      text,
      from: "guide",
      at: Date.now(),
    };

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
