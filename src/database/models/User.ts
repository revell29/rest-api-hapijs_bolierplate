import { Schema, Model, model, Document } from "mongoose";

/**
 * Interface to model the User Schema
 */
export interface IUser extends Document {
  username: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const User: Model<IUser> = model("users", userSchema);

export default User;
