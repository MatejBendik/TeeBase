import dotenv from "dotenv";
dotenv.config();
import Note from "../models/note.js";

export const saveNote = async (req, res) => {
  const { creatorId, subjectId, type, content } = req.body;
  console.log(creatorId, subjectId, type, content);

  try {
    const newNote = new Note({
      creatorId: creatorId,
      subjectId: subjectId,
      type: type,
      content: content,
    });

    newNote.save();
  } catch (error) {
    res.status(500).json({ message: "Chyba servera: " + error });
  }
};

export const getNotes = async (req, res) => {
  const { userId, subjectId } = req.params;

  try {
    const notes = await Note.find({ creatorId: userId });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Chyba servera: " + error });
  }
};
