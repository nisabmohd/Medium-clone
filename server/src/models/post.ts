import { Schema, InferSchemaType, model } from "mongoose";

const userSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    markdown: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tag: [{ type: Schema.Types.ObjectId, ref: "tags" }],
    votes: [{ type: Schema.Types.ObjectId, ref: "users" }],
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

type userSchemaInferType = InferSchemaType<typeof userSchema>;
export default model<userSchemaInferType>("posts", userSchema);
