"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subjectSchema = new mongoose_1.default.Schema({
    data: {
        subjects: [
            {
                id: { type: String, required: true },
                title: { type: String, required: true },
                notes: {
                    userId: {
                        type: String,
                        required: true,
                    },
                    content: {
                        type: String,
                        required: true,
                    },
                    createAt: {
                        type: Date,
                        default: new Date(),
                    },
                },
                tasks: {
                    userId: {
                        type: String,
                        required: true,
                    },
                    content: {
                        type: String,
                        required: true,
                    },
                    createAt: {
                        type: Date,
                        default: new Date(),
                    },
                },
            },
        ],
    },
});
const Subject = mongoose_1.default.model("Subject", subjectSchema);
exports.default = Subject;
