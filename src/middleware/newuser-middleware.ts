import { Request, Response, NextFunction } from "express";
import Joi from "../protocols/joi.js";
import { NewUser } from "../protocols/contracts.js";
import httpStatus from "http-status";

export default async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUser = req.body as NewUser;

  const { error } = Joi.userSchema.validate(newUser, { abortEarly: false });
  if (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send(error.details.map((item) => item.message));
  } else {
    next();
  }
}
