import prisma from "../database/prisma.js";
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

async function findSessionByUserId(userId: number): Promise<Session> {
  return await prisma.session.findUnique({
    where: {
      userId,
    },
  });
}

async function findSessionByToken(token: string): Promise<Session> {
  return await prisma.session.findUnique({
    where: {
      token,
    },
  });
}

const userRepository = {
  findByEmail,
  findByNumber,
  newUser,
  newSession,
  findSessionByUserId,
  findSessionByToken,
};

export default userRepository;
