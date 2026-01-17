"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { plan } = useParams();
  const router = useRouter();

  useEffect(() => {
    loadRazorpay();
  }, []);

  const loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => startPayment();
    document.body.appendChild(script);
  };

  const startPayment = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      }
    );

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      name: "Bandhan",
      description: `${plan} Plan`,
      order_id: data.order.id,

      handler: async function (response: any) {
        const verify = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              plan,
            }),
          }
        );

        const result = await verify.json();

        if (result.success) {
          router.push("/dashboard");
        } else {
          alert("Payment failed");
        }
      },

      theme: {
        color: "#E11D48",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Opening secure checkout…</p>
    </div>
  );
}
