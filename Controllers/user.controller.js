import { UserModel } from '../models/User.js';
import { AppointmentModel } from '../models/Appointment.js';

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID).select('-password');
    res.status(200).json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({ user: req.params.userID });
    res.status(200).json(appointments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params._id);
    res.status(200).json(appointment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({ doc: req.params.userId });
    res.status(200).json(appointments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
