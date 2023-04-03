import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: String,
    followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "users" }],
    lists: [
      {
        name: { type: String },
        posts: [{ type: Schema.Types.ObjectId, ref: "posts" }],
        images: [{ type: String }],
      },
    ],
    intrests: [{ type: String, required: true }],
    ignore: [{ type: Schema.Types.ObjectId, ref: "posts" }],
    mutedAuthor: [{ type: Schema.Types.ObjectId, ref: "users" }],
    notifications: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        username: { type: String, required: true },
        avatar: String,
        message: { type: String, required: true },
        postId: { type: Schema.Types.ObjectId, ref: "posts" },
        postTitle: String,
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

type userSchemaInferType = InferSchemaType<typeof userSchema>;
export default model<userSchemaInferType>("users", userSchema);
