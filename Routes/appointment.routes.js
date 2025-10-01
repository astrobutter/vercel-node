import { Router } from 'express';
import { verifyToken } from '../Middleware/auth.js';
import {
 getAppointmentsByUser, getAppointmentById, getAppointmentsByDoctor,
} from '../Controllers/user.controller.js';

const router = Router();

router.get('/user/:userID', verifyToken, getAppointmentsByUser);
router.get('/doctor/:userId', verifyToken, getAppointmentsByDoctor);
router.get('/:_id', verifyToken, getAppointmentById);

export default router;
