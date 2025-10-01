import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from './Config/env.js';
import routes from './Routes/index.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Hello from Express app (shared for local & Vercel)!" });
});

app.use('/api', routes);

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || 'Server Error' });
});

const start = async () => {
  await mongoose.connect(env.MONGO_URL);
  app.listen(env.PORT, () => {
    console.log(`API running → http://localhost:${env.PORT}`);
  });
};

start().catch((e) => {
  console.error('Failed to start server:', e);
  process.exit(1);
});
