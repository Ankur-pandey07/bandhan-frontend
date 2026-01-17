"use client";

type SessionEndSheetProps = {
  onClose: () => void;
  onGetMore: () => void;
};

export default function SessionEndSheet({
  onClose,
  onGetMore,
}: SessionEndSheetProps) {
  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 flex items-end justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 space-y-5">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-2xl">💙</div>
          <h2 className="text-lg font-semibold">
            Aaj ka free voice session yahin complete hota hai
          </h2>
          <p className="text-sm text-gray-500">
            Umeed hai aapko thoda halka mehsoos hua hoga.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <button
            onClick={onGetMore}
            className="w-full py-3 rounded-xl bg-[#B11226] text-white font-semibold hover:bg-[#9e0f21] transition"
          >
            Get More Minutes
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
          >
            Continue Tomorrow
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-center text-gray-400">
          Aap jab chaho, dubara baat kar sakte hain.
        </p>
      </div>
    </div>
  );
}
