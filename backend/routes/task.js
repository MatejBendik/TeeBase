import express from "express";
import { saveTask, getTasks } from "../controllers/task.js";

const router = express.Router();

router.post("/saveTask", saveTask);
router.get("/getTasks/:userId/:subjectId", getTasks);

export default router;
