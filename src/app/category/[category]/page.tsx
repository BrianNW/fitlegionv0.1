"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const [randomImage, setRandomImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomExerciseImage = async () => {
      try {
        console.log("Fetching a random exercise...");
        const response = await axios.get("/api/exercises"); //exercises route
        const exercises = response.data;

        if (Array.isArray(exercises) && exercises.length > 0) {
          const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
          console.log("✅ Random Exercise Chosen:", randomExercise);

          setRandomImage(randomExercise.gifUrl || "/default.jpg"); // Use new fallback image
        } else {
          console.error("❌ No exercises found");
          setRandomImage("/default.jpg");
        }
      } catch (error) {
        console.error("❌ Error fetching random exercise:", error);
        setRandomImage("/default.jpg"); // Use new fallback image
      }
    };

    fetchRandomExerciseImage();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to ExerciseDB</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
        <Link href="/bodyparts">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer text-center">
            {randomImage ? (
              <Image
                src={randomImage}
                alt="Choose Exercises by Body Parts"
                width={250}
                height={250}
                className="w-full h-40 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md">
                <span className="text-gray-500">Loading...</span>
              </div>
            )}
            <h2 className="text-xl font-semibold mt-4">Choose Exercises by Body Parts</h2>
            <p className="text-gray-500 mt-2">Select a body part to see exercises.</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
