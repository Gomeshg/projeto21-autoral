import httpstatus from "http-status";
import { Request, Response } from "express";
import userService from "../service/user-service.js";
import { Login, NewUser } from "../protocols/contracts.js";

export async function newUser(req: Request, res: Response): Promise<Response> {
  const { name, password, email, numberPhone } = req.body as NewUser;

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
      return res
        .status(httpstatus.CONFLICT)
        .send("User with this email or numberPhone already exists");
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
  const { email, password } = req.body as Login;

  try {
    const newSession = await userService.newSession(email, password);
    return res.status(httpstatus.OK).send({ token: newSession.token });
  } catch (err) {
    if (err.name === "UnauthorizedError") {
      return res.status(httpstatus.UNAUTHORIZED).send(err.message);
    }
    return res
      .status(httpstatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Internal Server Error" });
  }
}
