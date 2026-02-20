import express from "express";
import { deleteStudyMaterial, generateStudyMaterial, getStudyHistory } from "../controllers/aiController.js"; // Import the new controller
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Generate new content
router.post("/generate", isAuthenticated, generateStudyMaterial);

// Fetch previous history
router.get("/history", isAuthenticated, getStudyHistory);

//to delete study history
router.delete("/history/:id", isAuthenticated, deleteStudyMaterial);

export default router;