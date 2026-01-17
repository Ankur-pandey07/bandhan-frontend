"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ ALL HOOKS FIRST
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [desktopProducts, setDesktopProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          { credentials: "include" }
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  // ✅ NOW condition AFTER ALL HOOKS
  if (
  pathname === "/login" ||
  pathname === "/signup" ||
  pathname === "/signup/verify-email" ||
  pathname.startsWith("/dashboard")
) {
  return null;
}


  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      { method: "POST", credentials: "include" }
    );
    setUser(null);
    router.push("/");
  };

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 backdrop-blur shadow-sm text-gray-900"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            ❤️ Bandhan
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative">
            <div
              className="relative"
              onMouseEnter={() => setDesktopProducts(true)}
              onMouseLeave={() => setDesktopProducts(false)}
            >
              <button className="hover:underline">Products</button>

              {desktopProducts && (
                <div className="absolute top-10 left-0 bg-white text-black rounded-xl shadow-xl w-56 p-4 space-y-3">
                  <Link href="/products/premium">⭐ Premium Features</Link>
                  <Link href="/products/plus">👑 Bandhan Plus</Link>
                  <Link href="/products/gold">💛 Bandhan Gold</Link>
                  <Link href="/products/platinum">💎 Bandhan Platinum</Link>
                </div>
              )}
            </div>

            <Link href="/learn">Learn</Link>
            <Link href="/about">About Us</Link>
            <Link href="/safety">Safety</Link>
            <Link href="/support">Support</Link>
            <Link href="/download">Download</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {!loading && !user && (
              <Link
                href="/login"
                className={`px-6 py-2 rounded-full font-semibold transition
                ${
                  scrolled
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Log in
              </Link>
            )}

            {!loading && user && (
              <>
                <span className="text-sm">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenu(false)}
          />

          <div className="relative w-72 bg-black text-white p-6 flex flex-col animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">❤️ Bandhan</span>
              <button onClick={() => setMobileMenu(false)}>✕</button>
            </div>

            <div className="mb-6">
              <button
                onClick={() => setOpenProducts(!openProducts)}
                className="w-full flex justify-between items-center py-3"
              >
                <span>Products</span>
                <span className={`${openProducts ? "rotate-180" : ""}`}>▾</span>
              </button>

              {openProducts && (
                <div className="mt-2 ml-2 flex flex-col gap-3 text-sm">
                  <Link href="/products/premium">⭐ Premium Features</Link>
                  <Link href="/products/plus">👑 Bandhan Plus</Link>
                  <Link href="/products/gold">💛 Bandhan Gold</Link>
                  <Link href="/products/platinum">💎 Bandhan Platinum</Link>
                </div>
              )}
            </div>

            {!user ? (
              <Link href="/login" className="bg-white text-black py-3 rounded-full text-center">
                Log in
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-3 rounded-full"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
