import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config';
const port = process.env.PORT || 5000;

import userRouter from "./routes/user.js";
import foodRouter from "./routes/food.js";
import paymentRouter from "./routes/payment.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/users", userRouter);
app.use("/foods", foodRouter);
app.use("/payment", paymentRouter);

const databaseURL = `${process.env.DB_INFO}`;


mongoose.connect(databaseURL)
    .then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((error) => console.log(`${error} did not connect`));