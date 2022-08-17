import express from "express";
const router = express.Router();

import { addFood, getFoods } from "../controllers/food.js";

router.post("/", addFood);
router.get("/", getFoods);

export default router;