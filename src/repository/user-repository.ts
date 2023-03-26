import prisma from "../database/prisma";
import { NewUser, NewSession } from "../protocols/contracts";

async function newUser(user: NewUser): Promise<any> {
  return await prisma.user.create({
    data: user,
  });
}

async function newSession(session: NewSession, sessionId?: number) {
  return await prisma.session.upsert({
    where: {
      id: sessionId || 0,
    },
    create: session,
    update: session,
  });
}
