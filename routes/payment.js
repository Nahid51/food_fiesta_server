import express from "express";
const router = express.Router();

import { cancelMsg, failMsg, getDataForSSL, ipnMsg, successMsg } from "../controllers/payment.js";

router.post("/init", getDataForSSL);
router.post("/success", successMsg);
router.post("/fail", failMsg);
router.post("/cancel", cancelMsg);
router.post("/ipn", ipnMsg);

export default router;