import exerciseDbService from "../services/exerciseDbService.js";

export const getBodyParts = async (req, res) => {
  try {
    console.log("🔄 Fetching body parts from ExerciseDB API...");
    const bodyParts = await exerciseDbService.getBodyParts();

    if (!Array.isArray(bodyParts) || bodyParts.length === 0) {
      console.error("❌ No body parts found!");
      return res.status(500).json({ message: "No body parts found" });
    }

    // Fetch a random exercise with a gif for each body part
    const bodyPartImages = await Promise.all(
      bodyParts.map(async (bodyPart) => {
        try {
          const exercises = await exerciseDbService.getExercisesByBodyPart(bodyPart);

          if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
            console.error(`❌ No exercises found for ${bodyPart}`);
            return { name: bodyPart, gifUrl: "/images/bodyparts/default.jpg" };
          }

          const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
          
          if (!randomExercise || !randomExercise.gifUrl) {
            console.error(`❌ No gif found for ${bodyPart}`);
            return { name: bodyPart, gifUrl: "/images/bodyparts/default.jpg" };
          }

          console.log(`✅ Assigned gif for ${bodyPart}:`, randomExercise.gifUrl);
          return { name: bodyPart, gifUrl: randomExercise.gifUrl };
        } catch (error) {
          console.error(`❌ Error fetching exercise for ${bodyPart}:`, error.message);
          return { name: bodyPart, gifUrl: "/images/bodyparts/default.jpg" };
        }
      })
    );

    res.json(bodyPartImages);
  } catch (error) {
    console.error("❌ Error fetching body parts:", error.message);
    res.status(500).json({ message: "Failed to fetch body parts" });
  }
};
