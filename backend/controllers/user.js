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
exports.changePassword = exports.deleteUser = exports.getUser = exports.register = exports.login = void 0;
require("dotenv").config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const console_1 = __importDefault(require("console"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ username: username });
        if (!existingUser) {
            return res.status(401).json({ message: "Používateľ neexistuje !" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: "Heslo sa nezhoduje s menom" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        /* cookies nejdu
        res.cookie("access-token", token, {
          expires: new Date(Date.now() * 3600000),         // cas sa zadava v ms, 1hod = 3 600 000ms
          httpOnly: true,
          secure: process.env.NODE_ENV === "production"    // ked to je v produkcii secure je true, ked ne ta false, ked je true tak v produkcii musime mat SSL
        });
        */
        return res.status(200).json({ user: existingUser, token: token });
    }
    catch (error) {
        res.status(500).json({ message: "Chyba servera" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, username, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser)
            return res
                .status(400)
                .json({ message: "Užívateľ s týmto nickom už existuje !" });
        const saltRounds = 12;
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const newUser = yield user_1.default.create({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({
            id: newUser._id,
            username: newUser.username,
            password: newUser.password,
        }, "test", { expiresIn: "1h" });
        newUser.save();
        res.status(200).json({ newUser, token });
    }
    catch (error) {
        res.status(500).json({ message: "Chyba servera" });
    }
});
exports.register = register;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const existingUser = yield user_1.default.findById(userId);
        if (!existingUser) {
            return res.status(400).json({ message: "Uživateľ sa nenašiel !" });
        }
        res.status(200).json(existingUser);
    }
    catch (error) {
        res.status(500).json({ message: "Nepodarilo sa načítat profil" });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const existingUser = yield user_1.default.findByIdAndDelete(userId);
        if (!existingUser) {
            return res.status(400).json({ message: "Uživateľ sa nenašiel !" });
        }
        res.status(200).json({ message: "Účet bol úspešne vymazaný" });
    }
    catch (error) {
        res.status(500).json({ message: "Nepodarilo sa načítat profil" });
    }
});
exports.deleteUser = deleteUser;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { oldPassword, newPassword, copyNewPassword } = req.body;
    try {
        const existingUser = yield user_1.default.findById(userId);
        if (!existingUser) {
            return res.status(400).json({ message: "Uživateľ sa nenašiel !" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(oldPassword, existingUser.password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: "Heslo sa nezhoduje s vasím učtom" });
        }
        if (newPassword === oldPassword) {
            return res
                .status(402)
                .json({ message: "Nové heslo sa zhoduje so starým !" });
        }
        if (newPassword !== copyNewPassword) {
            return res.status(403).json({ message: "Nové heslá sa nezhodujú !" });
        }
        let newHashedPassword = yield bcryptjs_1.default.hash(newPassword, 12);
        user_1.default.updateOne({ _id: userId }, { password: newHashedPassword }, (err, user) => {
            console_1.default.log(err);
        });
        res.status(200).json({ message: "Heslo bolo zmenené" });
    }
    catch (error) {
        res.status(500).json({ message: "Nepodarilo sa načítat profil" });
    }
});
exports.changePassword = changePassword;
