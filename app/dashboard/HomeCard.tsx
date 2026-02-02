"use client";

import { useEffect, useRef, useState } from "react";

export default function HomeCard() {
  /* ================= USER DATA (SIGNUP BASED) ================= */
  const userProfile = {
    id: "user_1",
    name: "Vanshika",
    age: 22,
    verified: true,
    interests: ["music", "travel", "coffee"],
    lifestyle: {
      drinking: "yes",
      smoking: "no",
      workout: "yes",
    },
    height: "5'4\"",
    work: "Marketing Executive",
    bio: "Looking for meaningful connections and real conversations.",
  };

  const media = [
    { type: "image", src: "/default-user.png" },
    { type: "image", src: "/default-user.png" },
    { type: "image", src: "/default-user.png" },
    { type: "image", src: "/default-user.png" },
    { type: "video", src: "/sample-video.mp4" },
     { type: "video", src: "/sample-video.mp4" },
  ];

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [location, setLocation] = useState("Nearby");
  const [showOptions, setShowOptions] = useState(false);
  const [expand, setExpand] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showReport, setShowReport] = useState(false);
const [dragX, setDragX] = useState(0);
const [dragging, setDragging] = useState(false);
const audioRef = useRef<HTMLAudioElement | null>(null);
const [showMatch, setShowMatch] = useState(false);
const likeAudioRef = useRef<HTMLAudioElement | null>(null);
const skipAudioRef = useRef<HTMLAudioElement | null>(null);
const superLikeAudioRef = useRef<HTMLAudioElement>(null);

 const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = media[index];

  /* ================= REAL LOCATION ================= */
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          );
          const data = await res.json();
          setLocation(
            data.address?.city ||
              data.address?.town ||
              data.address?.state ||
              "Nearby"
          );
        } catch {
          setLocation("Nearby");
        }
      },
      () => setLocation("Nearby")
    );
  }, []);
  useEffect(() => {
  const blocked = getBlockedUsers();
  if (blocked.some((u) => u.id === userProfile.id)) {
    setBlocked(true);
  }
}, []);

const submitReport = async (reason: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        reportedUserId: userProfile.id,
        reason,
      }),
    });

    // Tinder jaisa behaviour
    setShowReport(false);
    setShowOptions(false);
    setBlocked(true);
  } catch (err) {
    alert("Report failed. Try again.");
  }
};
const onDragStart = () => setDragging(true);

const onDragMove = (e: any) => {
  if (!dragging) return;
  setDragX(e.touches ? e.touches[0].clientX : e.clientX);
};

const onDragEnd = () => {
  setDragging(false);

  if (dragX > 180) {
    sendSwipe("like");   // ✅ ADD THIS
    nextMedia();
    
  } else if (dragX < -180) {
    sendSwipe("skip");   // ✅ ADD THIS
    nextMedia();
  }
navigator.vibrate?.(30);
audioRef.current?.play().catch(() => {});

  setDragX(0);
};

const sendSwipe = async (action: "like" | "skip" | "superlike") => {
  try {
    const userId = localStorage.getItem("userId");

    const res = await fetch("http://localhost:5000/api/swipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
     body: JSON.stringify({
  action,
  targetUserId: userProfile.id, // 👈 backend expects THIS
}),

    });

    if (!res.ok) {
      throw new Error("Swipe failed");
    }
  } catch (err) {
    console.error("Swipe error:", err);
  }
};

  /* ================= MEDIA NAV ================= */
  const nextMedia = () => {
    if (isPlaying || showOptions || expand) return;
    setIndex((p) => (p === media.length - 1 ? 0 : p + 1));
  };

  const prevMedia = () => {
    if (isPlaying || showOptions || expand) return;
    setIndex((p) => (p === 0 ? media.length - 1 : p - 1));
  };

  /* ================= LONG PRESS ================= */
  const onPressStart = () => {
    pressTimer.current = setTimeout(() => {
      setExpand(true);
    }, 600);
  };

  const onPressEnd = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };
const getBlockedUsers = (): any[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("bandhan_blocked_users") || "[]");
};

