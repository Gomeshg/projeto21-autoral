import { NextFunction, Request, Response } from "express";
import status from "http-status";
import dayjs from "dayjs";

export default function validateDate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const date = dayjs(req.params.date);
  if (!date.isValid()) {
    return res.sendStatus(status.BAD_REQUEST);
  }

  res.locals.date = date;
  next();
}
