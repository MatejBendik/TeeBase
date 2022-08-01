"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors = require("cors");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json(), cors({ origin: "*" }));
app.use("/user", users_1.default);
app.use((0, cookie_parser_1.default)());
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to database");
})
    .catch((err) => {
    console.log(err);
});
/* Iba default */
app.get("/", (req, res) => {
    res.send("Miro a Mato server beží.");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
