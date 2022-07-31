"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let cors = require("cors");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json(), cors({ origin: "*" }));
app
    .route("/login")
    .get((req, res) => {
    res.status(200).send("Get ide");
})
    .post((req, res) => {
    try {
        let user = {
            username: req.body.username,
            password: req.body.password,
        };
        res.json({ token: "sa5sasa58s1a51s" });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.get("/", (req, res) => {
    res.send("Miro a Mato server beží.");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
