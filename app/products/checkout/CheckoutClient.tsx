"use client";

import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutClient() {
  const params = useSearchParams();
  const plan = params.get("plan") || "Plus";

  const priceMap: any = {
    Plus: 499,
    Gold: 999,
    Platinum: 1499,
  };

  const handlePayment = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: priceMap[plan],
          plan,
        }),
      }
    );

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Bandhan",
      description: `${plan} Plan`,
      order_id: order.id,
      handler: function (response: any) {
        alert("Payment Successful 🎉");
        console.log(response);
      },
      theme: { color: "#dc2626" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFF7F5] px-6">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">
          {plan} Plan
        </h1>

        <p className="text-gray-600 mb-6">
          ₹{priceMap[plan]} / month
        </p>

        <button
          onClick={handlePayment}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
        >
          Pay Securely
        </button>
      </div>
    </main>
  );
}
