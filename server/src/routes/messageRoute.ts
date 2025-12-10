import express from "express";

const router = express.Router();

import { getMessage } from "../controller/messageController";

router.get("/:senderId/:receiverId", getMessage);

export default router;
