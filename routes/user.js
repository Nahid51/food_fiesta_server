import express from "express";
const router = express.Router();

import { signup, signin, googleSignIn, makeAdmin } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);
router.put("/makeAdmin", makeAdmin);

export default router;