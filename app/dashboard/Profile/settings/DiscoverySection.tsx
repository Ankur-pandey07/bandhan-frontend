"use client";

import { useState } from "react";

export default function DiscoverySection() {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [maxDistance, setMaxDistance] = useState(25);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 30]);

  return (
    <div className="bg-[#121212] rounded-2xl p-4 space-y-5">
      {/* HEADER */}
      <h3 className="text-sm font-semibold tracking-wide text-gray-300">
        Discovery
      </h3>

      {/* LOCATION TOGGLE */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Location</p>
          <p className="text-xs text-gray-400">
            Use your location to show nearby profiles
          </p>
        </div>

        <button
          onClick={() => setLocationEnabled(!locationEnabled)}
          className={`w-11 h-6 flex items-center rounded-full transition ${
            locationEnabled ? "bg-pink-500" : "bg-gray-700"
          }`}
        >
          <span
            className={`h-5 w-5 bg-white rounded-full transition-transform ${
              locationEnabled ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* MAX DISTANCE */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-white">
          <span>Maximum distance</span>
          <span className="text-gray-400">{maxDistance} km</span>
        </div>

        <input
          type="range"
          min={1}
          max={100}
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full accent-pink-500"
        />
      </div>

      {/* AGE RANGE */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-white">
          <span>Age range</span>
          <span className="text-gray-400">
            {ageRange[0]} – {ageRange[1]}
          </span>
        </div>

        {/* MIN AGE */}
        <input
          type="range"
          min={18}
          max={60}
          value={ageRange[0]}
          onChange={(e) =>
            setAgeRange([Number(e.target.value), ageRange[1]])
          }
          className="w-full accent-pink-500"
        />

        {/* MAX AGE */}
        <input
          type="range"
          min={18}
          max={60}
          value={ageRange[1]}
          onChange={(e) =>
            setAgeRange([ageRange[0], Number(e.target.value)])
          }
          className="w-full accent-pink-500"
        />
      </div>
    </div>
  );
}
