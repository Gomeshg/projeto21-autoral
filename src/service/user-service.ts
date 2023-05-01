import { User, Session, Login } from "../protocols/contracts";
import userRepository from "../repository/user-repository.js";
import { conflictError, unauthorizedError } from "../errors/errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const fourHours = 14400000;
const numHash = 12;

async function newUser({
  name,
  email,
  password,
  numberPhone,
}: User): Promise<User> {
  const userAlreadyExists = await userRepository.findByEmail(email);
  if (userAlreadyExists) {
    throw conflictError("User already exist!");
  }

  const numberAlreadyExists = await userRepository.findByNumber(numberPhone);
  if (numberAlreadyExists) {
    throw conflictError("User already exist!");
  }

  const newUser = {
    name,
    email,
    password: await bcrypt.hash(password, numHash),
    numberPhone,
  };
  const user = await userRepository.newUser(newUser);
  return user;
}

async function newSession({ email, password }: Login): Promise<Session> {
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

  let session = await userRepository.findSessionByUserId(user.id);
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
