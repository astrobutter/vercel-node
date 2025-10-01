import { Router } from 'express';
import { verifyToken } from '../Middleware/auth.js';
import {
  listPosts, createPost, getPostBySlug,
  createComment, listComments, getDoctorById, getPatientById,
  searchPosts,
} from '../Controllers/forum.controller.js';

const router = Router();

router.get('/', listPosts);
router.post('/', verifyToken, createPost);
router.get('/:postSlug', getPostBySlug);

router.post('/comments', createComment);
router.get('/comments/:slug', listComments);

router.post('/search', searchPosts);

router.get('/doctor/:userID', getDoctorById);
router.get('/patient/:userID', getPatientById);

export default router;
