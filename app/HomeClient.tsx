"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

/* ================= FOOTER HELPERS ================= */

function FooterColumn({ title, links }: any) {
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 text-white/80">
        {links.map(([label, href]: any, i: number) => (
          <li key={i}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileAccordion({ title, children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/20 pb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center font-semibold py-2"
      >
        {title}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>

      {open && <div className="pt-2 space-y-2">{children}</div>}
    </div>
  );
}

function FooterLink({ href, children }: any) {
  return <Link href={href}>{children}</Link>;
}

/* ================= HERO IMAGES ================= */

const heroImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
];

/* ================= VERIFIED BADGE ================= */

const VerifiedBadge = () => (
  <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold mt-2">
    ✔ Verified Couple
  </span>
);

/* ================= STAR RATING ================= */

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-1 text-yellow-400 text-sm">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < count ? "★" : "☆"}</span>
    ))}
  </div>
);

/* ================= STORIES ================= */

const stories = [
  {
    img: "/images/couple-1.jpg",
    name: "Ankit & Riya",
    city: "Delhi",
    rating: 5,
    text: "Bandhan helped us find real compatibility.",
  },
  {
    img: "/images/couple-2.jpg",
    name: "Arjun & Neha",
    city: "Pune",
    rating: 5,
    text: "From first chat to marriage, everything felt natural.",
  },
  {
    img: "/images/couple-3.jpg",
    name: "Rahul & Sneha",
    city: "Bangalore",
    rating: 4,
    text: "Verified profiles made a huge difference.",
  },
];

export default function HomeClient() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(
      () => setBgIndex((p) => (p + 1) % heroImages.length),
      6000
    );
    return () => clearInterval(i);
  }, []);

  return (
    <main className="w-full overflow-x-hidden text-red-800">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImages[bgIndex]})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">
            Modern Dating. <br /> Meaningful Marriage.
          </h1>
          <Link
  href="/signup"
  className="bg-red-600 hover:bg-red-700 px-12 py-4 rounded-full text-lg font-semibold transition hover:scale-105"
>
  Get Started
</Link>

        </div>
      </section>

      {/* ================= REAL STORIES ================= */}
      <section className="py-28 bg-[#FFF7F5]">
        <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
          {stories.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6">
              <Image
                src={s.img}
                alt={s.name}
                width={400}
                height={300}
                className="h-56 w-full object-cover rounded-xl mb-4"
              />
              <Stars count={s.rating} />
              <VerifiedBadge />
              <p className="mt-3 italic text-sm">“{s.text}”</p>
              <p className="mt-3 font-semibold text-sm">
                {s.name} · {s.city}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative text-white">

  {/* BACKGROUND */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url(/images/footer-romantic.jpg)" }}
  />
  <div className="absolute inset-0 bg-red-900/70" />

  <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

    {/* BRAND */}
    <div className="grid gap-10 md:grid-cols-2 items-center mb-16">
      <div>
        <h3 className="text-3xl font-bold mb-4">❤️ Bandhan</h3>
        <p className="text-white/80 max-w-md">
          Start something meaningful with trust, compatibility,
          and relationships that truly matter.
        </p>
      </div>

      <div className="flex gap-4 md:justify-end">
        <img src="/images/playstore.png" className="h-12" />
        <img src="/images/appstore.png" className="h-12" />
      </div>
    </div>

    {/* DESKTOP FOOTER */}
    <div className="hidden md:grid grid-cols-5 gap-10 text-sm">

      <FooterColumn
        title="Legal"
        links={[
          ["Privacy Policy", "/privacy"],
          ["Terms & Conditions", "/terms"],
          ["Cookie Policy", "/cookies"],
        ]}
      />

      <FooterColumn
        title="Safety"
        links={[
          ["Safety Guidelines", "/safety"],
          ["Profile Verification", "/verification"],
          ["Report & Block", "/report"],
        ]}
      />

      <FooterColumn
        title="Careers"
        links={[
          ["Careers at Bandhan", "/careers"],
          ["Tech Blog", "/blog"],
          ["Open Roles", "/careers#openings"],
        ]}
      />

      <FooterColumn
        title="FAQ"
        links={[
          ["How Bandhan Works", "/faq"],
          ["Membership Plans", "/pricing"],
          ["Contact Support", "/support"],
        ]}
      />

      {/* SOCIAL ICONS */}
      <div className="flex gap-4 items-center relative z-20">

  {/* Instagram */}
  <a
    href="https://www.instagram.com/bandhan_dil_se_judo/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <img
      src="/icons/instagram.png"
      alt="Instagram"
      className="w-7 h-7 cursor-pointer hover:scale-110 transition"
    />
  </a>

  {/* Email */}
  <a
    href="mailto:priyasharma807676@gmail.com"
    aria-label="Email"
  >
    <img
      src="/icons/email.png"
      alt="Email"
      className="w-7 h-7 cursor-pointer hover:scale-110 transition"
    />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/Bandhan-Dil-Se-Judo"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <img
      src="/icons/facebook.png"
      alt="Facebook"
      className="w-7 h-7 cursor-pointer hover:scale-110 transition"
    />
  </a>

  <a href="https://facebook.com/bandhan" target="_blank">
    <img src="/icons/facebook.png" className="w-7 h-7 cursor-pointer" />
  </a>
</div>


    </div>

    {/* MOBILE FOOTER */}
    <div className="md:hidden space-y-4">
      <MobileAccordion title="Legal">
        <FooterLink href="/privacy">Privacy Policy</FooterLink>
        <FooterLink href="/terms">Terms & Conditions</FooterLink>
        <FooterLink href="/cookies">Cookie Policy</FooterLink>
      </MobileAccordion>

      <MobileAccordion title="Safety">
        <FooterLink href="/safety">Safety Guidelines</FooterLink>
        <FooterLink href="/verification">Profile Verification</FooterLink>
        <FooterLink href="/report">Report & Block</FooterLink>
      </MobileAccordion>

      <MobileAccordion title="Careers">
        <FooterLink href="/careers">Careers at Bandhan</FooterLink>
        <FooterLink href="/blog">Tech Blog</FooterLink>
        <FooterLink href="/careers#openings">Open Roles</FooterLink>
      </MobileAccordion>

      <MobileAccordion title="FAQ">
        <FooterLink href="/faq">How Bandhan Works</FooterLink>
        <FooterLink href="/pricing">Membership Plans</FooterLink>
        <FooterLink href="/support">Contact Support</FooterLink>
      </MobileAccordion>

      <MobileAccordion title="Social">
        <div className="flex gap-4 pt-2">
          <img src="/icons/instagram.svg" className="w-6 h-6" />
          <img src="/icons/email.svg" className="w-6 h-6" />
          <img src="/icons/youtube.svg" className="w-6 h-6" />
          <img src="/icons/facebook.svg" className="w-6 h-6" />
        </div>
      </MobileAccordion>
    </div>

    {/* BOTTOM */}
    <div className="border-t border-white/20 mt-16 pt-8 text-center text-sm text-white/70">
      © 2026 Bandhan. All rights reserved. <br />
      Made in India ❤️
    </div>

  </div>
</footer>

    </main>
  );
}
