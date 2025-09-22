import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MockRoutes } from "./Routes/MockRoutes/MockRoutes.js";
import { MongoRoutes } from "./Routes/MongoData/MongoData.js";
import { bookingRouter } from "./Routes/bookings.js";
import { userRouter } from "./Routes/user.js";
import { doctorRouter } from "./Routes/doctor.js";
import { forumRouter } from "./Routes/forum.js";
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Hello from Express app (shared for local & Vercel)!" });
});
app.get("/ping", (req, res) => res.send("pong"));
app.get("/hello", (req, res) => {
  const name = req.query.name || "friend";
  res.json({ message: `Hello, ${name}!` });
});
app.get("/health", (_, res) => res.send("ok"));

app.use("/mock", MockRoutes);
app.use("/mongo", MongoRoutes);

app.use("/create-checkout-session", bookingRouter);
app.use("/auth", userRouter);
app.use("/doc", doctorRouter);
app.use("/forum", forumRouter);

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => console.log(`Local server on http://localhost:3000`));