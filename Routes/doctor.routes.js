import { Router } from 'express';
import { verifyToken } from '../Middleware/auth.js';
import {
  listBySpeciality, getAccount, getByUsername, updateDoctor,
} from '../Controllers/doctor.controller.js';
import {
  createReview, listReviewsByDoctorUsername,
} from '../Controllers/review.controller.js';

const router = Router();

router.get('/speciality/:speciality', listBySpeciality);
router.get('/account/:userID', verifyToken, getAccount);
router.get('/profile/:username', getByUsername);

router.put('/', verifyToken, updateDoctor);

router.post('/reviews', createReview);
router.get('/reviews/:username', listReviewsByDoctorUsername);

export default router;
