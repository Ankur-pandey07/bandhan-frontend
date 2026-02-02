"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type UserInfo = {
  role: "user" | "admin";
};

export default function Navbar() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    // 🔹 Cookie se role read karne ka simple tareeka
    // (client side me cookie direct read mushkil hota hai,
    // isliye hum localStorage ka light use kar rahe hain)
    const storedRole = localStorage.getItem("userRole");

    if (storedRole === "admin" || storedRole === "user") {
      setUser({ role: storedRole });
    }
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#111",
        color: "#fff",
      }}
    >
      <Link href="/" style={{ fontWeight: "bold" }}>
        Bandhan 💖
      </Link>

      <div style={{ display: "flex", gap: "16px" }}>
        <Link href="/dashboard">Dashboard</Link>

        {/* 🔑 ADMIN PANEL BUTTON — ONLY FOR ADMIN */}
       {user?.role === "admin" && (
  <>
    <Link href="/admin/dashboard">Admin Panel</Link>
    <Link href="/admin/notifications">Notifications</Link> {/* ✅ ADD */}
  </>
)}


        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
