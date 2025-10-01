import jwt from 'jsonwebtoken';
import { env } from '../Config/env.js';

export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization || '';
  console.log(auth);
  
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = payload; // { id, isDoctor }
    next();
  });
};
