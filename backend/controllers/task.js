import dotenv from "dotenv";
dotenv.config();
import Task from "../models/task.js";

export const saveTask = async (req, res) => {
  const { creatorId, subjectId, type, content } = req.body;
  console.log(creatorId, subjectId, type, content);

  try {
    const newTask = new Task({
      creatorId: creatorId,
      subjectId: subjectId,
      type: type,
      content: content,
    });

    newTask.save();
  } catch (error) {
    res.status(500).json({ message: "Chyba servera: " + error });
  }
};
