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

// Optional 404 + error handlers
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || "Server Error" });
});

// ---- Vercel serverless adapter ----
let mongoConn;

async function ensureMongo() {
  if (!mongoConn) {
    console.log("Connecting to Mongo…");
    mongoConn = mongoose.connect(env.MONGO_URL, {
      serverSelectionTimeoutMS: 8000, // fail fast if Atlas blocks
    });
  }
  await mongoConn;
}

export default async function handler(req, res) {
  try {
    await ensureMongo();
    return app(req, res); // hand off to Express
  } catch (e) {
    console.error("Startup failure:", e);
    res.status(500).json({ message: "Startup failure", detail: e.message });
  }
}
