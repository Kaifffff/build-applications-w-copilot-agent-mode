import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  name: string;
  points: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
}, {
  timestamps: true,
});

const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);

export default LeaderboardEntry;
