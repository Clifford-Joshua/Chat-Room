import express from "express";
const router = express.Router();
import auth from "../middleware/authentication";

import { getChatList, getAllUsers } from "../controller/userController";

router.get("/", getAllUsers);
router.get("/all-chattedUsers", auth, getChatList);

export default router;
