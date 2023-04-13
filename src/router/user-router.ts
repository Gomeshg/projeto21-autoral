import { Router } from "express";
import { newUser, newSession } from "../controller/user-controller.js";
import validateLogin from "../middleware/login-middleware.js";
import validateUser from "../middleware/newuser-middleware.js";
const userRouter = Router();

userRouter.post("/sign-up", validateUser, newUser);
userRouter.post("/sign-in", validateLogin, newSession);

export default userRouter;
