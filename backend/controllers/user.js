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
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    try {
        const existingUser = yield user_1.default.findOne({ username });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist. " });
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Wrong password" });
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
            username: existingUser.username,
            password: existingUser.password,
        }, "test", { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: "Coškaj wrong s loginom" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, username, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser)
            return res.status(400).json({ message: "User already exists. " });
        if (!password)
            return res.status(400).json({ message: "Weak password" });
        const saltRounds = 12;
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const result = yield user_1.default.create({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: result._id, username: result.username, password: result.password }, "test", { expiresIn: "1h" });
        res.status(200).json({ result, token });
    }
    catch (error) {
        res.status(500).json({ message: "Coškaj wrong s registerom" });
    }
});
exports.register = register;
