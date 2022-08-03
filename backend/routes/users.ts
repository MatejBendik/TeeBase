import express from "express";
import { login, register, getUser } from "../controllers/user";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getUser/:id", getUser);

export default router;
