import { groupMessage } from "../types/User";
import mongoose, { Schema, Document } from "mongoose";

const groupMessageSchema = new Schema<groupMessage>(
  {
    sendBy: {
      type: String,
    },
    groupId: {
      type: String,
    },
    message: {
      type: String,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const GroupMessages = mongoose.model<groupMessage>(
  "groupMessage",
  groupMessageSchema
);

export default GroupMessages;
