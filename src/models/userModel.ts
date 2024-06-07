import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  identity_number: string;
  email: string;
  date_of_birth: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  identity_number: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  date_of_birth: { type: Date, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
