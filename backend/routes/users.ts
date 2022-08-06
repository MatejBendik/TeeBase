import express from "express";
import {
  login,
  register,
  getUser,
  deleteUser,
  changePassword,
} from "../controllers/user";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getUser/:id", getUser);
router.get("/deleteUser/:id", deleteUser);
router.put("/:id/changePassword", changePassword);

export default router;
