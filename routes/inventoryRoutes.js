import express from "express";
import { addMovement } from "../controllers/inventoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addMovement);

export default router;
