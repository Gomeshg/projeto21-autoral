import { Request, Response, NextFunction } from "express";
import status from "http-status";
import jwt from "jsonwebtoken";
import userRepository from "../repository/user-repository.js";
import dotenv from "dotenv";
dotenv.config();

export default async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers?.authorization;
  const token = authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(status.UNAUTHORIZED);
  }

  try {
    const thereIsToken = await userRepository.findSessionByToken(token);
    if (thereIsToken) {
      const isValidToken = jwt.verify(token, process.env.JWT_KEY);
      if (isValidToken) {
        req.userId = thereIsToken.userId;
        next();
      }
    } else {
      return res.sendStatus(status.UNAUTHORIZED);
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.sendStatus(status.UNAUTHORIZED);
    }
    return res.sendStatus(status.INTERNAL_SERVER_ERROR);
  }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
