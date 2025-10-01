import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.js';
import { DoctorModel } from '../models/Doctor.js';
import { env } from '../Config/env.js';

const sign = (payload, exp = '1d') =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: exp });

export const registerUser = async (req, res) => {
  try {
    const { username, password, imageUrl, name, email, gender, dob } = req.body;
    const exists = await UserModel.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await UserModel.create({ username, password: hashed, imageUrl, name, email, gender, dob });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const registerDoctor = async (req, res) => {
  try {
    const {
      name, dob, gender, email, imageUrl, educations, experiences, about,
      username, password, specializations, schedules,
    } = req.body.user;

    const exists = await DoctorModel.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await DoctorModel.create({
      name, dob, gender, email, imageUrl, educations, experiences, about,
      username, password: hashed, specializations, schedules,
    });
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Username or password is incorrect' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Username or password is incorrect' });

    const token = sign({ id: user._id, isDoctor: false }, '1d');
    res.json({ token, userID: user._id, isDoctor: false });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const loginDoctor = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await DoctorModel.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Username or password is incorrect' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Username or password is incorrect' });

    const token = sign({ id: user._id, isDoctor: true }, '1d');
    res.json({ token, userID: user._id, isDoctor: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
