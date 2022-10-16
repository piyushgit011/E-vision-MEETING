import express from "express";
import { getData, storedata } from "../controllers/mlController.js";

const router = express.Router();

router.route('/').get(getData).post(storedata);

export default router;