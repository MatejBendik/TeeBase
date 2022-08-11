require("dotenv").config();
import { Response, Request } from "express";
import Subject from "../models/subject";

export const saveNote = async (req: Request, res: Response) => {
  const subjectId = req.params.id;
  const { content, userId } = req.body.content;
  console.log(subjectId, content, userId);

  try {
    const newNote = await Subject.create({
      data: {
        notes: {
          userId: userId,
          content: content,
        },
      },
    });

    newNote.save();
    res.status(200).json({ newNote });
  } catch (error) {
    res.status(500).json({ message: "Chyba servera" });
  }
};
