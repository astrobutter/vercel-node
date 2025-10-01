import { Router } from 'express';
import { verifyToken } from '../Middleware/auth.js';
import { getCheckoutSession } from '../Controllers/booking.controller.js';

const router = Router();
router.post('/checkout/:doctorId', verifyToken, getCheckoutSession);

export default router;
