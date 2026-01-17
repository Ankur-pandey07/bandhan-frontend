"use client";

import { useState, useEffect } from "react";

export default function EditProfile() {
  const [form, setForm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  // Load current user from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setForm(currentUser);
  }, []);

  if (!form) return <p className="text-center mt-10">Loading...</p>;

  // Update inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CLOUDINARY UPLOAD FUNCTION
  const uploadImage = async () => {
    if (!imageFile) return form.photo; // no new image

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "bandhan_upload"); // your preset

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbdyfg4fm/image/upload", // YOUR cloud name
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url; // final hosted image URL
  };

  // Save profile
  const handleUpdate = async () => {
    const imageUrl = await uploadImage();

    const updatedForm = { ...form, photo: imageUrl };

    const res = await fetch(
      `http://localhost:5000/api/users/${form._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedForm),
      }
    );

    const data = await res.json();
    setMessage("Profile Updated Successfully!");

    // Save new data to localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    // Update UI state
    setForm(data.user);
  };

  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center p-4">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-4 text-center">
          Edit Profile
        </h1>

        {/* Profile Photo */}
        <div className="text-center mb-4">
          {form.photo ? (
            <img
              src={form.photo}
              className="w-32 h-32 rounded-full mx-auto shadow"
              alt="profile"
            />
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* Inputs */}
        <input
          className="input"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Age"
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <textarea
          className="input"
          placeholder="Bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
        ></textarea>

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          className="input"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        {/* Save Button */}
        <button className="btn-primary mt-4" onClick={handleUpdate}>
          Save Changes
        </button>

        {/* Message */}
        {message && (
          <p className="text-green-600 text-center mt-3">{message}</p>
        )}
      </div>
    </div>
  );
}
