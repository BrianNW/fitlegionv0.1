import express from "express";
import exerciseDbService from "../services/exerciseDbService.js";

const router = express.Router();

// Route to fetch all exercises
router.get("/", async (req, res) => {
  try {
    console.log("🔄 Fetching all exercises...");
    const exercises = await exerciseDbService.getAllExercises();

    if (!Array.isArray(exercises) || exercises.length === 0) {
      console.error("❌ No exercises found!");
      return res.status(500).json({ message: "No exercises found" });
    }

    res.json(exercises);
  } catch (error) {
    console.error("❌ Error fetching exercises:", error.message);
    res.status(500).json({ message: "Failed to fetch exercises" });
  }
});

export default router;
