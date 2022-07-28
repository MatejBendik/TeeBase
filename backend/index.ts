import express, { Express, Request, Response } from 'express';

let cors = require('cors');

const app = express()
const port = 8080

app.use(express.json(), cors({ origin: '*' }));

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