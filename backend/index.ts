import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users';

const cors = require('cors');

const app = express()
const port = 8080

app.use(express.json(), cors({ origin: '*' }));
app.use(cors());

app.use('/user', userRoutes);

mongoose.connect('mongodb://localhost:27017/users',() => {
  console.log('connected to database');
})

app
  .route("/login")
  .get((req, res)  => {
    res.status(200).send(("Get ide"))
  })
  .post((req,res) => {
    console.log("Username: " + req.body.username)
    console.log("Password: " + req.body.password)

    let user = {
      username : req.body.username,
      password : req.body.password
  }

    res.json(user)
  })

app.get('/', (req: Request, res: Response) => {
  res.send('Miro a Mato server beží.');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})