import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    notes: {
      userId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createAt: {
        type: Date,
        default: new Date(),
      },
    },

    tasks: {
      userId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createAt: {
        type: Date,
        default: new Date(),
      },
    },
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
