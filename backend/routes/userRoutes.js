import express from "express";
import { getUserStats } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/stats", isAuthenticated, getUserStats);

export default router;