"use client";

import { useEffect } from "react";

export default function PaymentPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("bandhan_user") || "{}");

    const res = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 299 }),
    });

    const order = await res.json();

    const options = {
      key: "rzp_test_Rqo6PPGzK2CcHr", // ✅ YOUR TEST KEY
      amount: order.amount,
      currency: "INR",
      name: "Bandhan Premium",
      description: "Premium Membership",
      order_id: order.id,

      handler: async function (response: any) {
        await fetch("http://localhost:5000/api/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: user._id,
          }),
        });

        alert("🎉 Payment Successful! Premium Activated");

        // update local user
        user.isPremium = true;
        localStorage.setItem("bandhan_user", JSON.stringify(user));

        window.location.href = "/dashboard";
      },

      theme: { color: "#B11226" },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F5]">
      <button
        onClick={handlePayment}
        className="bg-[#B11226] text-white px-10 py-4 rounded-xl text-lg font-semibold"
      >
        Pay ₹299 & Go Premium
      </button>
    </div>
  );
}
