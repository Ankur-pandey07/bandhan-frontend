import Image from "next/image";

export const metadata = {
  title: "Bandhan Tech Blog",
  description: "Engineering, product and trust at Bandhan.",
};

export default function BlogPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-[#FFF7F5] border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Bandhan Tech Blog
            </h1>
            <p className="text-gray-600 text-lg">
              Engineering, product decisions, and building trust at Bandhan.
            </p>
          </div>

          <Image
            src="/images/blog-illustration.png"
            alt="Bandhan tech blog"
            width={360}
            height={360}
            className="w-72 h-auto mx-auto"
            priority
          />
        </div>
      </section>

      {/* BLOG LIST */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-12 text-sm">

        <article>
          <h2 className="text-lg font-semibold mb-2">
            Building Trust in a Dating Platform
          </h2>
          <p className="text-gray-600">
            How Bandhan focuses on verification, safety, and privacy-first
            design to build a trusted dating experience.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            January 2026
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold mb-2">
            Designing for Meaningful Relationships
          </h2>
          <p className="text-gray-600">
            The product principles behind compatibility, respect,
            and long-term connections.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            January 2026
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold mb-2">
            Scaling Bandhan with Modern Tech
          </h2>
          <p className="text-gray-600">
            How modern web technologies help Bandhan scale securely
            and reliably.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            January 2026
          </p>
        </article>

      </section>
    </main>
  );
}
