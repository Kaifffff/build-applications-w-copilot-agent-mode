import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find({}).lean();

  res.json({
    message: 'Users route',
    users,
  });
});

export default router;
