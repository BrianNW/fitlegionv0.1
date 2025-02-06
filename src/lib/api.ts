import axios from "axios";

export const fetchBodyParts = async () => {
  try {
    console.log("🔄 Fetching body parts...");
    const response = await axios.get("/api/bodyParts");

    console.log("Fetched body parts:", response.data);

    return response.data.map((bodyPart: any) => {
      console.log("📌 Checking bodyPart:", bodyPart);

      if (!bodyPart || typeof bodyPart !== "object" || !bodyPart.name || !bodyPart.gifUrl) {
        console.error("❌ Missing `gifUrl` or `name`:", bodyPart);
        return { name: "Unknown", gifUrl: "/images/bodyparts/default.jpg" };
      }

      return {
        name: bodyPart.name,
        gifUrl: bodyPart.gifUrl, // Should contain a valid image URL
      };
    });
  } catch (error) {
    console.error("❌ Error fetching body parts:", error);
    return [];
  }
};

// Fetch all exercises
export const fetchExercises = async () => {
  try {
    console.log("🔄 Fetching exercises...");
    const response = await axios.get("/api/exercises"); // Calls Next.js API

    console.log("✅ Fetched exercises:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching exercises:", error);
    return [];
  }
};

