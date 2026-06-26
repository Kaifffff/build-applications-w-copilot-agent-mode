import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find({}).lean();

  res.json({
    message: 'Teams route',
    teams,
  });
});

export default router;
