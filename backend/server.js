import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
import { fileURLToPath } from "url";
import path from "path";

// Ensure the script gets the correct directory (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load the .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

import express from "express";
import cors from "cors";
import axios from "axios";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Route to Fetch Workouts from RapidAPI
app.get("/exercises", async (req, res) => {
  try {
    const response = await axios.get("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Workout API error:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Failed to fetch workouts", error });
    console.log("Using RapidAPI Key:", process.env.RAPIDAPI_KEY);

  }
});

// hello test
app.get('/hello', (req, res) => {
    res.send('Hello from Hello');
});

app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));