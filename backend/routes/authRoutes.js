import express from "express";
import { checkAuth, login, logout, refreshToken, signup } from "../controllers/authController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/refresh-token",refreshToken);
router.post("/logout", logout);
router.get("/check-auth", isAuthenticated, checkAuth);

export default router;