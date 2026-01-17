"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const res = await fetch(
        "http://localhost:5000/api/auth/me",
        { credentials: "include" }
      );

      if (!res.ok) {
        router.replace("/login");
        return;
      }

      const data = await res.json();

      // 🧠 Tinder logic
      if (!data.user.profileCompleted) {
        router.replace("/profile/setup");
      } else {
        router.replace("/swipe");
      }
    };

    check();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      Checking your account...
    </div>
  );
}
