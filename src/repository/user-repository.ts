import prisma from "../database/prisma";
import { NewUser, NewSession } from "../protocols/contracts";
import { User, Session } from "@prisma/client";

async function findByEmail(email: string): Promise<User> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function findByNumber(numberPhone: string): Promise<User> {
  return await prisma.user.findUnique({
    where: {
      numberPhone,
    },
  });
}

async function newUser(user: NewUser): Promise<User> {
  return await prisma.user.create({
    data: user,
  });
}

async function newSession(
  session: NewSession,
  sessionId?: number
): Promise<Session> {
  return await prisma.session.upsert({
    where: {
      id: sessionId || 0,
    },
    create: session,
    update: session,
  });
}

async function findSession(userId: number) {
  return await prisma.session.findFirst({
    where: {
      userId,
    },
  });
}

const userRepository = {
  findByEmail,
  findByNumber,
  newUser,
  newSession,
  findSession,
};

export default userRepository;
