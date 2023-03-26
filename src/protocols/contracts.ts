import { User, Session, Card, Cut } from "@prisma/client";

export type NewUser = Omit<
  User,
  "id" | "isBanished" | "inLine" | "createdAt" | "updatedAt"
>;

export type NewSession = Omit<Session, "id" | "createdAt" | "updatedAt">;
