export const metadata = {
  title: "Bandhan Platinum | Ultimate Dating",
};

export default function BandhanPlatinumPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          Bandhan Platinum 💎
        </h1>

        <p className="text-gray-300 mb-12">
          Maximum visibility. Maximum results.
        </p>

        <ul className="grid md:grid-cols-2 gap-6 text-left mb-12">
          <li>✅ All Gold Features</li>
          <li>✅ Profile Boosts</li>
          <li>✅ Top Profile Placement</li>
          <li>✅ Verified Priority Badge</li>
        </ul>

        <p className="text-3xl font-bold mb-6">₹1499 / month</p>

        <a
          href="/checkout/platinum"
          className="bg-blue-500 px-10 py-4 rounded-full font-semibold"
        >
          Get Bandhan Platinum
        </a>

      </div>
    </main>
  );
}
