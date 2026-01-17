export const metadata = {
  title: "Bandhan Gold | Most Popular Plan",
};

export default function BandhanGoldPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          Bandhan Gold ⭐
        </h1>

        <p className="text-gray-600 mb-12">
          Our most popular plan for serious dating.
        </p>

        <ul className="grid md:grid-cols-2 gap-6 text-left mb-12">
          <li>✅ Unlimited Likes</li>
          <li>✅ See Who Likes You</li>
          <li>✅ Priority Visibility</li>
          <li>✅ Advanced Filters</li>
        </ul>

        <p className="text-3xl font-bold mb-6">₹999 / month</p>

        <a
          href="/checkout/gold"
          className="bg-yellow-500 text-black px-10 py-4 rounded-full font-semibold"
        >
          Get Bandhan Gold
        </a>

      </div>
    </main>
  );
}
