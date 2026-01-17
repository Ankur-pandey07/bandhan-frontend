"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const MAX_PHOTOS = 6;

export default function PhotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState("");

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (photos.length + files.length > MAX_PHOTOS) {
      setError(`You can upload up to ${MAX_PHOTOS} photos`);
      return;
    }

    setPhotos([...photos, ...files]);
    setError("");
  }

  function removePhoto(index: number) {
    setPhotos(photos.filter((_, i) => i !== index));
  }

  async function handleFinish() {
    if (photos.length < 1) {
      setError("Please upload at least one photo");
      return;
    }

    const formData = new FormData();
    photos.forEach((file) => {
      formData.append("photos", file);
    });

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/photos`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-white to-indigo-100">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-rose-200/40 p-6 sm:p-8">

        {/* PROGRESS */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Step 7 of 7</span>
            <span>Photos</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 w-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Add your best photos 📸
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Upload at least 1 clear photo of yourself.  
          Profiles with photos get more matches.
        </p>

        {/* PHOTO GRID */}
        <div className="grid grid-cols-3 gap-3 mb-2">
          {photos.map((file, i) => (
            <div key={i} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-28 object-cover rounded-xl"
              />
              <button
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 bg-black/70 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}

          {photos.length < MAX_PHOTOS && (
            <label className="h-28 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:border-rose-400 hover:text-rose-400 transition">
              <span className="text-2xl">＋</span>
              <span className="text-xs mt-1">Add photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleSelect}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="text-xs text-gray-500 mb-4">
          {photos.length} / {MAX_PHOTOS} photos added
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <button
          onClick={handleFinish}
          className="w-full rounded-xl py-3 font-semibold
                     bg-gradient-to-r from-rose-500 to-pink-500
                     text-white hover:opacity-95 active:scale-[0.98]"
        >
          Finish →
        </button>

      </div>
    </main>
  );
}
