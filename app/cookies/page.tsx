import Image from "next/image";

export const metadata = {
  title: "Cookie Policy | Bandhan",
  description:
    "Learn how Bandhan uses cookies to improve your experience and platform performance.",
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="border-b bg-[#FFF7F5]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Transparency about how we use cookies.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/cookie-illustration.png"
              alt="Cookie policy"
              width={320}
              height={320}
              className="w-64 h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-12 text-sm leading-relaxed">

        <div>
          <h2 className="text-xl font-semibold mb-3">What Are Cookies?</h2>
          <p>
            Cookies are small data files stored on your device that help improve
            website functionality and user experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            How We Use Cookies
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To keep you logged in securely</li>
            <li>To analyze traffic and platform usage</li>
            <li>To improve performance and features</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Managing Cookies
          </h2>
          <p>
            You can manage or disable cookies through your browser settings.
            Please note that disabling cookies may affect certain features of
            the platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p>
            If you have any questions about our Cookie Policy, contact us at{" "}
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
