import Image from "next/image";

export const metadata = {
  title: "How Bandhan Works | FAQ",
};

export default function FAQPage() {
  return (
    <main className="bg-white text-gray-800">

      <section className="bg-[#FFF7F5] border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              How Bandhan Works
            </h1>
            <p className="text-gray-600 text-lg">
              A simple, safe and meaningful way to find your partner.
            </p>
          </div>

          <Image
            src="/images/faq-illustration.png"
            alt="How it works"
            width={360}
            height={360}
            className="w-72 h-auto mx-auto"
            priority
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 space-y-12 text-sm">
        <div>
          <h2 className="text-xl font-semibold mb-3">Step 1: Create Profile</h2>
          <p>
            Sign up and create your profile with personal details, photos,
            and preferences to help us find compatible matches.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Step 2: Get Verified
          </h2>
          <p>
            Verification ensures authenticity and builds trust within
            the Bandhan community.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Step 3: Match & Connect
          </h2>
          <p>
            Browse profiles, connect with compatible matches,
            and start meaningful conversations.
          </p>
        </div>
      </section>
    </main>
  );
}
