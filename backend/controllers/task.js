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

export const getTasks = async (req, res) => {
  const { userId, subjectId } = req.params;

  try {
    const notes = await Task.find({ creatorId: userId });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Chyba servera: " + error });
  }
};

export const getLatestTask = async (req, res) => {
  try {
    const task = await Task.findOne().sort({ createdAt: -1 }).limit(1).exec();

    res.status(200).json(task);
    console.log("Toto je task: " + task);
  } catch (error) {
    res.status(500).json({ message: "Chyba servera: " + error });
  }
};
