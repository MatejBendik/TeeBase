require("dotenv").config();
import { Response, Request } from "express";
import Subject from "../models/subject";

export const saveNote = async (req: Request, res: Response) => {
  const subjectId = req.params.id;
  const { userId, content } = req.body;
  console.log(subjectId, content, userId);

  try {
    /*
    const testNote = new Subject({
      title: subjectId,
      data: {
        note: {
          creatorId: userId,
          content: content,
        },
        task: {
          creatorId: userId,
          content: content,
        },
      },
    });

    testNote.save();
*/
    await Subject.updateOne(
      { title: subjectId, "data.note.creatorId": userId },
      {
        $set: {
          "data.note.content": content,
        },
      },
      () => {
        return res.status(200).json({ message: "Nahralo to" });
      }
    );
  } catch (error) {
    //res.status(500).json({ message: "Chyba servera: " + error });
  }
};
