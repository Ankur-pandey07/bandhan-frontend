"use client";

import { ReactNode } from "react";
import Link from "next/link";

/* 🔑 SINGLE NAV SOURCE */
const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "🏠", href: "/dashboard" },
  { key: "explore", label: "Explore", icon: "🧭", href: "/dashboard/explore" },
  { key: "likes", label: "Likes", icon: "❤️", href: "/dashboard/likes" },
  { key: "notifications", label: "Notifications", icon: "🔔", href: "/dashboard/notifications" },
  { key: "chats", label: "Chats", icon: "💬", href: "/dashboard/chats" },
  { key: "profile", label: "Profile", icon: "👤", href: "/dashboard/profile" },
];

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:block w-64 fixed left-0 top-0 h-screen bg-white z-50 border-r">
        <nav className="p-6 space-y-2">
          <div className="text-xl font-bold text-[#B11226] mb-6 flex items-center gap-2">
            ❤️ <span>Bandhan</span>
          </div>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="lg:ml-64 min-h-screen bg-[#0e0e0e] text-white">
        <main className="h-full overflow-y-auto px-6 py-6 pb-24">
          {children}
        </main>
      </div>

      {/* ================= BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t z-50 px-4 py-2">
        <div className="w-full flex justify-between items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="flex flex-col items-center gap-1 flex-1 py-2 text-gray-400"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[11px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
