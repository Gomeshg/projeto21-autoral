import prisma from "../../src/database/prisma";
import { User, Session } from "../../src/protocols/contracts";

export async function createUser(newUser: User) {
  await prisma.user.create({
    data: newUser,
  });
}

export async function loginUser(session: Session) {
  await prisma.session.create({
    data: session,
  });
}
