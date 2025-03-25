import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  try {
    res.status(200).json({ message: 'success tested' });
  } catch (error) {
    res.status(200).json({ message: `error, ${error.message}` });
  }
});

export default router;
