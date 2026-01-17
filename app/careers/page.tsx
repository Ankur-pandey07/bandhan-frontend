import Image from "next/image";

export const metadata = {
  title: "Careers at Bandhan",
};

export default function CareersPage() {
  return (
    <main className="bg-white text-gray-800">

      <section className="bg-[#FFF7F5] border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Careers at Bandhan
            </h1>
            <p className="text-gray-600 text-lg">
              Build meaningful products that connect lives.
            </p>
          </div>

          <Image
            src="/images/careers-illustration.png"
            alt="Careers at Bandhan"
            width={360}
            height={360}
            className="w-72 h-auto mx-auto"
            priority
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 space-y-10 text-sm">
        <p>
          Bandhan is a growing dating & matrimony platform focused
          on trust, technology, and meaningful connections.
        </p>

        <p>
          We value innovation, inclusivity, and responsibility.
          If you want to build products that matter, you’re in
          the right place.
       ️
        </p>

        <p>
          📧 Send your resume to{" "}
          <a
            href="mailto:careers@bandhan.app"
            className="text-red-600 hover:underline"
          >
            careers@bandhan.app
          </a>
        </p>
      </section>
    </main>
  );
}
