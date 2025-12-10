import { time } from "console";
import { Group } from "../types/User";
import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema<Group>(
  {
    groupName: {
      type: String,
      required: [true, "Please provide group name"],
    },
    members: {
      type: [],
    },
    groupImage: {
      type: String,
      required: [true, "Group image required"],
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Groups = mongoose.model<Group>("Group", groupSchema);
export default Groups;
