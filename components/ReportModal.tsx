"use client";

import { useState } from "react";

export default function ReportModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm">
        <h2 className="font-semibold mb-3">Report this profile</h2>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        >
          <option value="">Select a reason</option>
          <option>Inappropriate content</option>
          <option>Harassment</option>
          <option>Fake profile</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <button
          onClick={onSubmit}
          className="w-full bg-[#B11226] text-white py-2 rounded-full"
        >
          Submit report
        </button>
      </div>
    </div>
  );
}
