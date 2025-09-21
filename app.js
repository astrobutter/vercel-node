import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MockRoutes } from "./Routes/MockRoutes/MockRoutes.js";
import { MongoRoutes } from "./Routes/MongoData/MongoData.js";
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

app.use("/mock", MockRoutes);
app.use("/mongo", MongoRoutes);
mongoose.connect("mongodb+srv://user001:test12345@cluster0.orisnk7.mongodb.net/medicare?",{ useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => console.log(`Local server on http://localhost:3000`));