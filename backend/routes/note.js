import express from "express";
import { saveNote, getNotes } from "../controllers/note.js";

const router = express.Router();

router.post("/saveNote", saveNote);
router.get("/getNotes/:userId/:subjectId", getNotes);

export default router;
