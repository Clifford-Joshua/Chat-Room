import jwt from "jsonwebtoken";
import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { sendMessage } from "./controller/messageController";
import { sendGroupMessage } from "./controller/groupsController";
import { updateUserSocket, getOnlineUsers } from "./controller/userController";

interface DecodedUser {
  userId: string;
}

interface AuthenticatedSocket extends Socket {
  userId: string;
}

const userSocketMap: Record<string, string> = {};

const sendOnlineUsers = async (io: any) => {
  try {
    const onlineUsers = await getOnlineUsers();
    io.emit("online-users", onlineUsers);
  } catch (error) {
    console.error("Error fetching online users : ", error);
    io.emit("online-users", []);
  }
};

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: ["https://chat-ro.netlify.app", "http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  // ==============================================
  // Middleware to verify JWT token from client
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;

      (socket as AuthenticatedSocket).userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const authSocket = socket as AuthenticatedSocket;
    const userId = authSocket.userId;
    userSocketMap[userId] = socket.id;

    // Update user status to online
    updateUserSocket(userId, socket.id, true)
      .then(async () => {
        setTimeout(() => sendOnlineUsers(io), 300);
      })
      .catch((err) =>
        console.error("Error updating user status to online:", err)
      );

    // ========================================================================================
    // filter based on search user
    socket.on("get-online-users", async ({ search }) => {
      try {
        const users = await getOnlineUsers(search);
        socket.emit("online-users", users);
      } catch (error) {
        console.error("Error fetching online users:", error);
        socket.emit("online-users", []);
      }
    });

    // ==========================================================================================
    // user group join
    socket.on("join_group", ({ groupId }) => {
      socket.join(groupId);
    });

    // ==========================================================================================
    // send group message
    socket.on(
      "group_message",
      async ({
        sendBy,
        message,
        senderId,
        groupId,
      }: {
        sendBy: string;
        message: string;
        senderId: string;
        groupId: string;
      }) => {
        try {
          const savedMessage = await sendGroupMessage(
            senderId,
            groupId,
            message,
            sendBy
          );

          io.to(groupId).emit("group_message", savedMessage);
        } catch (error) {
          console.log(error);
        }
      }
    );

    // ==========================================================================================
    // send message

    socket.on(
      "private_message",
      async ({
        sendBy,
        message,
        senderId,
        receiverId,
      }: {
        sendBy: string;
        message: string;
        senderId: string;
        receiverId: string;
      }) => {
        try {
          const receiverSocketId = userSocketMap[receiverId];
          const savedMessage = await sendMessage(
            senderId,
            receiverId,
            message,
            sendBy
          );

          if (receiverSocketId) {
            io.to(receiverSocketId).emit("private_message", savedMessage);
          }
        } catch (error) {
          console.log(error);
        }
      }
    );

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      // Update user status to offline
      updateUserSocket(userId, socket.id, false)
        .then(async () => sendOnlineUsers(io))
        .catch((err) =>
          console.error("Error updating user status to offline:", err)
        );
    });

    return io;
  });
};
