require("dotenv").config();
import { Response, Request } from "express";
import Subject from "../models/subject";

export const saveNote = async (req: Request, res: Response) => {
  const subjectId = req.params.id;
  const { userId, content } = req.body;
  console.log(subjectId, content, userId);

  try {
    await Subject.updateOne(
      { subjectId: subjectId, "data.notes.user.userId": userId },
      {
        $set: {
          "data.notes.user.userId.content": content,
        },
      },
      () => {
        return res.status(200).json({ message: "Nahralo to" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Chyba servera" });
  }
};
