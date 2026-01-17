"use client";

import { useEffect, useState } from "react";

type BlockedUser = {
  id: string;
  name: string;
  blockedAt: number;
};

export default function ProfileSettings() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);

  /* ================= LOAD BLOCKED USERS ================= */
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("bandhan_blocked_users") || "[]"
    );
    setBlockedUsers(data);
  }, []);

  /* ================= UNBLOCK ================= */
  const unblockUser = (id: string) => {
    const updated = blockedUsers.filter((u) => u.id !== id);
    localStorage.setItem(
      "bandhan_blocked_users",
      JSON.stringify(updated)
    );
    setBlockedUsers(updated);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {/* ================= ACCOUNT ================= */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 mb-3">
          Account
        </h2>

        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-xl p-4 text-left text-red-500 shadow-sm"
        >
          Log out
        </button>
      </section>

      {/* ================= SAFETY ================= */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 mb-3">
          Safety
        </h2>

        {/* BLOCKED USERS */}
        <div className="bg-white rounded-xl shadow-sm divide-y">
          <div className="p-4 font-medium">
            Blocked users
          </div>

          {blockedUsers.length === 0 ? (
            <p className="p-4 text-sm text-gray-400">
              You haven’t blocked anyone
            </p>
          ) : (
            blockedUsers.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-4"
              >
                <span>{user.name}</span>
                <button
                  onClick={() => unblockUser(user.id)}
                  className="text-sm text-blue-600"
                >
                  Unblock
                </button>
              </div>
            ))
          )}
        </div>

        {/* SAFETY GUIDELINES */}
        <div className="mt-4 bg-white rounded-xl shadow-sm">
          <button
            onClick={() =>
              alert("Safety & Guidelines page coming soon")
            }
            className="w-full p-4 text-left"
          >
            Safety & Community Guidelines
          </button>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 mb-3">
          About
        </h2>

        <div className="bg-white rounded-xl shadow-sm p-4 text-sm text-gray-600">
          Bandhan © 2026  
          <br />
          Made with ❤️ in India
        </div>
      </section>
    </div>
  );
}
