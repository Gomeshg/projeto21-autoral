import prisma from "../../src/database/prisma.js";
import { User, Session } from "../../src/protocols/contracts.js";
import bcrypt from "bcrypt";
const hash = 12;
export async function createUser(newUser: User): Promise<User> {
  return await prisma.user.create({
    data: newUser,
  });
}

export async function createManyUsers(): Promise<User[]> {
  const users: User[] = [];
  for (let i = 1; i <= 9; i++) {
    const user = await createUser({
      name: `User${i}`,
      email: `user${i}@gmail.com`,
      password: await bcrypt.hash("1234", hash),
      numberPhone: `2193332401${i}`,
    });
    users.push(user);
  }

  console.log(users);
  return users;
}
