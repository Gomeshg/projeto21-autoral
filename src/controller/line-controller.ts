import status from "http-status";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth-middleware.js";
import { NewLine } from "../protocols/contracts.js";
import lineService from "../service/line-service.js";

export async function getLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { date } = req.params;

  try {
    const line = await lineService.getLine(date);
    return res.status(status.OK).send(line);
  } catch (error) {
    return res.sendStatus(status.INTERNAL_SERVER_ERROR);
  }
}

export async function postLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body: NewLine = req.body;
  try {
    await lineService.postLine(userId, body);
    return res.sendStatus(status.CREATED);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.sendStatus(status.CONFLICT);
    }
    return res.sendStatus(status.INTERNAL_SERVER_ERROR);
  }
}

export async function putLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const lineId = Number(req.params.id);
  const body: NewLine = req.body;

  try {
    await lineService.putLine(userId, lineId, body);
    return res.sendStatus(status.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(status.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(status.UNAUTHORIZED);
    }
    return res.sendStatus(status.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteLine(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const lineId = Number(req.params.id);

  try {
    await lineService.deleteLine(userId, lineId);
    return res.sendStatus(status.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(status.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(status.UNAUTHORIZED);
    }
    return res.sendStatus(status.INTERNAL_SERVER_ERROR);
  }
}
