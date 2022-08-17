import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { addFood, getFoods } from "../controllers/food.js";

router.post("/", auth, addFood);
router.get("/", getFoods);

export default router;