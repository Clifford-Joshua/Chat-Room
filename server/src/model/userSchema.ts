import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { IUser } from "../types/User";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide username"],
    minlength: [4, "username should not be less than 4 characters"],
  },
  userImage: {
    type: String,
    required: [true, "Profile image required"],
  },
  socketId: {
    type: String,
  },
  isOnline: {
    type: Boolean,
  },
  hasChatted: {
    type: Boolean,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: " Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function (): string {
  return jwt.sign(
    { userId: this._id.toString(), username: this.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_LIFETIME as any,
    }
  );
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
