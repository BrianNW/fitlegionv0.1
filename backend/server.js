import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cors from "cors";
import axios from "axios";

// Ensure the script gets the correct directory (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load the .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_BASE_URL = "https://exercisedb.p.rapidapi.com/exercises"; // Correct API Base URL
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// ✅ Fetch exercises dynamically based on category type
app.get("/exercises/:category", async (req, res) => {
    try {
      const { category } = req.params;
      console.log(`Incoming request for category: ${category}`);
  
      // Map category names to API query parameters
      const categoryQueryMap = {
        bodyPartList: "bodyPart",
        targetList: "target",
        equipmentList: "equipment",
      };
  
      // Ensure it's a valid category
      if (!categoryQueryMap[category]) {
        console.error(`Invalid category: ${category}`);
        return res.status(400).json({ message: "Invalid category" });
      }
  
      // Fetch exercises using query parameter
      const response = await axios.get(API_BASE_URL, {
        params: { [categoryQueryMap[category]]: category.replace("List", "") },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      });
  
      console.log(`Fetched ${response.data.length} exercises for ${category}`);
  
      // Ensure we return exercises with images
      const exercisesWithImages = response.data.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        gifUrl: exercise.gifUrl || "",
      }));
  
      res.json(exercisesWithImages);
    } catch (error) {
      console.error("ExerciseDB API error:", error.response ? error.response.data : error.message);
      res.status(500).json({ message: "Failed to fetch exercises", error: error.message });
    }
  });



app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));