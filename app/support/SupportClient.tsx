"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Is Bandhan free to use?",
    a: "Yes. You can create a profile, explore matches, and chat with basic limits for free.",
  },
  {
    q: "How do I report someone?",
    a: "Open the profile or chat, tap the Report option, and our team will review immediately.",
  },
  {
    q: "Is my data safe on Bandhan?",
    a: "Absolutely. Your data is encrypted and never shared without consent.",
  },
  {
    q: "How can I delete my account?",
    a: "Go to Settings → Account → Delete Account. It’s quick and permanent.",
  },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white px-6 py-32">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        >
          Support & Help
        </motion.h1>

        <p className="text-gray-600 text-center mb-20">
          We’re here to help you have a safe and meaningful experience.
        </p>

        {/* FAQ */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 font-medium"
              >
                {item.q}
                <span>{open === i ? "−" : "+"}</span>
              </button>

              {open === i && (
                <div className="px-6 pb-6 text-gray-600 text-sm">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Reach out to our support team anytime.
          </p>
          <a
            href="mailto:support@bandhan.app"
            className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            Contact Support
          </a>
        </div>

      </div>
    </main>
  );
}
