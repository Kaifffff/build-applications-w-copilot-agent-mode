import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find({}).lean();

  res.json({
    message: 'Activities route',
    activities,
  });
});

export default router;
