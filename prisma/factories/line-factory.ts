import { TypeCut } from "@prisma/client";
import prisma from "../../src/database/prisma.js";
import { Line, NewLine, User } from "../../src/protocols/contracts.js";
import {
  convert_string_date_in_date,
  convert_string_time_in_date,
  create_end_time,
  prices,
} from "../../src/utils/utils.js";
import { date } from "joi";

export async function createLine(userId: number, newLine: NewLine) {
  const initTime = convert_string_time_in_date(newLine.initTime, newLine.date);
  const endTime = create_end_time(initTime, newLine.avgDuration);
  const line: Line = {
    type: newLine.type,
    value: prices[newLine.type],
    date: convert_string_date_in_date(newLine.date),
    initTime: initTime,
    endTime: endTime,
    userId: userId,
  };

  return await prisma.line.create({
    data: line,
  });
}

export async function createManyLines(users: User[]): Promise<Line[]> {
  const dateNow = new Date();
  const lines: Line[] = [];
  for (let i = 0; i < users.length; i++) {
    const newLine: NewLine = {
      type: getRandomType(),
      date: `${dateNow.getDate()}-${
        dateNow.getMonth() + 1
      }-${dateNow.getFullYear()}`,
      initTime: `${9 + i}:00`,
      avgDuration: "60",
    };
    const line = await createLine(users[i].id, newLine);
    lines.push(line);
  }

  return lines;
}

export function getRandomType(): TypeCut {
  const types: TypeCut[] = [
    "MAQUINA",
    "TESOURA",
    "MAQUINA_E_TESOURA",
    "NAVALHA",
  ];

  return types[Math.floor(Math.random() * 4)];
}
