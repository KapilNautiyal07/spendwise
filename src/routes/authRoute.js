import express from "express";
import { signUp, verifyEmail, login, resendVerificationCode } from "../controllers/authController.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/resend-code", resendVerificationCode);

export default router;
