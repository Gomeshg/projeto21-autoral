import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import prisma from "../database/prisma";
import jwt from "jsonwebtoken";
import userRepository from "../repository/user-repository";
import dotenv from "dotenv";
dotenv.config();

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers?.authorization;
  const token = authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const thereIsToken = await userRepository.findSessionByToken(token);
    if (thereIsToken) {
      const isValidToken = jwt.verify(token, process.env.JWT_KEY);
      if (isValidToken) {
        res.locals.userId = thereIsToken.userId;
        next();
      }
    } else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
