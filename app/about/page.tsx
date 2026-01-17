export const metadata = {
  title: "About Bandhan | Trusted Matrimony Platform in India",
  description:
    "Bandhan is a modern Indian matrimony platform focused on trust, privacy, and meaningful relationships. Learn our values, mission, and journey.",
  keywords: [
    "Bandhan Matrimony",
    "Indian Matrimony",
    "Marriage Website",
    "Find Life Partner",
    "Shaadi Platform",
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFF6F4] text-gray-800">

      {/* ================= HERO / ABOUT US ================= */}
      <section className="pt-32 pb-20 px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center animate-fadeIn">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-red-500">Bandhan</span> – Where Meaningful
            Matches Begin
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            No subscriptions. No pressure. Just real profiles and genuine
            connections built on trust.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">About Us</h2>

          <p className="mt-3 text-gray-600">
            Welcome to Bandhan, a modern matrimony platform designed to help
            individuals find meaningful, long-lasting relationships. We believe
            marriage is a personal journey and should be guided by trust,
            transparency, and compatibility — not sales calls or hidden fees.
          </p>
        </div>

        {/* ABOUT IMAGES */}
        <div className="grid grid-cols-2 gap-4">
          {[
            "/images/about/about4.jpg",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866",
          ].map((img, i) => (
            <div key={i} className="overflow-hidden rounded-3xl bg-[#FFF6F4]">
              <img
                src={img}
                alt="About Bandhan matrimony"
                className="h-64 w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-3 gap-10 animate-fadeIn">
        {[
          {
            title: "What Bandhan Values",
            text:
              "We value authenticity, inclusivity, and respect. Bandhan is built to honor diverse cultures and traditions.",
            img: "/images/about/about1.jpg",
          },
          {
            title: "Why Bandhan Matters",
            text:
              "Finding a life partner is one of life’s most important decisions. Bandhan simplifies this journey.",
            img: "/images/about/about2.jpg",
          },
          {
            title: "How Bandhan Works",
            text:
              "Browse verified profiles, like matches you’re interested in, and connect at your own pace.",
            img: "/images/about/about3.jpg",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl shadow overflow-hidden"
          >
            <div className="overflow-hidden bg-[#FFF6F4]">
              <img
                src={item.img}
                alt={item.title}
                className="h-56 w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ================= IMAGE GALLERY ================= */}
      <section className="max-w-7xl mx-auto px-10 pb-24 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-12">
          Moments That Matter
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "/images/about/about5.jpg",
            "/images/about/about6.jpg",
            "/images/about/about7.jpg",
            "/images/about/about8.jpg",
            "/images/about/about10.jpg",
          ].map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-[#FFF6F4]"
            >
              <img
                src={img}
                alt="Bandhan happy couples gallery"
                className="h-64 w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= WRITE TO US ================= */}
      <section
        className="relative text-white py-24 px-10 animate-fadeIn"
        style={{
          backgroundImage: "url('/images/about/about9.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Write To Us</h2>

            <input
              placeholder="Name"
              className="w-full p-3 rounded bg-white/80 text-black mb-4"
            />
            <input
              placeholder="Email"
              className="w-full p-3 rounded bg-white/80 text-black mb-4"
            />
            <textarea
              placeholder="Feedback"
              className="w-full p-3 rounded bg-white/80 text-black mb-4 h-28"
            />

            <button className="bg-red-500 px-6 py-3 rounded text-white font-semibold">
              Send
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h3 className="text-4xl font-bold text-red-400 mb-4">
              Bandhan
            </h3>
            <p className="text-center text-gray-200">
              Trusted Matrimony Platform
            </p>
          </div>
        </div>

        <p className="relative text-center text-sm text-gray-300 mt-16">
          © 2025 Bandhan Matrimony. All Rights Reserved.
        </p>
      </section>

    </div>
  );
}
