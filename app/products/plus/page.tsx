export const metadata = {
  title: "Bandhan Plus | Premium Dating",
  description: "Get started with premium features on Bandhan Plus",
};

export default function BandhanPlusPage() {
  return (
    <main className="min-h-screen bg-[#FFF7F5] px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">Bandhan Plus</h1>
        <p className="text-gray-600 mb-12">
          Perfect for starting your premium dating journey.
        </p>

        <ul className="grid md:grid-cols-2 gap-6 text-left mb-12">
          <li>✅ Unlimited Likes</li>
          <li>✅ See Who Likes You</li>
          <li>✅ Rewind Last Swipe</li>
          <li>❌ Priority Visibility</li>
        </ul>

        <p className="text-3xl font-bold mb-6">₹499 / month</p>

        <a
          href="/checkout/plus"
          className="bg-red-600 text-white px-10 py-4 rounded-full font-semibold"
        >
          Get Bandhan Plus
        </a>

      </div>
    </main>
  );
}
