import express from "express";
import { saveTask } from "../controllers/task.js";

const router = express.Router();

router.post("/saveTask", saveTask);

export default router;
