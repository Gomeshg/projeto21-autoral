import { Router } from "express";
import { newUser, newSession } from "../controller/user-controller.js";
import Joi from "../protocols/joi.js";
import { validateBody } from "../middleware/validation-middleware.js";
import { ObjectSchema } from "joi";

const userRouter = Router();

userRouter.post("/sign-up", validateBody(Joi.userSchema), newUser);
userRouter.post("/sign-in", validateBody(Joi.loginSchema), newSession);

export default userRouter;
