import express from "express";
import { createBlog, getUserBlogs, getSingleBlog } from "../controllers/blogController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", requireAuth, createBlog);
router.get("/my-blogs", requireAuth, getUserBlogs);
router.get("/my-blogs/:id",requireAuth, getSingleBlog);

export default router;
