import express from "express";
import {
  login,
  register,
  getUser,
  deleteUser,
  changePassword,
  editUser,
  authenticateToken,
} from "../controllers/user";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getUser/:id", authenticateToken, getUser);
router.delete("/deleteUser/:id", authenticateToken, deleteUser);
router.put("/:id/changePassword", authenticateToken, changePassword);
router.put("/:id/editUser", authenticateToken, editUser);

export default router;
