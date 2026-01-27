"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RelationshipForm = {
  yourName: string;
  partnerName: string;
  yourDOB: string;
  partnerDOB: string;
  yourPlace: string;
  partnerPlace: string;
  yourZodiac: string;
  partnerZodiac: string;
  yourColor?: string;
  partnerColor?: string;
  duration: string;
};

export default function RelationshipInsightPage() {

const router = useRouter();
const [canContinueChat, setCanContinueChat] = useState(false);


  /* ---------------- WELCOME BG SLIDES ---------------- */
  const bgImages = [
    "/images/ri/welcome-1.jpg",
    "/images/ri/welcome-2.jpg",
    "/images/ri/welcome-3.jpg",
  ];

const [form, setForm] = useState<RelationshipForm>({
  yourName: "",
  partnerName: "",
  yourDOB: "",
  partnerDOB: "",
  yourPlace: "",
  partnerPlace: "",
  yourZodiac: "",
  partnerZodiac: "",
  yourColor: "",
  partnerColor: "",
  duration: "",
});

 const isValid =
    form.yourName &&
    form.partnerName &&
    form.yourDOB &&
    form.partnerDOB &&
    form.yourPlace &&
    form.partnerPlace &&
    form.duration;

const userId = "demo-user-123"; 
// later auth se replace hoga

/* ---------------- SUBMIT FORM ---------------- */
const handleSubmit = async () => {
  if (!isValid) return;

  localStorage.setItem("relationship_profile", JSON.stringify(form));
  localStorage.setItem("relationship_profile_confirmed", "false");

  await fetch("/soulverse/relationship/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify({ userId, ...form }),
  });

  router.push("/soulverse/relationship/chat");
};


/* ---------------- HELPERS ---------------- */
  function getZodiac(dob: string): string {
    if (!dob) return "";
    const d = new Date(dob).getDate();
    const m = new Date(dob).getMonth() + 1;

    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "Aries";
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "Taurus";
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "Gemini";
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "Cancer";
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "Leo";
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "Virgo";
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "Libra";
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "Scorpio";
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21))
      return "Sagittarius";
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19))
      return "Capricorn";
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18))
      return "Aquarius";
    return "Pisces";
  }

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow space-y-4">
      <h2 className="text-lg font-medium">{title}</h2>
      {children}
    </div>
  );
}


