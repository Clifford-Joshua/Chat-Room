import { Response, Request } from "express";
import Messages from "../model/messageSchema";
import { StatusCodes } from "http-status-codes";

const getMessage = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.params;

  // Fetch messages between sender and receiver
  const messages = await Messages.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ createdAt: 1 }); // Sort by creation time ascending

  res.status(StatusCodes.OK).json(messages);
};

const sendMessage = async (
  senderId: string,
  receiverId: string,
  message: string,
  sendBy: string
) => {
  const userMessage = await Messages.create({
    senderId,
    receiverId,
    message,
    sendBy,
  });
  return userMessage;
};

export { getMessage, sendMessage };
 