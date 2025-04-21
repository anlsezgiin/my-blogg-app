import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";
import { googleCallback } from "../controllers/googleAuthController.js"; // Google controller'ı

const router = express.Router();

// Local Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Google OAuth Başlatma
router.get("/google", passport.authenticate("google", {
  scope: ["email"]
}));

// Google OAuth Callback
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login" // başarısızsa buraya yönlendir
}), googleCallback); // başarılıysa bu controller çalışır

export default router;
