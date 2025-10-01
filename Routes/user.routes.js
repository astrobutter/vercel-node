import { Router } from 'express';
import { verifyToken } from '../Middleware/auth.js';
import {
  getUserById, getAppointmentsByUser, getAppointmentById, getAppointmentsByDoctor,
} from '../Controllers/user.controller.js';

const router = Router();

router.get('/:userID', verifyToken, getUserById);

export default router;
