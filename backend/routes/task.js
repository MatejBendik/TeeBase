import express from "express";
import { saveTask, getTasks, getLatestTask } from "../controllers/task.js";

const router = express.Router();

router.post("/saveTask", saveTask);
router.get("/getTasks/:userId/:subjectId", getTasks);
router.get("/getLatestTask", getLatestTask);

export default router;
