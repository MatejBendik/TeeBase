import express, { Express, Request, Response } from "express";

let cors = require("cors");

const app = express();
const port = 8080;

app.use(express.json(), cors({ origin: "*" }));

app
  .route("/login")
  .get((req: Request, res: Response) => {
    res.status(200).send("Get ide");
  })
  .post((req: Request, res: Response) => {
    try {
      let user = {
        username: req.body.username,
        password: req.body.password,
      };
      res.json({ token: "sa5sasa58s1a51s" });
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Miro a Mato server beží.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
