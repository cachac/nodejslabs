import mongoose from "mongoose";

const { Schema } = mongoose;
export const bitacoraSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  detail: {
    type: String,
    required: true,
    maxLength: [100, "Max 100 chars"]
  },
});
