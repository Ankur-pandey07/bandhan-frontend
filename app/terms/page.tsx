import Image from "next/image";

export const metadata = {
  title: "Terms & Conditions | Bandhan",
  description:
    "Read the terms and conditions governing the use of the Bandhan dating and matrimony platform.",
};

export default function TermsPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="border-b bg-[#FFF7F5]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Clear rules for a safe and respectful community.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 2026
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/terms-illustration.png"
              alt="Terms and conditions"
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
          <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
          <p>
            By accessing or using Bandhan, you agree to be bound by these Terms
            & Conditions. If you do not agree, please discontinue use of the
            platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Eligibility</h2>
          <p>
            Bandhan is intended for users who are at least 18 years of age.
            By using this platform, you confirm that you meet this requirement.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and truthful information</li>
            <li>Respect other users and communicate responsibly</li>
            <li>Do not misuse or attempt to exploit the platform</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Prohibited Activities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Harassment, abuse, or inappropriate behavior</li>
            <li>Posting misleading or harmful content</li>
            <li>Using the platform for unlawful purposes</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Account Suspension & Termination
          </h2>
          <p>
            Bandhan reserves the right to suspend or terminate accounts that
            violate these Terms or pose a risk to other users.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Limitation of Liability
          </h2>
          <p>
            Bandhan is not responsible for user-generated content or offline
            interactions. Use the platform responsibly and at your own risk.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be
            subject to the jurisdiction of Indian courts.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <p>
            For questions regarding these Terms, please contact us at{" "}
            <a
              href="mailto:support@bandhan.app"
              className="text-red-600 hover:underline"
            >
              support@bandhan.app
            </a>.
          </p>
        </div>

      </section>
    </main>
  );
}
