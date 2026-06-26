"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../database");
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
dotenv_1.default.config();
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
    ]);
    const users = await user_1.default.insertMany([
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
    await team_1.default.insertMany([
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
    await activity_1.default.insertMany([
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
    await leaderboard_1.default.insertMany([
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
    await workout_1.default.insertMany([
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
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
