import User from "../model/userSchema";
import { Request, Response } from "express";
import Messages from "../model/messageSchema";
import { StatusCodes } from "http-status-codes";

const updateUserSocket = async (
  userId: string,
  socketId: string,
  status: boolean
) => {
  const user = await User.findById(userId);
  if (user) {
    user.socketId = socketId;
    user.isOnline = status;
    await user.save();
  }

  return;
};

const getOnlineUsers = async (searchTerm: string = "") => {
  // ========================================================================
  // filter
  const filter = {
    isOnline: true,
    ...(searchTerm && {
      username: {
        $regex: searchTerm,
        $options: "i",
      },
    }),
  };

  const onlineUser = await User.find(filter).select("-password");

  return onlineUser;
};

// ============================================================================================
// mongoose query to get all users who have chatted before

const getChatList = async (req: Request, res: Response) => {
  const userId = req?.user?.userId;

  // Get last message with each user
  const chatList = await Messages.aggregate([
    {
      $match: {
        $or: [{ senderId: userId }, { receiverId: userId }],
      },
    },
    {
      // Sort messages by newest first
      $sort: { createdAt: -1 },
    },
    {
      // Group by the other user
      $group: {
        _id: {
          $cond: [{ $eq: ["$senderId", userId] }, "$receiverId", "$senderId"],
        },
        lastMessage: { $first: "$message" },
        lastMessageTime: { $first: "$createdAt" },
        senderId: { $first: "$senderId" },
        receiverId: { $first: "$receiverId" },
      },
    },
  ]);

  // Populate the user info
  const userIds = chatList.map((chat) => chat._id);

  const users = await User.find({ _id: { $in: userIds } }).select("-password");

  // Attach user info to each chat
  const result = chatList.map((chat) => {
    const user = users.find(
      (u) => (u._id as string).toString() === (chat._id as string).toString()
    );

    return {
      userId: user?._id,
      username: user?.username,
      isOnline: user?.isOnline,
      userImage: user?.userImage,
      lastMessage: chat.lastMessage,
      lastMessageTime: chat.lastMessageTime,
    };
  });

  res.status(StatusCodes.OK).json(result);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({}).select("-password -userImage -email");

  res.status(StatusCodes.OK).json({
    users,
  });
};

export { getChatList, updateUserSocket, getOnlineUsers, getAllUsers };
