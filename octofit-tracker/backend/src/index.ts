import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { getApiBaseUrl } from './config';
import usersRoutes from './routes/users';
import teamsRoutes from './routes/teams';
import activitiesRoutes from './routes/activities';
import leaderboardRoutes from './routes/leaderboard';
import workoutsRoutes from './routes/workouts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiBaseUrl: getApiBaseUrl(),
  });
});

app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutsRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
      console.log(`API base URL: ${getApiBaseUrl()}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
