"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatScreen({
  chat,
  onBack,
}: {
  chat: any;
  onBack: () => void;
}) {
  const MESSAGE_LIMIT = 10;

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTime, setShowTime] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);
const mediaRecorderRef = useRef<MediaRecorder | null>(null);
const audioChunksRef = useRef<Blob[]>([]);
const [isRecording, setIsRecording] = useState(false);
const [voiceCall, setVoiceCall] = useState(false);
const [videoCall, setVideoCall] = useState(false);
const recordStartTime = useRef<number | null>(null);

  const [online, setOnline] = useState(true);
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

function getDateLabel(dateString: string) {
  const msgDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (msgDate.toDateString() === today.toDateString()) return "Today";
  if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";

  return msgDate.toLocaleDateString();
}


const videoRef = useRef<HTMLVideoElement | null>(null);

useEffect(() => {
  if (videoCall) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  }
}, [videoCall]);


  
const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorderRef.current = mediaRecorder;
  audioChunksRef.current = [];

  mediaRecorder.ondataavailable = (e) => {
    audioChunksRef.current.push(e.data);
  };

  mediaRecorder.start();
  recordStartTime.current = Date.now();
  setIsRecording(true);
};

const stopRecording = () => {
  const mediaRecorder = mediaRecorderRef.current;
  if (!mediaRecorder) return;

  mediaRecorder.stop();
  setIsRecording(false);

  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const audioUrl = URL.createObjectURL(blob);

    const durationMs = Date.now() - (recordStartTime.current || 0);
    const seconds = Math.max(1, Math.floor(durationMs / 1000));
    const duration = `0:${seconds.toString().padStart(2, "0")}`;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "voice",
        audioUrl,
        duration,
        from: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date().toDateString(),
        status: "sent",
      },
    ]);
  };
};



  /* 🔁 AUTO SCROLL */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* 💾 LOAD CHAT */
  useEffect(() => {
    const saved = localStorage.getItem(`chat_${chat.id}`);
    if (saved) setMessages(JSON.parse(saved));
  }, [chat.id]);

  /* 💾 SAVE CHAT */
  useEffect(() => {
    localStorage.setItem(`chat_${chat.id}`, JSON.stringify(messages));
  }, [messages, chat.id]);

  /* 🟢 FAKE ONLINE / OFFLINE */
  useEffect(() => {
    const timer = setTimeout(() => {
      setOnline(false);
      setLastSeen(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

useEffect(() => {
  setMessages((prev) =>
    prev.map((m) =>
      m.from === "them" ? { ...m, unread: false } : m
    )
  );
}, [chat.id]);

const unreadCount = messages.filter(
  (m) => m.unread && m.from === "them"
).length;
{unreadCount > 0 && (
  <span className="bg-green-500 text-white text-xs px-2 rounded-full">
    {unreadCount}
  </span>
)}

const [callTime, setCallTime] = useState("00:00");

useEffect(() => {
  if (!voiceCall) return;

  let seconds = 0;
  const interval = setInterval(() => {
    seconds++;
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    setCallTime(`${min}:${sec}`);
  }, 1000);

  return () => clearInterval(interval);
}, [voiceCall]);
useEffect(() => {
  const esc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setVoiceCall(false);
      setVideoCall(false);
    }
  };
  window.addEventListener("keydown", esc);
  return () => window.removeEventListener("keydown", esc);
}, []);


const minutes = Math.floor(callTime / 60);
const seconds = callTime % 60;


  const sentCount = messages.filter((m) => m.from === "me").length;
  const isLocked = sentCount >= MESSAGE_LIMIT;
const playVoice = (url: string) => {
  const audio = new Audio(url);
  audio.play();
}

  const sendMessage = () => {
    if (!input.trim() || isLocked) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = now.toDateString();
    const id = Date.now();


    const userMessage = {
      id,
      type: "text",
      text: input,
      from: "me",
      time,
      date,
      unread: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // delivered
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, status: "delivered" } : m
        )
      );
    }, 400);

    // typing
    setIsTyping(true);

    // reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "text",
          text: "Nice to hear from you 🙂",
          from: "them",
          time,
          date,
        },
      ]);

      setIsTyping(false);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, status: "seen" } : m
        )
      );
    }, 900);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl overflow-hidden">
     
      {/* HEADER */}
    {/* HEADER */}
<div className="p-4 border-b flex items-center gap-3">

  {/* BACK */}
  <button onClick={onBack}>←</button>

  {/* NAME + STATUS */}
  <div className="flex flex-col">
    <p className="font-medium">{chat.name}</p>
    <span className="text-xs text-gray-500">
      {online ? "online" : `last seen at ${lastSeen}`}
    </span>
  </div>

  {/* RIGHT ACTIONS */}
  <div className="ml-auto flex items-center gap-3">

  <button onClick={() => setVoiceCall(true)}>📞</button>
    <button onClick={() => setVideoCall(true)}>📹</button>
    <button onClick={() => setShowMenu(!showMenu)}>⋮</button>

    {showMenu && (
      <div className="absolute right-0 top-8 bg-white border rounded-lg shadow text-sm z-50">
        <button className="block px-4 py-2 w-full text-left hover:bg-gray-100">
          🚫 Block
        </button>
        <button className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100">
          ⚠️ Report
        </button>
      </div>
    )}
  </div>
