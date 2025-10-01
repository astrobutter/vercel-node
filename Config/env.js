import 'dotenv/config';

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  MONGO_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPESECRETKEY,
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDNAME,
    API_KEY: process.env.CLOUDAPIKEY,
    API_SECRET: process.env.CLOUDINARYSECRET,
  },
};

if (!env.JWT_SECRET) throw new Error('JWT_SECRET is required');
if (!env.MONGO_URL) throw new Error('MONGO_URL is required');
if (!env.STRIPE_SECRET_KEY) throw new Error('STRIPESECRETKEY is required');
if (!env.CLOUDINARY.CLOUD_NAME) throw new Error('CLOUDINARY_CLOUD_NAME is required');
if (!env.CLOUDINARY.API_KEY) throw new Error('CLOUDINARY_API_KEY is required');
if (!env.CLOUDINARY.API_SECRET) throw new Error('CLOUDINARY_API_SECRET is required');