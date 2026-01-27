"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

type Section = null | "home" | "report" | "blocked";

export default function SafetyOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [section, setSection] = useState<Section>("home");
  const [reportReason, setReportReason] = useState<string | null>(null);

  const REPORT_REASONS = [
    "Fake profile",
    "Harassment",
    "Inappropriate content",
    "Spam or scam",
    "Underage",
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-30 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* PANEL */}
          <motion.div
            className="fixed top-0 right-0 z-40 h-full w-full sm:w-[420px] bg-black"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 120 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onClose();
            }}
          >
            {/* DRAG HANDLE */}
<div className="flex justify-center pt-2">
  <div className="h-1.5 w-10 rounded-full bg-white/20" />
</div>

            {/* HEADER */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              {section !== "home" ? (
                <button
                  onClick={() => {
                    setSection("home");
                    setReportReason(null);
                  }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <ChevronLeft size={18} />
                </button>
              ) : (
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
              )}

              <div className="flex-1 text-lg font-semibold">
                {section === "report"
                  ? "Report a Profile"
                  : section === "blocked"
                  ? "Blocked Accounts"
                  : "Safety Center"}
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-4 py-4 overflow-y-auto">
              {/* HOME */}
              {section === "home" && (
                <div className="space-y-3">
                  <button
                    onClick={() => alert("Emergency help coming soon")}
                    className="w-full rounded-2xl px-4 py-4
                    bg-red-500/15 text-red-400 font-semibold"
                  >
                    🚨 Emergency Help
                  </button>

                  <button
                    onClick={() => setSection("report")}
                    className="w-full bg-[#141414] rounded-2xl px-4 py-4
                    flex items-center justify-between"
                  >
                    <span>Report a Profile</span>
                    <ChevronRight size={16} />
                  </button>

                  <button
                    onClick={() => setSection("blocked")}
                    className="w-full bg-[#141414] rounded-2xl px-4 py-4
                    flex items-center justify-between"
                  >
                    <span>Blocked Accounts</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* REPORT */}
              {section === "report" && (
                <div className="space-y-3">
                  {!reportReason ? (
                    REPORT_REASONS.map((reason) => (
                      <button
                        key={reason}
                        onClick={() => setReportReason(reason)}
                        className="w-full bg-[#141414] rounded-2xl px-4 py-4 text-left"
                      >
                        {reason}
                      </button>
                    ))
                  ) : (
                    <div className="mt-4">
                      <div className="text-sm mb-3">
                        Reason:{" "}
                        <span className="text-pink-400">
                          {reportReason}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          alert("Report submitted");
                          setSection("home");
                          setReportReason(null);
                        }}
                        className="w-full py-3 rounded-full bg-pink-500 font-semibold"
                      >
                        Submit Report
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* BLOCKED */}
              {section === "blocked" && (
                <div className="text-sm text-white/60 mt-4">
                  No blocked accounts yet.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
