"use client";

import { useState } from "react";

export default function LegalSupportSection() {
  const [open, setOpen] = useState<
    null | "help" | "safety" | "terms" | "privacy" | "about"
  >(null);

  return (
    <>
      <Section title="Legal & Support">
        <Row label="Help & Support" onClick={() => setOpen("help")} />
        <Row label="Safety Center" onClick={() => setOpen("safety")} />
        <Row label="Terms of Service" onClick={() => setOpen("terms")} />
        <Row label="Privacy Policy" onClick={() => setOpen("privacy")} />
        <Row label="About Bandhan" onClick={() => setOpen("about")} />
      </Section>

      {open === "help" && (
        <InfoModal title="Help & Support" onClose={() => setOpen(null)}>
          <p className="text-sm text-gray-400">
            Need help? Contact us at <br />
            <span className="text-white">support@bandhan.app</span>
          </p>
        </InfoModal>
      )}

      {open === "safety" && (
        <InfoModal title="Safety Center" onClose={() => setOpen(null)}>
          <p className="text-sm text-gray-400">
            Your safety is our priority. <br />
            Report suspicious profiles and block users anytime.
          </p>
        </InfoModal>
      )}

      {open === "terms" && (
        <InfoModal title="Terms of Service" onClose={() => setOpen(null)}>
          <p className="text-sm text-gray-400 leading-relaxed">
            By using Bandhan, you agree to our terms and conditions.
            This includes respectful behavior, genuine profiles,
            and compliance with applicable laws.
          </p>
        </InfoModal>
      )}

      {open === "privacy" && (
        <InfoModal title="Privacy Policy" onClose={() => setOpen(null)}>
          <p className="text-sm text-gray-400 leading-relaxed">
            We respect your privacy. Your data is stored securely
            and never shared without consent.
          </p>
        </InfoModal>
      )}

      {open === "about" && (
        <InfoModal title="About Bandhan" onClose={() => setOpen(null)}>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bandhan is a modern dating platform focused on
            meaningful connections and trust.
          </p>
        </InfoModal>
      )}
    </>
  );
}

/* ================= UI ================= */

function Section({ title, children }: any) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
        {title}
      </p>
      <div className="rounded-2xl p-5 space-y-3 bg-[#121212] border border-white/5">
        {children}
      </div>
    </div>
  );
}

function Row({ label, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#141414] border border-white/5 cursor-pointer hover:bg-[#1b1b1b]"
    >
      <span className="text-sm">{label}</span>
      <span className="text-sm text-gray-400">›</span>
    </div>
  );
}

/* ================= MODAL ================= */

function InfoModal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end">
      <div className="w-full max-h-[80vh] bg-[#121212] rounded-t-2xl flex flex-col">

        <div className="flex justify-between items-center px-5 py-4 border-b border-white/5">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400">
            Close
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
