import { Router } from "express";
import {
  getLine,
  postLine,
  putLine,
  deleteLine,
} from "../controller/line-controller.js";
const lineRouter = Router();

lineRouter.post("/line", postLine);
lineRouter.get("/line/:date", getLine);
lineRouter.put("/line/:id", putLine);
lineRouter.delete("/line/:id", deleteLine);

export default lineRouter;
