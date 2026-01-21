"use client";

import { useRef, useState } from "react";

export default function PhotoGrid({
  photos,
  onAdd,
  onReorder,
  onRemove,
}: {
  photos: string[];
  onAdd: (file: File) => void;
  onReorder: (from: number, to: number) => void;
  onRemove: (index: number) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handlePick = () => {
    fileRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAdd(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, index) => {
          const photo = photos[index];

          return (
            <div
              key={index}
              draggable={!!photo}
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIndex !== null && dragIndex !== index) {
                  onReorder(dragIndex, index);
                }
                setDragIndex(null);
              }}
              onClick={!photo ? handlePick : undefined}
              className={`relative aspect-[3/4] rounded-xl overflow-hidden border
                ${photo ? "border-gray-700" : "border-dashed border-gray-600"}
                bg-[#141414] flex items-center justify-center
                ${dragIndex === index ? "ring-2 ring-pink-500" : ""}
              `}
            >
              {photo ? (
                <>
                  <img
                    src={photo}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(index);
                    }}
                    className="absolute top-2 right-2 bg-black/70 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <span className="text-2xl text-gray-500">＋</span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
