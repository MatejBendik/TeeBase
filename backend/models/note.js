import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  subjectId: {
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

const Note = mongoose.model("Note", noteSchema);

export default Note;
