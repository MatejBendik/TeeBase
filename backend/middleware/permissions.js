"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requiresAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies["access-token"];
    let isAuthed = false;
    if (token) {
        try {
            const id = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            try {
                const user = yield user_1.default.findById(id);
                if (user) {
                    const userToReturn = Object.assign({}, user);
                    req.user = userToReturn;
                    isAuthed = true;
                }
            }
            catch (_a) {
                isAuthed = false;
            }
        }
        catch (_b) {
            isAuthed = false;
        }
    }
    if (isAuthed) {
        return next();
    }
    else {
        return res.status(401).send("Unauthorized");
    }
});
exports.default = requiresAuth;
