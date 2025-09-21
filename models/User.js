import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
});

export const UserModel = mongoose.model("Users", UserSchema);