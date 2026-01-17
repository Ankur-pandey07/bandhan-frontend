"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    religion: "",
    caste: "",
    state: "",
    city: "",
    vibeLine: "",
  });

  const [photos, setPhotos] = useState([]);
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(
        `http://localhost:5000/api/profile/get/${userId}`
      );
      const data = await res.json();

      setProfile({
        name: data.name || "",
        age: data.age || "",
        gender: data.gender || "",
        height: data.height || "",
        religion: data.religion || "",
        caste: data.caste || "",
        state: data.state || "",
        city: data.city || "",
        vibeLine: data.vibeLine || "",
      });

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    const userId = localStorage.getItem("userId");

    await axios.post(
      `http://localhost:5000/api/profile/update/${userId}`,
      profile
    );

    setSaving(false);
    alert("Profile updated successfully ✨");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5d6] via-[#f9e19e] to-[#ffe59b] px-5 py-20">

      {/* CARD */}
      <div className="mx-auto w-[95%] md:w-[55%] bg-white/30 backdrop-blur-xl rounded-3xl p-8 border-2 border-yellow-300 shadow-[0px_0px_40px_rgba(255,215,0,0.4)]">

        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-700 drop-shadow">
          ✨ Edit Profile
        </h1>

        {/* INPUTS */}
        <div className="space-y-4">

          <input
            className="inputBox"
            placeholder="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />

          <input
            className="inputBox"
            type="number"
            placeholder="Age"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
          />

          <select
            className="inputBox"
            value={profile.gender}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            className="inputBox"
            placeholder="Height"
            value={profile.height}
            onChange={(e) => setProfile({ ...profile, height: e.target.value })}
          />

          <input
            className="inputBox"
            placeholder="Religion"
            value={profile.religion}
            onChange={(e) => setProfile({ ...profile, religion: e.target.value })}
          />

          <input
            className="inputBox"
            placeholder="Caste"
            value={profile.caste}
            onChange={(e) => setProfile({ ...profile, caste: e.target.value })}
          />

          <input
            className="inputBox"
            placeholder="State"
            value={profile.state}
            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
          />

          <input
            className="inputBox"
            placeholder="City"
            value={profile.city}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
          />

          <textarea
            className="textBox"
            placeholder="Bio / vibe line..."
            value={profile.vibeLine}
            onChange={(e) => setProfile({ ...profile, vibeLine: e.target.value })}
          ></textarea>

        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="saveBtn"
        >
          {saving ? "Saving..." : "💛 Save Changes"}
        </button>

      </div>

      {/* STYLE */}
      <style jsx>{`
        .inputBox {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          border: solid 2px #f5d76e;
          background: white;
          font-size: 16px;
          color: #000;
        }
        .textBox {
          width: 100%;
          padding: 15px;
          height: 80px;
          border-radius: 14px;
          border: solid 2px #f5d76e;
          background: white;
          color: #000;
        }
        .saveBtn {
          margin-top: 20px;
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: linear-gradient(90deg,#ffd700,#ffb300);
          color: black;
          font-weight: bold;
          font-size: 18px;
          border: solid 2px #fff2b8;
          box-shadow: 0 0 20px rgba(255,215,0,0.4);
        }
      `}</style>
    </div>
  );
}
