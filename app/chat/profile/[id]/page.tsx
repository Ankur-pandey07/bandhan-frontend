"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  // ==========================================
  // 🚀 FETCH PROFILE + USER AUTH CHECK
  // ==========================================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // 1️⃣ CHECK LOGIN
        const authRes = await fetch(
          "http://localhost:5000/api/auth/me",
          { credentials: "include" }
        );

        if (!authRes.ok) {
          router.push("/login");
          return;
        }

        const authData = await authRes.json();
        setIsPremium(authData.user?.isPremium);

        // 2️⃣ FETCH PROFILE
        const profileRes = await fetch(
          `http://localhost:5000/api/users/${id}`,
          { credentials: "include" }
        );

        if (!profileRes.ok) {
          router.push("/dashboard");
          return;
        }

        const profileData = await profileRes.json();
        setUser(profileData);
      } catch (e) {
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  // ==========================================
  // ❤️ LIKE, MATCH LOGIC
  // ==========================================
  const handleLike = async () => {
    try {
      // free limit
      if (!isPremium && likesCount >= 10) {
        toast.error("Free users = 10 likes limit");
        router.push("/premium");
        return;
      }

      const res = await fetch(
        "http://localhost:5000/api/users/like",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetId: id }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error");
        return;
      }

      setLikesCount(likesCount + 1);

      if (data.match) {
        toast.success("🎉 It's a MATCH! Start chatting!");
      } else {
        toast.success("❤️ Liked!");
      }

    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F5] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Image */}
        <div className="relative">
          <img
            src={user.photo || "https://i.pravatar.cc/500"}
            alt={user.name}
            className="h-96 w-full object-cover"
          />

          {user.isPremium && (
            <span className="absolute top-5 left-5 bg-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-semibold">
              ⭐ Premium Member
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {user.name}, {user.age}
          </h1>
          <p className="text-gray-500 mt-1">{user.location}</p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {user.bio || "This member prefers to keep an air of mystery ✨"}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#B11226] text-white px-6 py-3 rounded-xl font-semibold shadow-md"
              onClick={handleLike}
            >
              ❤️ Like Profile
            </motion.button>

            <button
              onClick={() => router.back()}
              className="border px-6 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100"
            >
              ← Back
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
