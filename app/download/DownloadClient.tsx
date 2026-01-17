"use client";

import { motion } from "framer-motion";

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Take Bandhan With You
          </h1>
          <p className="text-gray-400 mb-10 text-lg">
            Match, chat, and build meaningful connections anytime, anywhere.
          </p>

          <div className="flex gap-4">
            <img
              src="/images/appstore.png"
              className="h-12 cursor-pointer"
            />
            <img
              src="/images/playstore.png"
              className="h-12 cursor-pointer"
            />
          </div>
        </motion.div>

        {/* PHONE MOCK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <img
            src="/images/phone-mock.png"
            className="w-72 md:w-96 animate-float"
          />
        </motion.div>

      </div>
    </main>
  );
}
