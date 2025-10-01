import { Router } from 'express';
import { getSignature, confirmUpload } from '../Controllers/upload.controller.js';

const router = Router();
router.get('/signature', getSignature);
router.post('/confirm', confirmUpload);
export default router;
