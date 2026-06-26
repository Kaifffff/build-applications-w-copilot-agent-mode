import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  completedAt: { type: Date, required: true },
}, {
  timestamps: true,
});

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
