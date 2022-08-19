import express from "express";
const router = express.Router();

import { addFood, getFoods, getFoodsByUser } from "../controllers/food.js";

router.post("/", addFood);
router.get("/", getFoods);
router.get("/userFoods/:email", getFoodsByUser);

export default router;