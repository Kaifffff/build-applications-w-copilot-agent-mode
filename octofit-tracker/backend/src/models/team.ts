import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  captain: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: [String], required: true },
  captain: { type: String, required: true },
}, {
  timestamps: true,
});

const Team = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
