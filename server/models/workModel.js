import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  class: { type: Number, required: true },
  deadline: { type: Date, default: Date.now() },
  doneBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  content: { type: String },
  isCompleted: { type: Boolean, default: false },
});

const Work = mongoose.model("Work", workSchema);
export default Work;
