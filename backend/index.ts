import express, { Express, Request, Response } from 'express';
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScrip Server with Miro a Mato');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})