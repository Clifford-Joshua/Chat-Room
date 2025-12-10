import io from "socket.io-client";

// ========================================================================
// import Base url from .env
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const socket = io(BASE_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

export interface ChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  sendBy: string;
  createdAt: string;
}
