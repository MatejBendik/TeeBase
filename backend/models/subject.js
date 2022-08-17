import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  inShort: {
    type: String,
    required: true,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
