import { Router } from "express";
import { newUser, newSession } from "../controller/user-controller";
const userRouter = Router();

userRouter.post("/sign-up", newUser);
userRouter.post("/sign-in", newSession);

export default userRouter;
