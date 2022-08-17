import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
