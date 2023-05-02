import { createManyUsers } from "./factories/user-factory.js";
import { createManyLines } from "./factories/line-factory.js";
import prisma from "../src/database/prisma.js";
import { User, Session } from "../src/protocols/contracts.js";
import { Line, NewLine } from "../src/protocols/contracts.js";
import cleanDB from "./factories/cleandb-factory.js";

export async function seed() {
  cleanDB(prisma);

  const users: User[] = await createManyUsers();
  const lines: Line[] = await createManyLines(users);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
