import { ReviewsModel } from '../models/Reviews.js';

export const createReview = async (req, res) => {
  try {
    const { user, text, doc, rating } = req.body;
    const review = await ReviewsModel.create({ user, text, doc, rating });
    res.status(201).json(review);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const listReviewsByDoctorUsername = async (req, res) => {
  try {
    const myReviews = await ReviewsModel.find({ doc: req.params.username }).sort({ createdAt: -1 });
    res.status(200).json({ myReviews });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
