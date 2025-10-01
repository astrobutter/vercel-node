import { v2 as cloudinary } from 'cloudinary';
import { env } from '../Config/env.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY.CLOUD_NAME,
  api_key: env.CLOUDINARY.API_KEY,
  api_secret: env.CLOUDINARY.API_SECRET,
});

export const getSignature = async (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      env.CLOUDINARY.API_SECRET
    );
    res.json({ timestamp, signature });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const confirmUpload = async (req, res) => {
  try {
    const expected = cloudinary.utils.api_sign_request(
      { public_id: req.body.public_id, version: req.body.version },
      env.CLOUDINARY.API_SECRET
    );
    if (expected !== req.body.signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }
    res.status(201).json({ imgID: req.body.public_id });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
