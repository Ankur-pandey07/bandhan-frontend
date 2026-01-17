import Image from "next/image";

export const metadata = {
  title: "Profile Verification | Bandhan",
  description:
    "Understand how profile verification works on Bandhan to build trust and authenticity.",
};

export default function VerificationPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-[#FFF7F5] border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Profile Verification
            </h1>
            <p className="text-gray-600 text-lg">
              Building trust through verified identities.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/verification-illustration.png"
              alt="Profile verification"
              width={360}
              height={360}
              className="w-72 h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-14 text-sm leading-relaxed">

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Why Verification Matters
          </h2>
          <p>
            Verified profiles help create a safer and more authentic
            community by reducing fake or misleading accounts.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            How Verification Works
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Upload required profile details</li>
            <li>Submit verification documents or selfie</li>
            <li>Our team reviews and approves the profile</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Verified Badge
          </h2>
          <p>
            Once verified, your profile displays a verified badge,
            helping others recognize your authenticity.
          </p>
        </div>

      </section>
    </main>
  );
}
