import { Document, model, models, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  imageUrl: string;
  author: {
    name: string;
    email: string;
  };
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, ""],
      trim: true,
    },
    description: {
      type: String,
      required: [true, ""],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    author: {
      name: {
        type: String,
        required: [true, ""],
        trim: true,
      },
      email: {
        type: String,
        required: [true, ""],
        trim: true,
        lowercase: true,
      },
    },
  },
  { collection: "blogs", timestamps: true },
);

export const Blog = models.Blog || model("Blog", blogSchema);
