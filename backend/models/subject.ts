import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  data: {
    subjects: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },

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
    ],
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
