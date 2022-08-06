"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.post("/login", user_1.login);
router.post("/register", user_1.register);
router.get("/getUser/:id", user_1.getUser);
router.get("/deleteUser/:id", user_1.deleteUser);
router.put("/:id/changePassword", user_1.changePassword);
exports.default = router;
