import express, { json } from 'express';
import cors from 'cors';
import createProfile from './routes/create-profile.js';
import { config } from 'dotenv';

config();
const app = express();
app.use(json());
app.use(
  cors({
    origin: 'http://localhost:8081',
  })
);

app.listen(process.env.PORT, () => {
  console.log('port running');
});

app.use('/api', createProfile);
