import express from "express";
import { createWork, getClassWork, getWorkDetails, updateWork } from "../controllers/workController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').get(protect, getClassWork).post(createWork);
router.route('/:id').get(getWorkDetails).put(protect, updateWork);

export default router;