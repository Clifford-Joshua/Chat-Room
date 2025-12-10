import express from "express";
const router = express.Router();

import { register, login, uploadUserImage } from "../controller/authController";

router.post("/register", register);
router.post("/login", login);
router.post("/upload", uploadUserImage);

export default router;
