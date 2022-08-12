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
        yield subject_1.default.updateOne({ subjectId: subjectId, "data.notes.user.userId": userId }, {
            $set: {
                "data.notes.user.userId.content": content,
            },
        }, () => {
            return res.status(200).json({ message: "Nahralo to" });
        });
    }
    catch (error) {
        res.status(500).json({ message: "Chyba servera" });
    }
});
exports.saveNote = saveNote;
