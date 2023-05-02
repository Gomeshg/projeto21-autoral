import { PrismaClient } from "@prisma/client";
export default async function cleanDB(prisma: PrismaClient): Promise<void> {
  await prisma.line.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}
