import express from "express";
import { createBlog, getUserBlogs } from "../controllers/blogController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", requireAuth, createBlog);
router.get("/my-blogs", requireAuth, getUserBlogs);

export default router;
