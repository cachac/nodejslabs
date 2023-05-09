import mongoose from "mongoose";
import { bitacoraSchema } from "./bitacora.js";
import uniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    state: {
      type: Boolean,
      default: true,
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
    metadata: new Schema({
      hash: {
        type: string,
      },
      num: {
        type: Number,
      },
    }),
    bitacora: {
      type: [bitacoraSchema],
    },
  },
  {
    collection: "Post",
    timestamps: true,
  }
);

postSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

export default mongoose.model("Post", postSchema);
