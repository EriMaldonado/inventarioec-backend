import express from "express";
import {
  createPost,
  getPosts,
  toggleLike,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getPosts);
router.put("/like/:id", protect, toggleLike);

export default router;
