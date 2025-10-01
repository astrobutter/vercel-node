import { Router } from 'express';
import {
  registerUser, registerDoctor, loginUser, loginDoctor,
} from '../Controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/doc/register', registerDoctor);
router.post('/login', loginUser);
router.post('/doc/login', loginDoctor);

export default router;
