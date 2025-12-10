import { message } from "../types/User";
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema<message>(
  {
    senderId: {
      type: String,
    },
    sendBy: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model<message>("message", messageSchema);

export default Messages;
