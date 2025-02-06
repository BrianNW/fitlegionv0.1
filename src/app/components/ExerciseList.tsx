import { useEffect, useState } from "react";
import axios from "axios";

type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
};

export default function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Fetch from our Node.js backend instead of RapidAPI
        const response = await axios.get("/api/exercises");
        setExercises(response.data);
      } catch (err) {
        setError("Failed to load exercises");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) return <p>Loading exercises...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Exercise List</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <h3>{exercise.name}</h3>
            <p>Body Part: {exercise.bodyPart}</p>
            <p>Equipment: {exercise.equipment}</p>
            <img src={exercise.gifUrl} alt={exercise.name} width="150" />
          </li>
        ))}
      </ul>
    </div>
  );
}