import express from "express";
import { saveNote } from "../controllers/subject";

const router = express.Router();

router.put("/saveNote/:id", saveNote);

export default router;
