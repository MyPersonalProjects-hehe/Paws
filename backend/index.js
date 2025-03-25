import express, { json } from 'express';
import cors from 'cors';
import { db } from './connection/connection.js';

const app = express();
app.use(json());
app.use(
  cors({
    origin: 'http://localhost:8081',
  })
);

app.listen(3000, () => {
  console.log('port running');
});

app.get('/test', async (req, res) => {
  const collection = await db.collection('users').find({}).toArray();
  console.log(collection, 'hehe');

  // res.status(200).send({ message: collection });
});
