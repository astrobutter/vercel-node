import bcrypt from 'bcrypt';
import { DoctorModel } from '../models/Doctor.js';

export const listBySpeciality = async (req, res) => {
  try {
    const perPage = 8;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const filter = { specializations: { $in: [req.params.speciality] } };

    const [items, total] = await Promise.all([
      DoctorModel.find(filter).skip((page - 1) * perPage).limit(perPage).select('-password'),
      DoctorModel.countDocuments(filter),
    ]);

    res.status(200).json({
      doctor: items,
      totalPages: Math.ceil(total / perPage),
      page,
      perPage,
      total,
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getAccount = async (req, res) => {
  try {
    const doc = await DoctorModel.findById(req.params.userID).select('-password');
    res.status(200).json(doc);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getByUsername = async (req, res) => {
  try {
    const doc = await DoctorModel.findOne({ username: req.params.username }).select('-password');
    res.status(200).json(doc);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateDoctor = async (req, res) => {
  try {
    const allowed = [
      'name','dob','gender','email','imageUrl','educations','experiences','about',
      'username','specializations','schedules','price'
    ];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await DoctorModel.findByIdAndUpdate(
      req.body._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(201).json({ result: updated });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