const saveBlockedUser = (user: any) => {
  const existing = getBlockedUsers();
  localStorage.setItem(
    "bandhan_blocked_users",
    JSON.stringify([...existing, user])
  );
};

  /* ================= SHARE ================= */
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Bandhan Profile",
        text: `${userProfile.name}, ${userProfile.age}`,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this device");
    }
    setShowOptions(false);
  };

  if (blocked) return null;

  return (
    <section className="w-full h-full flex justify-center">
     <div className="w-full px-4 lg:max-w-md lg:mx-auto">
        <div className="absolute inset-0 scale-[0.96] translate-y-2 bg-black/20 rounded-2xl" />
<audio ref={audioRef} src="/sounds/swipe.mp3" preload="auto" />
<audio ref={likeAudioRef} src="/sounds/like.mp3" preload="auto" />
<audio ref={skipAudioRef} src="/sounds/skip.mp3" preload="auto" />
<audio ref={superLikeAudioRef} src="/sounds/superlike.mp3" preload="auto" />


        <div
  className="
    relative
    h-[calc(100dvh-8rem)]
    bg-black
    rounded-2xl
    overflow-hidden
    shadow-lg
    transition-transform
    duration-300
    + z-10
  "
  style={{
    transform: `translateX(${dragX}px) rotate(${dragX / 25}deg)`,
  }}
  onMouseDown={onDragStart}
  onMouseMove={onDragMove}
  onMouseUp={onDragEnd}
  onTouchStart={onDragStart}
  onTouchMove={onDragMove}
  onTouchEnd={onDragEnd}
>
{/* NEXT CARD (BACKGROUND STACK) */}
<div
  className="
    absolute
    inset-0
    bg-black
    rounded-2xl
    translate-y-3
    scale-[0.96]
    opacity-80
    z-0
  "
/>

          {/* PROGRESS */}
          <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
            {media.map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded ${
                  i === index ? "h-1.5 bg-white" : "h-1 bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* OPTIONS */}
          <button
            onClick={() => setShowOptions(true)}
            className="absolute top-3 right-3 z-30 text-white text-xl"
          >
            ⋮
          </button>

          {/* TAP ZONES */}
          <div className="absolute inset-0 z-10 flex">
           <div
  className="w-1/2"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    prevMedia();
  }}
/>
<div
  className="w-1/2"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    nextMedia();
  }}
