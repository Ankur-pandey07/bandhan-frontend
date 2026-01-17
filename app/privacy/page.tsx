import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Bandhan",
  description:
    "Learn how Bandhan collects, uses, and protects your personal information with transparency and care.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* ================= HERO ================= */}
      <section className="border-b bg-[#FFF7F5]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-2 items-center">

          <div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Your privacy matters to us.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 2026
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/privacy-illustration.png"
              alt="Data protection and privacy"
              width={360}
              height={360}
              className="w-72 h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-14 text-sm leading-relaxed">

        {/* INTRO */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p>
            Bandhan (“we”, “our”, or “us”) is committed to protecting your
            personal information and respecting your privacy. This Privacy
            Policy explains how we collect, use, store, and safeguard your data
            when you use the Bandhan website or mobile application.
          </p>
        </div>

        {/* INFO COLLECT */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal details such as name, email address, and phone number</li>
            <li>Profile information including photos, preferences, and bio</li>
            <li>Communication data related to messages and interactions</li>
            <li>
              Technical data such as IP address, device type, browser, and usage
              patterns
            </li>
          </ul>
        </div>

        {/* USAGE */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To create, manage, and improve your account</li>
            <li>To provide relevant matches and personalized experiences</li>
            <li>To enhance safety, security, and fraud prevention</li>
            <li>To communicate updates, offers, and customer support</li>
          </ul>
        </div>

        {/* SECURITY */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Data Protection & Security
          </h2>
          <p>
            We use industry-standard security measures to protect your data,
            including secure servers, encryption, and restricted internal
            access. Your personal information is never sold to third parties.
          </p>
        </div>

        {/* SHARING */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Sharing of Information
          </h2>
          <p>
            We do not share your personal data with third parties except when
            required by law, for safety reasons, or to prevent fraud and misuse
            of the platform.
          </p>
        </div>

        {/* RIGHTS */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and review your personal data</li>
            <li>Update or correct your information</li>
            <li>Request deletion of your account</li>
            <li>Withdraw consent for certain data usage</li>
          </ul>
        </div>

        {/* COOKIES */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Cookies & Tracking
          </h2>
          <p>
            Bandhan uses cookies and similar technologies to improve user
            experience and analyze platform performance. Please refer to our{" "}
            <Link href="/cookies" className="text-red-600 hover:underline">
              Cookie Policy
            </Link>{" "}
            for more information.
          </p>
        </div>

        {/* CHANGES */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
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
