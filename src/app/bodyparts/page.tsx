"use client";

import { useEffect, useState } from "react";
import { fetchBodyParts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

type BodyPart = {
  name: string;
  gifUrl: string;
};

export default function BodyPartsPage() {
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBodyParts = async () => {
      const data = await fetchBodyParts();
      console.log("📌 Processed body parts:", data); // ✅ Debugging output
      setBodyParts(data);
      setLoading(false);
    };

    getBodyParts();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading body parts...</p>;

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Select a Body Part</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {bodyParts.map((bodyPart) => {
          console.log(`🔎 Rendering body part: ${bodyPart.name}, GIF URL: ${bodyPart.gifUrl}`); // Debugging output

          return (
            <Link key={bodyPart.name} href={`/exercises/bodyPart/${bodyPart.name}`}>
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer text-center">
                {bodyPart.gifUrl && bodyPart.gifUrl.startsWith("http") ? (
                  <Image
                    src={bodyPart.gifUrl}
                    alt={bodyPart.name}
                    width={150}
                    height={150}
                    className="w-full h-40 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
                <h2 className="text-xl font-semibold capitalize mt-4">{bodyPart.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
