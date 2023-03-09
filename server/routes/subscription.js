import express from "express";
import { createCheckout } from "../controllers/Subcription.js";

const router = express.Router();

router.post('/create-checkout-session', createCheckout);

export default router;