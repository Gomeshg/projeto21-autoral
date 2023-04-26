import prisma from "../../src/database/prisma";
import { User, Session } from "../../src/protocols/contracts";
import jwt from "jsonwebtoken";
const fourHours = 14400000;

export async function createUser(newUser: User): Promise<User> {
  return await prisma.user.create({
    data: newUser,
  });
}

export async function loginUser(session: Session): Promise<Session> {
  return await prisma.session.create({
    data: session,
  });
}

export async function createManyUsers(): Promise<User[]> {
  const users: User[] = [];
  for (let i = 1; i <= 10; i++) {
    const user = await createUser({
      name: `User${i}`,
      email: `user${i}@gmail.com`,
      password: "1234",
      numberPhone: "21933324015",
    });
    users.push(user);
  }

  return users;
}

export async function loginManyUsers(users: User[]): Promise<Session[]> {
  const sessions: Session[] = [];

  for (let i = 0; i < users.length; i++) {
    const token = jwt.sign({ userId: users[i].id }, process.env.JWT_KEY, {
      expiresIn: fourHours,
    });

    const session = await loginUser({ userId: users[i].id, token });
    sessions.push(session);
  }
  return sessions;
}
