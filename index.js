import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config';
const port = 5000;

import userRouter from "./routes/user.js";
import foodRouter from "./routes/food.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/users", userRouter);
app.use("/foods", foodRouter);

const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.pf4kpjf.mongodb.net/food_fiesta?retryWrites=true&w=majority`;


mongoose.connect(mongodbURL)
    .then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((error) => console.log(`${error} did not connect`));