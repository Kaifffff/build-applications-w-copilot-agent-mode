import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();

  res.json({
    message: 'Workouts route',
    workouts,
  });
});

export default router;
