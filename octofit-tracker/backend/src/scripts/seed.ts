import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Alex Rivera',
      email: 'alex@example.com',
      age: 29,
      fitnessGoal: 'Improve endurance',
      city: 'Seattle',
    },
    {
      name: 'Jamie Chen',
      email: 'jamie@example.com',
      age: 34,
      fitnessGoal: 'Build strength',
      city: 'Austin',
    },
    {
      name: 'Taylor Brooks',
      email: 'taylor@example.com',
      age: 27,
      fitnessGoal: 'Increase flexibility',
      city: 'Denver',
    },
  ]);

  await Team.insertMany([
    {
      name: 'Rocket Squad',
      sport: 'Running',
      members: users.slice(0, 2).map((user) => user.name),
      captain: users[0].name,
    },
    {
      name: 'Peak Performers',
      sport: 'CrossFit',
      members: [users[2].name],
      captain: users[2].name,
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'Run',
      durationMinutes: 35,
      caloriesBurned: 420,
      completedAt: new Date('2026-06-20T06:30:00.000Z'),
    },
    {
      userId: users[1]._id.toString(),
      type: 'Strength',
      durationMinutes: 50,
      caloriesBurned: 510,
      completedAt: new Date('2026-06-21T18:00:00.000Z'),
    },
    {
      userId: users[2]._id.toString(),
      type: 'Yoga',
      durationMinutes: 45,
      caloriesBurned: 290,
      completedAt: new Date('2026-06-22T07:15:00.000Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      userId: users[0]._id.toString(),
      name: users[0].name,
      points: 1320,
      streak: 8,
    },
    {
      userId: users[1]._id.toString(),
      name: users[1].name,
      points: 1245,
      streak: 5,
    },
    {
      userId: users[2]._id.toString(),
      name: users[2].name,
      points: 1180,
      streak: 6,
    },
  ]);

  await Workout.insertMany([
    {
      name: 'HIIT Circuit',
      difficulty: 'Intermediate',
      durationMinutes: 30,
      focus: 'Cardio',
    },
    {
      name: 'Recovery Flow',
      difficulty: 'Easy',
      durationMinutes: 25,
      focus: 'Mobility',
    },
    {
      name: 'Power Lifting',
      difficulty: 'Advanced',
      durationMinutes: 45,
      focus: 'Strength',
    },
  ]);

  console.log('Seed completed successfully');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
