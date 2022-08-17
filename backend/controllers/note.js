import dotenv from "dotenv";
dotenv.config();
import Note from "../models/note.js";

export const saveNote = async (req, res) => {
  const { creatorId, subjectId, content } = req.body;
  console.log(creatorId, subjectId, content);

  try {
    const newNote = new Note({
      creatorId: creatorId,
      subjectId: subjectId,
      content: content,
    });

    newNote.save();
  } catch (error) {
    res.status(500).json({ message: "Chyba servera: " + error });
  }
};
