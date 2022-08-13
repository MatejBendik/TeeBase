"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNote = void 0;
require("dotenv").config();
const subject_1 = __importDefault(require("../models/subject"));
const saveNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectId = req.params.id;
    const { userId, content } = req.body;
    console.log(subjectId, content, userId);
    try {
        // TODO:
        // urobit novu schemu pre notes
        // urobit novu schemu pre tasks
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
        yield subject_1.default.updateOne({ title: subjectId, "data.note.creatorId": userId }, {
            $set: {
                "data.note.content": content,
            },
        }, () => {
            return res.status(200).json({ message: "Nahralo to" });
        });
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
    }
    catch (error) {
        //res.status(500).json({ message: "Chyba servera: " + error });
    }
});
exports.saveNote = saveNote;
