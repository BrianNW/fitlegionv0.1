import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import bodyPartsRoutes from "./routes/bodyPartsRoutes.js";
import exercisesRoutes from "./routes/exercisesRoutes.js";

// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Use routes
app.use("/bodyParts", bodyPartsRoutes);
app.use("/exercises", exercisesRoutes); 

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));