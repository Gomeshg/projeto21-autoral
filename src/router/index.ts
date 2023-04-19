import { Router } from "express";
import userRouter from "./user-router.js";
import lineRouter from "./line-router.js";
import prisma from "../database/prisma.js";
const routers = Router();

routers.use(userRouter);
routers.use(lineRouter);
routers.get("/teste", async (req, res) => {
  const line = await prisma.line.findMany({});
  return res.status(200).send(line);
});

export default routers;
