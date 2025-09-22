import express from "express";
import { DoctorModel } from "../../models/Doctor.js";
import { AppointmentModel } from "../../models/Appointment.js";
const router = express.Router();

router.get("/doc-data", async (req, res) => {
  const result = await DoctorModel.find();
  res.json(result);
});

router.get("/appointment-data", async (req, res) => {
  const result = await AppointmentModel.find();
  res.json(result);
});
export { router as MongoRoutes };
