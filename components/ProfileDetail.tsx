"use client";

import { useState } from "react";

export default
 function ProfileDetail({
    
  user,
  onBack,
}: {
  user: any;
  onBack: () => void;
}) {
    const [showWhy, setShowWhy] = useState(false);
    const [showActions, setShowActions] = useState(false);
const [showReport, setShowReport] = useState(false);
const [undoBlock, setUndoBlock] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">

      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b p-4 flex items-center gap-3">
        <button onClick={onBack}>←</button>
        <p className="font-semibold">{user.name}</p>
        <button
  onMouseDown={() => setShowActions(true)}
  onTouchStart={() => setShowActions(true)}
  className="ml-auto text-gray-500"
>
  •••
</button>

{showActions && (
  <SafetyActions
    onReport={() => {
      setShowActions(false);
      setShowReport(true);
    }}
    onBlock={() => {
      setShowActions(false);
      setUndoBlock(true);
      setTimeout(() => setUndoBlock(false), 5000);
    }}
  />
)}
      </div>
      {showReport && (
  <ReportModal
    onClose={() => setShowReport(false)}
    onSubmit={() => {
      setShowReport(false);
      alert("Thanks for letting us know.");
    }}
  />
)}
{undoBlock && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm">
    Profile blocked · <button className="underline ml-2">Undo</button>
  </div>
)}

      {/* MEDIA */}
      <div className="space-y-4 p-4 snap-y snap-mandatory">
        {user.media.map((m: any, i: number) => (
          <div key={i} className="snap-start">
            {m.type === "image" ? (
              <img src={m.src} className="w-full rounded-xl" />
            ) : (
              <video src={m.src} controls className="w-full rounded-xl" />
            )}
          </div>
        ))}
      </div>

      {/* BIO */}
      <div className="p-4">
        <h3 className="font-medium mb-1">About</h3>
        <p className="text-sm text-gray-700">{user.bio}</p>
      </div>
      {/* WHY THIS MATCH */}
<div className="px-4 py-3">
  <button
    onClick={() => setShowWhy((p) => !p)}
    className="flex items-center gap-2 text-sm text-[#B11226] font-medium"
  >
    Why this match?
    <span className="text-gray-400 text-xs">ⓘ</span>
  </button>

  {showWhy && (
    <div className="mt-2 bg-[#FFF7F5] border border-pink-100 rounded-xl p-3 text-sm text-gray-700">
      <p>
        You’re seeing this profile because you’re nearby and share a few
        interests.
      </p>
      <p className="mt-2 text-[11px] text-gray-500">
        This is just a gentle suggestion.
      </p>
    </div>
  )}
</div>
      {/* INTERESTS */}
      <div className="p-4">
        <h3 className="font-medium mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((i: string) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {i}
            </span>
          ))}
        </div>
      </div>

      {/* ACTION */}
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <button className="w-full bg-[#B11226] text-white py-3 rounded-full">
          ❤️ Interested
        </button>
        <p className="text-[11px] text-gray-400 text-center mt-2">
          Your interest will be shared respectfully
        </p>
      </div>
    </div>
  );
}
