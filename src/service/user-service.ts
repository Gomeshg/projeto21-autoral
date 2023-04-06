import { NewUser, NewSession } from "../protocols/contracts";
import { User, Session } from "@prisma/client";
import userRepository from "../repository/user-repository";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../errors/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const fourHours = 14400000;

async function newUser({
  name,
  email,
  password,
  numberPhone,
}: NewUser): Promise<User> {
  const userAlreadyExists = await userRepository.findByEmail(email);
  if (userAlreadyExists) {
    throw conflictError("This user already exists!");
  }

  const numberAlreadyExists = await userRepository.findByNumber(numberPhone);
  if (numberAlreadyExists) {
    throw conflictError("This number already exists!");
  }

  const newUser = {
    name,
    email,
    password: await bcrypt.hash(password, 12),
    numberPhone,
  };
  const user = await userRepository.newUser(newUser);
  return user;
}

async function newSession(email: string, password: string): Promise<Session> {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw unauthorizedError();
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw unauthorizedError();
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
    expiresIn: fourHours,
  });

  let session = await userRepository.findSession(user.id);
  if (session) {
    session = await userRepository.newSession(
      { userId: user.id, token },
      session.id
    );
  } else {
    session = await userRepository.newSession({ userId: user.id, token });
  }

  return session;
}

const userService = {
  newUser,
  newSession,
};

export default userService;
