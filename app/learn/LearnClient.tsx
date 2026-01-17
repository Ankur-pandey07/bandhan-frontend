"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tips = [
  {
    title: "Be Clear With Intentions",
    desc: "Honest intentions lead to meaningful connections. Say what you want early.",
    icon: "💬",
  },
  {
    title: "Respect Over Impressing",
    desc: "Respect is more attractive than cheesy lines or fake confidence.",
    icon: "🤝",
  },
  {
    title: "Quality Conversations",
    desc: "Deep conversations build stronger bonds than endless small talk.",
    icon: "🧠",
  },
  {
    title: "Take Things Slow",
    desc: "Strong relationships grow with patience, not pressure.",
    icon: "⏳",
  },
  {
    title: "Safety First",
    desc: "Trust your instincts. Block or report anything uncomfortable.",
    icon: "🛡️",
  },
  {
    title: "Offline Matters Too",
    desc: "Healthy dating balances digital connection with real-world values.",
    icon: "🌍",
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white px-6 py-32 overflow-x-hidden">

      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Learn the Art of Meaningful Dating
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-3xl mx-auto"
        >
          Modern dating works best when respect, clarity, and emotional
          intelligence come first.
        </motion.p>
      </section>

      {/* TIPS GRID */}
      <section className="max-w-6xl mx-auto">

        {/* Mobile Swipe */}
        <div className="flex gap-6 overflow-x-auto md:hidden pb-6">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[260px] bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="text-3xl mb-4">{tip.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
              <p className="text-gray-400 text-sm">{tip.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-red-600/50 transition"
            >
              <div className="text-3xl mb-4">{tip.icon}</div>
              <h3 className="font-semibold text-xl mb-3">{tip.title}</h3>
              <p className="text-gray-400 text-sm">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          Want Better Matches?
        </motion.h2>

        <p className="text-gray-400 mb-10">
          Premium members get more visibility and meaningful connections.
        </p>

        <Link
          href="/products/premium"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition"
        >
          Explore Premium
        </Link>
      </section>

    </main>
  );
}
