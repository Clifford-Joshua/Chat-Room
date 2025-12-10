const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

const { UnAuthenticateError } = require("../errors");

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticateError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: payload.userId,
      username: payload.username,
    };

    next();
  } catch (error) {
    throw new UnAuthenticateError("Authentication invalid");
  }
};

export default auth;
