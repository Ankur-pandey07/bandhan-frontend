"use client";

import { useState } from "react";
import axios from "axios";

export default function CreateProfilePage() {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    lookingFor: "",
    location: "",
    bio: "",
    interests: [],
  });

  const [photos, setPhotos] = useState([]);
  const [reel, setReel] = useState(null);
  const [loading, setLoading] = useState(false);

  const interestsList = [
    "Music",
    "Travel",
    "Food",
    "Movies",
    "Fitness",
    "Photography",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleInterest = (item) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files.slice(0, 6));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (photos.length < 2) {
      alert("Please add at least 2 photos");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => data.append(key, v));
        } else {
          data.append(key, value);
        }
      });

      photos.forEach((p) => data.append("photos", p));
      if (reel) data.append("reel", reel);

      await axios.post(
        "http://localhost:5000/api/profile/create",
        data,
        { withCredentials: true }
      );

      alert("Profile created successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">
          Create Your Profile 💖
        </h1>

        <p className="text-sm text-center text-gray-500">
          Profiles with complete details get more matches
        </p>

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
          className="input"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="input"
        >
          <option value="">I am a</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select
          name="lookingFor"
          value={form.lookingFor}
          onChange={handleChange}
          required
          className="input"
        >
          <option value="">Looking for</option>
          <option>Male</option>
          <option>Female</option>
          <option>Everyone</option>
        </select>

        <input
          name="location"
          placeholder="City"
          value={form.location}
          onChange={handleChange}
          required
          className="input"
        />

        <div>
          <label className="text-sm font-medium">
            Add Photos (min 2)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotos}
            className="mt-1"
          />
        </div>

        <textarea
          name="bio"
          placeholder="Write something that makes people want to talk to you..."
          value={form.bio}
          onChange={handleChange}
          minLength={30}
          maxLength={300}
          required
          className="input h-24"
        />

        <div>
          <p className="text-sm font-medium mb-2">Your Interests</p>
          <div className="flex flex-wrap gap-2">
            {interestsList.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleInterest(item)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  form.interests.includes(item)
                    ? "bg-pink-500 text-white"
                    : "bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">
            Profile Video (Optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setReel(e.target.files[0])}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Saving..." : "Save & Continue →"}
        </button>

        <p className="text-xs text-center text-gray-500">
          You can edit your profile anytime later
        </p>
      </form>
    </div>
  );
}
