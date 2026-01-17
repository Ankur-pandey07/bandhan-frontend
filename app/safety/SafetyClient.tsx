"use client";

import { motion } from "framer-motion";

const safetyBlocks = [
  {
    icon: "🛡️",
    title: "Verified Profiles Only",
    desc: "Every profile on Bandhan is verified using phone, email, and photo checks to prevent fake accounts.",
  },
  {
    icon: "🔒",
    title: "Data Privacy & Encryption",
    desc: "Your personal information is encrypted and never shared without your consent.",
  },
  {
    icon: "🚫",
    title: "Block & Report Instantly",
    desc: "Uncomfortable interaction? Block or report instantly from any profile or chat.",
  },
  {
    icon: "👩‍🦰",
    title: "Women Safety First",
    desc: "Special safety tools, strict moderation, and fast action for women on Bandhan.",
  },
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32 overflow-x-hidden">

      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center mb-28">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Your Safety Comes First
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-3xl mx-auto"
        >
          Bandhan is built for people who value trust, respect, and genuine
          relationships. We actively protect our community.
        </motion.p>
      </section>

      {/* SAFETY FEATURES */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {safetyBlocks.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-red-600/50 transition"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* REPORT FLOW */}
      <section className="mt-32 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          How Reporting Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-400">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-xl"
          >
            <span className="text-red-500 font-semibold block mb-2">STEP 1</span>
            Open the profile or chat
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 p-8 rounded-xl"
          >
            <span className="text-red-500 font-semibold block mb-2">STEP 2</span>
            Tap “Report” or “Block”
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 p-8 rounded-xl"
          >
            <span className="text-red-500 font-semibold block mb-2">STEP 3</span>
            We investigate & take action
          </motion.div>
        </div>
      </section>

      {/* FOOTER MESSAGE */}
      <section className="mt-32 text-center max-w-3xl mx-auto">
        <p className="text-gray-500 text-sm">
          Bandhan has zero tolerance for harassment, fake profiles, or abusive
          behavior. Your experience matters.
        </p>
      </section>

    </main>
  );
}
