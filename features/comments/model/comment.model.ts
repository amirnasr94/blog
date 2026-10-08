import { model, models, Schema } from "mongoose";

export interface IComment extends Document {
  postId: Schema.Types.ObjectId;
  content: string;
  authorId: string;
  authorName: string;
}

const commenstSchema = new Schema<IComment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Post ID is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxLength: [1000, "Content must be at most 1000 characters long"],
    },
    authorId: {
      type: String,
      required: [true, "Author ID is required"],
      trim: true,
    },
    authorName: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
  },
  { collection: "comments", timestamps: true },
);

export const Comments = models.Comments || model("Comments", commenstSchema);
