import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  fitnessGoal: string;
  city: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  fitnessGoal: { type: String, required: true },
  city: { type: String, required: true },
}, {
  timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
