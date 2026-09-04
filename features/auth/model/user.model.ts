import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    role: {
      type: String,
      required: false,
      default: "user",
      enum: ["admin", "user"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
  },
  { collection: "users", timestamps: true },
);

export const User = models.User || model<IUser>("User", UserSchema);
