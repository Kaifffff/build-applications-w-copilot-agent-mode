import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const database = mongoose.connection;

export const connectToDatabase = async () => {
  if (database.readyState >= 1) {
    return database;
  }

  await mongoose.connect(MONGO_URI);
  return database;
};

export default connectToDatabase;
