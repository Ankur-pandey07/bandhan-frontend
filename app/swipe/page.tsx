"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useGesture } from "@use-gesture/react";
import { useRouter } from "next/navigation";

export default function SwipePage() {
  const router = useRouter();

  const [profiles, setProfiles] = useState([]);
  const [index, setIndex] = useState(0);
  const [matched, setMatched] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const x = useMotionValue(0);

  useEffect(() => {
  fetch("http://localhost:5000/api/profile/status", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      if (!data.completed) {
        window.location.href = "/create-profile";
      }
    });
}, []);

  // 🔐 STEP-3: AUTH + PROFILE CHECK
  useEffect(() => {
    const initSwipe = async () => {
      try {
        // 🔐 Check login
        const meRes = await fetch(
          "http://localhost:5000/api/auth/me",
          { credentials: "include" }
        );

        if (!meRes.ok) {
          router.replace("/login");
          return;
        }

        const meData = await meRes.json();

        // ❗ profileCompleted check (Tinder style)
        if (!meData.user.profileCompleted) {
          router.replace("/profile/create");
          return;
        }

        setIsPremium(meData.user.isPremium || false);

        // 🎯 Load swipe profiles
        const usersRes = await fetch(
          "http://localhost:5000/api/users",
          { credentials: "include" }
        );

        const usersData = await usersRes.json();
        setProfiles(usersData);
        setLoading(false);

      } catch (err) {
        router.replace("/login");
      }
    };

    initSwipe();
  }, [router]);

  const bind = useGesture({
    onDrag: ({ offset: [ox], down }) => {
      x.set(ox);

      if (!down) {
        if (ox > 140) handleSwipe("right");
        else if (ox < -140) handleSwipe("left");
        else x.set(0);
      }
    },
  });

  function handleSwipe(direction) {
    if (!isPremium && direction === "right" && history.length >= 10) {
      alert("Premium required for unlimited likes ❤️");
      return;
    }

    const user = profiles[index];
    setHistory(prev => [...prev, { user, direction }]);

    if (direction === "right") setMatched(true);

    setTimeout(() => {
      x.set(0);
      setIndex(prev => prev + 1);
      setMatched(false);
    }, 300);
  }

  function currentCard() {
    if (index >= profiles.length) return null;
    return profiles[index];
  }

  function nextCard() {
    if (index + 1 >= profiles.length) return null;
    return profiles[index + 1];
  }

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading swipe feed...
      </div>
    );
  }

  if (!currentCard()) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-center">
        No more profiles 😅  
        <br />
        <span className="text-sm text-gray-500 mt-4 block">
          Total swipes: {history.length}
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-3">

      {/* 💖 MATCH POPUP */}
      {matched && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          className="absolute top-20 bg-pink-600 px-6 py-4 rounded-2xl shadow-xl z-50"
        >
          💖 It’s a Match!
        </motion.div>
      )}

      {/* 🔽 NEXT CARD */}
      <AnimatePresence>
        {nextCard() && (
          <motion.div
            className="absolute w-[320px] h-[520px] rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20"
            style={{ scale: 0.95 }}
          >
            <img
              src={nextCard().photo || "https://i.pravatar.cc/400"}
              className="w-full h-full object-cover rounded-3xl opacity-60"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔝 CURRENT CARD */}
      <AnimatePresence>
        <motion.div
          {...bind()}
          drag="x"
          style={{ x }}
          dragElastic={0.25}
          dragConstraints={{ left: 0, right: 0 }}
          className="absolute w-[350px] h-[550px] rounded-3xl bg-white overflow-hidden shadow-2xl"
        >
          <img
            src={currentCard().photo || "https://i.pravatar.cc/400"}
            className="w-full h-[450px] object-cover"
          />

          <div className="px-4 py-3 bg-black/60">
            <h2 className="text-2xl font-bold">
              {currentCard().name}, {currentCard().age}
            </h2>
            <p className="text-gray-300 text-sm">
              📍 {currentCard().city}
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Swipe 👉 like | 👈 dislike
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ❤️ ACTION BUTTONS */}
      <div className="absolute bottom-10 flex gap-8">
        <button
          onClick={() => handleSwipe("left")}
          className="w-16 h-16 bg-gray-700 text-2xl rounded-full"
        >
          ❌
        </button>

        <button
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 bg-pink-600 text-2xl rounded-full"
        >
          ❤️
        </button>
      </div>

      {/* 📊 LIVE STATS */}
      <div className="absolute top-5 text-sm opacity-80">
        {index + 1}/{profiles.length} • Likes:{" "}
        {history.filter(h => h.direction === "right").length}
      </div>

    </div>
  );
}
