import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { createServer } from "http";
import connectDB from "./db/connect";
import { initializeSocket } from "./socket";
import fileUpload from "express-fileupload";
import NOT_FOUND from "./middleware/NotFound";
import { v2 as cloudinary } from "cloudinary";
import errorHandlerMiddleware from "./middleware/errorHandler";

import userRoutes from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import groupsRoutes from "./routes/groupsRoutes";
import messageRoutes from "./routes/messageRoute";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

initializeSocket(httpServer);

app.use(express.static("./public"));

const allowedOrigins = ["https://chat-ro.netlify.app", "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// ============================================================================
// using cloudinary for image upload install cloudinary and express file upload
// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("welcome, to chat Room!!!!!!!!!!!!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/groups", groupsRoutes);
app.use("/api/v1/messages", messageRoutes);

app.use(NOT_FOUND);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL!);
    console.log("✅ Connected to MongoDB");

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1); // Stop the app if DB fails
  }
};

start();
