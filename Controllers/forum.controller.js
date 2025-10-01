import { ForumsModel } from '../models/ForumPost.js';
import { CommentsModel } from '../models/Comment.js';
import { DoctorModel } from '../models/Doctor.js';
import { UserModel } from '../models/User.js';

export const listPosts = async (req, res) => {
  try {
    const perPage = 8;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const [items, total] = await Promise.all([
      ForumsModel.find({}).sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage),
      ForumsModel.countDocuments({}),
    ]);
    res.status(200).json({ posts: items, totalPages: Math.ceil(total / perPage) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createPost = async (req, res) => {
  try {
    const forum = await ForumsModel.create({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userOwner: req.body.userOwner,
      slug: req.body.slug,
    });
    res.status(201).json({ result: forum });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getPostBySlug = async (req, res) => {
  try {
    const result = await ForumsModel.findOne({ slug: req.params.postSlug });
    res.status(200).json({ result });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createComment = async (req, res) => {
  try {
    const comment = await CommentsModel.create({
      commentUser: req.body.commentUser,
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug,
    });
    res.status(201).json(comment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const listComments = async (req, res) => {
  try {
    const myComments = await CommentsModel.find({ slug: req.params.slug }).sort({ createdAt: -1 });
    res.status(200).json({ myComments });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getDoctorById = async (req, res) => {
  try {
    const user = await DoctorModel.findById(req.params.userID).select('-password');
    res.status(200).json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getPatientById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID).select('-password');
    res.status(200).json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const searchPosts = async (req, res) => {
  try {
    const term = (req.body.search || '').replace(/[^a-zA-Z0-9 ]/g, '');
    const byName = await ForumsModel.find({ name: { $regex: term, $options: 'i' } });
    if (byName.length) return res.status(200).json(byName);
    const byDesc = await ForumsModel.find({ description: { $regex: term, $options: 'i' } });
    res.status(200).json(byDesc);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
