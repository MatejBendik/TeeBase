require("dotenv").config();
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users";

const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json(), cors({ origin: "*" }));

app.use("/user", userRoutes);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
;

/* Iba default */
app.get("/", (req: Request, res: Response) => {
  res.send("Miro a Mato server beží.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
