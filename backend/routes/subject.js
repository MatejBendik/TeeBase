"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subject_1 = require("../controllers/subject");
const router = express_1.default.Router();
router.post("/saveNote/:id", subject_1.saveNote);
exports.default = router;
