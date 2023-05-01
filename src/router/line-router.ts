import { Router } from "express";
import {
  getLines,
  getOneLine,
  postLine,
  putLine,
  deleteLine,
} from "../controller/line-controller.js";
import authenticateToken from "../middleware/auth-middleware.js";
import {
  validateBody,
  validateParams,
} from "../middleware/validation-middleware.js";
import Joi from "../protocols/joi.js";
const lineRouter = Router();

lineRouter.post(
  "/line",
  authenticateToken,
  validateBody(Joi.lineSchema),
  postLine
);
lineRouter.get(
  "/line/:date",
  authenticateToken,
  validateParams(Joi.dateSchema),
  getLines
);
lineRouter.get("/line", authenticateToken, getOneLine);
lineRouter.put(
  "/line/:id",
  authenticateToken,
  validateParams(Joi.idSchema),
  validateBody(Joi.lineSchema),
  putLine
);
lineRouter.delete(
  "/line/:id",
  authenticateToken,
  validateParams(Joi.idSchema),
  deleteLine
);

export default lineRouter;