</div>


      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">

        <div className="text-center text-xs text-gray-400">
          {chat.name} is here to listen 💙
        </div>

        {/* EMPTY CHAT STATE */}
{messages.length === 0 && !isTyping && (
  <div className="flex flex-col items-center justify-center text-center text-gray-400 text-sm mt-20 px-6">
    <p className="mb-2">
      👋 Say hi to <span className="font-medium">{chat.name}</span>
    </p>
    <p>You can start chatting or use voice to talk 💙</p>
  </div>
)}

{messages.map((m, i) => {
  const prev = messages[i - 1];
  const showDate = !prev || prev.date !== m.date;
  const grouped = prev?.from === m.from;

  return (
    <div key={m.id}>
      {showDate && (
        <div className="text-center text-xs text-gray-400 my-3">
          {getDateLabel(m.date)}
        </div>
      )}

      <div
        className={`flex w-full ${
          m.from === "me" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          onClick={() =>
            setShowTime(showTime === i ? null : i)
          }
          className={`max-w-[70%] px-4 py-2 text-sm shadow ${
            m.from === "me"
              ? "bg-[#B11226] text-white"
              : "bg-gray-100"
          } ${
            grouped ? "rounded-2xl" : "rounded-xl"
          }`}
        >
          {m.type === "text" && <p>{m.text}</p>}

{m.type === "voice" && (
  <div className="flex items-center gap-3">
    <button
      onClick={() => playVoice(m.audioUrl)}
      className="text-lg"
    >
      ▶️
    </button>

    {/* WAVEFORM */}
    <div className="flex items-center gap-2">
  <button onClick={() => playVoice(m.audioUrl)}>▶️</button>
  <div className="flex gap-1">
    {[...Array(8)].map((_, i) => (
      <span
        key={i}
        className="w-1 bg-gray-400 animate-pulse"
        style={{ height: `${8 + i * 2}px` }}
      />
    ))}
  </div>
  <span className="text-xs">{m.duration}</span>
</div>


    <span className="text-xs text-gray-500">
      {m.duration}
    </span>
  </div>
)}

          <div className="flex justify-end text-[10px] gap-1 mt-1">
            {showTime === i && <span>{m.time}</span>}
            {m.from === "me" && (
              <span
                className={
                  m.status === "seen"
                    ? "text-blue-400"
                    : ""
                }
              >
                {m.status === "sent" ? "✓" : "✓✓"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
})}

        {isTyping && (
  <div className="flex gap-1 px-2">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
  </div>
)}

        <div ref={messagesEndRef} />
      </div>

    {/* INPUT */}
{!isLocked ? (
  <div className="p-3 border-t">
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 relative z-10">

      {/* MIC BUTTON */}
      <button
  onMouseDown={startRecording}
  onMouseUp={stopRecording}
  onTouchStart={startRecording}
  onTouchEnd={stopRecording}
  className="text-xl px-2"
>
  🎙️
</button>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message…"
        className="flex-1 bg-transparent outline-none text-sm"
      />

      <button
        onClick={sendMessage}
        disabled={!input.trim()}
        className={`px-4 rounded-full text-sm ${
          input.trim()
            ? "bg-[#B11226] text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Send
      </button>

    </div>
  </div>
) : (
  <div className="p-4 text-center text-sm text-gray-400">
    Daily message limit reached
  </div>
)}
{/* VOICE CALL OVERLAY */}
{voiceCall && (
  <div className="fixed inset-0 bg-black text-white z-50 flex flex-col items-center justify-between p-6">

    {/* TOP */}
    <div className="text-center mt-6">
      <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl mb-4">
        {chat.name[0]}
      </div>
      <p className="text-lg font-medium">{chat.name}</p>
      <p className="text-sm opacity-70">{callTime}</p>
    </div>

    {/* CONTROLS */}
    <div className="flex gap-6 mb-10">
      <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
        🎤
      </button>
      <button
        onClick={() => setVoiceCall(false)}
        className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-xl"
      >
        ❌
      </button>
      <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
        🔊
      </button>
    </div>

  </div>
)}

{/* VIDEO CALL OVERLAY */}
{videoCall && (
  <div className="fixed inset-0 bg-black z-50">

    {/* VIDEO */}
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full h-full object-cover"
    />

    {/* TOP BAR */}
    <div className="absolute top-4 left-0 right-0 flex justify-center text-white">
      <div className="bg-black/50 px-4 py-1 rounded-full text-sm">
        {chat.name} • {callTime}
      </div>
    </div>

    {/* CONTROLS */}
    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
      <button className="w-14 h-14 rounded-full bg-gray-700 text-white">🎤</button>
      <button
        onClick={() => setVideoCall(false)}
        className="w-16 h-16 rounded-full bg-red-600 text-white text-xl"
      >
        ❌
      </button>
      <button className="w-14 h-14 rounded-full bg-gray-700 text-white">📷</button>
    </div>

  </div>
)}


</div>

);
}