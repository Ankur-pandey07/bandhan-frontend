"use client";

export default function ProfileScreen() {
  return (
    <div className="max-w-xl mx-auto space-y-6">

      {/* TOP PROFILE */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-[#B11226] p-1">
            <img
              src="https://i.pravatar.cc/150"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-white text-xs px-2 py-1 rounded-full border">
            55%
          </span>
        </div>

        <div>
          <h1 className="text-xl font-semibold">Ankur, 21</h1>
          <button className="mt-1 text-sm px-4 py-1.5 rounded-full border border-gray-300">
            Edit profile
          </button>
        </div>
      </div>

      {/* ABOUT */}
      <div className="bg-white rounded-xl p-4 border">
        <h3 className="text-sm text-gray-500 mb-1">About me</h3>
        <p className="text-sm">
          Calm talks & meaningful conversations.
        </p>
      </div>

      {/* INTERESTS */}
      <div className="bg-white rounded-xl p-4 border">
        <h3 className="text-sm text-gray-500 mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {["Music", "Late talks", "Travel"].map((i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-gray-100"
            >
              {i}
            </span>
          ))}
        </div>
      </div>

      {/* TRUST */}
      <div className="bg-[#FFF5F6] rounded-xl p-4 border border-[#FFD6DB]">
        <p className="text-sm text-[#B11226]">
          ✔ Phone verified · ✔ Safe community
        </p>
      </div>
    </div>
  );
}
