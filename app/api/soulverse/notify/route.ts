import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, message } = body;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TG_CHAT_ID,
          text: `🟢 New SoulVerse session\n\nSession ID: ${sessionId}\n\n${message}`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Assign Ekanshia",
                  callback_data: `assign:ekanshia:${sessionId}`,
                },
                {
                  text: "Assign Advik",
                  callback_data: `assign:advik:${sessionId}`,
                },
              ],
            ],
          },
        }),
      }
    );

    const telegramData = await telegramRes.json();

    return NextResponse.json({
      success: true,
      telegram: telegramData,
    });
  } catch (err) {
    console.error("Notify error:", err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
