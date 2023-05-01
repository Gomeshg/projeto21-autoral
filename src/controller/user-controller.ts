import httpstatus from "http-status";
import { Request, Response } from "express";
import userService from "../service/user-service.js";
import { Login, User } from "../protocols/contracts.js";
import { invalid } from "joi";

export async function newUser(req: Request, res: Response): Promise<Response> {
  const { name, password, email, numberPhone } = req.body as User;

  try {
    const newUser = await userService.newUser({
      name,
      password,
      email,
      numberPhone,
    });
    return res.status(httpstatus.CREATED).send(newUser);
  } catch (err) {
    if (err.name === "ConflictError") {
      return res.status(httpstatus.CONFLICT).send("User already exist");
    }
    return res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Internal Server Error" });
  }
}

export async function newSession(
  req: Request,
  res: Response
): Promise<Response> {
  const login = req.body as Login;

  try {
    const newSession = await userService.newSession(login);
    return res
      .status(httpstatus.OK)
      .send({ token: newSession.token, userId: newSession.userId });
  } catch (err) {
    if (err.name === "UnauthorizedError") {
      return res
        .status(httpstatus.UNAUTHORIZED)
        .send({ errorMessage: "Invalid login" });
    }
    return res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Internal Server Error" });
  }
}