function FormCard({
  title,
  children,
  onNext,
  disabled,
}: {
  title: string;
  children: React.ReactNode;
  onNext: () => void;
  disabled: boolean;
}) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow">
      <h2 className="text-lg font-medium mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>

      <button
        disabled={disabled}
        onClick={onNext}
        className="mt-6 underline text-sm disabled:opacity-40"
      >
        continue
      </button>
    </div>
  );
}

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((i) => (i + 1) % bgImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const hasProfile = !!localStorage.getItem("relationship_profile");
  const hasChat = !!localStorage.getItem("relationship_chat");

  if (hasProfile || hasChat) {
    setCanContinueChat(true);
  }
}, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1F1F1F] px-6 py-16">
{canContinueChat && (
  <button
    onClick={() => router.push("/soulverse/relationship/chat")}
    className="w-full mt-4 text-sm underline text-gray-600"
  >
    Continue where you left off
  </button>
)}


      <> 
      {/* ================= WELCOME SECTION ================= */}
      <section className="relative h-[70vh] overflow-hidden">
        {bgImages.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-[#0F0F0F] transition-opacity duration-[2000ms] ${
              i === bgIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">
              Welcome to Relationship Insight
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              This space is designed to help you understand your relationship better.
              <br />
              There’s no judgement here — and no pressure to be perfect.
            </p>
          </div>
        </div>
      </section>
      

      {/* ================= WHAT YOU’LL FIND ================= */}
     <section className="max-w-4xl mx-auto px-6 -mt-20 relative z-20 mb-24">

        <div className="bg-white rounded-3xl px-10 py-12 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
          <h2 className="text-lg font-medium mb-8 text-center">
            What you’ll find here
          </h2>
          <ul className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <li>• A calm space to talk things through</li>
            <li>• Gentle questions that help you reflect</li>
            <li>• Honest guidance — no predictions or fixed outcomes</li>
            <li>• You decide what to share, and at what pace</li>
          </ul>
        </div>
      </section>
<div className="h-px bg-black/5 my-16" />

 {/* ================= FORM ================= */}
  <div
    className="
      max-w-2xl mx-auto mt-20
      bg-[#FFF7E8]/80 backdrop-blur-xl
      rounded-3xl p-10
      shadow-[0_30px_80px_rgba(0,0,0,0.08)]
      space-y-10
    "
  >
   <h1 className="text-2xl font-semibold text-center">
      Relationship Details
    </h1>

    {/* ========== SECTION 1: BASIC IDENTITY ========== */}
    <div className="bg-white/80 rounded-2xl p-6 space-y-4 shadow">
      <h2 className="text-base font-medium">Basic Identity</h2>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          className="form-input"
          name="yourName"
          placeholder="Your full name *"
          value={form.yourName}
          onChange={(e) =>
            setForm({ ...form, yourName: e.target.value })
          }
        />

        <input
          className="form-input"
          name="partnerName"
          placeholder="Partner’s full name *"
          value={form.partnerName}
          onChange={(e) =>
            setForm({ ...form, partnerName: e.target.value })
          }
        />

        {/* connection line */}
        <div className="
          hidden md:block
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-px h-12
          bg-gradient-to-b
          from-transparent via-black/20 to-transparent
        " />
      </div>
    </div>

   {/* ========== SECTION 2: BIRTH DETAILS ========== */}
<div className="bg-white/80 rounded-2xl p-6 space-y-4 shadow">
  <h2 className="text-base font-medium">Birth Details</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Your DOB */}
    <input
      className="form-input"
      type="date"
      value={form.yourDOB}
      onChange={(e) => {
        const dob = e.target.value;
        setForm({
          ...form,
          yourDOB: dob,
          yourZodiac: getZodiac(dob),
        });
      }}
    />

    {/* Partner DOB */}
    <input
      className="form-input"
      type="date"
      value={form.partnerDOB}
      onChange={(e) => {
        const dob = e.target.value;
        setForm({
          ...form,
          partnerDOB: dob,
          partnerZodiac: getZodiac(dob),
        });
      }}
    />
  </div>

  {/* Zodiac row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
    {/* Your Zodiac */}
    <select
      className="form-input"
      value={form.yourZodiac}
      onChange={(e) =>
        setForm({ ...form, yourZodiac: e.target.value })
      }
    >
      <option value="">Your zodiac</option>
      <option>Aries</option>
      <option>Taurus</option>
      <option>Gemini</option>
      <option>Cancer</option>
      <option>Leo</option>
      <option>Virgo</option>
      <option>Libra</option>
      <option>Scorpio</option>
      <option>Sagittarius</option>
      <option>Capricorn</option>
      <option>Aquarius</option>
      <option>Pisces</option>
    </select>

    {/* Partner Zodiac */}
    <select
      className="form-input"
      value={form.partnerZodiac}
      onChange={(e) =>
        setForm({ ...form, partnerZodiac: e.target.value })
      }
    >
      <option value="">Partner zodiac</option>
      <option>Aries</option>
      <option>Taurus</option>
      <option>Gemini</option>
      <option>Cancer</option>
      <option>Leo</option>
      <option>Virgo</option>
      <option>Libra</option>
      <option>Scorpio</option>
      <option>Sagittarius</option>
      <option>Capricorn</option>
      <option>Aquarius</option>
      <option>Pisces</option>
    </select>
  </div>
</div>

    {/* ========== SECTION 3: BIRTH PLACE ========== */}
    <div className="bg-white/80 rounded-2xl p-6 space-y-4 shadow">
      <h2 className="text-base font-medium">Birth Place</h2>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          className="form-input"
          name="yourPlace"
          placeholder="Your place of birth *"
          value={form.yourPlace}
          onChange={(e) =>
            setForm({ ...form, yourPlace: e.target.value })
          }
        />

        <input
          className="form-input"
          name="partnerPlace"
          placeholder="Partner’s place of birth *"
          value={form.partnerPlace}
          onChange={(e) =>
            setForm({ ...form, partnerPlace: e.target.value })
          }
        />

        <div className="
          hidden md:block
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-px h-12
          bg-gradient-to-b
          from-transparent via-black/20 to-transparent
        " />
      </div>
    </div>

    {/* ========== SECTION 4: PERSONAL TASTE ========== */}
    <div className="bg-white/80 rounded-2xl p-6 space-y-4 shadow">
      <h2 className="text-base font-medium">Personal Taste (optional)</h2>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          className="form-input"
          name="yourColor"
          placeholder="Your favourite colour"
          value={form.yourColor}
          onChange={(e) =>
            setForm({ ...form, yourColor: e.target.value })
          }
        />

        <input
          className="form-input"
          name="partnerColor"
          placeholder="Partner’s favourite colour"
          value={form.partnerColor}
          onChange={(e) =>
            setForm({ ...form, partnerColor: e.target.value })
          }
        />

        <div className="
          hidden md:block
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-px h-12
          bg-gradient-to-b
          from-transparent via-black/20 to-transparent
        " />
      </div>
    </div>

    {/* ========== SECTION 5: RELATIONSHIP ========== */}
    <div className="bg-white/80 rounded-2xl p-6 space-y-4 shadow">
      <h2 className="text-base font-medium">Relationship</h2>

      <select
        className="form-input"
        name="duration"
        value={form.duration}
        onChange={(e) =>
          setForm({ ...form, duration: e.target.value })
        }
      >
        <option value="">Relationship duration *</option>
        <option>Less than 6 months</option>
        <option>6–12 months</option>
        <option>1–3 years</option>
        <option>More than 3 years</option>
      </select>
    </div>

    <button
      disabled={!isValid}
      onClick={handleSubmit}
      className="
        w-full py-3 rounded-xl
        bg-black text-white
        disabled:opacity-40
        transition
      "
    >
      Submit
    </button>
    

  </div>

      {/* ================= HERO GLASS CARD (MOVED DOWN) ================= */}
      <section className="max-w-6xl mx-auto px-6 mt-28 pb-32">
        <div className="rounded-[32px] bg-white/30 backdrop-blur-xl p-6 shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                img: "/images/ri/hero-1.jpg",
                text: "Distance doesn’t always mean disconnection.",
              },
              {
                img: "/images/ri/hero-2.jpg",
                text: "Some things don’t need fixing — just understanding.",
              },
              {
                img: "/images/ri/hero-3.jpg",
                text: "Not every feeling has a clear name.",
              },
              {
                img: "/images/ri/hero-4.jpg",
                text: "Patterns make sense when you slow down.",
              },
            ].map((c) => (
              <div
                key={c.img}
                className="relative h-56 rounded-2xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${c.img})` }}
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-sm leading-relaxed">

              {c.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  </>
    </div>
  );
}