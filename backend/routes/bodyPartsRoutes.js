import express from "express";
import { getBodyParts } from "../controllers/bodyPartsController.js";

const router = express.Router();

// Route to fetch body parts with random images
router.get("/", getBodyParts);

export default router;
