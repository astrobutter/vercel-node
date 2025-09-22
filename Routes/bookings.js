import express from "express";
import Stripe from 'stripe';
import { verifyToken } from "./user.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";

const router = express.Router();

router.post('/:doctorId', getCheckoutSession);

export { router as bookingRouter };