/>

          </div>

          {/* MEDIA */}
          <div className="absolute inset-0">
            {current.type === "image" && (
             <img
  src={current.src}
  alt="profile"
  draggable={false}
  onClick={(e) => e.preventDefault()}
  onContextMenu={(e) => e.preventDefault()}
  className="h-full w-full object-cover select-none"
/>

            )}
            {current.type === "video" && (
              <video
                src={current.src}
                autoPlay
                muted
                onEnded={() => setIsPlaying(false)}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* GRADIENT */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

          {/* INFO (MEDIA-WISE) */}
          <div className="absolute bottom-24 left-4 right-4 z-20 text-white">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                {userProfile.name}, {userProfile.age}
              </span>
              {userProfile.verified && (
                <span className="text-blue-400 text-sm">✔</span>
              )}
            </div>

            {index === 0 && (
              <p className="text-sm opacity-80 mt-1">{location}</p>
            )}

            {index === 1 && (
              <p className="text-sm mt-2">
                Interests: {userProfile.interests.join(", ")}
              </p>
            )}

            {index === 2 && (
              <p className="text-sm mt-2">
                Lifestyle: {userProfile.lifestyle.drinking},{" "}
                {userProfile.lifestyle.smoking},{" "}
                {userProfile.lifestyle.workout}
              </p>
            )}

            {index === 3 && (
              <p className="text-sm mt-2">
                {userProfile.height} · {userProfile.work}
              </p>
            )}
          </div>

          {/* EXPAND ICON */}
          <button
  onClick={() => setExpand(true)}
  className="absolute right-3 bottom-32 z-30 text-white text-xl"
>
  ⬆
</button>


          {/* ACTION BUTTONS */}
          <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center gap-6">
            <button
  onClick={() => {
    navigator.vibrate?.(20);
    skipAudioRef.current?.play().catch(() => {});
    sendSwipe("skip");
    
  }}
  className="w-16 h-16 bg-white rounded-full text-pink-500 text-3xl shadow-lg"
>
  ✕
</button>

<button
  onClick={() => {
    navigator.vibrate?.(30);
    likeAudioRef.current?.play().catch(() => {});
    sendSwipe("like");
  }}
  className="w-16 h-16 bg-white rounded-full text-green-500 text-4xl shadow-xl"
>
  ❤
</button>

          </div>

          {/* OPTIONS SHEET */}
          {showOptions && (
            <div className="absolute inset-0 z-40 bg-black/50 flex items-end">
              <div className="bg-white w-full rounded-t-2xl p-4">
                <button
                  onClick={handleShare}
                  className="w-full py-3 text-left border-b"
                >
                  Share
                </button>
                
                <button
  onClick={() => {
    saveBlockedUser({
      id: userProfile.id,
      name: userProfile.name,
      blockedAt: Date.now(),
    });
    setBlocked(true);
    setShowOptions(false);
  }}
  className="w-full py-3 text-left border-b"
>
  Block
</button>
<button
  onClick={() => {
    navigator.vibrate?.([20, 30, 20]);
    superLikeAudioRef.current?.play().catch(() => {});
    sendSwipe("superlike");
    nextMedia();
  }}
  className="
    w-14 h-14
    bg-blue-500
    rounded-full
    text-white
    text-2xl
    shadow-xl
  "
>
  ⭐
</button>

                <button
                  onClick={() => setShowReport(true)}
                  className="w-full py-3 text-left border-b"
                >
                  Report
                </button>
                <button
                  onClick={() => setShowOptions(false)}
                  className="w-full py-3 text-center font-semibold text-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}


{expand && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center">
    <div
      className="
        w-full
        max-w-md
        max-h-[85dvh]
        bg-white
        rounded-t-3xl
        px-5
        pt-4
        pb-8
        overflow-y-auto
        shadow-2xl
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {userProfile.name}, {userProfile.age}
          </h2>
          {userProfile.verified && (
            <span className="text-blue-500 text-sm">✔</span>
          )}
        </div>
        <button
          onClick={() => setExpand(false)}
          className="text-gray-500 text-xl"
        >
          ✕
        </button>
      </div>

      {/* PHOTOS */}
      <div className="flex gap-3 overflow-x-auto mb-6">
        {media
          .filter((m) => m.type === "image")
          .map((m, i) => (
            <img
              key={i}
              src={m.src}
              className="h-44 w-28 rounded-xl object-cover flex-shrink-0"
            />
          ))}
      </div>

      {/* ABOUT */}
      <section className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">
          About
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {userProfile.bio}
        </p>
      </section>

      {/* INTERESTS */}
      <section className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {userProfile.interests.map((i) => (
            <span
              key={i}
              className="
                px-3 py-1
                bg-gray-100
                text-sm
                rounded-full
                text-gray-700
              "
            >
              {i}
            </span>
          ))}
        </div>
      </section>

      {/* LIFESTYLE */}
      <section>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Lifestyle
        </h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>🏋️ Workout: {userProfile.lifestyle.workout}</li>
          <li>🚬 Smoking: {userProfile.lifestyle.smoking}</li>
          <li>🍷 Drinking: {userProfile.lifestyle.drinking}</li>
        </ul>
      </section>
    </div>
  </div>
)}


          {/* REPORT */}
          {showReport && (
            <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl w-11/12">
                <p className="font-semibold mb-4">Report profile</p>
                {["Fake profile", "Inappropriate content", "Spam"].map(
                  (r) => (
                    <button
                      key={r}
                      onClick={() => submitReport(r)}
                      className="w-full text-left py-2 border-b"
                    >
                      {r}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {showMatch && (
  <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white">
    <h1 className="text-3xl font-bold mb-4">It’s a Match 💖</h1>
    <p className="mb-6">
      You and {userProfile.name} liked each other
    </p>
    <button
      onClick={() => setShowMatch(false)}
      className="px-6 py-3 bg-white text-black rounded-full font-semibold"
    >
      Continue
    </button>
  </div>
)}

    </section>
  );
}

