"use client";

import { ReactNode, useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import ConnectionsTab from "./ConnectionsTab";
import ProfileSettings from "../../components/Profile/ProfileSettings";
import ExplorePage from "./explore/page";
import ChatsPage from "./chats/page";
import ProfileScreen from "./Profile/ProfileScreen";


/* ================= TYPES ================= */
type Tab =
  | "home"
  | "explore"
  | "likes"
  | "notifications"
  | "chats"
  | "profile";

/* 🔑 SINGLE NAV SOURCE */
const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "explore", label: "Explore", icon: "🧭" },
  { key: "likes", label: "Likes", icon: "❤️" },
  { key: "notifications", label: "Notifications", icon: "🔔" },
  { key: "chats", label: "Chats", icon: "💬" },
  { key: "profile", label: "Profile", icon: "👤" },
];

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  // 🔁 Explore → Chats auto switch
  useEffect(() => {
  const session = localStorage.getItem("activeListenerSession");

  if (session) {
    setActiveTab("chats");

    // 🔑 IMPORTANT: one-time switch only
    localStorage.removeItem("activeListenerSession");
  }
}, []);

useEffect(() => {
  const handleListenerSelected = () => {
    setActiveTab("chats");
  };

  window.addEventListener("listener-selected", handleListenerSelected);

  return () => {
    window.removeEventListener("listener-selected", handleListenerSelected);
  };
}, []);


  const handleBrandClick = () => {
    const isLoggedIn =
      typeof window !== "undefined" && localStorage.getItem("userId");
    window.location.href = isLoggedIn ? "/dashboard/" : "/";
  };

  return (
   <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ================= SIDEBAR (DESKTOP ONLY) ================= */}
   <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen bg-white z-50 border-r">




        <nav className="p-6 space-y-2">
          
          <button
            onClick={handleBrandClick}
            className="text-xl font-bold text-[#B11226] mb-6 flex items-center gap-2"
          >
            ❤️ <span>Bandhan</span>
          </button>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.key
                  ? "bg-[#FFE9EC] text-[#B11226] font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ================= MAIN CONTENT ================= */}
    <div className="flex min-h-screen overflow-x-hidden lg:ml-64">

        {/* ================= TOP BAR (MOBILE) ================= */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b">
  <div className="w-full px-4 py-3">

            <button
              onClick={handleBrandClick}
              className="flex items-center gap-2 text-lg font-bold text-[#B11226]"
            >
              
              ❤️ <span>Bandhan</span>
            </button>
          </div>
        </header>

        {/* ================= MAIN ================= */}
     <main className="flex-1 w-full min-w-0 px-0 sm:px-6 py-6 pb-24 lg:pb-6 bg-[#0e0e0e] text-white">

          {activeTab === "home" && <HomeCard />}

          {activeTab === "explore" && <ExplorePage />}

          {activeTab === "likes" && (
            <p className="text-center text-gray-400">Likes coming soon</p>
          )}

          {activeTab === "notifications" && (
            <ConnectionsTab onAccept={() => setActiveTab("chats")} />
          )}

          {activeTab === "chats" && <ChatsPage />}


         {activeTab === "profile" && <ProfileScreen />}

        </main>
      </div>

      {/* ================= BOTTOM NAV (MOBILE ONLY) ================= */}
     <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t z-50 px-4 py-2">
  <div className="w-full flex justify-between items-center">

          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as Tab)}
              className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-xl ${
                activeTab === item.key ? "text-[#B11226]" : "text-gray-400"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[11px] font-medium">{item.label}</span>
              {activeTab === item.key && (
                <span className="w-1.5 h-1.5 bg-[#B11226] rounded-full mt-1" />
              )}
              
            </button>
          ))}
        </div>
      </nav>
      {/* 🔑 MODAL PORTAL ROOT */}
<div id="modal-root" />

    </div>
  );
}
