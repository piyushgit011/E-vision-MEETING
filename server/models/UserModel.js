import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, default: "Not provided" },
  password: { type: String, required: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String },
  person: { type: String, required: true },
  poster_path: { type: String },
  fatherName: { type: String, default: "Not provided" },
  motherName: { type: String, default: "Not provided" },
  address: { type: String, required: true },
  model_images: [String],
  class: [String],
  subjects: [String],
});

const User = mongoose.model("User", UserSchema);
export default User;
