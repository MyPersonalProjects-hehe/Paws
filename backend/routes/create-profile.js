import { Router } from 'express';
import { db } from '../connection/connection.js';

const router = Router();

router.post('/createProfile', async (req, res) => {
  try {
    const document = req.body;
    const collection = await db.collection('Users').insertOne(document);
    collection.acknowledged
      ? res.status(200).json({ message: 'success' })
      : res.status(400).json({ message: 'bad request' });
  } catch (error) {
    res.status(200).json({ message: `error, ${error.message}` });
  }
});

export default router;
