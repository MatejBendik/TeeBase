import express from "express";
import { saveNote, getNotes, getLatestNote } from "../controllers/note.js";

const router = express.Router();

router.post("/saveNote", saveNote);
router.get("/getNotes/:userId/:subjectId", getNotes);
router.get("/getLatestNote", getLatestNote);

export default router;
