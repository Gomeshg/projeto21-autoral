import { Router } from "express";
import userRouter from "./user-router.js";
import lineRouter from "./line-router.js";

const routers = Router();

routers.use(userRouter);
routers.use(lineRouter);
routers.post("/teste", (req, res) => {
  const body = req.body;

  return res.status(200).send(body);
});

export default routers;
