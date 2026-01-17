"use client";

import { useState } from "react";

export default function SafetyActions({
  onBlock,
  onReport,
}: {
  onBlock: () => void;
  onReport: () => void;
}) {
  return (
    <div className="absolute top-12 right-3 z-50 bg-white border shadow-md rounded-xl overflow-hidden text-sm">
      <button
        onClick={onReport}
        className="block w-full px-4 py-3 text-left hover:bg-gray-100"
      >
        Report
      </button>
      <button
        onClick={onBlock}
        className="block w-full px-4 py-3 text-left text-red-600 hover:bg-gray-100"
      >
        Block
      </button>
    </div>
  );
}
