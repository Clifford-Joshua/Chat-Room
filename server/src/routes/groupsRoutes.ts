import express from "express";
const router = express.Router();

import {
  activeGroup,
  createGroup,
  getUserGroups,
  getGroupMessages,
  uploadGroupImage,
} from "../controller/groupsController";
import auth from "../middleware/authentication";

router.get("/active-group", auth, activeGroup);
router.post("/create-Group", auth, createGroup);
router.get("/user-Groups", auth, getUserGroups);
router.post("/groupImage", uploadGroupImage);
router.get("/group-Messages/:groupId", getGroupMessages);

export default router;
