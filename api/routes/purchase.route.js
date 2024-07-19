// purchase.route.js

import express from "express";
import { initiatePurchase } from "../controllers/purchase.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create/:listingId", verifyToken, initiatePurchase);

// router.post("/create-confirm", verifyToken, confirmPurchase);

export default router;
