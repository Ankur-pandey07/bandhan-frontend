import Image from "next/image";

export const metadata = {
  title: "Report & Block | Bandhan",
  description:
    "Learn how to report inappropriate behavior and block users on Bandhan.",
};

export default function ReportPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-[#FFF7F5] border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Report & Block
            </h1>
            <p className="text-gray-600 text-lg">
              We take your concerns seriously and act promptly.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/report-illustration.png"
              alt="Report and block"
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
            When to Report
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Harassment or abusive behavior</li>
            <li>Fake or misleading profiles</li>
            <li>Spam or suspicious activity</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            How Reporting Works
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Select the profile or message</li>
            <li>Choose a reason for reporting</li>
            <li>Submit — our team reviews it confidentially</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Blocking a User
          </h2>
          <p>
            Blocking prevents further communication with the user.
            Blocked users are not notified.
          </p>
        </div>

      </section>
    </main>
  );
}
