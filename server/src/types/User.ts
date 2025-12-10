import { Document } from "mongoose";
import { Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  socketId?: string;
  isOnline: boolean;
  userImage: string;
  hasChatted: boolean;
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface message extends Document {
  senderId: string;
  sendBy: string;
  receiverId: string;
  message: string;
  createdAt: string;
}

export interface groupMessage extends Document {
  sendBy: string;
  groupId: string;
  message: string;
  createdAt: string;
  senderId: Types.ObjectId;
}

export interface Group extends Document {
  groupName: string;
  members: string[];
  createdAt: string;
  createdBy: string;
  groupImage: string;
}
