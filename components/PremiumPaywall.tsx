"use client";

import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};

export default function PremiumPaywall({ onClose }: Props) {
  const router = useRouter();

  const handleGoPremium = () => {
    onClose(); // close popup
    router.push("/premium"); 
    // 👆 yahin tumhara premium plan page route
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-2">
          Premium feature 🔒
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Conversation summaries and saving insights are available with Premium.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border px-4 py-2 text-sm"
          >
            Not now
          </button>

          <button
            onClick={handleGoPremium}
            className="flex-1 rounded-xl bg-black text-white px-4 py-2 text-sm"
          >
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
}
