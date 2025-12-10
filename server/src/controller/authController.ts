import User from "../model/userSchema";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticateError,
} from "../errors";

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all values" });
  }

  const isEmailAlreadyRegistered = await User.findOne({ email });

  if (isEmailAlreadyRegistered) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "user created",
    token,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticateError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticateError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    msg: "user logged in",
    user: {
      username: user.username,
      email: user.email,
      userId: user._id,
    },
    token,
  });
};

const uploadUserImage = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new BadRequestError("No files were uploaded.");
  }

  // ==========================================================================
  // due to typescript strict type i need to make sure it's one picture been uploaded

  const imageFile = req.files.image;

  // =========================================================================
  // make sure its a single image
  if (Array.isArray(imageFile)) {
    throw new BadRequestError("Please upload only one image at a time.");
  }

  // =========================================================================
  // make sure user upload nothing else but an image

  if (!imageFile.mimetype.startsWith("image/")) {
    throw new BadRequestError("Please upload an image");
  }

  const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
    use_filename: true,
    folder: "ChatRoomUserImages",
  });

  return res.status(StatusCodes.OK).json({ userImage: result.secure_url });
};

export { register, login, uploadUserImage };
