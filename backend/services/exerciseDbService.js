import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import dotenv from "dotenv";

// Ensure the script gets the correct directory (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: `${__dirname}/../.env` });

const API_BASE_URL = "https://exercisedb.p.rapidapi.com";  // API Base URL
const RAPIDAPI_KEY = "8835cf8906mshff0f5f50df42e89p1aba33jsne8c4828e5959";  // API Key

console.log("🚀 Using RapidAPI Key:", RAPIDAPI_KEY);

const exerciseDbService = {
  async getAllExercises() {
    try {
      console.log("Fetching all exercises...");
      const response = await axios.get(`${API_BASE_URL}/exercises`, {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching exercises:", error.message);
      throw new Error("Failed to fetch exercises");
    }
  },
  
  async getBodyParts() {
    try {
      const url = `${API_BASE_URL}/exercises/bodyPartList`;  // bodypartlist endpoint URL
      console.log(`Fetching body parts from: ${url}`);

      const response = await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      });

      return response.data;
    } catch (error) {
      console.error("❌ Error fetching body parts:", error.response?.status, error.message);
      throw new Error("Failed to fetch body parts");
    }
  },

  async getExercisesByBodyPart(bodyPart) {
    try {
      const url = `${API_BASE_URL}/exercises/bodyPart/${bodyPart}`; 
      console.log(`Fetching exercises for: ${url}`);

      const response = await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching exercises for ${bodyPart}:`, error.response?.status, error.message);
      throw new Error(`Failed to fetch exercises for ${bodyPart}`);
    }
  },
};

export default exerciseDbService;
