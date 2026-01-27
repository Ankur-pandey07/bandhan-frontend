"use client";

import { useEffect, useState } from "react";

export default function AccountSection() {
  const [open, setOpen] = useState<
    null | "phone" | "email" | "password" | "delete"
  >(null);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("accountSettings");
    if (saved) {
      const d = JSON.parse(saved);
      setPhone(d.phone || "");
      setEmail(d.email || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "accountSettings",
      JSON.stringify({ phone, email })
    );
  }, [phone, email]);

  return (
    <>
      <Section title="Account">
        <Row label="Phone Number" value={phone} onClick={() => setOpen("phone")} />
        <Row label="Email" value={email} onClick={() => setOpen("email")} />
        <Row label="Change Password" onClick={() => setOpen("password")} />
        <Row label="Delete Account" danger onClick={() => setOpen("delete")} />
      </Section>

      {open === "phone" && (
        <InputModal
          title="Phone Number"
          value={phone}
          onDone={(v) => {
            setPhone(v);
            setOpen(null);
          }}
          onClose={() => setOpen(null)}
        />
      )}

      {open === "email" && (
        <InputModal
          title="Email"
          value={email}
          onDone={(v) => {
            setEmail(v);
            setOpen(null);
          }}
          onClose={() => setOpen(null)}
        />
      )}

      {open === "password" && (
        <PasswordModal onClose={() => setOpen(null)} />
      )}

      {open === "delete" && (
        <DeleteModal onClose={() => setOpen(null)} />
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

function Row({ label, value, danger, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center px-4 py-3 rounded-xl border border-white/5 cursor-pointer
      ${danger ? "bg-[#141414] hover:bg-red-500/10" : "bg-[#141414] hover:bg-[#1b1b1b]"}`}
    >
      <span className={danger ? "text-red-500" : "text-sm"}>{label}</span>
      <span className="text-sm text-gray-400">{value || "›"}</span>
    </div>
  );
}

/* ================= MODAL ================= */

function Modal({ title, children, onClose, onDone }: any) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70">
      <div className="absolute bottom-0 w-full bg-[#121212] rounded-t-2xl max-h-[85vh] overflow-y-auto pb-40">
        <div className="flex justify-between items-center px-5 py-4 border-b border-white/5">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400">
            Close
          </button>
        </div>

        <div className="px-5 py-4">{children}</div>
      </div>

      {/* ✅ FIXED DONE BUTTON (ALWAYS VISIBLE) */}
      <div className="fixed left-0 right-0 bottom-20 px-5 z-50">
        <button
          onClick={onDone}
          className="w-full py-3 rounded-xl bg-pink-500 text-black font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}

/* ================= MODALS ================= */

function InputModal({ title, value, onDone, onClose }: any) {
  const [val, setVal] = useState(value);

  return (
    <Modal
      title={title}
      onClose={onClose}
      onDone={() => onDone(val)}
    >
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full p-3 rounded-xl bg-[#141414] border border-white/5"
        placeholder="Enter value"
      />
    </Modal>
  );
}

function PasswordModal({ onClose }: any) {
  return (
    <Modal
      title="Change Password"
      onClose={onClose}
      onDone={onClose}
    >
      <input
        type="password"
        placeholder="Current password"
        className="w-full p-3 rounded-xl bg-[#141414] border border-white/5 mb-3"
      />
      <input
        type="password"
        placeholder="New password"
        className="w-full p-3 rounded-xl bg-[#141414] border border-white/5"
      />
    </Modal>
  );
}

function DeleteModal({ onClose }: any) {
  return (
    <Modal
      title="Delete Account"
      onClose={onClose}
      onDone={onClose}
    >
      <p className="text-sm text-gray-400 mb-4">
        This action is permanent and cannot be undone.
      </p>
      <button className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold">
        Delete Account
      </button>
    </Modal>
  );
}
