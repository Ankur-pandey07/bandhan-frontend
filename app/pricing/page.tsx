export const metadata = {
  title: "Membership Plans | Bandhan",
};

export default function PricingInfoPage() {
  return (
    <main className="bg-white text-gray-800">
      <section className="bg-[#FFF7F5] border-b">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-red-700 mb-4">
            Membership Plans
          </h1>
          <p className="text-gray-600 text-lg">
            Choose a plan that fits your journey.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 space-y-10 text-sm">
        <div>
          <h2 className="font-semibold text-lg mb-2">Free Membership</h2>
          <p>
            Create a profile, browse matches, and explore Bandhan with
            limited features.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Premium Membership</h2>
          <p>
            Unlock full access including messaging, advanced filters,
            and priority visibility.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">No Hidden Charges</h2>
          <p>
            All plans are transparent with no automatic renewals
            without your consent.
          </p>
        </div>
      </section>
    </main>
  );
}
