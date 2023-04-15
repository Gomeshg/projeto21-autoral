import { Prisma, TypeCut } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  numberPhone: string;
  isBanished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Login = {
  email: string;
  password: string;
};

export type Session = {
  id?: number;
  userId: number;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Line = {
  id?: number;
  type: TypeCut;
  value: Prisma.Decimal;
  date: Date;
  initTime: Date;
  endTime: Date;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type NewLine = {
  type: TypeCut;
  date: string;
  initTime: string;
  avgDuration: string;
};

// export type Cut = {
//   id?: number;
//   type: TypeCut;
//   value: number;
//   userId: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// };
// export type Card = {
//   id?: number;
//   number: number;
//   cvv: string;
//   dateValid: Date;
//   userId: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// };
