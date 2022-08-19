import express from "express";
const router = express.Router();

import { addFood, deleteFood, getFoods, getFoodsByUser, updateFood } from "../controllers/food.js";

router.post("/", addFood);
router.get("/", getFoods);
router.get("/userFoods/:email", getFoodsByUser);
router.delete("/:id", deleteFood);
router.patch("/:id", updateFood);

export default router;