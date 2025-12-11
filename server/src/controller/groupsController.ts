import Groups from "../model/groupSchema";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { BadRequestError } from "../errors";
import { v2 as cloudinary } from "cloudinary";
import GroupMessages from "../model/groupMessageSchema";

const createGroup = async (req: Request, res: Response) => {
  const { user } = req;

  const { groupName, groupImage } = req.body;
  if (!groupName || !groupImage) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all values" });
  }

  const newGroup = await Groups.create({
    ...req.body,
    createdBy: user?.username,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Group created", newGroup });
};

const uploadGroupImage = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new Error("No files were uploaded.");
  }

  const imageFile = req.files.image;

  if (Array.isArray(imageFile)) {
    throw new BadRequestError("Please upload only one image at a time.");
  }

  if (!imageFile.mimetype.startsWith("image/")) {
    throw new BadRequestError("Please upload an image file.");
  }

  const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
    use_filename: true,
    folder: "ChatRoomUserImages",
  });

  res.status(StatusCodes.OK).json({ imageUrl: result.secure_url });
};

const getUserGroups = async (req: Request, res: Response) => {
  const { user } = req;

  const groups = await Groups.find({
    $or: [{ createdBy: user?.username }, { members: user?.username }],
  });

  res.status(StatusCodes.OK).json({ groups, counts: groups.length });
};

const activeGroup = async (req: Request, res: Response) => {
  // const userId = req?.user?.userId;
  const username = req?.user?.username;

  const userGroups = await Groups.find({
    $or: [{ createdBy: username }, { members: username }],
  }).select("_id");

  const groupIds = userGroups.map((g) => (g._id as string).toString());

  const groupChat = await GroupMessages.aggregate([
    {
      $match: {
        groupId: { $in: groupIds },
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$groupId",
        lastMessage: { $first: "$message" },
        lastMessageTime: { $first: "$createdAt" },
      },
    },
  ]);

  const groups = await Groups.find({ _id: { $in: groupIds } });

  const result = groupChat.map((chat) => {
    const group = groups.find(
      (g) => (g._id as string).toString() === (chat._id as string).toString()
    );

    return {
      groupId: group?._id,
      groupName: group?.groupName,
      groupImage: group?.groupImage,
      lastMessage: chat.lastMessage,
      lastMessageTime: chat.lastMessageTime,
    };
  });

  res.status(StatusCodes.OK).json({ result });
};

const getGroupMessages = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  // 1. Check if the group exists
  const group = await Groups.findById(groupId);
  if (!group) {
    throw new BadRequestError(`No group with ID ${groupId} exists`);
  }

  // 2. Group exists → fetch messages
  const groupMessage = await GroupMessages.find({ groupId })
    .populate({
      path: "senderId",
      select: "username userImage",
    })
    .sort({ createdAt: 1 });

  res.status(StatusCodes.OK).json({
    groupMessage,
    counts: groupMessage.length,
  });
};

const sendGroupMessage = async (
  senderId: string,
  groupId: string,
  message: string,
  sendBy: string
) => {
  const groupMessage = await GroupMessages.create({
    senderId,
    groupId,
    message,
    sendBy,
  });

  return groupMessage;
};

export {
  activeGroup,
  createGroup,
  getUserGroups,
  getGroupMessages,
  sendGroupMessage,
  uploadGroupImage,
};
