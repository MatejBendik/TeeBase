import express from "express";
import { saveNote } from "../controllers/subject.js";

const router = express.Router();

router.put("/saveNote/:id", saveNote);

export default router;
