"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type MoodModalProps = {
  mood: string;
  onClose: () => void;
  onSubmit: (note: string) => void;
};

export default function MoodModal({
  mood,
  onClose,
  onSubmit,
}: MoodModalProps) {
  const [note, setNote] = useState("");
  const [mounted, setMounted] = useState(false);

  // ✅ Ensure portal works only on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-end lg:items-center justify-center">
      
      {/* MODAL CONTAINER */}
      <div className="bg-white w-full lg:max-w-lg rounded-t-3xl lg:rounded-2xl p-6 max-h-[85vh] overflow-y-auto">

        <h2 className="text-lg font-semibold mb-1">
          Aap {mood} feel kar rahe hain
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Agar aap chaho, 2–3 line me bata sakte ho
        </p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Yahan likhiye (optional)"
          className="w-full h-24 border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#B11226]"
        />

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(note)}
            className="flex-1 py-3 rounded-xl bg-[#B11226] text-white font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
