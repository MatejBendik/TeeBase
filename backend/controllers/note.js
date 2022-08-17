import dotenv from "dotenv";
dotenv.config();
import Note from "../models/note.js";

export const saveNote = async (req, res) => {
  const subjectId = req.params.id;
  const { userId, content } = req.body;
  console.log(subjectId, content, userId);

  try {
    const newNote = new Note({
      creatorId: userId,
      subjectId: subjectId,
      content: content,
    });

    newNote.save();
  } catch (error) {
    //res.status(500).json({ message: "Chyba servera: " + error });
  }
};
