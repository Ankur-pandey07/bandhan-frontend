import SupportClient from "./SupportClient";

export const metadata = {
  title: "Contact Support | Bandhan",
};

export default function SupportPage() {
  return (
    <main className="bg-white text-gray-800">

      <section className="bg-[#FFF7F5] border-b">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-red-700 mb-4">
            Contact Support
          </h1>
          <p className="text-gray-600 text-lg">
            We’re here to help you at every step.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 space-y-8 text-sm">
        <p>
          For any questions, concerns, or assistance related to your account,
          safety, or subscriptions, feel free to contact us.
        </p>

        <p className="text-lg">
          📧{" "}
          <a
            href="mailto:support@bandhan.app"
            className="text-red-600 font-semibold hover:underline"
          >
            support@bandhan.app
          </a>
        </p>

        <p className="text-gray-500">
          Response time: within 24 hours
        </p>
      </section>
    </main>
  );
}
