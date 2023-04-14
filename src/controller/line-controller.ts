import status from "http-status";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth-middleware.js";
import { Line } from "../protocols/contracts.js";
import dayjs from "dayjs";

export async function getLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { date } = req.params;

  try {
    // const line = await lineService.getTodayLine(userId, date);
    // return res.status(status.OK).send(line);
  } catch (error) {
    if (error.name === "BadRequestError") {
      return res.sendStatus(status.BAD_REQUEST);
    }
    return res.sendStatus(status.INTERNAL_SERVER_ERROR);
  }
}

export async function postLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  return res.status(status.OK).send("Foi!");
  try {
  } catch (error) {}
}

export async function putLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  try {
  } catch (error) {}
}

export async function deleteLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;

  try {
  } catch (error) {}
}
