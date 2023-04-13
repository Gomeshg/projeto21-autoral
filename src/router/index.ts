import { Router } from "express";
import userRouter from "./user-router.js";
import lineRouter from "./line-router.js";

const routers = Router();

routers.use(userRouter);
routers.use(lineRouter);

export default routers;
