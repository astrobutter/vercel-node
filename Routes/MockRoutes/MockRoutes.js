import express from 'express';
const router = express.Router();

router.get('/1', (req, res) => {
  res.json({ message: 'This is a mock endpoint response' });
});

export { router as MockRoutes };