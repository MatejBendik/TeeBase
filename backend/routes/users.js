import express from "express";
import {
  login,
  register,
  getUser,
  deleteUser,
  changePassword,
  editUser,
  getUsersLocation,
  forgotUserDataFetch,
  authenticateToken,
} from "../controllers/user.js";

const router = express.Router();

router.put("/login", login);
router.post("/register", register);
router.get("/getUser/:id", authenticateToken, getUser);
router.delete("/deleteUser/:id", authenticateToken, deleteUser);
router.put("/:id/changePassword", authenticateToken, changePassword);
router.put("/:id/editUser", authenticateToken, editUser);
router.get("/getUsersLocation", authenticateToken, getUsersLocation);
router.post("/forgotUserDataFetch", forgotUserDataFetch);

export default router;
