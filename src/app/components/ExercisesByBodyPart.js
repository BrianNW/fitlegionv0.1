// ExercisesByBodyPart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExercisesByBodyPart = () => {
  const { bodyPart } = useParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`/api/exercises/bodyPart/${bodyPart}`);
        setExercises(response.data);
      } catch (error) {
        console.error(`Error fetching exercises for body part ${bodyPart}:`, error);
      }
    };
    fetchExercises();
  }, [bodyPart]);

  return (
    <div className="exercises-list">
      {exercises.map((exercise) => (
        <div key={exercise.id} className="exercise-card">
          <img src={exercise.gifUrl} alt={exercise.name} />
          <p>{exercise.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ExercisesByBodyPart;