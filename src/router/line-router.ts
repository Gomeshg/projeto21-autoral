import { Router } from "express";

const lineRouter = Router();

lineRouter.post("/line");
lineRouter.get("/line/:date");
lineRouter.put("/line/:id");
lineRouter.delete("/line/:id");

export default lineRouter;
