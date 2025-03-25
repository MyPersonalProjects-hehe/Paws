import express, { json } from 'express';
import cors from 'cors';
import test from './routes/test.js';

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

app.use(test);
