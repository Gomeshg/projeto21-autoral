import { createManyUsers, loginManyUsers } from "./factories/user-factory";
import { createLine } from "./factories/line-factory";
import prisma from "../src/database/prisma";
import { User, Session } from "../src/protocols/contracts";
import { Line, NewLine } from "../src/protocols/contracts";

export async function seed() {
  await prisma.line.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});

  const users: User[] = await createManyUsers();
  const sessions: Session[] = await loginManyUsers(users);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
