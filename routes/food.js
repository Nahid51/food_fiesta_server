import express from "express";
const router = express.Router();

import { addFood, deleteFood, getFoods, getFoodsByUser, reviewFood, updateFood } from "../controllers/food.js";

router.post("/", addFood);
router.get("/", getFoods);
router.get("/userFoods/:email", getFoodsByUser);
router.delete("/:id", deleteFood);
router.patch("/:id", updateFood);
router.put("/:id", reviewFood);

export default router;