// BodyPartsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const BodyPartsList = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await axios.get('/api/bodyParts');
        setBodyParts(response.data);
      } catch (error) {
        console.error('Error fetching body parts:', error);
      }
    };
    fetchBodyParts();
  }, []);

  const handleBodyPartClick = (bodyPart) => {
    history.push(`/exercises/bodyPart/${bodyPart}`);
  };

  return (
    <div className="body-parts-list">
      {bodyParts.map((bodyPart) => (
        <div
          key={bodyPart}
          className="body-part-card"
          onClick={() => handleBodyPartClick(bodyPart)}
        >
          {bodyPart}
        </div>
      ))}
    </div>
  );
};

export default BodyPartsList;