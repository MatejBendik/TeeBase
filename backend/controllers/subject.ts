require("dotenv").config();
import { Response, Request } from "express";
import Subject from "../models/subject";

export const saveNote = async (req: Request, res: Response) => {
  const subjectId = req.params.id;
  const { userId, content } = req.body;
  console.log(subjectId, content, userId);

  try {
    // TODO:
    // ukladat do notes a tasks:
    //  _id, creatorId, content, createdAt

    /*
    await Subject.findOne(
      { subjectId: subjectId },
      (err: any, foundSubject: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log(foundSubject);
        }
      }
    );
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

    /*
    const testNote = new Subject({
      title: "Jazyk 1",
      subjectId: subjectId,
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
  } catch (error) {
    //res.status(500).json({ message: "Chyba servera: " + error });
  }
};
