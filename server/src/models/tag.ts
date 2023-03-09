import { Schema, model, InferSchemaType } from "mongoose";

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

type tagSchemaInferType = InferSchemaType<typeof tagSchema>;
export default model<tagSchemaInferType>("tags", tagSchema);
