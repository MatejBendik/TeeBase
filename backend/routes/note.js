import express from "express";
import { saveNote } from "../controllers/note.js";

const router = express.Router();

router.post("/saveNote", saveNote);

export default router;
