import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    todoContent: { type: String, required: true },
    ip: {type:String}
    // owner: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export const Todo = model("Todo", todoSchema);