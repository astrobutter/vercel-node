// app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./Config/env.js";
import routes from "./Routes/index.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Hello from Express on Vercel!" });
});

app.use("/api", routes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || "Server Error" });
});

// --- Vercel serverless adapter ---
// Keep and reuse a single Mongo connection across invocations.
let mongoConn;
async function ensureMongo() {
  if (!mongoConn) {
    mongoConn = mongoose.connect(env.MONGO_URL);
  }
  await mongoConn;
}

// Export a default handler that Vercel will invoke
export default async function handler(req, res) {
  try {
    await ensureMongo();
    // Let Express handle the request
    return app(req, res);
  } catch (e) {
    console.error("Mongo connection failed:", e);
    res.status(500).json({ message: "Database connection failed" });
  }
}
