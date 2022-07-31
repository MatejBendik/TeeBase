import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users';

const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json(), cors({ origin: '*' }));
app.use(cors());

app.use('/user', userRoutes);

mongoose.connect('mongodb://localhost:27017/users',() => {
  console.log('connected to database');
})

/* Login */
app
  .route("/login")
  .get((req: Request, res: Response) => {
    res.status(200).send("Login ide");
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

/* Register */
app
  .route("/register")
  .get((req: Request, res: Response) => {
    res.status(200).send("Register ide");
  })
  .post((req: Request, res: Response) => {
    try {
      let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      };
      res.json(newUser);
    } catch (error) {
      res.status(500).send(error);
    }
  });

/* Iba default */
app.get("/", (req: Request, res: Response) => {
  res.send("Miro a Mato server beží.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
