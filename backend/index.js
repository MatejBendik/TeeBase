import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import subjectRoutes from "./routes/subject.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 8080;

app.use(express.json(), cors({ origin: "*" }));
app.use("/user", userRoutes);
app.use("/subject", subjectRoutes);
app.use(cookieParser());

// Pripojenie na databazu
mongoose
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
