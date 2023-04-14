import { Router } from "express";
import {
  getLine,
  postLine,
  putLine,
  deleteLine,
} from "../controller/line-controller.js";
import authenticateToken from "../middleware/auth-middleware.js";
import validateID from "../middleware/id-middleware.js";
const lineRouter = Router();

lineRouter.post("/line", authenticateToken, postLine);
lineRouter.get("/line/:date", authenticateToken, getLine);
lineRouter.put("/line/:id", authenticateToken, validateID, putLine);
lineRouter.delete("/line/:id", authenticateToken, validateID, deleteLine);

export default lineRouter;
