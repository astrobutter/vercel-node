import express from "express";
import cors from "cors";
import { MockRoutes } from "./Routes/MockRoutes/MockRoutes.js";
import { DoctorModel } from "./models/Doctor.js";
import mongoose from "mongoose";
import { AppointmentModel } from "./models/Appointment.js";
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

app.get("/doc-data", async (req, res) => {
    const result = await DoctorModel.find();
  res.json(result);
});

app.get("/appointment-data", async (req, res) => {
    const result = await AppointmentModel.find();
  res.json(result);
});

app.use("/mock", MockRoutes);
mongoose.connect("mongodb+srv://user001:test12345@cluster0.orisnk7.mongodb.net/medicare?",{ useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => console.log(`Local server on http://localhost:3000`));