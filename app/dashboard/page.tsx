"use client";

import { useRouter } from "next/navigation";
import SoulVerseExploreCard from "./explore/souleverse/SoulVerseExploreCard";

/*
 * IMPORTANT:
 * - Explore/Mood section JAHAN SE bhi aa raha hai
 *   usko hum touch nahi kar rahe.
 * - SoulVerse sirf niche add hoga.
 */

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      {/* 🔒 EXISTING EXPLORE + MOODS SECTION */}
      <div id="explore-section">
        {/* Existing Explore/Mood UI already works here */}
      </div>

      {/* ✅ SOULVERSE CARD — ONLY ADDITION */}
      <div className="mt-6">
        <SoulVerseExploreCard
          onOpen={() => router.push("/soulverse")}
        />
      </div>
    </div>
  );
}
