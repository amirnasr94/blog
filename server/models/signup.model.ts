import { Document, model, models, Schema } from "mongoose";

export interface ISignup extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
}

const SignupSchema = new Schema<ISignup>(
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

const SignUpModel =
  models.SignupModel || model<ISignup>("SignupModel", SignupSchema);

export default SignUpModel;
