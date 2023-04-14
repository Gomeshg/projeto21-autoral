import httpStatus from "http-status";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth-middleware.js";
import { Line } from "../protocols/contracts.js";

export async function getLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { date } = res.locals;
  try {
    // const line = await lineService.getTodayLine(userId, date);
    // return res.status(httpstatus.OK).send(line);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
  } catch (error) {}
}

export async function putLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = res.locals;
  try {
  } catch (error) {}
}

export async function deleteLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = res.locals;

  try {
  } catch (error) {}
}
